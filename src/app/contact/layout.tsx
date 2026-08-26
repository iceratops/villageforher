import { socialMetadata } from '@/lib/site';
import type { Metadata } from 'next';

const description = 'Contact Village For Her for product, purchase, or digital access support.';

export const metadata: Metadata = {
  title: 'Contact',
  description,
  alternates: {
    canonical: '/contact/',
  },
  ...socialMetadata({
    title: 'Contact Village For Her',
    description,
    path: '/contact/',
    image: '/images/brand-social-card.png',
  }),
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
