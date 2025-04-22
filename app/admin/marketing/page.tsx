export default function MarketingPage() {
  return (
    <div className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl font-bold text-gray-900">Marketing</h1>
            <p className="mt-1 text-sm text-gray-500">
              Gérez vos campagnes et communications marketing
            </p>
          </div>
          <div className="mt-4 flex md:mt-0 md:ml-4">
            <button className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
              Nouvelle campagne
            </button>
          </div>
        </div>

        {/* Statistiques */}
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Emails envoyés</dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">1,245</dd>
              </dl>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Taux d&apos;ouverture
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">35.7%</dd>
              </dl>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Taux de clic</dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">12.3%</dd>
              </dl>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Conversions</dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">89</dd>
              </dl>
            </div>
          </div>
        </div>

        {/* Campagnes actives */}
        <h2 className="mt-8 text-xl font-medium text-gray-900">Campagnes actives</h2>
        <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {[
              {
                id: 1,
                name: 'Promotion de printemps',
                type: 'Email',
                status: 'En cours',
                sent: 450,
                openRate: '38%',
                date: '15/03/2023',
                color: 'bg-green-100 text-green-800',
              },
              {
                id: 2,
                name: 'Happy Hour du jeudi',
                type: 'SMS',
                status: 'Planifiée',
                sent: 0,
                openRate: '-',
                date: '25/03/2023',
                color: 'bg-blue-100 text-blue-800',
              },
              {
                id: 3,
                name: 'Fidélisation clients inactifs',
                type: 'Email',
                status: 'Terminée',
                sent: 320,
                openRate: '28%',
                date: '01/02/2023',
                color: 'bg-gray-100 text-gray-800',
              },
            ].map(campaign => (
              <li key={campaign.id}>
                <div className="block hover:bg-gray-50">
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <p className="text-sm font-medium text-primary truncate">{campaign.name}</p>
                        <div className="ml-2 flex-shrink-0 flex">
                          <p
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${campaign.color}`}
                          >
                            {campaign.status}
                          </p>
                        </div>
                      </div>
                      <div className="ml-2 flex-shrink-0 flex">
                        <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                          {campaign.type}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                          Date: {campaign.date}
                        </p>
                        <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                          Envois: {campaign.sent}
                        </p>
                        <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                          Taux d&apos;ouverture: {campaign.openRate}
                        </p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <div className="flex space-x-2">
                          <button className="text-primary hover:text-primary/80 font-medium">
                            Détails
                          </button>
                          <span className="text-gray-300">|</span>
                          <button className="text-gray-600 hover:text-gray-800 font-medium">
                            Dupliquer
                          </button>
                          {campaign.status !== 'Terminée' && (
                            <>
                              <span className="text-gray-300">|</span>
                              <button className="text-red-600 hover:text-red-800 font-medium">
                                Annuler
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Templates d'email */}
        <h2 className="mt-8 text-xl font-medium text-gray-900">Templates d&apos;email</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              id: 1,
              name: 'Bienvenue',
              description: 'Email de bienvenue pour les nouveaux clients',
              lastEdited: '12/03/2023',
            },
            {
              id: 2,
              name: 'Offre spéciale',
              description: 'Promotion avec code de réduction',
              lastEdited: '25/02/2023',
            },
            {
              id: 3,
              name: 'Rappel de réservation',
              description: 'Confirmation de réservation avec détails',
              lastEdited: '05/03/2023',
            },
            {
              id: 4,
              name: 'Newsletter mensuelle',
              description: 'Mise à jour mensuelle avec événements et promotions',
              lastEdited: '01/03/2023',
            },
          ].map(template => (
            <div key={template.id} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">{template.name}</h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                    Template
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-500">{template.description}</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-xs text-gray-500">Modifié le: {template.lastEdited}</span>
                  <div className="flex space-x-2">
                    <button className="text-sm text-primary hover:text-primary/80 font-medium">
                      Modifier
                    </button>
                    <button className="text-sm text-green-600 hover:text-green-800 font-medium">
                      Utiliser
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="bg-gray-50 overflow-hidden shadow rounded-lg border-2 border-dashed border-gray-300">
            <div className="px-4 py-5 sm:p-6 flex flex-col items-center justify-center h-full">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              <span className="mt-2 block text-sm font-medium text-gray-900">
                Créer un nouveau template
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
