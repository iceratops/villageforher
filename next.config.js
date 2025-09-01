/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
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
};

module.exports = nextConfig;
