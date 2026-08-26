import { createCipheriv, createDecipheriv, createHash, randomBytes } from 'node:crypto';

export const VILLAGE_KIT_SKU = 'village-kit-v1';
export const VILLAGE_KIT_PRICE_CENTS = 1_200;
export const VILLAGE_KIT_CURRENCY = 'usd';
export const FULFILLMENT_STATUS = 'fulfilled';
export const FULFILLMENT_VERSION = 'v1';
export const EMAIL_DELIVERY_STATUS = 'sent';
export const EMAIL_DELIVERY_VERSION = 'v1';
export const VILLAGE_KIT_OFFER_VERSION = 'v1';
export const ENTITLEMENT_TTL_SECONDS = 15 * 60;
export const CHECKOUT_INTEGRATION_IDENTIFIER = 'village-for-her-web-qmvkzdra';

const TOKEN_VERSION = 1;
const TOKEN_PURPOSE = 'village-kit-download';
const TOKEN_AAD = Buffer.from('vfh:village-kit-download:v1', 'utf8');
const SESSION_ID_PATTERN = /^cs_(?:test|live)_[A-Za-z0-9]{10,200}$/;
const PRICE_ID_PATTERN = /^price_[A-Za-z0-9]+$/;
const ALLOWED_CONTEXTS = new Set(['production', 'deploy-preview', 'branch-deploy', 'dev']);

export type PurchaseType = 'self' | 'gift';
export type StripeMode = 'test' | 'live';

export const ATTRIBUTION_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
] as const;

export type AttributionKey = (typeof ATTRIBUTION_KEYS)[number];
export type Attribution = Partial<Record<AttributionKey, string>>;

export interface StripeConfig {
  apiKey: string;
  priceId: string;
  legacyPriceIds: string[];
  stripeMode: StripeMode;
  context: string;
}

export interface OriginConfig {
  siteOrigin: string;
  allowedOrigins: string[];
}

export interface PaymentConfig extends StripeConfig, OriginConfig {
  webhookSecret: string;
  tokenSecret: string;
}

export type CheckoutConfig = StripeConfig & OriginConfig;
export type WebhookConfig = StripeConfig & OriginConfig & Pick<PaymentConfig, 'webhookSecret'>;
export type AccessConfig = StripeConfig & OriginConfig & Pick<PaymentConfig, 'tokenSecret'>;
export type DownloadConfig = StripeConfig & Pick<PaymentConfig, 'tokenSecret'>;

export interface CheckoutInput {
  purchaseType: PurchaseType;
  attribution: Attribution;
}

export interface CheckoutSessionParameters {
  mode: 'payment';
  line_items: [{ price: string; quantity: 1 }];
  metadata: Record<string, string>;
  payment_intent_data: { metadata: Record<string, string> };
  origin_context: 'web';
  integration_identifier: string;
  success_url: string;
  cancel_url: string;
}

export interface PriceLike {
  id?: unknown;
  active?: unknown;
  currency?: unknown;
  unit_amount?: unknown;
  type?: unknown;
  recurring?: unknown;
}

export interface CheckoutLineLike {
  amount_total?: unknown;
  currency?: unknown;
  price?: unknown;
  quantity?: unknown;
}

export interface SessionLike {
  id?: unknown;
  amount_subtotal?: unknown;
  amount_total?: unknown;
  currency?: unknown;
  customer_details?: { email?: unknown } | null;
  customer_email?: unknown;
  line_items?: {
    data?: unknown;
    has_more?: unknown;
  } | null;
  livemode?: unknown;
  metadata?: Record<string, unknown> | null;
  mode?: unknown;
  payment_status?: unknown;
  status?: unknown;
}

export interface ValidatedSession {
  sessionId: string;
  purchaseType: PurchaseType;
  purchaserEmail: string;
  isFulfilled: boolean;
  isEmailDelivered: boolean;
}

export interface EntitlementPayload {
  v: 1;
  purpose: typeof TOKEN_PURPOSE;
  sid: string;
  iat: number;
  exp: number;
}

