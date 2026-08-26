import { socialMetadata } from '@/lib/site';
import type { Metadata } from 'next';
import Link from 'next/link';

const description = 'How Village For Her digital purchases and gifts are securely delivered.';

export const metadata: Metadata = {
  title: 'Digital delivery policy',
  description,
  alternates: {
    canonical: '/policies/digital-delivery/',
  },
  ...socialMetadata({
    title: 'Digital Delivery Policy | Village For Her',
    description,
    path: '/policies/digital-delivery/',
    image: '/images/brand-social-card.png',
  }),
};

export default function DigitalDeliveryPolicyPage() {
  return (
    <>
      <section className="page-hero" aria-labelledby="delivery-heading">
        <div className="page-shell">
          <p className="eyebrow">Policies</p>
          <h1 id="delivery-heading">Digital delivery policy</h1>
          <p>Last updated: August 25, 2026</p>
        </div>
      </section>

      <article className="page-shell prose-page">
        <section aria-labelledby="delivery-format">
          <h2 id="delivery-format">Digital format</h2>
          <p>
            The Village Kit is delivered as a digital PDF. Nothing will be shipped to a physical
            address.
          </p>
        </section>

        <section aria-labelledby="delivery-self">
          <h2 id="delivery-self">Purchases for yourself</h2>
          <ol>
            <li>Complete payment through Stripe Checkout.</li>
            <li>
              After Stripe confirms payment, return to the Village For Her access page. The page
              verifies the paid Checkout Session on the server.
            </li>
            <li>Use the secure, time-limited access provided there to download the PDF.</li>
          </ol>
          <p>
            Stripe collects the purchaser&apos;s email address for the transaction, but the product
            is delivered in the browser. Keep the access page open until the file has been
            downloaded.
          </p>
        </section>

        <section aria-labelledby="delivery-gifts">
          <h2 id="delivery-gifts">Gift purchases</h2>
          <p>
            When you choose the gift purchase option, the verified access page provides a secure
            gift link for you to copy and send to one intended recipient. Village For Her does not
            automatically email the recipient or schedule gift delivery in this version.
          </p>
          <p>
            Treat the gift link like a private purchase link. Do not post it publicly or share it
            with more than the intended recipient.
          </p>
        </section>

        <section aria-labelledby="delivery-support">
          <h2 id="delivery-support">Access problems</h2>
          <p>
            If access expires, the browser closes before download, or the file does not work, email{' '}
            <a href="mailto:hello@villageforher.com">hello@villageforher.com</a>. Include the email
            address used at checkout and a description of the issue. Do not send a full card number.
          </p>
          <p>
            We will verify the purchase before restoring access. Refund requests are handled under
            our <Link href="/policies/refunds">refund policy</Link>.
          </p>
        </section>

        <section aria-labelledby="delivery-license">
          <h2 id="delivery-license">License</h2>
          <p>
            Each purchase is licensed for the personal use of one purchaser or one intended gift
            recipient. See the <Link href="/policies/terms">terms of use</Link> for permitted use
            and sharing.
          </p>
        </section>
      </article>
    </>
  );
}
