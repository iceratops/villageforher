import assert from 'node:assert/strict';
import test from 'node:test';
import Stripe from 'stripe';
import {
  type FunctionEvent,
  HttpError,
  assertTrustedOrigin,
  parseJsonBody,
} from '../netlify/functions/_shared/http.mts';
import {
  CHECKOUT_INTEGRATION_IDENTIFIER,
  ENTITLEMENT_TTL_SECONDS,
  PaymentConfigurationError,
  PaymentValidationError,
  type SessionLike,
  assertConfiguredPrice,
  buildCheckoutSessionParameters,
  checkoutMetadata,
  fulfillmentIdempotencyKey,
  issueEntitlementToken,
  loadAccessConfig,
  loadCheckoutConfig,
  loadDownloadConfig,
  loadPaymentConfig,
  loadWebhookConfig,
  parseCheckoutInput,
  requireFulfilledSession,
  validatePaidSession,
  verifyEntitlementToken,
} from '../netlify/functions/_shared/payments.mts';
import {
  loadPurchaseEmailConfig,
  purchaseAccessUrl,
  sendPurchaseAccessEmail,
} from '../netlify/functions/_shared/purchase-email.mts';
import { fulfillSession } from '../netlify/functions/_shared/stripe-fulfillment.mts';
import { verifiedEvent } from '../netlify/functions/stripe-webhook.mts';

const SESSION_ID = 'cs_test_1234567890abcdefghij';
const PRICE_ID = 'price_1234567890';
const TOKEN_SECRET = 'a-secure-test-secret-that-is-long-enough';

function testEnvironment(
  overrides: Record<string, string | undefined> = {}
): Record<string, string | undefined> {
  return {
    STRIPE_API_KEY: 'rk_test_examplekey123',
    STRIPE_WEBHOOK_SECRET: 'whsec_examplewebhook123',
    STRIPE_VILLAGE_KIT_PRICE_ID: PRICE_ID,
    STRIPE_MODE: 'test',
    DOWNLOAD_TOKEN_SECRET: TOKEN_SECRET,
    CONTEXT: 'dev',
    PUBLIC_SITE_ORIGIN: 'http://localhost:3000',
    ...overrides,
  };
}

function validSession(overrides: Partial<SessionLike> = {}): SessionLike {
  return {
    id: SESSION_ID,
    amount_subtotal: 1_200,
    amount_total: 1_200,
    currency: 'usd',
    customer_details: { email: 'buyer@example.com' },
    line_items: {
      data: [
        {
          amount_total: 1_200,
          currency: 'usd',
          price: {
            id: PRICE_ID,
            currency: 'usd',
            recurring: null,
            type: 'one_time',
            unit_amount: 1_200,
          },
          quantity: 1,
        },
      ],
      has_more: false,
    },
    livemode: false,
    metadata: {
      sku: 'village-kit-v1',
      purchase_type: 'gift',
      offer_version: 'v1',
      offer_price_id: PRICE_ID,
    },
    mode: 'payment',
    payment_status: 'paid',
    status: 'complete',
    ...overrides,
  };
}

test('payment config enforces deploy, key, mode, and origin boundaries', () => {
  const config = loadPaymentConfig(
    testEnvironment({ STRIPE_VILLAGE_KIT_LEGACY_PRICE_IDS: 'price_legacy123,price_legacy123' })
  );
  assert.equal(config.siteOrigin, 'http://localhost:3000');
  assert.equal(config.stripeMode, 'test');
  assert.deepEqual(config.legacyPriceIds, ['price_legacy123']);

  assert.throws(
    () => loadPaymentConfig(testEnvironment({ STRIPE_API_KEY: 'rk_live_examplekey123' })),
    PaymentConfigurationError
  );
  assert.throws(
    () =>
      loadPaymentConfig(
        testEnvironment({ CONTEXT: 'production', PUBLIC_SITE_ORIGIN: 'https://example.com' })
      ),
    PaymentConfigurationError
  );
  assert.throws(
    () => loadPaymentConfig(testEnvironment({ PUBLIC_SITE_ORIGIN: 'https://example.com/path' })),
    PaymentConfigurationError
  );
});

