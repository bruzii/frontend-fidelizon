'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/store/hooks';
import { login as loginAction, logout as logoutAction } from '@/store/slices/adminAuthSlice';
import { LoginDto } from '@/types/api';
import { ApiError } from '@/utils/errorHandler';
import { tokenManager } from '@/utils/tokenManager';
import { authControllerLogin } from '@/types/api/sdk.gen';

export type UseAdminAuthReturn = {
  isLoggingIn: boolean;
  loginError: ApiError | null;
  isLoggingOut: boolean;
  login: (data: LoginDto) => Promise<void>;
  logout: () => Promise<void>;
};

const useAdminAuth = (): UseAdminAuthReturn => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState<ApiError | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const login = async (data: LoginDto): Promise<void> => {
    setIsLoggingIn(true);
    setLoginError(null);

    try {
      // Utiliser la fonction générée par OpenAPI au lieu de fetch direct
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

      // Adapter l'objet utilisateur admin pour Redux
      const adminUser = {
        id: user.id,
        email: user.email,
        name: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
        role: 'admin',
      };

      // Mise à jour du state Redux
      dispatch(
        loginAction({
          user: adminUser,
          accessToken,
        })
      );

      // Redirection vers le tableau de bord admin
      router.push('/admin/dashboard');
    } catch (error) {
      console.error('Erreur de connexion admin:', error);
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
      console.error('Erreur lors de la déconnexion admin:', error);
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

export default useAdminAuth;
