import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useApiMutation } from './useApiQuery';
import authService, {
  LoginRequest,
  RegisterRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
} from '@/api/endpoints/auth';
import { useAppDispatch } from '@/store/hooks';
import { login, logout } from '@/store/slices/authSlice';

/**
 * Hook personnalisé pour gérer l'authentification
 */
export function useAuth() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  // Mutation pour la connexion
  const loginMutation = useApiMutation(
    'login',
    (data: LoginRequest) => ({
      method: 'POST',
      url: '/auth/login',
      data,
    }),
    {
      onSuccess: (data: any) => {
        // Mettre à jour le state Redux
        dispatch(
          login({
            user: data.user,
            accessToken: data.accessToken,
          })
        );

        // Rediriger vers le dashboard
        router.push('/dashboard');
      },
    }
  );

  // Mutation pour l'inscription
  const registerMutation = useApiMutation(
    'register',
    (data: RegisterRequest) => ({
      method: 'POST',
      url: '/auth/register',
      data,
    }),
    {
      onSuccess: (data: any) => {
        // Mettre à jour le state Redux
        dispatch(
          login({
            user: data.user,
            accessToken: data.accessToken,
          })
        );

        // Rediriger vers le dashboard
        router.push('/dashboard');
      },
    }
  );

  // Mutation pour la réinitialisation du mot de passe
  const forgotPasswordMutation = useApiMutation(
    'forgotPassword',
    (data: ForgotPasswordRequest) => ({
      method: 'POST',
      url: '/auth/forgot-password',
      data,
    })
  );

  // Mutation pour la réinitialisation du mot de passe
  const resetPasswordMutation = useApiMutation(
    'resetPassword',
    (data: ResetPasswordRequest) => ({
      method: 'POST',
      url: '/auth/reset-password',
      data,
    }),
    {
      onSuccess: () => {
        // Rediriger vers la page de connexion après la réinitialisation
        router.push('/auth/login');
      },
    }
  );

  // Fonction de déconnexion
  const handleLogout = useCallback(() => {
    // Appeler le service de déconnexion
    authService.logout();

    // Mettre à jour le state Redux
    dispatch(logout());

    // Rediriger vers la page de connexion
    router.push('/auth/login');
  }, [dispatch, router]);

  return {
    isAuthenticated: authService.isAuthenticated(),
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    forgotPassword: forgotPasswordMutation.mutate,
    resetPassword: resetPasswordMutation.mutate,
    logout: handleLogout,
    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
    loginError: loginMutation.error,
    registerError: registerMutation.error,
    forgotPasswordError: forgotPasswordMutation.error,
    resetPasswordError: resetPasswordMutation.error,
  };
}

export default useAuth;
