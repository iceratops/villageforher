import { socialMetadata } from '@/lib/site';
import type { Metadata } from 'next';

const description = 'Refund and purchase-support information for Village For Her digital products.';

export const metadata: Metadata = {
  title: 'Refund policy',
  description,
  alternates: {
    canonical: '/policies/refunds/',
  },
  ...socialMetadata({
    title: 'Refund Policy | Village For Her',
    description,
    path: '/policies/refunds/',
    image: '/images/brand-social-card.png',
  }),
};

export default function RefundPolicyPage() {
  return (
    <>
      <section className="page-hero" aria-labelledby="refund-heading">
        <div className="page-shell">
          <p className="eyebrow">Policies</p>
          <h1 id="refund-heading">Refund policy</h1>
          <p>Last updated: August 25, 2026</p>
        </div>
      </section>

      <article className="page-shell prose-page">
        <section aria-labelledby="refund-digital">
          <h2 id="refund-digital">Digital purchases</h2>
          <p>
            Because digital products are available immediately after payment, purchases are
            generally final once access has been provided. This does not affect any refund or
            consumer right that applies under law.
          </p>
        </section>

        <section aria-labelledby="refund-help">
          <h2 id="refund-help">When to contact us</h2>
          <p>Please contact us if:</p>
          <ul>
            <li>you were charged more than once for the same purchase;</li>
            <li>you cannot access the file and we are unable to restore access;</li>
            <li>the file is damaged or unusable and we cannot provide a working replacement;</li>
            <li>the product you received materially differs from its description; or</li>
            <li>you believe a purchase was unauthorized.</li>
          </ul>
          <p>We review support and refund requests fairly based on the circumstances.</p>
        </section>

        <section aria-labelledby="refund-request">
          <h2 id="refund-request">How to request help or a refund</h2>
          <p>
            Email <a href="mailto:hello@villageforher.com">hello@villageforher.com</a> with the
            email address used at Stripe Checkout, the purchase date if known, and a brief
            description of the issue. Do not send your full card number or other sensitive payment
            details.
          </p>
          <p>
            We may ask for information needed to locate and verify the order. If a refund is
            approved, it will be returned through Stripe to the original payment method. The time it
            takes to appear depends on Stripe and the customer&apos;s bank or payment provider.
          </p>
        </section>

        <section aria-labelledby="refund-gifts">
          <h2 id="refund-gifts">Gift purchases</h2>
          <p>
            The same policy applies to gift purchases. The purchaser should submit the request using
            the email address entered at checkout.
          </p>
        </section>
      </article>
    </>
  );
}
