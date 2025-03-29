'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Fidélisez vos clients comme jamais auparavant
              </h1>
              <p className="text-xl mb-8">
                Fidelizon est la plateforme tout-en-un qui vous aide à créer, gérer et optimiser
                votre programme de fidélité client.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  href="http://client.localhost:3001/auth/login"
                  className="bg-white text-indigo-600 font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-gray-100 transition duration-200"
                >
                  Espace Client
                </Link>
                <Link
                  href="http://admin.localhost:3001/auth/login"
                  className="bg-indigo-800 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-indigo-900 transition duration-200"
                >
                  Espace Admin
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <Image
                src="/images/hero-image.png"
                alt="Fidelizon - Plateforme de fidélité client"
                width={600}
                height={400}
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Tout ce dont vous avez besoin pour fidéliser vos clients
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition duration-200">
              <div className="bg-blue-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Programmes personnalisés</h3>
              <p className="text-gray-600">
                Créez des programmes de fidélité sur mesure qui correspondent parfaitement à votre
                marque et à vos objectifs commerciaux.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition duration-200">
              <div className="bg-green-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Analyses détaillées</h3>
              <p className="text-gray-600">
                Suivez les performances de vos programmes et obtenez des insights précieux pour
                optimiser vos stratégies de fidélisation.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition duration-200">
              <div className="bg-purple-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-purple-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Intégration facile</h3>
              <p className="text-gray-600">
                Intégrez Fidelizon à vos systèmes existants en quelques clics, sans perturber vos
                opérations quotidiennes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-indigo-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Prêt à révolutionner votre stratégie de fidélisation ?
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto">
            Rejoignez des milliers d&apos;entreprises qui ont déjà transformé leur relation client
            avec Fidelizon.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              href="http://client.localhost:3001/auth/register"
              className="bg-white text-indigo-600 font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-gray-100 transition duration-200"
            >
              Créer un compte
            </Link>
            <Link
              href="#contact"
              className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-lg hover:bg-white hover:text-indigo-600 transition duration-200"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