test('production config accepts only matching live credentials and HTTPS', () => {
  const config = loadPaymentConfig(
    testEnvironment({
      STRIPE_API_KEY: 'rk_live_examplekey123',
      STRIPE_MODE: 'live',
      CONTEXT: 'production',
      PUBLIC_SITE_ORIGIN: 'https://thevillageforher.com',
    })
  );

  assert.equal(config.stripeMode, 'live');
  assert.equal(config.siteOrigin, 'https://thevillageforher.com');

  assert.throws(
    () =>
      loadPaymentConfig(
        testEnvironment({
          STRIPE_API_KEY: 'sk_live_examplekey123',
          STRIPE_MODE: 'live',
          CONTEXT: 'production',
          PUBLIC_SITE_ORIGIN: 'https://thevillageforher.com',
        })
      ),
    PaymentConfigurationError
  );
});

test('explicit payment deploy context works when Netlify runtime omits CONTEXT', () => {
  assert.doesNotThrow(() =>
    loadPaymentConfig(
      testEnvironment({
        STRIPE_API_KEY: 'rk_live_examplekey123',
        STRIPE_MODE: 'live',
        CONTEXT: undefined,
        PAYMENT_DEPLOY_CONTEXT: 'production',
        PUBLIC_SITE_ORIGIN: 'https://thevillageforher.com',
      })
    )
  );
});

test('endpoint configs require only the secrets they use', () => {
  const withoutWebhook = testEnvironment({ STRIPE_WEBHOOK_SECRET: undefined });
  assert.equal(loadCheckoutConfig(withoutWebhook).priceId, PRICE_ID);
  assert.equal(loadAccessConfig(withoutWebhook).tokenSecret, TOKEN_SECRET);
  assert.equal(loadDownloadConfig(withoutWebhook).tokenSecret, TOKEN_SECRET);
  assert.throws(() => loadWebhookConfig(withoutWebhook), PaymentConfigurationError);

  const withoutToken = testEnvironment({ DOWNLOAD_TOKEN_SECRET: undefined });
  assert.equal(loadCheckoutConfig(withoutToken).priceId, PRICE_ID);
  assert.equal(loadWebhookConfig(withoutToken).webhookSecret, 'whsec_examplewebhook123');
  assert.throws(() => loadAccessConfig(withoutToken), PaymentConfigurationError);
  assert.throws(() => loadDownloadConfig(withoutToken), PaymentConfigurationError);
});

test('checkout input accepts self or gift and allowlists attribution', () => {
  const input = parseCheckoutInput({
    purchase_type: 'gift',
    attribution: {
      utm_source: ' instagram ',
      utm_campaign: 'launch',
      email: 'must-not-enter-metadata@example.com',
      arbitrary: 'ignored',
    },
  });

  assert.deepEqual(checkoutMetadata(input), {
    sku: 'village-kit-v1',
    purchase_type: 'gift',
    utm_source: 'instagram',
    utm_campaign: 'launch',
  });
  assert.throws(
    () => parseCheckoutInput({ purchase_type: 'someone-else' }),
    PaymentValidationError
  );
});

test('checkout input rejects malformed attribution values', () => {
  assert.throws(
    () =>
      parseCheckoutInput({
        purchase_type: 'self',
        attribution: { utm_source: 42 },
      }),
    PaymentValidationError
  );
});

