/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com', 'images.unsplash.com'],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000'],
    },
  },
  async rewrites() {
    return [
      // Redirection pour l'application d'administration
      {
        source: '/admin/:path*',
        destination: '/app/admin/:path*',
      },
      // Redirection pour l'application client
      {
        source: '/app/:path*',
        destination: '/app/client/:path*',
      },
    ];
  },
  // Permet de configurer les domaines pour le site vitrine
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'x-custom-header',
            value: 'my custom header value',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig; 