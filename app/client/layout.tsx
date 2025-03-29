'use client';

import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import store from '@/store';

interface ClientLayoutProps {
  children: ReactNode;
}

/**
 * Layout spécifique pour le sous-domaine client
 */
export default function ClientLayout({ children }: ClientLayoutProps) {
  // const router = useRouter();
  // const isDevelopment = process.env.NODE_ENV === 'development';

  // // Fonction pour vérifier si nous sommes sur le bon domaine
  // const checkDomain = () => {
  //   if (typeof window !== 'undefined') {
  //     const hostname = window.location.hostname;
  //     const isLocalhost = hostname.includes('localhost');
  //     const isClientDomain = hostname.startsWith('client.');

  //     // Si nous ne sommes pas sur le bon domaine et qu'il ne s'agit pas de localhost
  //     // en développement, rediriger vers le sous-domaine client
  //     if (!isClientDomain && !isDevelopment) {
  //       const protocol = window.location.protocol;
  //       const port = window.location.port ? `:${window.location.port}` : '';
  //       const path = window.location.pathname;

  //       // Construire l'URL du sous-domaine client
  //       const baseHostname = hostname.split('.').slice(-2).join('.');
  //       const redirectUrl = `${protocol}//client.${baseHostname}${port}${path}`;

  //       window.location.href = redirectUrl;
  //       return false;
  //     }
  //   }
  //   return true;
  // };

  // useEffect(() => {
  //   // Vérifier le domaine lors du chargement initial
  //   const isCorrectDomain = checkDomain();

  //   // Si nous sommes déjà sur le bon domaine, vérifier le chemin
  //   if (isCorrectDomain && typeof window !== 'undefined') {
  //     const pathname = window.location.pathname;

  //     // En développement, s'assurer que nous utilisons les chemins corrects
  //     if (isDevelopment && !pathname.startsWith('/client/') && pathname !== '/client') {
  //       router.push('/client/auth/login');
  //     }
  //   }
  // }, [isDevelopment, router, checkDomain]);

  return (
    <Provider store={store}>
      <div className="client-layout min-h-screen bg-gray-50">
        <header className="bg-indigo-600 text-white p-4">
          <div className="container mx-auto">
            <h1 className="text-2xl font-bold">Espace Client Fidelizon</h1>
          </div>
        </header>
        <main className="container mx-auto p-4">{children}</main>
        <footer className="bg-gray-200 p-4 text-center text-gray-600">
          <div className="container mx-auto">
            <p>&copy; {new Date().getFullYear()} Fidelizon - Espace Client</p>
          </div>
        </footer>
      </div>
    </Provider>
  );
}