test('checkout parameters use exact recovery URLs and dynamic payment methods', () => {
  const parameters = buildCheckoutSessionParameters(
    { priceId: PRICE_ID, siteOrigin: 'https://thevillageforher.com' },
    { purchaseType: 'self', attribution: {} }
  );

  assert.equal(
    parameters.success_url,
    'https://thevillageforher.com/thank-you/village-kit/?session_id={CHECKOUT_SESSION_ID}'
  );
  assert.equal(
    parameters.cancel_url,
    'https://thevillageforher.com/village-kit/?checkout=canceled'
  );
  assert.deepEqual(parameters.line_items, [{ price: PRICE_ID, quantity: 1 }]);
  assert.deepEqual(parameters.payment_intent_data.metadata, {
    sku: 'village-kit-v1',
    purchase_type: 'self',
    offer_version: 'v1',
    offer_price_id: PRICE_ID,
  });
  assert.equal('payment_method_types' in parameters, false);
  assert.equal('automatic_tax' in parameters, false);
});

test('configured Price must be active one-time USD $12', () => {
  assert.doesNotThrow(() =>
    assertConfiguredPrice(
      {
        id: PRICE_ID,
        active: true,
        currency: 'usd',
        recurring: null,
        type: 'one_time',
        unit_amount: 1_200,
      },
      PRICE_ID
    )
  );

  for (const invalid of [
    { active: false },
    { currency: 'cad' },
    { unit_amount: 1_201 },
    { type: 'recurring', recurring: { interval: 'month' } },
  ]) {
    assert.throws(
      () =>
        assertConfiguredPrice(
          {
            id: PRICE_ID,
            active: true,
            currency: 'usd',
            recurring: null,
            type: 'one_time',
            unit_amount: 1_200,
            ...invalid,
          },
          PRICE_ID
        ),
      PaymentValidationError
    );
  }
});

test('paid session validation binds mode, SKU, email, total, and exact Price line', () => {
  const validated = validatePaidSession(validSession(), {
    priceId: PRICE_ID,
    stripeMode: 'test',
  });

  assert.deepEqual(validated, {
    sessionId: SESSION_ID,
    purchaseType: 'gift',
    purchaserEmail: 'buyer@example.com',
    isFulfilled: false,
    isEmailDelivered: false,
  });

  for (const invalid of [
    { payment_status: 'unpaid' },
    { livemode: true },
    { amount_total: 1_199 },
    { metadata: { sku: 'other-product', purchase_type: 'gift' } },
    { customer_details: { email: null } },
  ]) {
    assert.throws(
      () =>
        validatePaidSession(validSession(invalid), {
          priceId: PRICE_ID,
          stripeMode: 'test',
        }),
      PaymentValidationError
    );
  }
});

test('paid session validation rejects substituted or additional line items', () => {
  const wrongPrice = validSession({
    line_items: {
      data: [
        {
          amount_total: 1_200,
          currency: 'usd',
          price: {
            id: 'price_substituted',
            currency: 'usd',
            recurring: null,
            type: 'one_time',
            unit_amount: 1_200,
          },
          quantity: 1,
        },
      ],
      has_more: false,
    },
  });
  const additionalLine = validSession({
    line_items: {
      data: [{}, {}],
      has_more: false,
    },
  });

  assert.throws(
    () => validatePaidSession(wrongPrice, { priceId: PRICE_ID, stripeMode: 'test' }),
    PaymentValidationError
  );
  assert.throws(
    () => validatePaidSession(additionalLine, { priceId: PRICE_ID, stripeMode: 'test' }),
    PaymentValidationError
  );

  const legacyPriceId = 'price_legacy123';
  const legacyPrice = validSession({
    metadata: {
      sku: 'village-kit-v1',
      purchase_type: 'gift',
      offer_version: 'v1',
      offer_price_id: legacyPriceId,
    },
    line_items: {
      data: [
        {
          amount_total: 1_200,
          currency: 'usd',
          price: {
            id: legacyPriceId,
            currency: 'usd',
            recurring: null,
            type: 'one_time',
            unit_amount: 1_200,
          },
          quantity: 1,
        },
      ],
      has_more: false,
    },
  });
  assert.doesNotThrow(() =>
    validatePaidSession(legacyPrice, {
      priceId: PRICE_ID,
      legacyPriceIds: [legacyPriceId],
      stripeMode: 'test',
    })
  );
});

