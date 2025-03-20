import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: ['/((?!api|_next|images|favicon.ico).*)',],
};

// Middleware pour router les requêtes vers les bonnes applications
export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const pathname = url.pathname;
  const hostname = request.headers.get('host') || '';
  const mainDomain = process.env.NEXT_PUBLIC_MAIN_DOMAIN || 'localhost';
  
  // Récupérer le sous-domaine (pour le site vitrine des restaurants)
  const subdomain = hostname.split('.').length > 1 && !hostname.startsWith('www.') 
    ? hostname.split('.')[0] 
    : null;
  
  // Si c'est un sous-domaine restaurant, redirige vers le site vitrine
  if (subdomain && subdomain !== 'admin' && subdomain !== 'app') {
    return NextResponse.rewrite(new URL(`/domain/${subdomain}${pathname}`, request.url));
  }
  
  // Redirections pour les applications spécifiques
  if (hostname.startsWith('admin.') || subdomain === 'admin') {
    return NextResponse.rewrite(new URL(`/admin${pathname}`, request.url));
  }
  
  if (hostname.startsWith('app.') || subdomain === 'app') {
    return NextResponse.rewrite(new URL(`/client${pathname}`, request.url));
  }
  
  // Accès normal au site principal
  return NextResponse.next();
} 