import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Page Not Found - Village For Her',
  description: 'The page you are looking for could not be found.',
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-warm-white">
      <div className="text-center">
        <h1 className="text-6xl font-heading font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-heading font-semibold text-gray-700 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          The page you are looking for might have been removed, had its name changed, or is
          temporarily unavailable.
        </p>
        <div className="space-x-4">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 rounded-full bg-soft-terracotta text-white font-semibold hover:bg-deep-sage transition-colors duration-200"
          >
            Go Home
          </Link>
          <a
            href="https://villageforher.square.site/s/shop?utm_source=site&utm_medium=404&utm_campaign=shop_link"
            className="inline-flex items-center px-6 py-3 rounded-full bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition-colors duration-200"
            data-analytics="outbound-shop"
          >
            Shop Now
          </a>
        </div>
      </div>
    </div>
  );
}
