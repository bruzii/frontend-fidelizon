'use server';

import { authControllerLogin, LoginDto, partnerControllerRegister } from '@/src/types/api';

export async function loginAction(data: LoginDto) {
  try {
    const response = await authControllerLogin({
      body: data,
    });

    if (!response.data?.accessToken) {
      throw new Error(
        (response.error as any)?.message || 'Une erreur est survenue lors de la connexion'
      );
    }

    return response.data;
  } catch (error) {
    console.error('Login action error:', error);
    throw error;
  }
}
