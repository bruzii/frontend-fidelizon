import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import useAuth from './useAuth';
import { authControllerLogin } from '@/src/types/api';
import { LoginFormData, loginSchema } from '@/src/schemas/auth.schema';

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
        const { status } = user;
        switch (status) {
          case 'active':
            auth.login(accessToken, {
              id: user.id,
              email: user.email,
              name: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
              role: user.accountType,
            });
            toast.success('Connexion réussie', {
              description: 'Bienvenue sur votre espace administrateur',
            });

            onSuccess?.();

            router.push(redirectPath);
            break;
          case 'waiting_verification':
            toast.error('Conta Aguardando Verificação', {
              description: 'Sua conta está aguardando a verificação, por favor contate o suporte',
            });
            router.push('/admin/auth/register');
            break;
          case 'paused':
            toast.error('Conta Pausada', {
              description: 'Sua conta está pausada, por favor contate o suporte',
            });
            break;
          case 'waiting_payment':
            toast.error('Conta Aguardando Pagamento', {
              description: 'Sua conta está aguardando o pagamento, por favor contate o suporte',
            });
            router.push('/admin/auth/register');
            break;

          default:
            toast.error('Conta Inativa', {
              description: 'Sua conta está inativa, por favor contate o suporte',
            });
            break;
        }
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
