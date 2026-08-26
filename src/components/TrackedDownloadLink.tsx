'use client';

import { trackEvent } from '@/components/Analytics';
import type { ReactNode } from 'react';

type TrackedDownloadLinkProps = {
  href: string;
  asset: '10_ways_to_help' | 'village_kit';
  className?: string;
  download?: boolean | string;
  children: ReactNode;
};

export default function TrackedDownloadLink({
  href,
  asset,
  className,
  download,
  children,
}: TrackedDownloadLinkProps) {
  return (
    <a
      href={href}
      className={className}
      download={download}
      onClick={() => trackEvent('download_access_completed', { asset })}
    >
      {children}
    </a>
  );
}
