import { socialMetadata } from '@/lib/site';
import type { Metadata } from 'next';

const description = 'How Village For Her collects, uses, and protects personal information.';

export const metadata: Metadata = {
  title: 'Privacy policy',
  description,
  alternates: {
    canonical: '/policies/privacy/',
  },
  ...socialMetadata({
    title: 'Privacy Policy | Village For Her',
    description,
    path: '/policies/privacy/',
    image: '/images/brand-social-card.png',
  }),
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="page-hero" aria-labelledby="privacy-heading">
        <div className="page-shell">
          <p className="eyebrow">Policies</p>
          <h1 id="privacy-heading">Privacy policy</h1>
          <p>Last updated: August 25, 2026</p>
        </div>
      </section>

      <article className="page-shell prose-page">
        <section aria-labelledby="privacy-overview">
          <h2 id="privacy-overview">Overview</h2>
          <p>
            This policy explains how Village For Her collects and uses information when you use this
            website, request a free resource, contact us, or make a purchase.
          </p>
        </section>

        <section aria-labelledby="privacy-collection">
          <h2 id="privacy-collection">Information we collect</h2>
          <ul>
            <li>
              Contact details and messages you choose to submit, including your name and email
              address.
            </li>
            <li>
              The email address and purchase choices associated with a Stripe Checkout order. Stripe
              processes payment information; Village For Her does not receive your full card number.
            </li>
            <li>
              Basic technical and usage information created when the site is visited, such as
              device, browser, referring page, and site activity. Netlify may process hosting and
              form data needed to operate the site.
            </li>
            <li>
              If Google Analytics is configured, Google may process usage data and cookie or device
              identifiers to help us understand site and funnel performance.
            </li>
          </ul>
        </section>

        <section aria-labelledby="privacy-use">
          <h2 id="privacy-use">How we use information</h2>
          <p>We use information to:</p>
          <ul>
            <li>provide requested resources and secure digital-product access;</li>
            <li>process purchases, prevent misuse, and provide customer support;</li>
            <li>respond to contact messages;</li>
            <li>send updates you requested or consented to receive; and</li>
            <li>operate, secure, measure, and improve the website.</li>
          </ul>
        </section>

        <section aria-labelledby="privacy-sharing">
          <h2 id="privacy-sharing">Service providers and sharing</h2>
          <p>
            We share information only as needed with providers that help us run the website and
            serve customers. These include Stripe for checkout and payments, Netlify for hosting and
            forms, and Google Analytics only if it is configured. Their own privacy notices govern
            their processing. We may also disclose information when required by law or to protect
            the site, our customers, or our rights.
          </p>
          <p>Village For Her does not sell personal information.</p>
        </section>

        <section aria-labelledby="privacy-retention">
          <h2 id="privacy-retention">Retention and security</h2>
          <p>
            We keep personal information only as long as reasonably needed for the purposes
            described here, including support, transaction records, security, and legal obligations.
            We use reasonable safeguards, but no internet service can guarantee absolute security.
          </p>
        </section>

        <section aria-labelledby="privacy-choices">
          <h2 id="privacy-choices">Your choices</h2>
          <p>
            You may unsubscribe using the link in a marketing email. You may also ask to access,
            correct, or delete information you provided by contacting us. Some information may need
            to be kept for transactions, security, or legal obligations.
          </p>
        </section>

        <section aria-labelledby="privacy-contact">
          <h2 id="privacy-contact">Contact</h2>
          <p>
            For a privacy question or request, email{' '}
            <a href="mailto:hello@villageforher.com">hello@villageforher.com</a>.
          </p>
        </section>
      </article>
    </>
  );
}
