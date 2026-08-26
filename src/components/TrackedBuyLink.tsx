'use client';

import { type BuyCtaLocation, trackEvent } from '@/components/Analytics';
import Link from 'next/link';
import type { ReactNode } from 'react';

type TrackedBuyLinkProps = {
  href: string;
  location: BuyCtaLocation;
  className?: string;
  onClick?: () => void;
  children: ReactNode;
};

export default function TrackedBuyLink({
  href,
  location,
  className,
  onClick,
  children,
}: TrackedBuyLinkProps) {
  return (
    <Link
      href={href}
      className={className}
      onClick={() => {
        trackEvent('buy_cta_clicked', { cta_location: location });
        onClick?.();
      }}
    >
      {children}
    </Link>
  );
}
