import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact - Village For Her',
  description: 'Get in touch with us for support, questions, or to join our community',
  openGraph: {
    title: 'Contact - Village For Her',
    description: 'Get in touch with us for support, questions, or to join our community',
    type: 'website',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
