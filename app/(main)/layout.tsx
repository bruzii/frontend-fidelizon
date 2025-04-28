'use client';

import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import Link from 'next/link';
import store from '@/src/store';

interface MainLayoutProps {
  children: ReactNode;
}

/**
 * Layout principal pour le site vitrine sans sous-domaine
 */
export default function MainLayout({ children }: MainLayoutProps) {
  //   const router = useRouter();
  //   const isDevelopment = process.env.NODE_ENV === 'development';

  //   // Vérifier que nous sommes sur le domaine principal (sans sous-domaine)
  //   const checkDomain = () => {
  //     if (typeof window !== 'undefined') {
  //       const hostname = window.location.hostname;

  //       // En production, vérifier que nous ne sommes pas sur un sous-domaine
  //       if (!isDevelopment) {
  //         const isSubdomain = hostname.split('.').length > 2;

  //         if (isSubdomain) {
  //           // Si nous sommes sur un sous-domaine, rediriger vers le domaine principal
  //           const protocol = window.location.protocol;
  //           const port = window.location.port ? `:${window.location.port}` : '';
  //           const path = window.location.pathname;

  //           // Obtenir le domaine principal (sans le sous-domaine)
  //           const baseDomain = hostname.split('.').slice(-2).join('.');
  //           const redirectUrl = `${protocol}//${baseDomain}${port}${path}`;

  //           window.location.href = redirectUrl;
  //           return false;
  //         }
  //       }
  //     }
  //     return true;
  //   };

  //   useEffect(() => {
  //     // Vérifier le domaine au chargement initial
  //     const isCorrectDomain = checkDomain();

  //     // Si nous sommes sur le bon domaine, vérifier le chemin
  //     if (isCorrectDomain && typeof window !== 'undefined') {
  //       const pathname = window.location.pathname;

  //       // En développement, s'assurer que les chemins sont corrects
  //       if (isDevelopment) {
  //         // Rediriger les chemins /admin vers le sous-domaine admin
  //         if (pathname.startsWith('/admin/')) {
  //           router.push(pathname);
  //         }

  //         // Rediriger les chemins /client vers le sous-domaine client
  //         if (pathname.startsWith('/client/')) {
  //           router.push(pathname);
  //         }
  //       }
  //     }
  //   }, [isDevelopment, router, checkDomain]);

  return (
    <Provider store={store}>
      <div className="main-layout min-h-screen bg-white">
        <header className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6">
          <div className="container mx-auto">
            <h1 className="text-3xl font-bold">Fidelizon</h1>
            <p className="mt-2">Votre solution de fidélisation de clientèle</p>
          </div>
        </header>
        <main className="container mx-auto p-6">{children}</main>
        <footer className="bg-gray-100 p-6 text-center text-gray-700">
          <div className="container mx-auto">
            <div className="flex justify-center space-x-8 mb-4">
              <a
                href="http://client.localhost:3001"
                className="text-indigo-600 hover:text-indigo-800"
              >
                Espace Client
              </a>
              <a
                href="http://admin.localhost:3001"
                className="text-indigo-600 hover:text-indigo-800"
              >
                Administration
              </a>
            </div>
            <p>&copy; {new Date().getFullYear()} Fidelizon - Tous droits réservés</p>
          </div>
        </footer>
      </div>
    </Provider>
  );
}
