'use client';

import { useState } from 'react';

/**
 * Page principale de l'application admin
 */
export default function AdminApp() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen bg-destructive">
      <header className="bg-accent shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-secondary-foreground">Administrations</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-tertiary-border rounded-lg h-96 p-8 flex flex-col items-center justify-center">
              <h2 className="text-2xl font-medium text-secondary-foreground mb-4">
                Interface d&apos;administration
              </h2>
              <p className="text-muted-foreground mb-8 text-center">
                Cette interface vous permettra de gérer l&apos;ensemble des restaurants et des
                utilisateurs de la plateforme.
              </p>
              <div className="flex space-x-4">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-tertiary"
                  onClick={() => setLoading(true)}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Chargement...
                    </>
                  ) : (
                    'Gérer les restaurants'
                  )}
                </button>
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-tertiary text-sm font-medium rounded-md text-secondary bg-tertiary hover:bg-tertiary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-tertiary"
                >
                  Gérer les utilisateurs
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
