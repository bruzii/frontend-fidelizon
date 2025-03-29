import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import useAuth from './useAuth';
import { authControllerLogin } from '@/types/api';
import { LoginFormData, loginSchema } from '@/schemas/auth.schema';

export interface UseLoginOptions {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
  defaultValues?: Partial<LoginFormData>;
  redirectPath?: string;
}

export interface UseLoginReturn {
  form: UseFormReturn<LoginFormData>;
  isSubmitting: boolean;
  showPassword: boolean;
  togglePasswordVisibility: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  errors: Record<string, any>;
}

/**
 * Hook personnalisé pour gérer la logique de connexion
 */
export const useLoginAdmin = (options: UseLoginOptions = {}): UseLoginReturn => {
  const { onSuccess, onError, defaultValues, redirectPath = '/admin/dashboard' } = options;
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const auth = useAuth();

  // Configuration du formulaire avec react-hook-form et zod
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: defaultValues || {
      email: '',
      password: '',
    },
  });

  /**
   * Afficher/masquer le mot de passe
   */
  const togglePasswordVisibility = (): void => {
    setShowPassword(prev => !prev);
  };

  /**
   * Gérer la soumission du formulaire de connexion
   */
  const handleSubmit = async (data: LoginFormData): Promise<void> => {
    try {
      setIsSubmitting(true);

      const response = await authControllerLogin({
        body: {
          email: data.email,
          password: data.password,
        },
      });

      if (response.response.status !== 200 && response.response.status !== 201) {
        toast.error((response?.error as any)?.error || 'Erro ao entrar', {
          description:
            (response?.error as any)?.message || 'Verifique suas credenciais e tente novamente',
          position: 'top-center',
        });
        return;
      }

      if (response.data?.accessToken && response.data?.user) {
        const { accessToken, user } = response.data;

        // Connexion réussie, stocker le token et les informations de l'utilisateur
        auth.login(accessToken, {
          id: user.id,
          email: user.email,
          name: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
          role: user.accountType,
        });

        // Notification de succès
        toast.success('Connexion réussie', {
          description: 'Bienvenue sur votre espace administrateur',
        });

        // Callback de succès
        onSuccess?.();

        // Redirection vers le tableau de bord
        router.push(redirectPath);
      } else {
        throw new Error('Access token not received');
      }
    } catch (error) {
      console.error('Login failed:', error);
      toast.error('Erro ao entrar', {
        description: 'Verifique suas credenciais e tente novamente',
      });
      onError?.(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Créer une fonction pour gérer la soumission du formulaire
  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    form.handleSubmit(handleSubmit)(e);
  };

  return {
    form,
    isSubmitting,
    showPassword,
    togglePasswordVisibility,
    onSubmit,
    errors: form.formState.errors,
  };
};
