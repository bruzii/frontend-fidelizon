export default function ClientsPage() {
  return (
    <div className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900">Dados Clientes</h1>

        {/* Statistiques de clients */}
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Clients actifs</dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">358</dd>
              </dl>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Nouveaux clients (ce mois)
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">42</dd>
              </dl>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Taux de fidélité</dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">68%</dd>
              </dl>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">LTV moyen</dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">€89</dd>
              </dl>
            </div>
          </div>
        </div>

        {/* Tableau de clients */}
        <div className="mt-8">
          <h2 className="text-xl font-medium text-gray-900">Liste des clients</h2>
          <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-md">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Nome
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Téléphone
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Date d&apos;inscription
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Statut
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[
                  {
                    id: 1,
                    name: 'João Silva',
                    email: 'joao@example.com',
                    phone: '+351 912 345 678',
                    date: '12/03/2023',
                    status: 'Actif',
                  },
                  {
                    id: 2,
                    name: 'Maria Santos',
                    email: 'maria@example.com',
                    phone: '+351 923 456 789',
                    date: '15/04/2023',
                    status: 'Actif',
                  },
                  {
                    id: 3,
                    name: 'António Ferreira',
                    email: 'antonio@example.com',
                    phone: '+351 934 567 890',
                    date: '20/05/2023',
                    status: 'Inactif',
                  },
                  {
                    id: 4,
                    name: 'Sofia Costa',
                    email: 'sofia@example.com',
                    phone: '+351 945 678 901',
                    date: '05/06/2023',
                    status: 'Actif',
                  },
                  {
                    id: 5,
                    name: 'Pedro Almeida',
                    email: 'pedro@example.com',
                    phone: '+351 956 789 012',
                    date: '18/07/2023',
                    status: 'Actif',
                  },
                ].map(client => (
                  <tr key={client.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {client.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {client.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {client.phone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {client.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${client.status === 'Actif' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                      >
                        {client.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
