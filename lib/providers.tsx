'use client';

import { PropsWithChildren } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import ReactQueryProvider from './reactquery';
import store from '@/store';
import { initializeInterceptors } from '@/services/api/interceptors';

// Initialiser les intercepteurs Axios
// Nous le faisons ici pour s'assurer qu'ils sont initialisés
// une seule fois au démarrage de l'application
initializeInterceptors();

/**
 * Composant qui combine tous les fournisseurs de l'application
 */
export function Providers({ children }: PropsWithChildren<{}>) {
  return (
    <ReactQueryProvider>
      <ReduxProvider store={store}>
        {children}
      </ReduxProvider>
    </ReactQueryProvider>
  );
}

export default Providers; 