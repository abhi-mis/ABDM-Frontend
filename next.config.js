const nextConfig = {
  output: 'export',
  trailingSlash: true,  // Ensure correct static file paths
  eslint: { ignoreDuringBuilds: true },
  images: { unoptimized: true, domains: ['upload.wikimedia.org'] },
  reactStrictMode: true,
};

module.exports = nextConfig;
