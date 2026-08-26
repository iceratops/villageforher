# Village For Her

Launch funnel for Village For Her, built with the Next.js App Router and deployed as a static
export on Netlify. New purchases use Stripe Checkout; Square is legacy and is not part of the
active customer journey.

## Customer journey

- `/` explains the brand and routes self-purchasers, gift buyers, and supporters.
- `/village-kit/` sells the $12 one-time digital Village Kit.
- `/free/10-ways-to-help/` captures a lead through Netlify Forms and delivers the free PDF.
- Stripe returns a paid customer to `/thank-you/village-kit/`.
- Netlify Functions verify payment and issue time-limited access to the paid PDF.
- Gift purchasers receive a private link for one recipient; v1 does not email recipients
  automatically.

The paid PDF remains in `output/pdf/` and is bundled only with the download function. It must not
be copied into `public/`.

## Local development

```bash
npm install
npm run dev
```

Static pages work in the Next.js development server. End-to-end checkout requires Netlify's local
function runtime or a deploy preview with Stripe test credentials.

## Environment variables

Copy `.env.example` and configure values locally or in Netlify. Never commit values.

- `PUBLIC_SITE_ORIGIN`: canonical origin and Stripe return origin, with no path or trailing slash.
- `STRIPE_API_KEY`: restricted Stripe key (`rk_...`) used only by Netlify Functions.
- `STRIPE_WEBHOOK_SECRET`: signing secret for `/api/stripe/webhook`.
- `STRIPE_VILLAGE_KIT_PRICE_ID`: active one-time USD Price for exactly `$12.00`.
- `STRIPE_VILLAGE_KIT_LEGACY_PRICE_IDS`: optional comma-separated prior Price IDs for the same
  `$12` v1 offer, so open and historical purchases remain valid after a Price replacement.
- `STRIPE_MODE`: `test` outside production and `live` in production.
- `PAYMENT_DEPLOY_CONTEXT`: explicit payment runtime context (`dev`, `deploy-preview`,
  `branch-deploy`, or `production`). Set this to `production` for the live Netlify site.
- `DOWNLOAD_TOKEN_SECRET`: random secret of at least 32 bytes for signed download access.
- `RESEND_API_KEY`: optional Resend sending-only key for purchase-access email delivery.
- `PURCHASE_EMAIL_FROM`: verified Resend sender, such as
  `Village For Her <hello@send.villageforher.com>`.
- `PURCHASE_EMAIL_REPLY_TO`: reply address for purchase-access emails; defaults to
  `hello@villageforher.com`.
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`: optional GA4 measurement ID. Funnel events are still exposed as
  `vfh:funnel` browser events when GA4 is unset.

Use test values for deploy previews and live values only in the production context. Netlify
supplies `URL` and `DEPLOY_PRIME_URL`; `PAYMENT_DEPLOY_CONTEXT` makes the function runtime context
explicit when `CONTEXT` is not present. Each endpoint
loads only the secrets it uses. The code validates deploy context, credential mode, price, origin,
amount, line items, and fulfillment metadata before granting access; production also rejects
unrestricted Stripe keys.

## Stripe and fulfillment

Create one Checkout Price for The Village Kit: one-time, USD, `$12.00`. A restricted production
key should permit Checkout Sessions write access and Prices read access. Configure a webhook for:

- `checkout.session.completed`
- `checkout.session.async_payment_succeeded`

Webhook signatures are verified from the raw request body. Fulfillment is idempotent and recorded
on the Checkout Session. The success redirect is never accepted as payment proof. Access and each
download are revalidated server-side. Download URLs use authenticated-encrypted 15-minute tokens;
the durable gift capability remains in a browser-only URL fragment.

When Resend is configured, the webhook emails the purchaser a durable access-page link after
verified payment. The link keeps the Checkout Session capability in the URL fragment, and the
server revalidates payment before issuing each short-lived download. Resend requests and Stripe
delivery metadata are idempotent so webhook retries do not normally duplicate email.

To revoke a compromised or unauthorized purchase manually, set Checkout Session metadata
`access_revoked=true`; access and downloads will then fail closed. Link rotation and automatic
refund/dispute revocation remain Phase 2. `STRIPE_VILLAGE_KIT_LEGACY_PRICE_IDS` is only for prior
Price IDs representing the same `$12` v1 offer—a future amount or product-version change needs an
explicit versioned catalog update.

Stripe Tax is intentionally not enabled in code. Confirm registrations and tax configuration
before enabling it in Stripe.

## Forms

Netlify discovers form definitions in `public/__forms.html`.

- `free-guide-lead`: email and optional marketing consent
- `contact`: name, email, and message

The free PDF remains directly available if lead capture fails. Follow-up email automation is not
part of v1.

## Quality checks

```bash
npm run typecheck
npm test
npm run check
npm run build
npm audit --omit=dev
```

Payment tests cover configuration boundaries, checkout metadata and recovery URLs, fixed product
validation, paid-session validation, duplicate fulfillment, raw webhook signature verification,
authenticated-encrypted entitlement expiry/tampering, and request safeguards.

## Deployment

`netlify.toml` builds with Node 24, publishes `out/`, bundles the protected PDF only with the
download function, retires legacy customer routes with 301 redirects, and applies security and
cache headers. Each function owns its `/api/*` path and method; checkout and access also use
Netlify code-based rate limits.