export interface Entitlement {
  token: string;
  expiresAt: number;
}

export class PaymentConfigurationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PaymentConfigurationError';
  }
}

export class PaymentValidationError extends Error {
  readonly code: string;

  constructor(code: string) {
    super(`Payment validation failed: ${code}`);
    this.name = 'PaymentValidationError';
    this.code = code;
  }
}

function requiredEnvironmentValue(
  environment: Readonly<Record<string, string | undefined>>,
  name: string
): string {
  const value = environment[name]?.trim();
  if (!value) {
    throw new PaymentConfigurationError(`${name} is required.`);
  }
  return value;
}

function validateOrigin(rawOrigin: string, context: string): string {
  let url: URL;

  try {
    url = new URL(rawOrigin);
  } catch {
    throw new PaymentConfigurationError('The configured site origin is invalid.');
  }

  if (
    (url.protocol !== 'https:' && url.protocol !== 'http:') ||
    url.username !== '' ||
    url.password !== '' ||
    url.pathname !== '/' ||
    url.search !== '' ||
    url.hash !== ''
  ) {
    throw new PaymentConfigurationError('The configured site origin is invalid.');
  }

  const isLocal = url.hostname === 'localhost' || url.hostname === '127.0.0.1';
  if (url.protocol !== 'https:' && !(context === 'dev' && isLocal)) {
    throw new PaymentConfigurationError('The configured site origin must use HTTPS.');
  }

  return url.origin;
}

function parseLegacyPriceIds(rawValue: string | undefined, currentPriceId: string): string[] {
  if (!rawValue?.trim()) return [];

  const priceIds = [
    ...new Set(
      rawValue
        .split(',')
        .map((value) => value.trim())
        .filter(Boolean)
    ),
  ];
  if (priceIds.length > 20 || priceIds.some((priceId) => !PRICE_ID_PATTERN.test(priceId))) {
    throw new PaymentConfigurationError(
      'STRIPE_VILLAGE_KIT_LEGACY_PRICE_IDS must be a comma-separated list of Price IDs.'
    );
  }
  return priceIds.filter((priceId) => priceId !== currentPriceId);
}

function loadStripeConfig(environment: Readonly<Record<string, string | undefined>>): StripeConfig {
  const apiKey = requiredEnvironmentValue(environment, 'STRIPE_API_KEY');
  const priceId = requiredEnvironmentValue(environment, 'STRIPE_VILLAGE_KIT_PRICE_ID');
  const rawMode = requiredEnvironmentValue(environment, 'STRIPE_MODE');
  const context =
    environment.PAYMENT_DEPLOY_CONTEXT?.trim() || environment.CONTEXT?.trim() || 'dev';

  if (!ALLOWED_CONTEXTS.has(context)) {
    throw new PaymentConfigurationError('CONTEXT is not supported.');
  }
  if (rawMode !== 'test' && rawMode !== 'live') {
    throw new PaymentConfigurationError('STRIPE_MODE must be test or live.');
  }
  const stripeMode: StripeMode = rawMode;

  const keyMatch = /^(sk|rk)_(test|live)_[A-Za-z0-9_]+$/.exec(apiKey);
  if (!keyMatch || keyMatch[2] !== stripeMode) {
    throw new PaymentConfigurationError('STRIPE_API_KEY does not match STRIPE_MODE.');
  }
  if (!PRICE_ID_PATTERN.test(priceId)) {
    throw new PaymentConfigurationError('STRIPE_VILLAGE_KIT_PRICE_ID is invalid.');
  }
  const legacyPriceIds = parseLegacyPriceIds(
    environment.STRIPE_VILLAGE_KIT_LEGACY_PRICE_IDS,
    priceId
  );
  if (context === 'production' && stripeMode !== 'live') {
    throw new PaymentConfigurationError('Production deploys require STRIPE_MODE=live.');
  }
  if (context !== 'production' && stripeMode !== 'test') {
    throw new PaymentConfigurationError('Non-production deploys require STRIPE_MODE=test.');
  }
  if (context === 'production' && keyMatch[1] !== 'rk') {
    throw new PaymentConfigurationError('Production deploys require a restricted Stripe key.');
  }

  return { apiKey, priceId, legacyPriceIds, stripeMode, context };
}

