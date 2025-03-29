// app/admin/auth/register/page.tsx
'use client';

import React from 'react';
import { FormProvider } from 'react-hook-form';
import { toast } from 'sonner';
import Link from 'next/link';

// Components
import StepProgress from '@/components/admin/register/StepProgress';
import InformationStep from '@/components/admin/register/InformationStep';
import BrandInformationStep from '@/components/admin/register/BrandInformationStep';
import EstablishementStep from '@/components/admin/register/EstablishementStep';

// Hooks
import { useRegistrationAdmin } from '@/hooks/useRegistrationAdmin';

/**
 * RegisterPage component - Handles the multi-step registration process
 */
export default function RegisterPage() {
  // Initialiser le hook d'inscription
  const { currentStep, totalSteps, isLoading, form, nextStep, prevStep } = useRegistrationAdmin({
    onError: error => {
      console.error('Registration error:', error);
      toast.error('Erro no processo de registro', {
        description: 'Por favor, tente novamente mais tarde.',
      });
    },
  });

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

        <FormProvider {...form}>
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
