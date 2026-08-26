import Stripe from 'stripe';
import {
  FULFILLMENT_STATUS,
  FULFILLMENT_VERSION,
  type PaymentConfig,
  type SessionLike,
  type ValidatedSession,
  assertConfiguredPrice,
  assertSessionId,
  fulfillmentIdempotencyKey,
  requireFulfilledSession,
  validatePaidSession,
} from './payments.mts';

export function createStripeClient(config: Pick<PaymentConfig, 'apiKey'>): Stripe {
  return new Stripe(config.apiKey, {
    apiVersion: '2026-07-29.dahlia',
    appInfo: {
      name: 'village-for-her',
      version: '1.0.0',
      url: 'https://thevillageforher.com',
    },
    maxNetworkRetries: 2,
    telemetry: false,
    typescript: true,
  });
}

export async function validateCheckoutPrice(
  stripe: Stripe,
  config: Pick<PaymentConfig, 'priceId'>
): Promise<void> {
  const price = await stripe.prices.retrieve(config.priceId);
  assertConfiguredPrice(price, config.priceId);
}

async function retrieveSession(
  stripe: Stripe,
  rawSessionId: unknown
): Promise<Stripe.Checkout.Session> {
  const id = assertSessionId(rawSessionId);
  return stripe.checkout.sessions.retrieve(id, {
    expand: ['line_items.data.price'],
  });
}

export async function fulfillSession(
  stripe: Stripe,
  config: Pick<PaymentConfig, 'priceId' | 'legacyPriceIds' | 'stripeMode'>,
  rawSessionId: unknown
): Promise<ValidatedSession> {
  const session = await retrieveSession(stripe, rawSessionId);
  const validated = validatePaidSession(session as SessionLike, config);

  if (!validated.isFulfilled) {
    await stripe.checkout.sessions.update(
      validated.sessionId,
      {
        metadata: {
          fulfillment_status: FULFILLMENT_STATUS,
          fulfillment_version: FULFILLMENT_VERSION,
        },
      },
      { idempotencyKey: fulfillmentIdempotencyKey(validated.sessionId) }
    );
  }

  return { ...validated, isFulfilled: true };
}

export async function retrieveFulfilledSession(
  stripe: Stripe,
  config: Pick<PaymentConfig, 'priceId' | 'legacyPriceIds' | 'stripeMode'>,
  rawSessionId: unknown
): Promise<ValidatedSession> {
  const session = await retrieveSession(stripe, rawSessionId);
  return requireFulfilledSession(session as SessionLike, config);
}
