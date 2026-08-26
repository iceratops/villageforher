import { socialMetadata } from '@/lib/site';
import type { Metadata } from 'next';
import Link from 'next/link';

const description = 'Terms for using the Village For Her website and digital resources.';

export const metadata: Metadata = {
  title: 'Terms of use',
  description,
  alternates: {
    canonical: '/policies/terms/',
  },
  ...socialMetadata({
    title: 'Terms of Use | Village For Her',
    description,
    path: '/policies/terms/',
    image: '/images/brand-social-card.png',
  }),
};

export default function TermsPage() {
  return (
    <>
      <section className="page-hero" aria-labelledby="terms-heading">
        <div className="page-shell">
          <p className="eyebrow">Policies</p>
          <h1 id="terms-heading">Terms of use</h1>
          <p>Last updated: August 25, 2026</p>
        </div>
      </section>

      <article className="page-shell prose-page">
        <section aria-labelledby="terms-acceptance">
          <h2 id="terms-acceptance">Using this site</h2>
          <p>
            These terms apply when you visit the Village For Her website, download a free resource,
            or buy a digital product. By doing so, you agree to these terms. If you do not agree,
            please do not use the site or its resources.
          </p>
        </section>

        <section aria-labelledby="terms-purchases">
          <h2 id="terms-purchases">Purchases and delivery</h2>
          <p>
            Paid products are sold as one-time digital purchases through Stripe Checkout. The price
            and any applicable tax are shown before payment. There is no physical shipment unless a
            product page explicitly says otherwise.
          </p>
          <p>
            Access is provided after Stripe confirms successful payment. More detail is available in
            our <Link href="/policies/digital-delivery">digital delivery policy</Link>.
          </p>
        </section>

        <section aria-labelledby="terms-license">
          <h2 id="terms-license">Personal-use license</h2>
          <p>
            A purchase grants one personal, non-exclusive, non-transferable license to the purchaser
            or one intended gift recipient. You may print the resource for that person&apos;s use
            and share completed planning pages with the people participating in that person&apos;s
            support plan.
          </p>
          <p>
            You may not resell, republish, upload publicly, distribute blank copies to multiple
            households, remove ownership notices, or use the resource commercially without written
            permission. All content remains the intellectual property of Village For Her or its
            licensors.
          </p>
        </section>

        <section aria-labelledby="terms-informational">
          <h2 id="terms-informational">Informational resources only</h2>
          <p>
            Village For Her resources are practical planning and educational tools. They are not
            therapy, medical care, mental-health treatment, diagnosis, or professional advice. Seek
            a qualified professional for medical, mental-health, legal, financial, or other
            professional guidance.
          </p>
        </section>

        <section aria-labelledby="terms-refunds">
          <h2 id="terms-refunds">Refunds</h2>
          <p>
            Digital-product refund requests are handled under our{' '}
            <Link href="/policies/refunds">refund policy</Link>. Nothing in these terms limits
            consumer rights that cannot lawfully be waived.
          </p>
        </section>

        <section aria-labelledby="terms-availability">
          <h2 id="terms-availability">Availability and responsibility</h2>
          <p>
            We work to keep the site and resources useful and accurate, but cannot guarantee that
            access will always be uninterrupted or error-free. To the extent allowed by law, Village
            For Her is not liable for indirect or consequential losses arising from use of the site
            or resources.
          </p>
          <p>
            Do not misuse the site, interfere with its operation, attempt to bypass paid access, or
            use its content unlawfully.
          </p>
        </section>

        <section aria-labelledby="terms-changes">
          <h2 id="terms-changes">Changes and contact</h2>
          <p>
            We may update these terms as the website or products change. The updated date above
            identifies the current version. Questions may be sent to{' '}
            <a href="mailto:hello@villageforher.com">hello@villageforher.com</a>.
          </p>
        </section>
      </article>
    </>
  );
}