function loadOriginConfig(
  environment: Readonly<Record<string, string | undefined>>,
  context: string
): OriginConfig {
  const configuredOrigin =
    context === 'production'
      ? environment.PUBLIC_SITE_ORIGIN || environment.URL
      : context === 'deploy-preview' || context === 'branch-deploy'
        ? environment.DEPLOY_PRIME_URL || environment.PUBLIC_SITE_ORIGIN
        : environment.PUBLIC_SITE_ORIGIN || environment.DEPLOY_PRIME_URL || environment.URL;

  if (!configuredOrigin) {
    throw new PaymentConfigurationError(
      'PUBLIC_SITE_ORIGIN or the Netlify deploy origin is required.'
    );
  }

  const siteOrigin = validateOrigin(configuredOrigin, context);
  const allowedOrigins = new Set<string>([siteOrigin]);
  for (const candidate of [
    environment.PUBLIC_SITE_ORIGIN,
    environment.URL,
    environment.DEPLOY_PRIME_URL,
  ]) {
    if (candidate?.trim()) {
      allowedOrigins.add(validateOrigin(candidate.trim(), context));
    }
  }

  return { siteOrigin, allowedOrigins: [...allowedOrigins] };
}

function loadWebhookSecret(environment: Readonly<Record<string, string | undefined>>): string {
  const webhookSecret = requiredEnvironmentValue(environment, 'STRIPE_WEBHOOK_SECRET');
  if (!/^whsec_[A-Za-z0-9_]+$/.test(webhookSecret)) {
    throw new PaymentConfigurationError('STRIPE_WEBHOOK_SECRET is invalid.');
  }
  return webhookSecret;
}

function loadTokenSecret(environment: Readonly<Record<string, string | undefined>>): string {
  const tokenSecret = requiredEnvironmentValue(environment, 'DOWNLOAD_TOKEN_SECRET');
  if (Buffer.byteLength(tokenSecret, 'utf8') < 32) {
    throw new PaymentConfigurationError('DOWNLOAD_TOKEN_SECRET must contain at least 32 bytes.');
  }
  return tokenSecret;
}

export function loadCheckoutConfig(
  environment: Readonly<Record<string, string | undefined>> = process.env
): CheckoutConfig {
  const stripeConfig = loadStripeConfig(environment);
  return { ...stripeConfig, ...loadOriginConfig(environment, stripeConfig.context) };
}

export function loadWebhookConfig(
  environment: Readonly<Record<string, string | undefined>> = process.env
): WebhookConfig {
  const stripeConfig = loadStripeConfig(environment);
  return {
    ...stripeConfig,
    ...loadOriginConfig(environment, stripeConfig.context),
    webhookSecret: loadWebhookSecret(environment),
  };
}

export function loadAccessConfig(
  environment: Readonly<Record<string, string | undefined>> = process.env
): AccessConfig {
  const stripeConfig = loadStripeConfig(environment);
  return {
    ...stripeConfig,
    ...loadOriginConfig(environment, stripeConfig.context),
    tokenSecret: loadTokenSecret(environment),
  };
}

export function loadDownloadConfig(
  environment: Readonly<Record<string, string | undefined>> = process.env
): DownloadConfig {
  return { ...loadStripeConfig(environment), tokenSecret: loadTokenSecret(environment) };
}

