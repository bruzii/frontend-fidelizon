import { createClient, createConfig } from '@hey-api/client-fetch';
import { ClientOptions } from '@/src/types/api/types.gen';
import { tokenManager } from '@/src/utils/tokenManager';

/**
 * Crée un client API pour les composants serveur
 */
export const clientApi = tokenManager.getAccessToken()
  ? createClient(
      createConfig<ClientOptions>({
        baseUrl: process.env.NEXT_PUBLIC_API_URL,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tokenManager.getAccessToken()}`,
        },
      })
    )
  : null;
