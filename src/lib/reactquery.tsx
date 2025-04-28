'use client';
import { PropsWithChildren, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Configuration par défaut pour React Query
const defaultQueryClientConfig = {
  defaultOptions: {
    queries: {
      retry: 1, // Nombre d'essais en cas d'erreur
      staleTime: 5 * 60 * 1000, // 5 minutes avant de considérer les données comme obsolètes
      cacheTime: 10 * 60 * 1000, // 10 minutes avant de supprimer les données du cache
      refetchOnWindowFocus: false, // Désactiver le refetch automatique lors du focus de la fenêtre
      refetchOnMount: true, // Refetch lors du montage du composant
    },
    mutations: {
      retry: 0, // Pas de réessai pour les mutations
    },
  },
};

/**
 * Fournisseur React Query pour l'application
 */
export function ReactQueryProvider({ children }: PropsWithChildren<{}>) {
  // Créer une instance de QueryClient par rendu pour éviter les problèmes de partage d'état en SSR
  const [queryClient] = useState(() => new QueryClient(defaultQueryClientConfig));

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

export default ReactQueryProvider;
