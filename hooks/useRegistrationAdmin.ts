// app/register/hooks/useRegistration.ts
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import useAuth from './useAuth';
import { partnerControllerRegister, partnerControllerOnboarding } from '@/types/api';
import { RegistrationFormData, registrationSchema } from '@/schemas/auth.schema';
import { establishmentSchema } from '@/schemas/auth.schema';
import { z } from 'zod';

export interface UseRegistrationOptions {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
  defaultValues?: Partial<RegistrationFormData>;
}

export interface UseRegistrationReturn {
  currentStep: number;
  totalSteps: number;
  isLoading: boolean;
  partnerId: string | null;
  form: UseFormReturn<RegistrationFormData>;
  nextStep: () => Promise<void>;
  prevStep: () => void;
  goToStep: (step: number) => void;
  handlePartnerRegistration: () => Promise<void>;
  handleOnboarding: () => Promise<void>;
}

/**
 * Hook pour gérer le processus d'inscription multi-étapes
 */
export const useRegistrationAdmin = (
  options: UseRegistrationOptions = {}
): UseRegistrationReturn => {
  const { onSuccess, onError, defaultValues } = options;
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [partnerId, setPartnerId] = useState<string | null>(null);
  const totalSteps = 3;
  const router = useRouter();
  const auth = useAuth();

  // Configuration du formulaire avec react-hook-form et zod
  const form = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: defaultValues || {
      first_name: '',
      last_name: '',
      email: '',
      phone_country_code: '+55',
      phone_number: '',
      password: '',
      confirmPassword: '',
      default_language: 'pt',
      type: 'network',
      network_name: '',
      network_type: 'independent',
      brand_color: '#000000',
      establishments: [
        {
          name: '',
          address: '',
          city: '',
          cep: '',
          google_place_id: '',
        },
      ],
    },
  });

  /**
   * Gère la progression à l'étape suivante avec validation
   */
  const nextStep = async (): Promise<void> => {
    // Définir les champs à valider selon l'étape actuelle
    let fieldsToValidate: (keyof RegistrationFormData)[] = [];

    switch (currentStep) {
      case 1:
        fieldsToValidate = [
          'first_name',
          'last_name',
          'email',
          'phone_country_code',
          'phone_number',
          'password',
          'confirmPassword',
        ];
        break;
      case 2:
        fieldsToValidate = ['network_name'];
        break;
      case 3:
        fieldsToValidate = ['establishments'];
        break;
    }

    // Valider les champs de l'étape actuelle
    const isValid = await form.trigger(fieldsToValidate as any);

    if (isValid) {
      if (currentStep === 1) {
        await handlePartnerRegistration();
      } else if (currentStep === totalSteps) {
        await handleOnboarding();
      } else {
        setCurrentStep(prev => prev + 1);
      }
    }
  };

  /**
   * Revenir à l'étape précédente
   */
  const prevStep = (): void => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  /**
   * Aller à une étape spécifique
   */
  const goToStep = (step: number): void => {
    if (step >= 1 && step <= totalSteps) {
      setCurrentStep(step);
    }
  };

  /**
   * Gère l'enregistrement du partenaire (première étape)
   */
  const handlePartnerRegistration = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const formData = form.getValues();

      const response = await partnerControllerRegister({
        body: {
          email: formData.email,
          password: formData.password,
          first_name: formData.first_name,
          last_name: formData.last_name,
          phone_country_code: formData.phone_country_code,
          phone_number: formData.phone_number,
          type: formData.type,
          default_language: formData.default_language,
        },
      });

      if (response.response.status !== 201) {
        toast.error((response?.error as any)?.error || 'Erro ao registrar', {
          description: (response?.error as any)?.message || '',
          position: 'top-center',
        });
        return;
      }

      if (response.data?.accessToken && response.data?.id) {
        setPartnerId(response.data.id);

        auth.login(response.data.accessToken, {
          id: response.data.id,
          email: response.data.email,
          name: `${response.data.first_name} ${response.data.last_name}`,
          role: response.data.type,
        });

        setCurrentStep(prev => prev + 1);
      }
    } catch (error) {
      console.error('Registration failed:', error);
      toast.error('Erro ao registrar', {
        description: 'Por favor, tente novamente',
      });
      onError?.(error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Gère l'onboarding du partenaire (dernière étape)
   */
  const handleOnboarding = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const formData = form.getValues();

      if (!partnerId) {
        console.error('Partner ID is missing');
        toast.error('ID do parceiro não encontrado', {
          description: 'Por favor, tente novamente',
        });
        return;
      }

      // Préparer les établissements pour l'API
      const establishmentsData = formData.establishments.map(
        (establishment: z.infer<typeof establishmentSchema>) => ({
          name: establishment.name,
          neighborhood: establishment.neighborhood || undefined,
          public_establishment_id: establishment.name.toLowerCase().replace(/\s+/g, '-'),
          google_place_id: establishment.google_place_id || undefined,
          address: establishment.address,
          city: establishment.city,
          cep: establishment.cep,
        })
      );

      const response = await partnerControllerOnboarding({
        body: {
          network: {
            type: formData.network_type,
            name: formData.network_name ?? undefined,
            partner_id: partnerId,
          },
          establishments: establishmentsData,
        },
      });

      if (response.response.status !== 201) {
        toast.error((response?.error as any)?.error || 'Erro ao finalizar cadastro', {
          description: (response?.error as any)?.message || '',
          position: 'top-center',
        });
        return;
      }

      onSuccess?.();
      router.push('/admin/dashboard');
    } catch (error) {
      console.error('Onboarding failed:', error);
      toast.error('Erro ao finalizar cadastro', {
        description: 'Por favor, tente novamente',
      });
      onError?.(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    currentStep,
    totalSteps,
    isLoading,
    partnerId,
    form,
    nextStep,
    prevStep,
    goToStep,
    handlePartnerRegistration,
    handleOnboarding,
  };
};
