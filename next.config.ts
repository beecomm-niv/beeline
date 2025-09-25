import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    domains: ['tse2.mm.bing.net'],
  },
};

export default nextConfig;
