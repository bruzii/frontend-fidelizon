import { AxiosRequestConfig } from 'axios';
import apiClient from '../client';
import { tokenManager } from '../../utils/tokenManager';

// Interfaces pour les requêtes et réponses d'authentification
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
  passwordConfirmation: string;
}

/**
 * Service d'authentification pour gérer les opérations liées à l'auth
 */
export const authService = {
  /**
   * Connecter un utilisateur
   * @param data Données de connexion
   */
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>('/auth/login', data);
    
    // Stocker les tokens
    tokenManager.setTokens(response.data.accessToken, response.data.refreshToken);
    
    return response.data;
  },
  
  /**
   * Déconnecter l'utilisateur
   */
  logout: (): void => {
    tokenManager.clearTokens();
  },
  
  /**
   * Rafraîchir le token d'accès
   * @param refreshToken Token de rafraîchissement
   */
  refreshToken: async (refreshToken: string): Promise<RefreshTokenResponse> => {
    const response = await apiClient.post<RefreshTokenResponse>('/auth/refresh-token', {
      refreshToken,
    });
    
    // Mettre à jour les tokens
    tokenManager.setTokens(response.data.accessToken, response.data.refreshToken);
    
    return response.data;
  },
  
  /**
   * Inscrire un nouvel utilisateur
   * @param data Données d'inscription
   */
  register: async (data: RegisterRequest): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>('/auth/register', data);
    
    // Stocker les tokens si l'inscription connecte automatiquement l'utilisateur
    tokenManager.setTokens(response.data.accessToken, response.data.refreshToken);
    
    return response.data;
  },
  
  /**
   * Demander un email de réinitialisation de mot de passe
   * @param data Données pour la réinitialisation
   */
  forgotPassword: async (data: ForgotPasswordRequest): Promise<void> => {
    await apiClient.post('/auth/forgot-password', data);
  },
  
  /**
   * Réinitialiser le mot de passe avec un token
   * @param data Données pour la réinitialisation
   */
  resetPassword: async (data: ResetPasswordRequest): Promise<void> => {
    await apiClient.post('/auth/reset-password', data);
  },
  
  /**
   * Vérifier si l'utilisateur est authentifié
   */
  isAuthenticated: (): boolean => {
    return tokenManager.isAuthenticated();
  },
  
  /**
   * Récupérer la configuration Axios avec le token d'authentification
   */
  getAuthConfig: (): AxiosRequestConfig => {
    const token = tokenManager.getAccessToken();
    
    if (!token) {
      return {};
    }
    
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  },
};

export default authService; 