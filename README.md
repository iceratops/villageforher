# Village For Her - Next.js Migration

This project has been migrated from Vite to Next.js (App Router) for improved SEO, static site generation, and better performance.

## Features

- **Next.js 14** with App Router
- **Static Site Generation (SSG)** for all pages
- **SEO Optimized** with metadata, robots.txt, and sitemap
- **Square Online Store Integration** - All commerce now handled externally
- **Netlify Deployment** ready

## Environment Variables

The following environment variables are required:

- `PUBLIC_SITE_ORIGIN` - Your site's origin URL (e.g., "https://villageforher.com")

### Square Online Store URLs (Optional)
- `STORE_URL` - Your Square Online store URL (e.g., "https://shop.villageforher.com")
- `ACCOUNT_URL` - Your Square Online customer account URL (e.g., "https://shop.villageforher.com/account")

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables in your `.env.local` file:
```env
PUBLIC_SITE_ORIGIN=https://your-site.com
STORE_URL=https://shop.your-site.com
ACCOUNT_URL=https://shop.your-site.com/account
```

3. Run the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## API Endpoints

- `/robots.txt` - SEO robots file
- `/sitemap.xml` - SEO sitemap

## Pages

- `/` - Homepage with Shop CTA
- `/about` - About page with mission and services
- `/services` - Services overview with healing companion and shop links
- `/orders-returns` - Order tracking and policy information
- `/contact` - Contact information
- `/chat` - Healing companion AI interface

## Square Online Integration

- All commerce functionality moved to Square Online store
- Navigation includes Shop link to external store (no Account link on main site)
- 301 redirects from `/products` and `/products/*` to Square Online store
- UTM parameters added to all external links for analytics tracking
- Orders & Returns page provides policy links to Square Online

## Deployment

This project is configured for Netlify deployment with static export. The build process generates static files that can be served from any CDN.

## Migration Notes

- Removed all Vite-specific files and configurations
- Migrated from React Router to Next.js App Router
- Implemented SSG for all pages
- Added comprehensive SEO metadata
- Decommissioned Snipcart and Airtable integrations
- Moved all commerce to Square Online store
- Added navigation links to external store
- Legacy product pages show minimal content with external CTAs 