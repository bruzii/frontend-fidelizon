// app/register/hooks/useRegistration.ts
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/store/hooks';
import { login } from '@/store/slices/authSlice';
import {
  partnerControllerRegister,
  partnerControllerOnboarding,
  CreatePartnerDto,
  OnboardingPartnerDto,
} from '@/types/api';
import { toast } from 'sonner';
import useAuth from './useAuth';

interface UseRegistrationProps {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}

export const useRegistration = (props?: UseRegistrationProps) => {
  const { onSuccess, onError } = props || {};
  const [isLoading, setIsLoading] = useState(false);
  const [partnerId, setPartnerId] = useState<string | null>(null);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const auth = useAuth();

  const registerPartner = async (data: CreatePartnerDto) => {
    try {
      setIsLoading(true);

      const response = await partnerControllerRegister({
        body: data,
      });
      if (response.response.status !== 201) {
        toast.error((response?.error as any)?.error || 'Erro ao registrar', {
          description: (response?.error as any)?.message || '',
          position: 'top-center',
        });
        return;
      }
      if (response.data?.id && response.data?.accessToken) {
        // Set bearer token in client
        setPartnerId(response.data.id);

        auth.login(response.data.accessToken, {
          id: response.data.id,
          email: response.data.email,
          name: `${response.data.first_name} ${response.data.last_name}`,
          role: response.data.type,
        });

        return response.data;
      }

      throw new Error('Failed to register partner: Missing ID or access token');
    } catch (error) {
      console.error('Registration failed:', error);
      toast.error('Erro ao registrar', {
        description: 'Por favor, tente novamente',
      });
      onError?.(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const onboardPartner = async (data: OnboardingPartnerDto) => {
    try {
      setIsLoading(true);

      const response = await partnerControllerOnboarding({
        body: data,
      });

      onSuccess?.();

      // Navigate to dashboard after successful onboarding
      router.push('/admin/dashboard');

      return response.data;
    } catch (error) {
      console.error('Onboarding failed:', error);
      onError?.(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    partnerId,
    registerPartner,
    onboardPartner,
  };
};
