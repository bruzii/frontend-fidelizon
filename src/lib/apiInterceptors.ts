/**
 * Utilitaire pour ajouter des intercepteurs à notre client API
 * Les intercepteurs permettent de modifier les requêtes et réponses automatiquement
 */

import { client } from '@/src/types/api/client.gen';
import { tokenManager } from './tokenManager';

/**
 * Configure l'intercepteur d'authentification pour ajouter automatiquement
 * le token d'accès à l'en-tête Authorization de chaque requête
 */
export const setupAuthInterceptor = () => {
  // Ajouter l'intercepteur de requête
  client.interceptors.request.use(async request => {
    // Ne pas ajouter de token sur le serveur
    if (typeof window === 'undefined') {
      return request;
    }
    // Ne pas ajouter de token pour les endpoints d'authentification
    const authEndpoints = ['/auth/login'];
    const url = new URL(request.url);
    if (authEndpoints.some(endpoint => url.pathname.endsWith(endpoint))) {
      return request;
    }

    // Récupérer le token depuis le gestionnaire de token
    const token = tokenManager.getAccessToken();
    if (token) {
      // Cloner les en-têtes pour éviter de modifier la requête originale
      const headers = new Headers(request.headers);
      headers.set('Authorization', `Bearer ${token}`);

      // Créer une nouvelle requête avec les en-têtes mis à jour
      return new Request(request, {
        headers,
      });
    }

    return request;
  });
};

/**
 * Ajoute un gestionnaire global qui surveille les réponses HTTP 401
 * et redirige l'utilisateur vers la page de connexion en cas d'expiration du token
 */
export const setupAuthErrorHandling = () => {
  if (typeof window !== 'undefined') {
    // Remplacer la méthode fetch du navigateur pour surveiller les erreurs 401
    const originalFetch = window.fetch;

    window.fetch = async function (input, init) {
      // Appeler la méthode fetch originale
      const response = await originalFetch(input, init);

      // Vérifier si la réponse est un 401 Unauthorized
      if (response.status === 401) {
        console.warn('Unauthorized: Authentication token expired or invalid');
        tokenManager.clearTokens();

        // Si ce n'est pas déjà la page de login, rediriger
        if (!window.location.pathname.includes('/auth/login')) {
          window.location.href = '/admin/auth/login';
        }
      }

      return response;
    };
  }
};

/**
 * Configure tous les intercepteurs API
 */
export const setupApiInterceptors = () => {
  setupAuthInterceptor();
  setupAuthErrorHandling();
};

export default setupApiInterceptors;
