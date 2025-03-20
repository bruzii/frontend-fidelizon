import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';
import { apiRequest } from '@/services/api/client';
import { ApiError, handleApiError } from '@/services/utils/errorHandler';

export type QueryKeyT = [string, Record<string, unknown>?];

/**
 * Hook personnalisé pour les requêtes GET avec mise en cache via React Query
 * @param queryKey Clé unique pour identifier la requête dans le cache
 * @param apiConfig Configuration pour la requête Axios
 * @param options Options supplémentaires pour React Query
 */
export function useApiQuery<TData = unknown>(
  queryKey: QueryKeyT,
  apiConfig: AxiosRequestConfig,
  options?: Omit<UseQueryOptions<TData, ApiError, TData, QueryKeyT>, 'queryKey' | 'queryFn'>
) {
  return useQuery<TData, ApiError, TData, QueryKeyT>({
    queryKey,
    queryFn: async () => {
      try {
        const response = await apiRequest<TData>(apiConfig);
        return response.data;
      } catch (error) {
        throw handleApiError(error);
      }
    },
    ...options,
  });
}

/**
 * Hook personnalisé pour les mutations (POST, PUT, DELETE) via React Query
 * @param mutationKey Clé unique pour identifier la mutation
 * @param apiConfigFn Fonction qui retourne la configuration Axios pour la requête
 * @param options Options supplémentaires pour React Query
 */
export function useApiMutation<TData = unknown, TVariables = unknown>(
  mutationKey: string | string[],
  apiConfigFn: (variables: TVariables) => AxiosRequestConfig,
  options?: Omit<UseMutationOptions<TData, ApiError, TVariables>, 'mutationKey' | 'mutationFn'>
) {
  const mutationKeyArray = Array.isArray(mutationKey) ? mutationKey : [mutationKey];
  
  return useMutation<TData, ApiError, TVariables>({
    mutationKey: mutationKeyArray,
    mutationFn: async (variables: TVariables) => {
      try {
        const config = apiConfigFn(variables);
        const response = await apiRequest<TData>(config);
        return response.data;
      } catch (error) {
        throw handleApiError(error);
      }
    },
    ...options,
  });
}

/**
 * Hook personnalisé pour les requêtes GET infinies (pagination) via React Query
 * @param queryKey Clé unique pour identifier la requête dans le cache
 * @param apiConfigFn Fonction qui retourne la configuration Axios pour la requête en fonction de la page
 * @param options Options supplémentaires pour React Query
 */
export function useApiInfiniteQuery<TData = unknown>(
  queryKey: QueryKeyT,
  apiConfigFn: (pageParam: number) => AxiosRequestConfig,
  options?: Omit<UseQueryOptions<TData, ApiError, TData, QueryKeyT>, 'queryKey' | 'queryFn'>
) {
  return useQuery<TData, ApiError, TData, QueryKeyT>({
    queryKey,
    queryFn: async (context) => {
      const pageParam = context.pageParam || 1;
      
      try {
        const config = apiConfigFn(pageParam);
        const response = await apiRequest<TData>(config);
        return response.data;
      } catch (error) {
        throw handleApiError(error);
      }
    },
    ...options,
  });
} 