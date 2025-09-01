/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    PUBLIC_SITE_ORIGIN: process.env.PUBLIC_SITE_ORIGIN || 'http://localhost:3000',
  },
  async redirects() {
    return [
      // Redirect all product pages to Square Online store
      {
        source: '/products',
        destination: 'https://villageforher.square.site/s/shop?utm_source=site&utm_medium=redirect&utm_campaign=shop_link',
        permanent: true,
      },
      {
        source: '/products/:path*',
        destination: 'https://villageforher.square.site/s/shop?utm_source=site&utm_medium=redirect&utm_campaign=shop_link',
        permanent: true,
      },
      // TODO: Add specific product/category deep links here when available
      // Example:
      // {
      //   source: '/products/healing-crystal-set',
      //   destination: 'https://villageforher.square.site/s/shop/products/healing-crystal-set',
      //   permanent: true,
      // },
    ];
  },
};

module.exports = nextConfig;
