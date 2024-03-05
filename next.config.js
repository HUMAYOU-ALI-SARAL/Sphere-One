/** @type {import('next').NextConfig} */

const path = require('path');
const { i18n } = require('./next-i18next.config');

const nextConfig = {
  i18n,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.beejee.org',
      },
      {
        protocol: 'https',
        hostname: '**.hgraph.app',
      },
      {
        protocol: 'https',
        hostname: 'ipfs.io',
      },
    ],
  },
  transpilePackages: ['@bladelabs/blade-web3.js'],
  experimental: {
    ...(process.env.NODE_ENV === 'development'
      ? { outputFileTracingRoot: path.join(__dirname, '../') }
      : null),
  },
  distDir: 'dist',
  output: 'standalone',
};

module.exports = nextConfig;
