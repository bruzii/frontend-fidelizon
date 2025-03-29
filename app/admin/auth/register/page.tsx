// app/register/page.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import useAuth from '@/hooks/useAuth';
import { toast } from 'sonner';
import { partnerControllerOnboarding, partnerControllerRegister } from '@/types/api';

// Components
import StepProgress from '@/components/admin/register/StepProgress';
import InformationStep from '@/components/admin/register/InformationStep';
import BrandInformationStep from '@/components/admin/register/BrandInformationStep';
import EstablishementStep from '@/components/admin/register/EstablishementStep';

import Link from 'next/link';

const establishmentSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  address: z.string().min(1, 'Endereço é obrigatório'),
  city: z.string().min(1, 'Cidade é obrigatória'),
  neighborhood: z.string().optional(),
  cep: z.string().min(1, 'CEP é obrigatório'),
  google_place_id: z.string().optional(),
});

// Schéma complet du formulaire
const registrationSchema = z
  .object({
    // Step 1: Personal Information
    first_name: z.string().min(1, 'Nome é obrigatório'),
    last_name: z.string().min(1, 'Sobrenome é obrigatório'),
    email: z.string().email('Email inválido'),
    phone_country_code: z.string().min(1, 'Código do país é obrigatório'),
    phone_number: z.string().min(1, 'Número de telefone é obrigatório'),
    password: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres'),
    confirmPassword: z.string(),
    default_language: z.string().default('pt'),
    type: z.enum(['network', 'subnetwork', 'franchise']).default('network'),

    // Step 2: Brand Information,
    network_name: z.string().optional().nullable(),
    network_type: z.enum(['independent', 'franchise']).default('independent'),
    brand_color: z.string().optional(),
    brand_logo: z.any().optional(),

    // Step 3: Restaurants Information
    establishments: z
      .array(establishmentSchema)
      .min(1, 'Pelo menos um estabelecimento é necessário'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });

type RegistrationFormData = z.infer<typeof registrationSchema>;

/**
 * RegisterPage component - Handles the multi-step registration process
 */
export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [partnerId, setPartnerId] = useState<string | null>(null);
  const totalSteps = 3;
  const router = useRouter();
  const auth = useAuth();

  // Custom hook for handling page refresh/navigation warnings
  const methods = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
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

  const { trigger } = methods;

  const nextStep = async () => {
    // Valider les champs selon l'étape actuelle
    let fieldsToValidate: string[] = [];

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

    const isValid = await trigger(fieldsToValidate as any);

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
   * Move to the previous step
   */
  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  /**
   * Handle partner registration API call (first step)
   */
  const handlePartnerRegistration = async () => {
    try {
      setIsLoading(true);
      const formData = methods.getValues();

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
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle partner onboarding API call (final step)
   */
  const handleOnboarding = async () => {
    try {
      setIsLoading(true);
      const formData = methods.getValues();

      if (!partnerId) {
        console.error('Partner ID is missing');
        return;
      }

      // Préparer les établissements pour l'API
      const establishmentsData = formData.establishments.map(establishment => ({
        name: establishment.name,
        neighborhood: establishment.neighborhood,
        public_establishment_id: establishment.name.toLowerCase().replace(/\s+/g, '-'),
        google_place_id: establishment.google_place_id || undefined,
        address: establishment.address,
        city: establishment.city,
        cep: establishment.cep,
      }));

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

      router.push('/admin/dashboard');
    } catch (error) {
      console.error('Onboarding failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Render the current step component
   */
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <InformationStep />;
      case 2:
        return <BrandInformationStep />;
      case 3:
        return <EstablishementStep />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-xl font-bold">Fidelizon</h1>
          </div>
          <Link
            href="/admin/auth/login"
            className="text-sm px-4 py-2 rounded-md border border-gray-200 inline-flex items-center"
          >
            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Continuar mais tarde
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <StepProgress currentStep={currentStep} totalSteps={totalSteps} />

        <FormProvider {...methods}>
          <form className="mt-8">
            {renderStep()}

            <div className="mt-8 flex justify-end">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-4 py-2 mr-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                  disabled={isLoading}
                >
                  Voltar
                </button>
              )}
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? 'Carregando...' : currentStep === totalSteps ? 'Finalizar' : 'Próximo'}
              </button>
            </div>
          </form>
        </FormProvider>
      </main>
    </div>
  );
}
