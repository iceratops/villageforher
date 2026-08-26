import type { Metadata } from 'next';

export const SITE_NAME = 'Village For Her';
export const SITE_ORIGIN = (
  process.env.PUBLIC_SITE_ORIGIN || 'https://thevillageforher.com'
).replace(/\/$/, '');
export const SITE_DESCRIPTION =
  'Practical tools that make care easier to ask for, organize, give, and receive.';
export const SUPPORT_EMAIL = 'hello@villageforher.com';
export const VILLAGE_KIT_PRICE = 12;
export const VILLAGE_KIT_SKU = 'village-kit-v1';

export function absoluteUrl(path: string) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_ORIGIN}${normalizedPath}`;
}

type SocialMetadataOptions = {
  title: string;
  description: string;
  path: string;
  image: string;
};

export function socialMetadata({
  title,
  description,
  path,
  image,
}: SocialMetadataOptions): Pick<Metadata, 'openGraph' | 'twitter'> {
  return {
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      title,
      description,
      url: path,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}