test('download validation requires deterministic fulfillment metadata', () => {
  assert.throws(
    () =>
      requireFulfilledSession(validSession(), {
        priceId: PRICE_ID,
        stripeMode: 'test',
      }),
    PaymentValidationError
  );

  const fulfilled = validSession({
    metadata: {
      sku: 'village-kit-v1',
      purchase_type: 'gift',
      offer_version: 'v1',
      offer_price_id: PRICE_ID,
      fulfillment_status: 'fulfilled',
      fulfillment_version: 'v1',
    },
  });
  assert.equal(
    requireFulfilledSession(fulfilled, {
      priceId: PRICE_ID,
      stripeMode: 'test',
    }).isFulfilled,
    true
  );
  assert.equal(fulfillmentIdempotencyKey(SESSION_ID), `vfh-fulfillment-v1:${SESSION_ID}`);

  assert.throws(
    () =>
      validatePaidSession(
        validSession({
          metadata: {
            sku: 'village-kit-v1',
            purchase_type: 'gift',
            offer_version: 'v1',
            offer_price_id: PRICE_ID,
            access_revoked: 'true',
          },
        }),
        { priceId: PRICE_ID, stripeMode: 'test' }
      ),
    PaymentValidationError
  );
});

test('duplicate fulfillment deliveries update the Checkout Session once', async () => {
  const session = validSession() as unknown as Stripe.Checkout.Session;
  const idempotencyKeys: string[] = [];
  const stripe = {
    checkout: {
      sessions: {
        retrieve: async () => session,
        update: async (
          _sessionId: string,
          params: Stripe.Checkout.SessionUpdateParams,
          options?: Stripe.RequestOptions
        ) => {
          idempotencyKeys.push(options?.idempotencyKey || '');
          session.metadata = { ...session.metadata, ...params.metadata };
          return session;
        },
      },
    },
  } as unknown as Stripe;

  await fulfillSession(stripe, { priceId: PRICE_ID, stripeMode: 'test' }, SESSION_ID);
  await fulfillSession(stripe, { priceId: PRICE_ID, stripeMode: 'test' }, SESSION_ID);

  assert.deepEqual(idempotencyKeys, [`vfh-fulfillment-v1:${SESSION_ID}`]);
  assert.equal(session.metadata?.fulfillment_status, 'fulfilled');
  assert.equal(session.metadata?.fulfillment_version, 'v1');
});

