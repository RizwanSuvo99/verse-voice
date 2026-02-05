/** @type {import('next').NextConfig} */

const nextConfig = {
  trailingSlash: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
  },
  experimental: {
    runtime: 'edge',
  },
};

export default nextConfig;
