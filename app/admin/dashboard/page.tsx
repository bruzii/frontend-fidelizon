'use client';

import { useState } from 'react';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalClients: 124,
    activePrograms: 23,
    monthlyRevenue: 45780,
  });

  return (
    <div className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900">Tableau de bord administrateur</h1>

        {/* Statistiques */}
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Total des clients</dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">{stats.totalClients}</dd>
              </dl>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Programmes actifs</dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">
                  {stats.activePrograms}
                </dd>
              </dl>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Revenu mensuel (€)</dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">
                  {stats.monthlyRevenue.toLocaleString()}
                </dd>
              </dl>
            </div>
          </div>
        </div>

        {/* Liste des dernières activités */}
        <h2 className="mt-8 text-xl font-medium text-gray-900">Activité récente</h2>
        <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {[
              {
                id: 1,
                client: 'Café du Centre',
                action: 'A créé un nouveau programme',
                date: 'Il y a 2 heures',
              },
              {
                id: 2,
                client: 'Librairie Pages',
                action: 'A modifié les paramètres',
                date: 'Il y a 3 heures',
              },
              {
                id: 3,
                client: 'Restaurant Saveurs',
                action: 'A ajouté une nouvelle récompense',
                date: 'Il y a 5 heures',
              },
              {
                id: 4,
                client: 'Boutique Mode',
                action: "S'est inscrit sur la plateforme",
                date: 'Il y a 1 jour',
              },
              {
                id: 5,
                client: 'Salon Beauté',
                action: 'A lancé une campagne',
                date: 'Il y a 1 jour',
              },
            ].map(activity => (
              <li key={activity.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-indigo-600 truncate">
                      {activity.client}
                    </p>
                    <div className="ml-2 flex-shrink-0 flex">
                      <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {activity.date}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">{activity.action}</p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
