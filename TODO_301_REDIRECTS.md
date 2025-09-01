# TODO: 301 Redirect Mapping for Legacy Product URLs

This file tracks legacy product URLs that need to be redirected to their new locations on Square Online.

## Legacy Product URLs

The following product URLs were discovered in the codebase and need 301 redirects:

### Product Detail Pages
- `/products/[slug]` - Individual product pages
  - Example: `/products/healing-crystal-set`
  - Example: `/products/wellness-journal`
  - Example: `/products/meditation-cushion`

### Current Status
- Legacy product pages show minimal content with "Buy on our store" buttons
- All pages have `noindex` meta tags to prevent SEO issues
- Temporary solution in place until 301 mapping is provided

## Required Action

1. **Provide Square Online URL mapping** for each legacy product URL
2. **Implement 301 redirects** in `next.config.js` or hosting platform
3. **Remove legacy product pages** once redirects are in place

## Example Redirect Configuration

```javascript
// next.config.js
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/products/healing-crystal-set',
        destination: 'https://shop.example.com/products/healing-crystal-set',
        permanent: true,
      },
      {
        source: '/products/wellness-journal',
        destination: 'https://shop.example.com/products/wellness-journal',
        permanent: true,
      },
      // Add more redirects as needed
    ];
  },
};
```

## Notes

- All external links include UTM parameters for analytics tracking
- Legacy product pages are excluded from sitemap
- Product pages show minimal content to maintain SEO continuity during transition
