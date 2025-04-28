'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { login, logout } from '@/src/store/slices/authSlice';
import { tokenManager } from '@/src/utils/tokenManager';

export type User = {
  id: string;
  email: string;
  name: string;
  role: string;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export type UseAuthReturn = {
  isAuthenticated: boolean;
  user: User | null;
  accessToken: string | null;
  login: (accessToken: string, user: User) => void;
  logout: () => void;
  isLoading: boolean;
};

/**
 * Hook personnalisé pour gérer l'authentification
 * @returns Fonctions et états liés à l'authentification
 */
const useAuth = (): UseAuthReturn => {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();
  const { isAuthenticated, user, accessToken } = useAppSelector(state => state.auth);

  // Synchroniser le state Redux avec localStorage au chargement
  useEffect(() => {
    const storedToken = tokenManager.getAccessToken();
    const storedUser = tokenManager.getUserData<User>();

    if (storedToken && storedUser && !isAuthenticated) {
      dispatch(
        login({
          user: storedUser,
          accessToken: storedToken,
        })
      );
    }
    setIsLoading(false);
  }, [dispatch, isAuthenticated]);

  // Fonction de connexion
  const loginUser = (accessToken: string, user: User) => {
    // Stocker dans localStorage via tokenManager
    tokenManager.setTokens(accessToken);
    tokenManager.setUserData(user);

    // Mettre à jour Redux
    dispatch(
      login({
        user,
        accessToken,
      })
    );
  };

  // Fonction de déconnexion
  const logoutUser = () => {
    // Supprimer du localStorage via tokenManager
    tokenManager.clearTokens();

    // Mettre à jour Redux
    dispatch(logout());

    // Rediriger vers la page de connexion si nécessaire
    if (!pathname.includes('/auth/login')) {
      router.push('/admin/auth/login');
    }
  };

  return {
    isAuthenticated,
    user,
    accessToken,
    login: loginUser,
    logout: logoutUser,
    isLoading,
  };
};

export default useAuth;
