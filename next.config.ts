import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: 'standalone',
  basePath: '/admin',
  assetPrefix: '/admin',
  serverExternalPackages: ['dockerode', 'ssh2'],
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'https://zoom2604.dev/admin',
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  turbopack: {},
};

export default nextConfig;
