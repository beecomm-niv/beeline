import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'imageproxy.web.delivery',
        pathname: '/web/**',
      },
    ],
  },
};

export default nextConfig;
