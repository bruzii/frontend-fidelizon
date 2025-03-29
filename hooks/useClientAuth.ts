'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/store/hooks';
import { login as loginAction, logout as logoutAction } from '@/store/slices/clientAuthSlice';
import { LoginDto } from '@/types/api';
import { ApiError } from '@/utils/errorHandler';
import { tokenManager } from '@/utils/tokenManager';
import { authControllerLogin } from '@/types/api/sdk.gen';

export type UseClientAuthReturn = {
  isLoggingIn: boolean;
  loginError: ApiError | null;
  isLoggingOut: boolean;
  login: (data: LoginDto) => Promise<void>;
  logout: () => Promise<void>;
};

const useClientAuth = (): UseClientAuthReturn => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState<ApiError | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const login = async (data: LoginDto): Promise<void> => {
    setIsLoggingIn(true);
    setLoginError(null);

    try {
      const response = await authControllerLogin({
        body: {
          email: data.email,
          password: data.password,
        },
      });
      if (!response.error || !response.data) {
        const errorData = response.error || { message: 'Échec de connexion' };
        throw errorData;
      }

      const responseData = response.data;
      const { accessToken, user } = responseData;

      // Stockage du token dans des cookies avec tokenManager
      tokenManager.setTokens(accessToken, accessToken); // Utiliser le même token pour refresh token temporairement

      // Adapter l'objet utilisateur client pour Redux
      const clientUser = {
        id: user.id,
        email: user.email,
        name: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
        role: user.accountType,
      };

      // Mise à jour du state Redux
      dispatch(
        loginAction({
          user: clientUser,
          accessToken,
        })
      );

      // Redirection vers le tableau de bord client
      router.push('/client/dashboard');
    } catch (error) {
      console.error('Erreur de connexion client:', error);
      setLoginError(error as ApiError);
      throw error;
    } finally {
      setIsLoggingIn(false);
    }
  };

  const logout = async (): Promise<void> => {
    setIsLoggingOut(true);

    try {
      // Suppression des tokens avec tokenManager
      tokenManager.clearTokens();

      // Mise à jour du state Redux
      dispatch(logoutAction());

      // Redirection vers la page d'accueil
      router.push('/');
    } catch (error) {
      console.error('Erreur lors de la déconnexion client:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return {
    isLoggingIn,
    loginError,
    isLoggingOut,
    login,
    logout,
  };
};

export default useClientAuth;
