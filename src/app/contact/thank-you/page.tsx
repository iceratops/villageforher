import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Message received',
  description: 'Your message has been sent to Village For Her.',
  robots: { index: false, follow: false },
};

export default function ContactThankYouPage() {
  return (
    <section className="access-page">
      <div className="page-shell">
        <div className="access-card free-thank-you-card">
          <p className="eyebrow">Message received</p>
          <h1>Thank you for reaching out.</h1>
          <p className="lede">
            Your message was submitted. For purchase help, keep the email address used at checkout
            nearby, but never send card details.
          </p>
          <div className="button-row">
            <Link href="/" className="button">
              Return home
            </Link>
            <Link href="/village-kit/" className="button button-secondary">
              See The Village Kit
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
