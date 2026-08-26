import { absoluteUrl } from '@/lib/site';
import type { MetadataRoute } from 'next';

const updatedAt = new Date('2026-08-25T00:00:00.000Z');
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl('/'), lastModified: updatedAt, changeFrequency: 'weekly', priority: 1 },
    {
      url: absoluteUrl('/village-kit/'),
      lastModified: updatedAt,
      changeFrequency: 'monthly',
      priority: 0.95,
    },
    {
      url: absoluteUrl('/free/10-ways-to-help/'),
      lastModified: updatedAt,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: absoluteUrl('/about/'),
      lastModified: updatedAt,
      changeFrequency: 'yearly',
      priority: 0.6,
    },
    {
      url: absoluteUrl('/contact/'),
      lastModified: updatedAt,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: absoluteUrl('/policies/digital-delivery/'),
      lastModified: updatedAt,
      changeFrequency: 'yearly',
      priority: 0.35,
    },
    {
      url: absoluteUrl('/policies/refunds/'),
      lastModified: updatedAt,
      changeFrequency: 'yearly',
      priority: 0.35,
    },
    {
      url: absoluteUrl('/policies/privacy/'),
      lastModified: updatedAt,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: absoluteUrl('/policies/terms/'),
      lastModified: updatedAt,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];
}
