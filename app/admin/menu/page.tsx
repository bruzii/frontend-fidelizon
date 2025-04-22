export default function MenuPage() {
  return (
    <div className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Gestion du Menu</h1>
          <button className="px-4 py-2 bg-primary text-white font-medium rounded-md hover:bg-primary/90">
            Ajouter une catégorie
          </button>
        </div>

        {/* Résumé du menu */}
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Catégories</dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">8</dd>
              </dl>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Produits</dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">42</dd>
              </dl>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Prix moyen</dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">€12.50</dd>
              </dl>
            </div>
          </div>
        </div>

        {/* Catégories de menu */}
        <div className="mt-8 space-y-8">
          {[
            {
              id: 1,
              name: 'Entrées',
              items: [
                {
                  id: 1,
                  name: 'Salade César',
                  price: '€8.50',
                  description: 'Salade romaine, croûtons, parmesan, sauce césar',
                },
                {
                  id: 2,
                  name: 'Bruschetta',
                  price: '€7.00',
                  description: "Pain grillé, tomates, basilic, ail, huile d'olive",
                },
                {
                  id: 3,
                  name: 'Soupe du jour',
                  price: '€6.50',
                  description: 'Veuillez demander au serveur',
                },
              ],
            },
            {
              id: 2,
              name: 'Plats principaux',
              items: [
                {
                  id: 4,
                  name: 'Steak frites',
                  price: '€18.50',
                  description: 'Entrecôte grillée, frites maison, sauce au poivre',
                },
                {
                  id: 5,
                  name: 'Pâtes Carbonara',
                  price: '€14.00',
                  description: 'Spaghetti, pancetta, œuf, parmesan, poivre noir',
                },
              ],
            },
            {
              id: 3,
              name: 'Desserts',
              items: [
                {
                  id: 6,
                  name: 'Tiramisu',
                  price: '€7.50',
                  description: 'Mascarpone, café, cacao, biscuits',
                },
                {
                  id: 7,
                  name: 'Mousse au chocolat',
                  price: '€6.50',
                  description: 'Chocolat noir, œufs, sucre',
                },
              ],
            },
          ].map(category => (
            <div key={category.id} className="bg-white shadow sm:rounded-md overflow-hidden">
              <div className="px-4 py-5 border-b border-gray-200 sm:px-6 flex justify-between items-center">
                <h3 className="text-lg leading-6 font-medium text-gray-900">{category.name}</h3>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-blue-100 text-blue-800 rounded-md text-sm font-medium">
                    Éditer
                  </button>
                  <button className="px-3 py-1 bg-primary/10 text-primary rounded-md text-sm font-medium">
                    + Produit
                  </button>
                </div>
              </div>
              <ul className="divide-y divide-gray-200">
                {category.items.map(item => (
                  <li key={item.id} className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm font-medium text-gray-900">{item.price}</span>
                        <button className="text-sm text-blue-600 hover:text-blue-800">
                          Éditer
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
