import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: '/cv',
  output: 'standalone',
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  assetPrefix: '/cv',
};

export default nextConfig;
