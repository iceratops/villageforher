import Stripe from 'stripe';
import {
  type FunctionEvent,
  type FunctionResponse,
  HttpError,
  decodeRawBody,
  functionResponseToResponse,
  getHeader,
  jsonResponse,
  methodNotAllowed,
  requestToFunctionEvent,
} from './_shared/http.mts';
import {
  PaymentConfigurationError,
  PaymentValidationError,
  VILLAGE_KIT_SKU,
  loadWebhookConfig,
} from './_shared/payments.mts';
import {
  loadPurchaseEmailConfig,
  recordPurchaseEmailDelivery,
  sendPurchaseAccessEmail,
} from './_shared/purchase-email.mts';
import { createStripeClient, fulfillSession } from './_shared/stripe-fulfillment.mts';

const HANDLED_EVENTS = new Set([
  'checkout.session.completed',
  'checkout.session.async_payment_succeeded',
]);

export function verifiedEvent(
  stripe: Stripe,
  event: FunctionEvent,
  webhookSecret: string
): Stripe.Event {
  const contentType = getHeader(event.headers, 'content-type')
    ?.split(';', 1)[0]
    ?.trim()
    .toLowerCase();
  if (contentType !== 'application/json') {
    throw new HttpError(415, 'Content-Type must be application/json.');
  }

  const signature = getHeader(event.headers, 'stripe-signature');
  if (!signature) {
    throw new HttpError(400, 'Webhook signature is required.');
  }

  const rawBody = decodeRawBody(event, 1_048_576);
  try {
    return stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch {
    throw new HttpError(400, 'Webhook signature could not be verified.');
  }
}

export async function handler(event: FunctionEvent): Promise<FunctionResponse> {
  if (event.httpMethod !== 'POST') {
    return methodNotAllowed(['POST']);
  }

  try {
    const config = loadWebhookConfig();
    const stripe = createStripeClient(config);
    const stripeEvent = verifiedEvent(stripe, event, config.webhookSecret);

    if (!HANDLED_EVENTS.has(stripeEvent.type)) {
      return jsonResponse(200, { received: true });
    }

    const session = stripeEvent.data.object as Stripe.Checkout.Session;
    if (session.metadata?.sku !== VILLAGE_KIT_SKU) {
      return jsonResponse(200, { received: true });
    }

    if (stripeEvent.type === 'checkout.session.completed' && session.payment_status !== 'paid') {
      return jsonResponse(200, { received: true });
    }

    const fulfilled = await fulfillSession(stripe, config, session.id);
    const emailConfig = loadPurchaseEmailConfig(process.env, config.siteOrigin);
    if (emailConfig && !fulfilled.isEmailDelivered) {
      await sendPurchaseAccessEmail(emailConfig, fulfilled);
      await recordPurchaseEmailDelivery(stripe, fulfilled);
    }
    return jsonResponse(200, { received: true });
  } catch (error) {
    if (error instanceof HttpError) {
      return jsonResponse(error.statusCode, { error: error.message });
    }
    if (error instanceof PaymentConfigurationError) {
      return jsonResponse(503, { error: 'Webhook processing is unavailable.' });
    }
    if (error instanceof PaymentValidationError) {
      return jsonResponse(422, { error: 'Payment could not be fulfilled.' });
    }
    if (error instanceof Stripe.errors.StripeError) {
      return jsonResponse(503, { error: 'Payment fulfillment is unavailable.' });
    }
    return jsonResponse(500, { error: 'Webhook processing failed.' });
  }
}

export default async function netlifyHandler(request: Request): Promise<Response> {
  return functionResponseToResponse(await handler(await requestToFunctionEvent(request)));
}

export const config = {
  path: '/api/stripe/webhook',
  method: 'POST',
};
