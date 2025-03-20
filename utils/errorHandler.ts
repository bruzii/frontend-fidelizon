import { AxiosError } from 'axios';

// Interface pour les erreurs API
export interface ApiError {
  status: number;
  message: string;
  details?: Record<string, string[]>;
  raw?: unknown;
}

// Fonction pour normaliser les erreurs de l'API
export const handleApiError = (error: unknown): ApiError => {
  // Erreur Axios
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<any>;
    
    // Erreur de validation API avec détails
    if (axiosError.response?.status === 400 && axiosError.response?.data?.errors) {
      return {
        status: 400,
        message: 'Erreur de validation',
        details: axiosError.response.data.errors,
        raw: axiosError,
      };
    }
    
    // Erreur d'authentification
    if (axiosError.response?.status === 401) {
      return {
        status: 401,
        message: 'Accès non autorisé, veuillez vous connecter',
        raw: axiosError,
      };
    }
    
    // Erreur d'autorisation
    if (axiosError.response?.status === 403) {
      return {
        status: 403,
        message: 'Vous n\'avez pas les permissions nécessaires',
        raw: axiosError,
      };
    }
    
    // Erreur de ressource non trouvée
    if (axiosError.response?.status === 404) {
      return {
        status: 404,
        message: 'Ressource non trouvée',
        raw: axiosError,
      };
    }
    
    // Erreur du serveur
    if (axiosError.response?.status && axiosError.response.status >= 500) {
      return {
        status: axiosError.response.status,
        message: 'Erreur serveur, veuillez réessayer ultérieurement',
        raw: axiosError,
      };
    }
    
    // Autres erreurs Axios avec réponse
    if (axiosError.response) {
      return {
        status: axiosError.response.status,
        message: axiosError.response.data?.message || axiosError.message,
        raw: axiosError,
      };
    }
    
    // Erreurs sans réponse (problème réseau, timeout, etc.)
    return {
      status: 0,
      message: 'Problème de connexion au serveur',
      raw: axiosError,
    };
  }
  
  // Erreurs non-Axios (erreurs génériques)
  return {
    status: 500,
    message: error instanceof Error ? error.message : 'Une erreur inconnue est survenue',
    raw: error,
  };
};

// Helper pour vérifier si l'erreur est une erreur Axios
const axios = {
  isAxiosError: (error: unknown): error is AxiosError => {
    return (error as AxiosError).isAxiosError === true;
  },
}; 