import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    domains: ['imageproxy.web.delivery'],
  },
};

export default nextConfig;
