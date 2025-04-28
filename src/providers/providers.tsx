'use client';

import { PropsWithChildren } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import ReactQueryProvider from './reactquery';
import store from '@/src/store';

/**
 * Composant qui combine tous les fournisseurs de l'application
 */
export function Providers({ children }: PropsWithChildren<{}>) {
  return (
    <ReactQueryProvider>
      <ReduxProvider store={store}>{children}</ReduxProvider>
    </ReactQueryProvider>
  );
}

export default Providers;
