'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';

/**
 * Page de site vitrine pour un restaurant spécifique
 */
export default function RestaurantSite() {
  const params = useParams();
  const slug = params.slug as string;
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold">{slug}</h1>
          <nav className="space-x-4">
            <a href="#menu" className="hover:text-gray-300">Menu</a>
            <a href="#about" className="hover:text-gray-300">À propos</a>
            <a href="#contact" className="hover:text-gray-300">Contact</a>
            <a href="/auth/login" className="px-4 py-2 bg-indigo-600 rounded hover:bg-indigo-700">Connexion</a>
          </nav>
        </div>
      </header>
      <main>
        <section className="py-12 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Bienvenue chez {slug}</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Découvrez notre cuisine exceptionnelle et nos promotions exclusives.
              </p>
              <div className="mt-8">
                <button
                  type="button"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => setLoading(true)}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Chargement...
                    </>
                  ) : (
                    "Découvrir notre menu"
                  )}
                </button>
              </div>
            </div>
          </div>
        </section>
        
        <section id="menu" className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Notre Menu</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Menu items would be populated here */}
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Plat signature</h3>
                  <p className="text-gray-600 mb-4">Description du plat avec ses ingrédients principaux et sa préparation.</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">19,99 €</span>
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Commander</button>
                  </div>
                </div>
              </div>
              {/* Repeat for other menu items */}
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p>© {new Date().getFullYear()} {slug}. Tous droits réservés.</p>
            <p className="mt-2">Propulsé par Fidelizon</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 