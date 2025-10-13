import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // Required for static export
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.strapiapp.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
      },
    ],
  },
}

export default nextConfig;
