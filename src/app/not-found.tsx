import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Page not found',
  description: 'The requested Village For Her page could not be found.',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="not-found">
      <div className="not-found-inner">
        <p className="not-found-code">404</p>
        <h1>This page is not part of the village.</h1>
        <p className="lede">
          The link may be old or incomplete. Start with The Village Kit, the free practical-help
          guide, or the homepage.
        </p>
        <div className="button-row">
          <Link href="/" className="button">
            Go home
          </Link>
          <Link href="/village-kit/" className="button button-secondary">
            See The Village Kit
          </Link>
        </div>
      </div>
    </section>
  );
}
