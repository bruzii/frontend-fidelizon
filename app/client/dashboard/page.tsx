'use client';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { RootState } from '@/store';
import useClientAuth from '@/hooks/useClientAuth';

export default function ClientDashboardPage() {
  const router = useRouter();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.clientAuth);
  const { logout } = useClientAuth();

  useEffect(() => {
    // Redirection si l'utilisateur n'est pas authentifié
    if (!isAuthenticated) {
      router.push('/client/auth/login');
    }
  }, [isAuthenticated, router]);

  // Si pas encore authentifié, afficher un message de chargement
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement en cours...</p>
        </div>
      </div>
    );
  }

  // Extraction du prénom à partir du champ name si disponible
  const firstName = user?.name ? user.name.split(' ')[0] : 'Utilisateur';

  return (
    <div className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden shadow-sm rounded-lg">
          <div className="p-6 bg-white border-b border-gray-200">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900">Tableau de bord client</h1>
              <button
                onClick={() => logout()}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition duration-300"
              >
                Se déconnecter
              </button>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Bienvenue, {firstName} !</h2>
              <p className="text-gray-600">
                Voici un aperçu de votre programme de fidélité et de vos statistiques.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-indigo-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-indigo-800 mb-2">Points accumulés</h3>
                <p className="text-3xl font-bold text-indigo-600">1,250</p>
                <p className="text-sm text-indigo-500 mt-1">+150 ce mois-ci</p>
              </div>

              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-green-800 mb-2">Récompenses disponibles</h3>
                <p className="text-3xl font-bold text-green-600">3</p>
                <p className="text-sm text-green-500 mt-1">Prochain palier: 1,500 points</p>
              </div>

              <div className="bg-yellow-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-yellow-800 mb-2">Statut fidélité</h3>
                <p className="text-3xl font-bold text-yellow-600">Silver</p>
                <p className="text-sm text-yellow-500 mt-1">250 points pour niveau Gold</p>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Activité récente</h3>
              <div className="space-y-4">
                <div className="border-b border-gray-200 pb-4">
                  <p className="text-sm text-gray-600">15 Juin 2023</p>
                  <p className="font-medium">Achat en magasin - 50€</p>
                  <p className="text-green-600">+50 points</p>
                </div>
                <div className="border-b border-gray-200 pb-4">
                  <p className="text-sm text-gray-600">10 Juin 2023</p>
                  <p className="font-medium">Achat en ligne - 120€</p>
                  <p className="text-green-600">+120 points</p>
                </div>
                <div className="pb-4">
                  <p className="text-sm text-gray-600">2 Juin 2023</p>
                  <p className="font-medium">Utilisation récompense</p>
                  <p className="text-red-600">-500 points</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
