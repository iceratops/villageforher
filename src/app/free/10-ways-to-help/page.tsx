import LeadCaptureForm from '@/components/LeadCaptureForm';
import TrackedBuyLink from '@/components/TrackedBuyLink';
import { VILLAGE_KIT_PRICE, absoluteUrl, socialMetadata } from '@/lib/site';
import { ArrowRight, Download } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';

const description =
  'A free practical PDF for friends, family, partners, and coworkers who want to help a new mom without asking her to manage the help.';

export const metadata: Metadata = {
  title: 'Free guide: 10 Ways to Actually Help a New Mom',
  description,
  alternates: { canonical: '/free/10-ways-to-help/' },
  ...socialMetadata({
    title: '10 Ways to Actually Help a New Mom | Free guide',
    description,
    path: '/free/10-ways-to-help/',
    image: '/images/free-guide-social-card.png',
  }),
};

const guideSchema = {
  '@context': 'https://schema.org',
  '@type': 'DigitalDocument',
  name: '10 Ways to Actually Help a New Mom',
  description: 'A practical support guide for friends, family, partners, and coworkers.',
  url: absoluteUrl('/free/10-ways-to-help/'),
  isAccessibleForFree: true,
  publisher: {
    '@type': 'Organization',
    name: 'Village For Her',
  },
};

export default function FreeGuidePage() {
  return (
    <>
      <script type="application/ld+json">{JSON.stringify(guideSchema)}</script>

      <section className="product-hero">
        <div className="container product-hero-grid">
          <div className="product-visual">
            <Image
              src="/images/free-guide-cover.webp"
              alt="Cover of 10 Ways to Actually Help a New Mom"
              width={720}
              height={932}
              sizes="(max-width: 900px) 58vw, 31vw"
              priority
            />
            <div className="product-badge">
              <strong>Free</strong>
              <span>6-page digital PDF</span>
            </div>
          </div>
          <div className="free-guide-copy">
            <p className="eyebrow">A practical guide for the people who want to show up</p>
            <h1>10 Ways to Actually Help a New Mom</h1>
            <p className="lede">
              Concrete ways to make life lighter — without asking her to identify, assign, explain,
              and manage the help.
            </p>
            <ul className="check-list">
              <li>Specific offers that are easier to answer</li>
              <li>Useful help at home, nearby, or from a distance</li>
              <li>Language that protects her time, attention, and boundaries</li>
            </ul>
            <div className="lead-form-shell" id="download" tabIndex={-1}>
              <h2>Get the free PDF</h2>
              <p className="microcopy">
                Enter your email to unlock immediate access in your browser. Marketing updates are
                optional, and the download still works if capture is temporarily unavailable.
              </p>
              <LeadCaptureForm buttonLabel="Get the free guide" />
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="guide-for-heading">
        <div className="container recognition-grid">
          <div>
            <p className="eyebrow">Who this is for</p>
            <h2 id="guide-for-heading">Care does not require perfect words.</h2>
          </div>
          <div>
            <p className="lede">
              This guide is for a friend, sister, parent, partner, coworker, neighbor, or
              long-distance loved one who cares deeply and wants a more useful answer than “let me
              know if you need anything.”
            </p>
            <ul className="recognition-list">
              <li>You want to bring food without creating more logistics</li>
              <li>You want a visit to feel helpful, not like hosting</li>
              <li>You want to check in without requiring a response</li>
              <li>You live far away and still want to reduce the load</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section section-sage" aria-labelledby="guide-inside-heading">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Inside the guide</p>
            <h2 id="guide-inside-heading">Ten clear ways to move from caring to action.</h2>
          </div>
          <div className="included-grid">
            {[
              'Bring food with a clear plan',
              'Handle a complete household task',
              'Take one errand off the list',
              'Coordinate other helpers',
              'Make visits useful and optional',
              'Check in without requiring a reply',
              'Support the whole household',
              'Send a practical delivery',
              'Remember after the first few weeks',
              'Believe what she says helps',
            ].map((item, index) => (
              <div className="included-item" key={item}>
                <strong>{String(index + 1).padStart(2, '0')}</strong>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-ivory" aria-labelledby="guide-next-heading">
        <div className="container free-grid">
          <div>
            <p className="eyebrow">When support needs a shared plan</p>
            <h2 id="guide-next-heading">
              The free guide helps you offer. The Village Kit helps everyone coordinate.
            </h2>
            <p className="lede">
              The Village Kit adds worksheets for needs, boundaries, meals, errands, check-ins,
              schedules, contacts, and ready-to-send requests. It is a natural next step when more
              than one person wants to help.
            </p>
            <TrackedBuyLink href="/village-kit/" location="free_resource" className="button">
              See The Village Kit — ${VILLAGE_KIT_PRICE} <ArrowRight aria-hidden="true" size={18} />
            </TrackedBuyLink>
          </div>
          <div className="form-shell">
            <Download aria-hidden="true" size={28} />
            <h3>Ready for the free guide?</h3>
            <p>Use the email form above. Access appears immediately on the next screen.</p>
            <a href="#download" className="text-link">
              Return to the download form
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
