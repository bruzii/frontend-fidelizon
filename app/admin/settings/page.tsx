'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = () => {
    setIsLoading(true);
    // Simuler un appel API
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <div className="py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Configurações</h1>
          <p className="mt-2 text-lg text-gray-600">
            Gérez les paramètres de votre compte et de votre entreprise
          </p>
        </div>

        <div className="mt-8">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="profile">Profil</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="security">Sécurité</TabsTrigger>
              <TabsTrigger value="billing">Facturation</TabsTrigger>
              <TabsTrigger value="api">API</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Informations du profil</CardTitle>
                  <CardDescription>
                    Mettez à jour les informations de votre profil et de votre entreprise
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nom de l&apos;entreprise</Label>
                      <Input id="name" defaultValue="Fidelizon Beauty Salon" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue="contact@fidelizon.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Téléphone</Label>
                        <Input id="phone" defaultValue="+33 1 23 45 67 89" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Adresse</Label>
                      <Input id="address" defaultValue="123 Rue de la Fidélité" />
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">Ville</Label>
                        <Input id="city" defaultValue="Paris" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zipcode">Code postal</Label>
                        <Input id="zipcode" defaultValue="75000" />
                      </div>
                      <div className="space-y-2 col-span-2">
                        <Label htmlFor="country">Pays</Label>
                        <Select defaultValue="france">
                          <SelectTrigger id="country">
                            <SelectValue placeholder="Sélectionnez un pays" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="france">France</SelectItem>
                            <SelectItem value="belgium">Belgique</SelectItem>
                            <SelectItem value="switzerland">Suisse</SelectItem>
                            <SelectItem value="canada">Canada</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="logo">Logo de l&apos;entreprise</Label>
                    <div className="flex items-center gap-4">
                      <div className="h-20 w-20 rounded-md bg-gray-100 flex items-center justify-center text-gray-500">
                        <svg
                          className="h-10 w-10"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <Button variant="outline">Changer</Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleSave} disabled={isLoading}>
                    {isLoading ? 'Enregistrement...' : 'Enregistrer les modifications'}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Préférences de notification</CardTitle>
                  <CardDescription>
                    Configurez comment et quand vous souhaitez être notifié
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Notifications par email</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="marketing-emails" className="text-base">
                            Emails marketing
                          </Label>
                          <p className="text-sm text-gray-500">
                            Recevez des conseils et des mises à jour sur nos fonctionnalités
                          </p>
                        </div>
                        <Switch id="marketing-emails" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="product-updates" className="text-base">
                            Mises à jour du produit
                          </Label>
                          <p className="text-sm text-gray-500">
                            Soyez informé des nouvelles fonctionnalités et améliorations
                          </p>
                        </div>
                        <Switch id="product-updates" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="client-activity" className="text-base">
                            Activité des clients
                          </Label>
                          <p className="text-sm text-gray-500">
                            Notifications d&apos;inscription de nouveaux clients
                          </p>
                        </div>
                        <Switch id="client-activity" defaultChecked />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Fréquence des rapports</h3>
                    <div className="space-y-2">
                      <Label htmlFor="reports-frequency">Rapports d&apos;activité</Label>
                      <Select defaultValue="weekly">
                        <SelectTrigger id="reports-frequency">
                          <SelectValue placeholder="Sélectionnez une fréquence" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Quotidien</SelectItem>
                          <SelectItem value="weekly">Hebdomadaire</SelectItem>
                          <SelectItem value="monthly">Mensuel</SelectItem>
                          <SelectItem value="never">Jamais</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleSave} disabled={isLoading}>
                    {isLoading ? 'Enregistrement...' : 'Enregistrer les préférences'}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Sécurité</CardTitle>
                  <CardDescription>
                    Gérez votre mot de passe et les paramètres de sécurité
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Changer le mot de passe</h3>
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Mot de passe actuel</Label>
                        <Input id="current-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password">Nouveau mot de passe</Label>
                        <Input id="new-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirmer le mot de passe</Label>
                        <Input id="confirm-password" type="password" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Authentification à deux facteurs</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="2fa" className="text-base">
                          Activer l&apos;authentification à deux facteurs
                        </Label>
                        <p className="text-sm text-gray-500">
                          Ajoutez une couche de sécurité supplémentaire à votre compte
                        </p>
                      </div>
                      <Switch id="2fa" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Sessions actives</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-3 border-b">
                        <div>
                          <p className="font-medium">Chrome sur MacOS</p>
                          <p className="text-sm text-gray-500">Paris, France • Actif maintenant</p>
                        </div>
                        <Button variant="outline" size="sm">
                          Se déconnecter
                        </Button>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b">
                        <div>
                          <p className="font-medium">Safari sur iPhone</p>
                          <p className="text-sm text-gray-500">
                            Lyon, France • Dernière activité: il y a 2 heures
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          Se déconnecter
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleSave} disabled={isLoading}>
                    {isLoading ? 'Enregistrement...' : 'Mettre à jour la sécurité'}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="billing" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Facturation</CardTitle>
                  <CardDescription>
                    Gérez votre plan d&apos;abonnement et vos méthodes de paiement
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Plan actuel</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-lg">Plan Pro</p>
                          <p className="text-sm text-gray-500">29€/mois • Facturé annuellement</p>
                          <p className="text-sm text-primary mt-1">
                            Prochain renouvellement: 15 juillet 2024
                          </p>
                        </div>
                        <Button variant="outline">Changer de plan</Button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Méthode de paiement</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className="bg-gray-200 p-2 rounded">
                            <svg
                              className="h-6 w-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                              />
                            </svg>
                          </div>
                          <div>
                            <p className="font-medium">Visa se terminant par 4242</p>
                            <p className="text-sm text-gray-500">Expire le 12/2025</p>
                          </div>
                        </div>
                        <Button variant="outline">Modifier</Button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium">Historique des factures</h3>
                      <Button variant="outline" size="sm">
                        Télécharger toutes
                      </Button>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-3 border-b">
                        <div>
                          <p className="font-medium">Juin 2023</p>
                          <p className="text-sm text-gray-500">Plan Pro • 348€</p>
                        </div>
                        <Button variant="ghost" size="sm">
                          Télécharger
                        </Button>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b">
                        <div>
                          <p className="font-medium">Mai 2023</p>
                          <p className="text-sm text-gray-500">Plan Pro • 348€</p>
                        </div>
                        <Button variant="ghost" size="sm">
                          Télécharger
                        </Button>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b">
                        <div>
                          <p className="font-medium">Avril 2023</p>
                          <p className="text-sm text-gray-500">Plan Pro • 348€</p>
                        </div>
                        <Button variant="ghost" size="sm">
                          Télécharger
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-gray-500">
                    Des questions sur votre facturation?{' '}
                    <a href="#" className="text-primary hover:underline">
                      Contactez notre équipe
                    </a>
                  </p>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="api" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Clés API</CardTitle>
                  <CardDescription>
                    Gérez vos clés API pour intégrer Fidelizon à vos systèmes existants
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">Vos clés API</h3>
                      <Button>Générer une nouvelle clé</Button>
                    </div>

                    <div className="space-y-3">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">Clé de production</p>
                            <p className="text-sm text-gray-500">Créée le 10 mai 2023</p>
                            <div className="mt-2 flex items-center">
                              <Input
                                value="sk_live_••••••••••••••••••••••••••••••"
                                readOnly
                                className="w-96 bg-gray-100"
                              />
                              <Button variant="ghost" size="sm" className="ml-2">
                                <svg
                                  className="h-4 w-4"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                  />
                                </svg>
                              </Button>
                            </div>
                          </div>
                          <Button variant="destructive">Révoquer</Button>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">Clé de test</p>
                            <p className="text-sm text-gray-500">Créée le 10 mai 2023</p>
                            <div className="mt-2 flex items-center">
                              <Input
                                value="sk_test_••••••••••••••••••••••••••••••"
                                readOnly
                                className="w-96 bg-gray-100"
                              />
                              <Button variant="ghost" size="sm" className="ml-2">
                                <svg
                                  className="h-4 w-4"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                  />
                                </svg>
                              </Button>
                            </div>
                          </div>
                          <Button variant="destructive">Révoquer</Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-lg font-medium">Documentation</h3>
                    <p className="text-gray-600">
                      Consultez notre documentation pour en savoir plus sur l&apos;utilisation de
                      notre API pour intégrer les fonctionnalités de Fidelizon à vos systèmes
                      existants.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <Button variant="outline">Guide de démarrage</Button>
                      <Button variant="outline">Référence API</Button>
                      <Button variant="outline">Exemples d&apos;intégration</Button>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg mt-6">
                    <div className="flex items-start gap-4">
                      <svg
                        className="h-6 w-6 text-yellow-500 mt-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                      </svg>
                      <div>
                        <h4 className="font-medium">Important</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Protégez vos clés API et ne les partagez jamais publiquement. Si vous
                          pensez qu&apos;une clé a été compromise, révoquez-la immédiatement et
                          générez-en une nouvelle.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