test('purchase email uses a durable access link and idempotent Resend request', async () => {
  const config = loadPurchaseEmailConfig(
    {
      RESEND_API_KEY: 're_testkey123',
      PURCHASE_EMAIL_FROM: 'Village For Her <hello@send.villageforher.com>',
      PURCHASE_EMAIL_REPLY_TO: 'hello@villageforher.com',
    },
    'https://thevillageforher.com'
  );
  assert.ok(config);

  let requestUrl = '';
  let requestInit: RequestInit | undefined;
  const fetchStub = (async (input: string | URL | Request, init?: RequestInit) => {
    requestUrl = input.toString();
    requestInit = init;
    return new Response(JSON.stringify({ id: 'email_test_123' }), { status: 200 });
  }) as typeof fetch;

  await sendPurchaseAccessEmail(
    config,
    {
      sessionId: SESSION_ID,
      purchaseType: 'self',
      purchaserEmail: 'buyer@example.com',
      isFulfilled: true,
      isEmailDelivered: false,
    },
    fetchStub
  );

  assert.equal(requestUrl, 'https://api.resend.com/emails');
  assert.equal(
    new Headers(requestInit?.headers).get('Idempotency-Key'),
    `vfh-purchase-access-v1/${SESSION_ID}`
  );
  const body = JSON.parse(String(requestInit?.body));
  assert.deepEqual(body.to, ['buyer@example.com']);
  assert.match(body.text, /thank-you\/village-kit\/#session_id=cs_test_/);
  assert.equal(
    purchaseAccessUrl('https://thevillageforher.com', SESSION_ID),
    `https://thevillageforher.com/thank-you/village-kit/#session_id=${SESSION_ID}`
  );
});

test('webhook verification accepts the raw signed body and rejects tampering', () => {
  const secret = 'whsec_unit_test_secret';
  const payload = JSON.stringify({
    id: 'evt_test_signed_webhook',
    object: 'event',
    type: 'checkout.session.completed',
    data: { object: { id: SESSION_ID } },
  });
  const signature = Stripe.webhooks.generateTestHeaderString({ payload, secret });
  const stripe = new Stripe('sk_test_examplekey123');
  const event: FunctionEvent = {
    body: payload,
    headers: {
      'content-type': 'application/json',
      'stripe-signature': signature,
    },
    httpMethod: 'POST',
  };

  assert.equal(verifiedEvent(stripe, event, secret).id, 'evt_test_signed_webhook');
  assert.throws(() => verifiedEvent(stripe, { ...event, body: `${payload} ` }, secret), HttpError);
});

test('encrypted entitlement round-trips without exposing the session id and expires', () => {
  const now = 1_900_000_000;
  const entitlement = issueEntitlementToken(SESSION_ID, TOKEN_SECRET, now);
  const payload = verifyEntitlementToken(entitlement.token, TOKEN_SECRET, now);

  assert.equal(entitlement.token.includes(SESSION_ID), false);
  assert.equal(entitlement.token.split('.').length, 4);
  assert.equal(payload.sid, SESSION_ID);
  assert.equal(payload.iat, now);
  assert.equal(payload.exp, now + ENTITLEMENT_TTL_SECONDS);
  assert.equal(entitlement.expiresAt, payload.exp);

  assert.throws(
    () => verifyEntitlementToken(entitlement.token, TOKEN_SECRET, now + ENTITLEMENT_TTL_SECONDS),
    PaymentValidationError
  );
});

test('encrypted entitlement rejects tampering and the wrong secret', () => {
  const entitlement = issueEntitlementToken(SESSION_ID, TOKEN_SECRET, 1_900_000_000);
  const pieces = entitlement.token.split('.');
  const replacement = pieces[2].startsWith('A') ? 'B' : 'A';
  pieces[2] = `${replacement}${pieces[2].slice(1)}`;
  const tampered = pieces.join('.');

  assert.throws(
    () => verifyEntitlementToken(tampered, TOKEN_SECRET, 1_900_000_001),
    PaymentValidationError
  );
  assert.throws(
    () =>
      verifyEntitlementToken(
        entitlement.token,
        'a-different-secure-test-secret-value',
        1_900_000_001
      ),
    PaymentValidationError
  );
});

test('integration identifier uses a stable eight-letter random suffix', () => {
  assert.match(CHECKOUT_INTEGRATION_IDENTIFIER, /^village-for-her-web-[a-z]{8}$/);
});

test('JSON and origin safeguards reject unsupported requests', () => {
  const parsed = parseJsonBody({
    body: '{"purchase_type":"self"}',
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
  assert.deepEqual(parsed, { purchase_type: 'self' });

  assert.doesNotThrow(() =>
    assertTrustedOrigin(
      {
        headers: {
          origin: 'https://thevillageforher.com',
          'sec-fetch-site': 'same-origin',
        },
      },
      ['https://thevillageforher.com']
    )
  );
  assert.throws(
    () =>
      assertTrustedOrigin({ headers: { origin: 'https://attacker.example' } }, [
        'https://thevillageforher.com',
      ]),
    HttpError
  );
  assert.throws(
    () =>
      parseJsonBody({
        body: '{}',
        headers: { 'content-type': 'text/plain' },
      }),
    HttpError
  );
});
