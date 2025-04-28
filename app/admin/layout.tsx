'use client';

import { Provider } from 'react-redux';
import store from '@/src/store';
import { Inter } from 'next/font/google';
import { redirect, usePathname } from 'next/navigation';
import ApiProvider from '@/src/providers/ApiProvider';
import useAuth from '@/src/hooks/useAuth';
import Sidebar from './_components/sidebar';
import { useEffect, useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isAuthPage, setIsAuthPage] = useState(true);
  const { isAuthenticated, isLoading } = useAuth();

  // if (
  //   !isLoading &&
  //   !isAuthenticated &&
  //   pathname !== '/admin/auth/login' &&
  //   pathname !== '/admin/auth/register'
  // ) {
  //   redirect('/admin/auth/login');
  // }

  useEffect(() => {
    setIsAuthPage(
      pathname === '/admin/auth/login' || pathname === '/admin/auth/register' || !isAuthenticated
    );
  }, [pathname, isAuthenticated]);

  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        <Provider store={store}>
          <ApiProvider>
            {isAuthPage ? (
              <main>{children}</main>
            ) : (
              <div className="flex  min-h-screen bg-background">
                <Sidebar />
                <main className="container mx-auto p-4">{children}</main>
              </div>
            )}
          </ApiProvider>
        </Provider>
      </body>
    </html>
  );
}
