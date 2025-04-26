/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuration pour accepter les sous-domaines en mode développement
  assetPrefix: '',
  images: {
    domains: ['fidelizon-plateform-dev.s3.eu-north-1.amazonaws.com'],
  },
  async headers() {
    return [
      {
        source: '/_next/:path*',
        headers: [{ key: 'Access-Control-Allow-Origin', value: '*' }],
      },
    ];
  },

  crossOrigin: 'anonymous',
  allowedDevOrigins: ['admin.localhost', 'client.localhost'],

  // Configuration des réécritures pour inclure les ressources statiques
  // async rewrites() {
  //   return {
  //     beforeFiles: [
  //       // Réécritures spécifiques pour les assets statiques (à placer avant les autres règles)
  //       {
  //         source: '/_next/:path*',
  //         destination: '/_next/:path*',
  //       },
  //       // Réécritures pour les pages sur sous-domaines
  //       {
  //         source: '/:path*',
  //         has: [{ type: 'host', value: 'admin.localhost' }],
  //         destination: '/admin/:path*',
  //       },
  //       {
  //         source: '/:path*',
  //         has: [{ type: 'host', value: 'client.localhost' }],
  //         destination: '/client/:path*',
  //       },
  //     ],
  //   };
  // },
};

module.exports = nextConfig;