export function loadPaymentConfig(
  environment: Readonly<Record<string, string | undefined>> = process.env
): PaymentConfig {
  const stripeConfig = loadStripeConfig(environment);
  return {
    ...stripeConfig,
    ...loadOriginConfig(environment, stripeConfig.context),
    webhookSecret: loadWebhookSecret(environment),
    tokenSecret: loadTokenSecret(environment),
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function hasControlCharacter(value: string): boolean {
  return Array.from(value).some((character) => {
    const codePoint = character.codePointAt(0);
    return codePoint !== undefined && (codePoint <= 31 || codePoint === 127);
  });
}

function cleanAttributionValue(value: unknown): string | undefined {
  if (value === undefined || value === null || value === '') {
    return undefined;
  }
  if (typeof value !== 'string') {
    throw new PaymentValidationError('invalid_attribution');
  }

  const cleaned = value.trim();
  if (cleaned.length === 0 || cleaned.length > 160 || hasControlCharacter(cleaned)) {
    throw new PaymentValidationError('invalid_attribution');
  }

  return cleaned;
}

export function parseCheckoutInput(value: unknown): CheckoutInput {
  if (!isRecord(value)) {
    throw new PaymentValidationError('invalid_checkout_input');
  }

  if (value.purchase_type !== 'self' && value.purchase_type !== 'gift') {
    throw new PaymentValidationError('invalid_purchase_type');
  }

  const source = value.attribution === undefined ? value : value.attribution;
  if (!isRecord(source)) {
    throw new PaymentValidationError('invalid_attribution');
  }

  const attribution: Attribution = {};
  for (const key of ATTRIBUTION_KEYS) {
    const cleaned = cleanAttributionValue(source[key]);
    if (cleaned !== undefined) {
      attribution[key] = cleaned;
    }
  }

  return { purchaseType: value.purchase_type, attribution };
}

export function checkoutMetadata(input: CheckoutInput): Record<string, string> {
  return {
    sku: VILLAGE_KIT_SKU,
    purchase_type: input.purchaseType,
    ...input.attribution,
  };
}

export function buildCheckoutSessionParameters(
  config: Pick<PaymentConfig, 'priceId' | 'siteOrigin'>,
  input: CheckoutInput
): CheckoutSessionParameters {
  const metadata = {
    ...checkoutMetadata(input),
    offer_version: VILLAGE_KIT_OFFER_VERSION,
    offer_price_id: config.priceId,
  };
  return {
    mode: 'payment',
    line_items: [{ price: config.priceId, quantity: 1 }],
    metadata,
    payment_intent_data: { metadata },
    origin_context: 'web',
    integration_identifier: CHECKOUT_INTEGRATION_IDENTIFIER,
    success_url: `${config.siteOrigin}/thank-you/village-kit/?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${config.siteOrigin}/village-kit/?checkout=canceled`,
  };
}

export function assertConfiguredPrice(price: PriceLike, configuredPriceId: string): void {
  if (price.id !== configuredPriceId) {
    throw new PaymentValidationError('wrong_price_id');
  }
  if (price.active !== true) {
    throw new PaymentValidationError('inactive_price');
  }
  if (price.type !== 'one_time' || price.recurring != null) {
    throw new PaymentValidationError('recurring_price');
  }
  if (price.currency !== VILLAGE_KIT_CURRENCY || price.unit_amount !== VILLAGE_KIT_PRICE_CENTS) {
    throw new PaymentValidationError('wrong_price_amount');
  }
}

function sessionId(value: unknown): string {
  if (typeof value !== 'string' || !SESSION_ID_PATTERN.test(value)) {
    throw new PaymentValidationError('invalid_session_id');
  }
  return value;
}

export function assertSessionId(value: unknown): string {
  return sessionId(value);
}

function purchaseType(value: unknown): PurchaseType {
  if (value !== 'self' && value !== 'gift') {
    throw new PaymentValidationError('invalid_session_purchase_type');
  }
  return value;
}

function purchaserEmail(session: SessionLike): string {
  const email = session.customer_details?.email ?? session.customer_email;
  if (typeof email !== 'string' || email.length > 320 || !email.includes('@')) {
    throw new PaymentValidationError('missing_purchaser_email');
  }
  return email;
}

function checkoutLine(session: SessionLike): CheckoutLineLike {
  const rawData = session.line_items?.data;
  if (!Array.isArray(rawData) || rawData.length !== 1) {
    throw new PaymentValidationError('wrong_line_count');
  }
  if (session.line_items?.has_more === true) {
    throw new PaymentValidationError('wrong_line_count');
  }
  if (!isRecord(rawData[0])) {
    throw new PaymentValidationError('invalid_line_item');
  }
  return rawData[0];
}

export function validatePaidSession(
  session: SessionLike,
  config: Pick<PaymentConfig, 'priceId' | 'stripeMode'> &
    Partial<Pick<PaymentConfig, 'legacyPriceIds'>>
): ValidatedSession {
  const id = sessionId(session.id);
  if (session.mode !== 'payment' || session.status !== 'complete') {
    throw new PaymentValidationError('incomplete_session');
  }
  if (session.payment_status !== 'paid') {
    throw new PaymentValidationError('unpaid_session');
  }
  if (session.livemode !== (config.stripeMode === 'live')) {
    throw new PaymentValidationError('wrong_session_mode');
  }
  if (session.metadata?.sku !== VILLAGE_KIT_SKU) {
    throw new PaymentValidationError('wrong_session_sku');
  }
  if (session.metadata?.access_revoked === 'true') {
    throw new PaymentValidationError('access_revoked');
  }
  if (session.metadata?.offer_version !== VILLAGE_KIT_OFFER_VERSION) {
    throw new PaymentValidationError('wrong_offer_version');
  }

  const selectedPurchaseType = purchaseType(session.metadata?.purchase_type);
  if (
    session.currency !== VILLAGE_KIT_CURRENCY ||
    session.amount_subtotal !== VILLAGE_KIT_PRICE_CENTS ||
    session.amount_total !== VILLAGE_KIT_PRICE_CENTS
  ) {
    throw new PaymentValidationError('wrong_session_total');
  }

  const line = checkoutLine(session);
  const acceptedPriceIds = new Set([config.priceId, ...(config.legacyPriceIds ?? [])]);
  if (
    line.quantity !== 1 ||
    line.amount_total !== VILLAGE_KIT_PRICE_CENTS ||
    line.currency !== VILLAGE_KIT_CURRENCY ||
    !isRecord(line.price) ||
    typeof line.price.id !== 'string' ||
    !acceptedPriceIds.has(line.price.id) ||
    session.metadata?.offer_price_id !== line.price.id ||
    line.price.type !== 'one_time' ||
    line.price.recurring != null ||
    line.price.currency !== VILLAGE_KIT_CURRENCY ||
    line.price.unit_amount !== VILLAGE_KIT_PRICE_CENTS
  ) {
    throw new PaymentValidationError('wrong_session_price');
  }

  return {
    sessionId: id,
    purchaseType: selectedPurchaseType,
    purchaserEmail: purchaserEmail(session),
    isFulfilled:
      session.metadata?.fulfillment_status === FULFILLMENT_STATUS &&
      session.metadata?.fulfillment_version === FULFILLMENT_VERSION,
    isEmailDelivered:
      session.metadata?.email_delivery_status === EMAIL_DELIVERY_STATUS &&
      session.metadata?.email_delivery_version === EMAIL_DELIVERY_VERSION,
  };
}

export function requireFulfilledSession(
  session: SessionLike,
  config: Pick<PaymentConfig, 'priceId' | 'stripeMode'> &
    Partial<Pick<PaymentConfig, 'legacyPriceIds'>>
): ValidatedSession {
  const validated = validatePaidSession(session, config);
  if (!validated.isFulfilled) {
    throw new PaymentValidationError('unfulfilled_session');
  }
  return validated;
}

export function fulfillmentIdempotencyKey(rawSessionId: unknown): string {
  return `vfh-fulfillment-v1:${sessionId(rawSessionId)}`;
}

function tokenKey(secret: string): Buffer {
  if (Buffer.byteLength(secret, 'utf8') < 32) {
    throw new PaymentValidationError('invalid_token_secret');
  }
  return createHash('sha256').update(secret, 'utf8').digest();
}

function decodeTokenPart(value: string, expectedBytes?: number): Buffer {
  if (!/^[A-Za-z0-9_-]+$/.test(value)) {
    throw new PaymentValidationError('invalid_token');
  }
  const decoded = Buffer.from(value, 'base64url');
  if (
    decoded.toString('base64url') !== value ||
    (expectedBytes !== undefined && decoded.byteLength !== expectedBytes)
  ) {
    throw new PaymentValidationError('invalid_token');
  }
  return decoded;
}

export function issueEntitlementToken(
  rawSessionId: unknown,
  secret: string,
  nowSeconds = Math.floor(Date.now() / 1_000)
): Entitlement {
  const sid = sessionId(rawSessionId);
  const key = tokenKey(secret);

  const payload: EntitlementPayload = {
    v: TOKEN_VERSION,
    purpose: TOKEN_PURPOSE,
    sid,
    iat: nowSeconds,
    exp: nowSeconds + ENTITLEMENT_TTL_SECONDS,
  };
  const initializationVector = randomBytes(12);
  const cipher = createCipheriv('aes-256-gcm', key, initializationVector);
  cipher.setAAD(TOKEN_AAD);
  const ciphertext = Buffer.concat([
    cipher.update(JSON.stringify(payload), 'utf8'),
    cipher.final(),
  ]);
  const authenticationTag = cipher.getAuthTag();

  return {
    token: [
      String(TOKEN_VERSION),
      initializationVector.toString('base64url'),
      ciphertext.toString('base64url'),
      authenticationTag.toString('base64url'),
    ].join('.'),
    expiresAt: payload.exp,
  };
}

export function verifyEntitlementToken(
  token: unknown,
  secret: string,
  nowSeconds = Math.floor(Date.now() / 1_000)
): EntitlementPayload {
  if (typeof token !== 'string' || token.length > 2_048) {
    throw new PaymentValidationError('invalid_token');
  }

  const pieces = token.split('.');
  if (pieces.length !== 4 || pieces.some((piece) => piece === '')) {
    throw new PaymentValidationError('invalid_token');
  }
  const [version, encodedInitializationVector, encodedCiphertext, encodedAuthenticationTag] =
    pieces;
  if (version !== String(TOKEN_VERSION) || encodedCiphertext.length > 1_024) {
    throw new PaymentValidationError('invalid_token');
  }

  let payloadBuffer: Buffer;
  try {
    const initializationVector = decodeTokenPart(encodedInitializationVector, 12);
    const ciphertext = decodeTokenPart(encodedCiphertext);
    const authenticationTag = decodeTokenPart(encodedAuthenticationTag, 16);
    const decipher = createDecipheriv('aes-256-gcm', tokenKey(secret), initializationVector);
    decipher.setAAD(TOKEN_AAD);
    decipher.setAuthTag(authenticationTag);
    payloadBuffer = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
  } catch {
    throw new PaymentValidationError('invalid_token');
  }

  let value: unknown;
  try {
    value = JSON.parse(payloadBuffer.toString('utf8'));
  } catch {
    throw new PaymentValidationError('invalid_token');
  }

  if (
    !isRecord(value) ||
    value.v !== TOKEN_VERSION ||
    value.purpose !== TOKEN_PURPOSE ||
    typeof value.iat !== 'number' ||
    !Number.isInteger(value.iat) ||
    typeof value.exp !== 'number' ||
    !Number.isInteger(value.exp) ||
    value.iat > nowSeconds + 300 ||
    value.exp <= nowSeconds ||
    value.exp !== value.iat + ENTITLEMENT_TTL_SECONDS
  ) {
    throw new PaymentValidationError('invalid_token');
  }

  const sid = sessionId(value.sid);
  return {
    v: TOKEN_VERSION,
    purpose: TOKEN_PURPOSE,
    sid,
    iat: value.iat,
    exp: value.exp,
  };
}
