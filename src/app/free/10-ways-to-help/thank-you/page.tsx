import TrackedBuyLink from '@/components/TrackedBuyLink';
import TrackedDownloadLink from '@/components/TrackedDownloadLink';
import { VILLAGE_KIT_PRICE } from '@/lib/site';
import { ArrowRight, Download } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Your free practical-help guide is ready',
  description: 'Download 10 Ways to Actually Help a New Mom.',
  robots: { index: false, follow: false },
};

const guidePath = '/downloads/10-ways-to-actually-help-a-new-mom.pdf';

export default function FreeGuideThankYouPage() {
  return (
    <section className="access-page">
      <div className="page-shell">
        <div className="access-card free-thank-you-card">
          <p className="eyebrow">Your guide is ready</p>
          <h1>One useful offer can make a real day lighter.</h1>
          <p className="lede">
            Download the guide now. Save it, share it with another supporter, and choose one thing
            you can genuinely follow through on.
          </p>
          <div className="button-row">
            <TrackedDownloadLink
              href={guidePath}
              asset="10_ways_to_help"
              className="button"
              download="10-ways-to-actually-help-a-new-mom.pdf"
            >
              <Download aria-hidden="true" size={18} /> Download the free PDF
            </TrackedDownloadLink>
            <Link href="/" className="button button-secondary">
              Return home
            </Link>
          </div>
          <hr />
          <div>
            <p className="eyebrow">Want to make the care easier to coordinate?</p>
            <h2>Meet The Village Kit.</h2>
            <p>
              A 16-page toolkit for needs, boundaries, meals, errands, schedules, contacts, and
              ready-to-send messages — for yourself or as a useful digital gift.
            </p>
            <TrackedBuyLink
              href="/village-kit/"
              location="free_resource_thank_you"
              className="text-link"
            >
              See the ${VILLAGE_KIT_PRICE} Village Kit <ArrowRight aria-hidden="true" size={16} />
            </TrackedBuyLink>
          </div>
        </div>
      </div>
    </section>
  );
}
