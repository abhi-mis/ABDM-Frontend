/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    domains: ['upload.wikimedia.org'], // Add the domain here
  },
  reactStrictMode: true,
};

module.exports = nextConfig;