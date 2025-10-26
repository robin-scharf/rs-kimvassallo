import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'automatic-benefit-ed0076f55e.strapiapp.com',
      },
      {
        protocol: 'https',
        hostname: 'automatic-benefit-ed0076f55e.media.strapiapp.com',
      },
      { protocol: 'http', hostname: 'localhost', port: '1337' },
    ],
  },
  experimental: { ppr: false },
}

export default nextConfig
