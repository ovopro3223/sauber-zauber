/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error'] } : false,
  },
  experimental: {
    optimizePackageImports: ['framer-motion'],
  },
  async rewrites() {
    return [
      // Serve the standalone Anfrage form (public/anfrage.html) at a clean URL
      { source: '/anfrage', destination: '/anfrage.html' },
    ];
  },
};

export default nextConfig;
