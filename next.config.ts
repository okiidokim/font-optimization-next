import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'postfiles.pstatic.net',
      },
    ],
  },
};

export default nextConfig;
