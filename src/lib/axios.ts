import { client } from '@/src/types/api/client.gen';

client.setConfig({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  throwOnError: true,
});

client.interceptors.request.use(config => {
  const accessToken = localStorage.getItem('ocusAccessToken');
  if (accessToken) {
    config.headers.set('Authorization', `Bearer ${accessToken}`);
  }
  return config;
});
