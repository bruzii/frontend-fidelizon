import { useState, useCallback } from 'react';
import { AxiosRequestConfig } from 'axios';
import { apiRequest, ApiResponse } from '@/services/api/client';
import { ApiError, handleApiError } from '@/services/utils/errorHandler';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: ApiError | null;
}

interface UseApiResult<T> extends UseApiState<T> {
  execute: (config?: AxiosRequestConfig) => Promise<ApiResponse<T> | null>;
  reset: () => void;
}

/**
 * Hook personnalisé pour effectuer des appels API avec gestion d'état et d'erreurs
 * @param defaultConfig Configuration Axios par défaut pour l'appel API
 */
export const useApi = <T = any>(
  defaultConfig?: AxiosRequestConfig
): UseApiResult<T> => {
  // État local pour les données, le chargement et les erreurs
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  // Fonction pour réinitialiser l'état
  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
    });
  }, []);

  // Fonction pour exécuter la requête API
  const execute = useCallback(
    async (config?: AxiosRequestConfig): Promise<ApiResponse<T> | null> => {
      try {
        // Mettre à jour l'état pour indiquer que le chargement a commencé
        setState(prev => ({ ...prev, loading: true, error: null }));

        // Fusionner la configuration par défaut avec la configuration fournie
        const mergedConfig = { ...defaultConfig, ...config };

        // Effectuer la requête API
        const response = await apiRequest<T>(mergedConfig);

        // Mettre à jour l'état avec les données reçues
        setState({
          data: response.data,
          loading: false,
          error: null,
        });

        return response;
      } catch (error) {
        // Gérer l'erreur et mettre à jour l'état
        const apiError = handleApiError(error);
        setState({
          data: null,
          loading: false,
          error: apiError,
        });
        return null;
      }
    },
    [defaultConfig]
  );

  return {
    ...state,
    execute,
    reset,
  };
};

export default useApi; 