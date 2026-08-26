import type Stripe from 'stripe';
import {
  EMAIL_DELIVERY_STATUS,
  EMAIL_DELIVERY_VERSION,
  PaymentConfigurationError,
  type ValidatedSession,
} from './payments.mts';

const RESEND_ENDPOINT = 'https://api.resend.com/emails';
const DEFAULT_REPLY_TO = 'hello@villageforher.com';

export interface PurchaseEmailConfig {
  apiKey: string;
  from: string;
  replyTo: string;
  siteOrigin: string;
}

type FetchLike = typeof fetch;

function optionalValue(
  environment: Readonly<Record<string, string | undefined>>,
  name: string
): string {
  return environment[name]?.trim() || '';
}

function validMailbox(value: string): boolean {
  return value.length <= 320 && /^[^\s<>@]+@[^\s<>@]+\.[^\s<>@]+$/.test(value);
}

function validFrom(value: string): boolean {
  const mailbox = value.match(/<([^<>]+)>$/)?.[1] || value;
  return value.length <= 400 && validMailbox(mailbox);
}

export function loadPurchaseEmailConfig(
  environment: Readonly<Record<string, string | undefined>>,
  siteOrigin: string
): PurchaseEmailConfig | null {
  const apiKey = optionalValue(environment, 'RESEND_API_KEY');
  const from = optionalValue(environment, 'PURCHASE_EMAIL_FROM');
  const replyTo = optionalValue(environment, 'PURCHASE_EMAIL_REPLY_TO') || DEFAULT_REPLY_TO;

  if (!apiKey && !from) return null;
  if (!/^re_[A-Za-z0-9_]+$/.test(apiKey)) {
    throw new PaymentConfigurationError('RESEND_API_KEY is invalid.');
  }
  if (!validFrom(from)) {
    throw new PaymentConfigurationError('PURCHASE_EMAIL_FROM is invalid.');
  }
  if (!validMailbox(replyTo)) {
    throw new PaymentConfigurationError('PURCHASE_EMAIL_REPLY_TO is invalid.');
  }

  return { apiKey, from, replyTo, siteOrigin };
}

export function purchaseAccessUrl(siteOrigin: string, sessionId: string): string {
  const url = new URL('/thank-you/village-kit/', siteOrigin);
  url.hash = `session_id=${encodeURIComponent(sessionId)}`;
  return url.toString();
}

function emailHtml(accessUrl: string): string {
  const escapedUrl = accessUrl.replaceAll('&', '&amp;').replaceAll('"', '&quot;');
  return `<!doctype html>
<html lang="en">
  <body style="margin:0;background:#f7f2ec;color:#2d2723;font-family:Arial,sans-serif;">
    <div style="max-width:600px;margin:0 auto;padding:40px 24px;">
      <p style="font-size:14px;letter-spacing:.08em;text-transform:uppercase;">Village For Her</p>
      <h1 style="font-family:Georgia,serif;font-size:34px;line-height:1.15;">Your Village Kit is ready</h1>
      <p style="font-size:17px;line-height:1.6;">Thank you for your purchase. Use the secure link below whenever you need to return to your Village Kit.</p>
      <p style="margin:30px 0;"><a href="${escapedUrl}" style="display:inline-block;background:#70483f;color:#fff;padding:14px 22px;text-decoration:none;">Access The Village Kit</a></p>
      <p style="font-size:14px;line-height:1.6;">Keep this email for your records. The link verifies your purchase before providing a fresh protected download.</p>
      <p style="font-size:14px;line-height:1.6;">Need help? Reply to this email or contact hello@villageforher.com.</p>
    </div>
  </body>
</html>`;
}

export async function sendPurchaseAccessEmail(
  config: PurchaseEmailConfig,
  purchase: ValidatedSession,
  fetchImpl: FetchLike = fetch
): Promise<void> {
  const accessUrl = purchaseAccessUrl(config.siteOrigin, purchase.sessionId);
  const response = await fetchImpl(RESEND_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      'Content-Type': 'application/json',
      'Idempotency-Key': `vfh-purchase-access-v1/${purchase.sessionId}`,
    },
    body: JSON.stringify({
      from: config.from,
      to: [purchase.purchaserEmail],
      reply_to: config.replyTo,
      subject: 'Your Village Kit is ready',
      html: emailHtml(accessUrl),
      text: `Your Village Kit is ready. Access it securely at ${accessUrl}\n\nKeep this email for your records. Need help? Reply to this email or contact ${config.replyTo}.`,
    }),
  });

  if (!response.ok) {
    throw new Error(`Purchase email delivery failed with status ${response.status}.`);
  }
}

export async function recordPurchaseEmailDelivery(
  stripe: Stripe,
  purchase: ValidatedSession
): Promise<void> {
  await stripe.checkout.sessions.update(
    purchase.sessionId,
    {
      metadata: {
        email_delivery_status: EMAIL_DELIVERY_STATUS,
        email_delivery_version: EMAIL_DELIVERY_VERSION,
      },
    },
    { idempotencyKey: `vfh-email-delivery-v1:${purchase.sessionId}` }
  );
}
