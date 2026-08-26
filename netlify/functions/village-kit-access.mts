import {
  type FunctionEvent,
  type FunctionResponse,
  HttpError,
  assertTrustedOrigin,
  functionResponseToResponse,
  jsonResponse,
  methodNotAllowed,
  parseJsonBody,
  requestToFunctionEvent,
} from './_shared/http.mts';
import {
  PaymentConfigurationError,
  PaymentValidationError,
  assertSessionId,
  issueEntitlementToken,
  loadAccessConfig,
} from './_shared/payments.mts';
import { createStripeClient, fulfillSession } from './_shared/stripe-fulfillment.mts';

interface AccessInput {
  session_id?: unknown;
}

function parseAccessInput(value: unknown): AccessInput {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    throw new HttpError(400, 'Access request is invalid.');
  }
  return value as AccessInput;
}

export async function handler(event: FunctionEvent): Promise<FunctionResponse> {
  if (event.httpMethod !== 'POST') {
    return methodNotAllowed(['POST']);
  }

  try {
    const config = loadAccessConfig();
    assertTrustedOrigin(event, config.allowedOrigins);

    const input = parseAccessInput(parseJsonBody(event));
    const sessionId = assertSessionId(input.session_id);

    const stripe = createStripeClient(config);
    const fulfilled = await fulfillSession(stripe, config, sessionId);
    const entitlement = issueEntitlementToken(fulfilled.sessionId, config.tokenSecret);
    const encodedSessionId = encodeURIComponent(fulfilled.sessionId);
    const encodedToken = encodeURIComponent(entitlement.token);
    const downloadPath = `/api/download/village-kit?token=${encodedToken}`;
    const giftAccessPath =
      fulfilled.purchaseType === 'gift' ? `/gift/#session_id=${encodedSessionId}` : null;

    return jsonResponse(
      200,
      {
        expires_at: entitlement.expiresAt,
        purchase_type: fulfilled.purchaseType,
        download_path: downloadPath,
        gift_access_path: giftAccessPath,
      },
      { Vary: 'Origin' }
    );
  } catch (error) {
    if (error instanceof HttpError) {
      return jsonResponse(error.statusCode, { error: error.message });
    }
    if (error instanceof PaymentConfigurationError) {
      return jsonResponse(503, {
        error: 'Access is temporarily unavailable. Please try again later.',
      });
    }
    if (error instanceof PaymentValidationError) {
      return jsonResponse(403, { error: 'Purchase access could not be verified.' });
    }
    return jsonResponse(503, {
      error: 'Access is temporarily unavailable. Please try again later.',
    });
  }
}

export default async function netlifyHandler(request: Request): Promise<Response> {
  return functionResponseToResponse(await handler(await requestToFunctionEvent(request)));
}

export const config = {
  path: '/api/access/village-kit',
  method: 'POST',
  rateLimit: {
    windowLimit: 30,
    windowSize: 60,
    aggregateBy: ['ip', 'domain'],
  },
};
