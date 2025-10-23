import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '*.strapiapp.com' },
      { protocol: 'http', hostname: 'localhost', port: '1337' },
      {
        protocol: 'https',
        hostname: 'respected-happiness-2f4bbbe5dd.strapiapp.com',
      },
    ],
  },
  experimental: { ppr: false },
}

export default nextConfig
