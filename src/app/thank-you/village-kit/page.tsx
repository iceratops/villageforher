import PurchaseAccess from '@/components/PurchaseAccess';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Your Village Kit access',
  description: 'Secure access to The Village Kit after payment.',
  referrer: 'no-referrer',
  robots: { index: false, follow: false, noarchive: true },
};

export default function VillageKitThankYouPage() {
  return <PurchaseAccess />;
}
