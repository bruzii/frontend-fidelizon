// app/layout.tsx
'use client';

import { Provider } from 'react-redux';
import store from '@/store';
import { Inter } from 'next/font/google';
import { redirect, usePathname } from 'next/navigation';
import ApiProvider from '@/providers/ApiProvider';
import useAuth from '@/hooks/useAuth';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated && pathname !== '/admin/auth/login' && pathname !== '/admin/auth/register') {
    redirect('/admin/auth/login');
  }

  // Check if the current path is login or register

  const isAuthPage = pathname === '/admin/auth/login' || pathname === '/admin/auth/register';

  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        <Provider store={store}>
          <ApiProvider>
            {isAuthPage ? (
              // For login/register pages, don't show header/footer
              <main>{children}</main>
            ) : (
              // For all other pages, show the standard layout with header/footer
              <div className="min-h-screen bg-gray-100">
                <main className="container mx-auto p-4">{children}</main>

                <footer className="bg-gray-200 p-4 text-center text-gray-600">
                  <div className="container mx-auto">
                    <p>&copy; {new Date().getFullYear()} - Administration</p>
                  </div>
                </footer>
              </div>
            )}
          </ApiProvider>
        </Provider>
      </body>
    </html>
  );
}
