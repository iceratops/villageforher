import PurchaseAccess from '@/components/PurchaseAccess';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'A Village Kit gift for you',
  description: 'Private gift access to The Village Kit.',
  referrer: 'no-referrer',
  robots: { index: false, follow: false, noarchive: true },
};

export default function GiftAccessPage() {
  return <PurchaseAccess recipient />;
}
