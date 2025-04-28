/**
 * Gestionnaire de tokens d'authentification
 * Centralise la gestion des tokens pour l'ensemble de l'application
 */

// Clés pour le stockage local des tokens
const AUTH_TOKEN_KEY = 'fidelizon_auth_token';
const REFRESH_TOKEN_KEY = 'fidelizon_refresh_token';
const USER_DATA_KEY = 'fidelizon_user_data';

/**
 * Classe utilitaire pour gérer les tokens d'authentification
 */
class TokenManager {
  /**
   * Récupère le token d'accès
   * @returns Le token d'accès ou null s'il n'existe pas
   */
  getAccessToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(AUTH_TOKEN_KEY);
  }

  /**
   * Récupère le token de rafraîchissement
   * @returns Le token de rafraîchissement ou null s'il n'existe pas
   */
  getRefreshToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  }

  /**
   * Récupère les données utilisateur
   * @returns Les données utilisateur ou null si elles n'existent pas
   */
  getUserData<T = any>(): T | null {
    if (typeof window === 'undefined') return null;

    const userData = localStorage.getItem(USER_DATA_KEY);
    if (!userData) return null;

    try {
      return JSON.parse(userData) as T;
    } catch (error) {
      console.error('Erreur lors de la récupération des données utilisateur:', error);
      return null;
    }
  }

  /**
   * Définit les tokens d'authentification
   * @param accessToken Le token d'accès
   * @param refreshToken Le token de rafraîchissement (optionnel)
   */
  setTokens(accessToken: string, refreshToken?: string): void {
    if (typeof window === 'undefined') return;

    localStorage.setItem(AUTH_TOKEN_KEY, accessToken);
    if (refreshToken) {
      localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    }
  }

  /**
   * Définit les données utilisateur
   * @param userData Les données utilisateur à stocker
   */
  setUserData<T>(userData: T): void {
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
    } catch (error) {
      console.error('Erreur lors du stockage des données utilisateur:', error);
    }
  }

  /**
   * Supprime tous les tokens et données d'authentification
   */
  clearTokens(): void {
    if (typeof window === 'undefined') return;

    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_DATA_KEY);
  }

  /**
   * Vérifie si l'utilisateur est authentifié (a un token d'accès)
   * @returns true si l'utilisateur est authentifié, false sinon
   */
  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }
}

// Exporter une instance unique
export const tokenManager = new TokenManager();

export default tokenManager;
