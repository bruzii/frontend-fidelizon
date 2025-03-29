// app/admin/auth/login/page.tsx
'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useLogin } from '@/hooks/useLogin';
import { FormProvider } from 'react-hook-form';

export default function LoginPage() {
  const { form, isSubmitting, showPassword, togglePasswordVisibility, onSubmit, errors } = useLogin(
    {
      onError: error => {
        console.error('Login error:', error);
      },
    }
  );

  return (
    <div className="flex min-h-screen bg-floral-white">
      <div className="hidden md:flex md:w-1/2 bg-black p-8 items-center justify-center">
        <div className="relative w-full max-w-lg">
          <div className="relative">
            {/* <Image
              src="/laptop-mockup.png"
              alt="Dashboard Preview"
              width={600}
              height={400}
              className="w-full h-auto"
              priority
            /> */}
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2 flex flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-3xl font-semibold mb-2">Login</h2>
          <p className="text-gray-600 mb-8">Acessar o painel administrativo</p>
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <FormProvider {...form}>
            <form onSubmit={onSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    className={`block w-full rounded-md border border-gray-200 bg-gray-50 py-3 px-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary ${
                      errors.email ? 'border-red-500 focus:ring-red-500' : 'focus:ring-primary'
                    }`}
                    {...form.register('email')}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Senha
                  </label>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    className={`block w-full rounded-md border border-gray-200 bg-gray-50 py-3 px-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 ${
                      errors.password ? 'border-red-500 focus:ring-red-500' : 'focus:ring-primary'
                    }`}
                    {...form.register('password')}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                )}
              </div>

              <div>
                <Link href="/forgot-password" className="text-sm text-gray-600 hover:text-gray-900">
                  Esqueceu a senha?
                </Link>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex w-full justify-center rounded-md bg-black py-3 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  {isSubmitting ? 'Conectando...' : 'Entrar'}
                </button>
              </div>
            </form>
          </FormProvider>

          <p className="mt-10 text-center text-sm text-gray-500">
            Não tem uma conta?{' '}
            <Link href="/admin/auth/register" className="font-medium text-black hover:underline">
              Clicar aqui
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
