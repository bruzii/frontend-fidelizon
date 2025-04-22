export default function FidelityPage() {
  return (
    <div className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl font-bold text-gray-900">Programmes de Fidélité</h1>
            <p className="mt-1 text-sm text-gray-500">
              Gérez vos programmes de fidélité pour vos clients
            </p>
          </div>
          <div className="mt-4 flex md:mt-0 md:ml-4">
            <button className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
              Nouveau programme
            </button>
          </div>
        </div>

        {/* Statistiques */}
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Clients fidélisés</dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">245</dd>
              </dl>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Points distribués</dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">12,450</dd>
              </dl>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Récompenses échangées
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">78</dd>
              </dl>
            </div>
          </div>
        </div>

        {/* Programmes actifs */}
        <h2 className="mt-8 text-xl font-medium text-gray-900">Programmes actifs</h2>
        <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {[
              {
                id: 1,
                name: 'Points par achat',
                description: '1 point pour chaque euro dépensé',
                status: 'Actif',
                members: 145,
                type: 'Points',
                color: 'bg-green-100 text-green-800',
              },
              {
                id: 2,
                name: 'Programme VIP',
                description: 'Avantages exclusifs pour les clients premium',
                status: 'Actif',
                members: 32,
                type: 'Niveaux',
                color: 'bg-purple-100 text-purple-800',
              },
              {
                id: 3,
                name: 'Happy Hour',
                description: 'Points doublés pendant les heures creuses',
                status: 'Pause',
                members: 68,
                type: 'Points',
                color: 'bg-yellow-100 text-yellow-800',
              },
            ].map(program => (
              <li key={program.id}>
                <div className="block hover:bg-gray-50">
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <p className="text-sm font-medium text-primary truncate">{program.name}</p>
                        <div className="ml-2 flex-shrink-0 flex">
                          <p
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${program.color}`}
                          >
                            {program.status}
                          </p>
                        </div>
                      </div>
                      <div className="ml-2 flex-shrink-0 flex">
                        <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                          {program.type}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                          {program.description}
                        </p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <p>{program.members} membres</p>
                        <div className="ml-4 flex space-x-2">
                          <button className="text-primary hover:text-primary/80 font-medium">
                            Modifier
                          </button>
                          <span className="text-gray-300">|</span>
                          <button className="text-gray-600 hover:text-gray-800 font-medium">
                            Statistiques
                          </button>
                          <span className="text-gray-300">|</span>
                          <button className="text-red-600 hover:text-red-800 font-medium">
                            Suspendre
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Récompenses disponibles */}
        <h2 className="mt-8 text-xl font-medium text-gray-900">Récompenses disponibles</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              id: 1,
              name: 'Café gratuit',
              points: 50,
              description: 'Un café offert',
              claimedCount: 34,
            },
            {
              id: 2,
              name: 'Dessert offert',
              points: 150,
              description: 'Un dessert au choix offert avec un repas',
              claimedCount: 22,
            },
            {
              id: 3,
              name: 'Remise de 10%',
              points: 200,
              description: "10% de réduction sur l'addition",
              claimedCount: 15,
            },
            {
              id: 4,
              name: 'Menu complet pour 2',
              points: 500,
              description: 'Menu complet pour deux personnes',
              claimedCount: 7,
            },
          ].map(reward => (
            <div key={reward.id} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">{reward.name}</h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-primary/10 text-primary">
                    {reward.points} points
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-500">{reward.description}</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-sm text-gray-500">Échangé {reward.claimedCount} fois</span>
                  <button className="text-sm text-primary hover:text-primary/80 font-medium">
                    Modifier
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
