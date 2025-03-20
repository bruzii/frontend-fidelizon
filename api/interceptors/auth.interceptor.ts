import { AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import apiClient from '../client';
import { tokenManager } from '../../utils/tokenManager';

// URLs qui ne nécessitent pas d'authentification
const publicUrls = [
  '/auth/login',
  '/auth/register',
  '/auth/forgot-password',
  '/auth/reset-password',
  '/auth/refresh-token',
];

// Intercepteur de requête pour ajouter le token d'authentification
const requestInterceptor = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  // Ne pas ajouter le token pour les URLs publiques
  if (config.url && publicUrls.some(url => config.url?.includes(url))) {
    return config;
  }

  const token = tokenManager.getAccessToken();
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
};

// Intercepteur de réponse pour gérer les erreurs d'authentification
const responseInterceptor = async (response: AxiosResponse): Promise<AxiosResponse> => {
  return response;
};

// Intercepteur d'erreur pour gérer les erreurs et rafraîchir le token si nécessaire
const errorInterceptor = async (error: AxiosError): Promise<any> => {
  const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };
  
  // Si nous avons une erreur 401 (Non autorisé) et que nous n'avons pas encore retentée la requête
  if (error.response?.status === 401 && !originalRequest._retry) {
    // Marquer la requête comme retentée
    originalRequest._retry = true;
    
    try {
      // Tenter de rafraîchir le token
      const refreshToken = tokenManager.getRefreshToken();
      
      if (refreshToken) {
        const response = await apiClient.post('/auth/refresh-token', {
          refreshToken,
        });
        
        const { accessToken, refreshToken: newRefreshToken } = response.data;
        
        // Mettre à jour les tokens
        tokenManager.setTokens(accessToken, newRefreshToken);
        
        // Mettre à jour le header d'autorisation pour la requête originale
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        } else {
          originalRequest.headers = { Authorization: `Bearer ${accessToken}` };
        }
        
        // Refaire la requête originale avec le nouveau token
        return apiClient(originalRequest);
      }
    } catch (refreshError) {
      // Si le rafraîchissement échoue, déconnectez l'utilisateur
      tokenManager.clearTokens();
      
      // Rediriger vers la page de connexion si nous sommes dans un navigateur
      if (typeof window !== 'undefined') {
        window.location.href = '/auth/login';
      }
    }
  }
  
  // Gérer les erreurs d'autorisation (403)
  if (error.response?.status === 403) {
    // Rediriger vers une page d'accès refusé ou afficher un message
    console.error('Access denied');
  }
  
  return Promise.reject(error);
};

// Enregistrer les intercepteurs
export const setupAuthInterceptors = (): void => {
  // Enregistrer l'intercepteur de requête
  apiClient.interceptors.request.use(requestInterceptor, error => Promise.reject(error));
  
  // Enregistrer les intercepteurs de réponse et d'erreur
  apiClient.interceptors.response.use(responseInterceptor, errorInterceptor);
}; 