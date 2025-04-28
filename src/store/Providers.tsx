'use client';

import { PropsWithChildren, useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import store from '@/src/store';
import { initializeFromStorage } from './slices/establishmentsSlice';

/**
 * Global providers wrapper component
 * Used to wrap the entire application with necessary providers
 */
export default function Providers({ children }: PropsWithChildren) {
  // Crée une nouvelle instance QueryClient qui ne sera pas partagée entre les requêtes
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            retry: 1,
          },
        },
      })
  );

  // Initialiser les données persistantes
  useEffect(() => {
    // Charger les préférences d'établissement depuis localStorage
    store.dispatch(initializeFromStorage());
  }, []);

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </Provider>
  );
}
