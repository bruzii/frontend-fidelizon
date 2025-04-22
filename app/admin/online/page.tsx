export default function OnlineProfilePage() {
  return (
    <div className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900">Profile Online</h1>

        {/* Statistiques du profil en ligne */}
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Visites (ce mois)</dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">1,285</dd>
              </dl>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Réservations</dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">72</dd>
              </dl>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Note moyenne</dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">4.7/5</dd>
              </dl>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Avis clients</dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">48</dd>
              </dl>
            </div>
          </div>
        </div>

        {/* Informations du profil */}
        <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Informations de profil
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Détails de présentation public.
              </p>
            </div>
            <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90">
              Modifier
            </button>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Nom de l&apos;établissement</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  Restaurant Saveurs
                </dd>
              </div>
              <div className="bg-white px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Description</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  Restaurant gastronomique proposant une cuisine traditionnelle avec des produits
                  locaux et de saison.
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Adresse</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  23 rue de la Gastronomie, 75001 Paris
                </dd>
              </div>
              <div className="bg-white px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Horaires d&apos;ouverture</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                    <li className="pl-3 pr-4 py-2 flex items-center justify-between text-sm">
                      <div className="w-0 flex-1 flex items-center">
                        <span className="ml-2 flex-1 w-0 truncate">
                          Lundi - Vendredi: 12h00 - 14h30, 19h00 - 22h30
                        </span>
                      </div>
                    </li>
                    <li className="pl-3 pr-4 py-2 flex items-center justify-between text-sm">
                      <div className="w-0 flex-1 flex items-center">
                        <span className="ml-2 flex-1 w-0 truncate">Samedi: 19h00 - 23h00</span>
                      </div>
                    </li>
                    <li className="pl-3 pr-4 py-2 flex items-center justify-between text-sm">
                      <div className="w-0 flex-1 flex items-center">
                        <span className="ml-2 flex-1 w-0 truncate">Dimanche: Fermé</span>
                      </div>
                    </li>
                  </ul>
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Contact</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <p>Téléphone: +33 1 23 45 67 89</p>
                  <p>Email: contact@restaurant-saveurs.fr</p>
                  <p>Site web: www.restaurant-saveurs.fr</p>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Galerie photos */}
        <div className="mt-8">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-medium text-gray-900">Galerie photos</h2>
            <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90">
              Ajouter des photos
            </button>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {[1, 2, 3, 4, 5, 6].map(item => (
              <div key={item} className="relative group">
                <div className="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden">
                  <div className="h-48 bg-gray-200 rounded-lg"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-50 rounded-lg">
                  <button className="text-white px-3 py-1 bg-red-600 rounded-md">Supprimer</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
