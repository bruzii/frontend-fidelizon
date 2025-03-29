import { NextRequest, NextResponse } from 'next/server';

// export function middleware(request: NextRequest) {
//   console.log('--------------------------------');
//   // console.log('🔍 Middleware exécuté!');

//   // const { pathname } = request.nextUrl;
//   // console.log('📍 Pathname:', pathname);

//   // const hostname = request.headers.get('host');
//   // console.log('🌐 Hostname:', hostname);

//   // // Extraire le sous-domaine
//   // const currentHost = hostname?.split(':')[0];
//   // console.log('🏷️ Sous-domaine détecté:', currentHost);

//   // const isAdminApp = currentHost === 'admin.localhost';
//   // const isClientApp = currentHost === 'client.localhost';
//   // const isMainApp = currentHost === 'localhost';
//   // // Vérifier si le chemin a déjà été réécrit pour éviter les boucles
//   // const pathSegments = pathname.split('/').filter(Boolean);
//   // const firstSegment = pathSegments[0];

//   // // URL de base pour les réécritures
//   // const url = request.nextUrl.clone();

//   // // Routes pour le sous-domaine admin
//   // if (isAdminApp && firstSegment !== 'admin') {
//   //   console.log('👨‍💼 Interface Admin détectée');
//   //   const rewriteUrl = new URL(`/admin${pathname}`, request.url);
//   //   console.log('↪️ Réécrit vers:', rewriteUrl.pathname);
//   //   return NextResponse.rewrite(rewriteUrl);
//   // }

//   // // Routes pour le sous-domaine client
//   // if (isClientApp && firstSegment !== 'client') {
//   //   console.log('👥 Interface Client détectée');
//   //   url.pathname = `/client${pathname}`;
//   //   console.log('↪️ Réécrit vers:', url.pathname);
//   //   return NextResponse.rewrite(url, request);
//   // }

//   // if ((isMainApp && firstSegment === 'admin') || firstSegment === 'client') {
//   //   console.log('🏠 Interface principale détectée');
//   //   url.pathname = `${pathname}`;
//   //   console.log('↪️ Réécrit vers:', url.pathname);
//   //   return NextResponse.rewrite(url, request);
//   // }

//   // // console.log('🏠 Interface principale ou déjà réécrite');
//   // // console.log('--------------------------------');

//   // Pour le domaine principal ou les chemins déjà réécrits
//   return NextResponse.next();
// }

export function middleware(request: NextRequest) {
  // Ne traiter que les requêtes non-statiques
  if (request.nextUrl.pathname.startsWith('/_next/')) {
    return NextResponse.next();
  }

  const hostname = request.headers.get('host');

  // if (hostname === 'admin.localhost') {
  //   // Rediriger vers le domaine principal pour les assets
  //   const url = new URL(`/admin${request.nextUrl.pathname}`, 'http://localhost:3000');
  //   return NextResponse.rewrite(url);
  // }

  // if (hostname === 'client.localhost') {
  //   const url = new URL(`/client${request.nextUrl.pathname}`, 'http://localhost:3000');
  //   return NextResponse.rewrite(url);
  // }

  return NextResponse.next();
}
export const config = {
  matcher: [
    // Exclure tous les assets statiques
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
