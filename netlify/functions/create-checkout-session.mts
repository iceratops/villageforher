import Stripe from 'stripe';
import {
  type FunctionEvent,
  type FunctionResponse,
  HttpError,
  assertTrustedOrigin,
  functionResponseToResponse,
  jsonResponse,
  methodNotAllowed,
  parseJsonBody,
  publicErrorResponse,
  requestToFunctionEvent,
} from './_shared/http.mts';
import {
  PaymentConfigurationError,
  PaymentValidationError,
  buildCheckoutSessionParameters,
  loadCheckoutConfig,
  parseCheckoutInput,
} from './_shared/payments.mts';
import { createStripeClient, validateCheckoutPrice } from './_shared/stripe-fulfillment.mts';

export async function handler(event: FunctionEvent): Promise<FunctionResponse> {
  if (event.httpMethod !== 'POST') {
    return methodNotAllowed(['POST']);
  }

  try {
    const config = loadCheckoutConfig();
    assertTrustedOrigin(event, config.allowedOrigins);

    const input = parseCheckoutInput(parseJsonBody(event));
    const stripe = createStripeClient(config);
    await validateCheckoutPrice(stripe, config);

    const session = await stripe.checkout.sessions.create(
      buildCheckoutSessionParameters(config, input)
    );

    if (!session.url) {
      throw new HttpError(502, 'Unable to start checkout. Please try again.');
    }

    return jsonResponse(200, { url: session.url }, { Vary: 'Origin' });
  } catch (error) {
    if (error instanceof PaymentValidationError) {
      return jsonResponse(400, { error: 'Please check your purchase selection.' });
    }
    if (error instanceof PaymentConfigurationError) {
      console.error('Checkout configuration error:', error.message);
      return jsonResponse(503, {
        error: 'Checkout is temporarily unavailable. Please try again later.',
      });
    }
    if (error instanceof Stripe.errors.StripeError) {
      return jsonResponse(502, {
        error: 'Unable to start checkout. Please try again.',
      });
    }
    return publicErrorResponse(error, 'Unable to start checkout. Please try again.');
  }
}

export default async function netlifyHandler(request: Request): Promise<Response> {
  return functionResponseToResponse(await handler(await requestToFunctionEvent(request)));
}

export const config = {
  path: '/api/checkout',
  method: 'POST',
  rateLimit: {
    windowLimit: 10,
    windowSize: 60,
    aggregateBy: ['ip', 'domain'],
  },
};
