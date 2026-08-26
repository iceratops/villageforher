import Analytics from '@/components/Analytics';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { SITE_DESCRIPTION, SITE_NAME, SITE_ORIGIN } from '@/lib/site';
import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  applicationName: SITE_NAME,
  title: {
    default: 'Village For Her — Practical care, easier to coordinate',
    template: '%s | Village For Her',
  },
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: SITE_NAME,
    title: 'Every woman deserves a village.',
    description: SITE_DESCRIPTION,
    images: [
      {
        url: '/images/social-card.png',
        width: 1200,
        height: 630,
        alt: 'Village For Her — Every woman deserves a village.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Every woman deserves a village.',
    description: SITE_DESCRIPTION,
    images: ['/images/social-card.png'],
  },
  icons: {
    icon: '/favicon.svg',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#F7F2EA',
  colorScheme: 'light',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <Analytics />
        <Header />
        <main id="main-content" className="site-main" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
