import tokenManager from '@/utils/tokenManager';
import { Client, ClientOptions, createClient, createConfig } from '@hey-api/client-fetch';
import { useEffect, useState } from 'react';

export const useClientApi = () => {
  const [clientApi, setClientApi] = useState<Client | null>(null);
  const token = tokenManager.getAccessToken();

  useEffect(() => {
    const clientApi = createClient(
      createConfig<ClientOptions>({
        baseUrl: process.env.NEXT_PUBLIC_API_URL,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tokenManager.getAccessToken()}`,
        },
      })
    );
    setClientApi(clientApi);
  }, [token]);

  return clientApi;
};
