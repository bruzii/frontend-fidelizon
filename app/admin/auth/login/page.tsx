// app/login/page.tsx
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authControllerLogin } from '@/types/api/sdk.gen';

// Define form schema
const loginSchema = z.object({
  email: z.string().email('Veuillez entrer un email valide'),
  password: z.string().min(1, 'Mot de passe requis'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [savedEmails, setSavedEmails] = useState<string[]>([
    'Bistrotlbr@gmail.com',
    'restaurantsfe@gmail.com',
  ]);
  const [showEmailDropdown, setShowEmailDropdown] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const response = await authControllerLogin({
        body: {
          email: data.email,
          password: data.password,
        },
      });
      router.push('/admin/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const selectEmail = (email: string) => {
    setValue('email', email);
    setShowEmailDropdown(false);
  };

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

      {/* Login form side */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-3xl font-semibold mb-2">Login</h2>
          <p className="text-gray-600 mb-8">Acessar o painel administrativo</p>
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                  {...register('email')}
                  onFocus={() => setShowEmailDropdown(true)}
                  onBlur={() => setTimeout(() => setShowEmailDropdown(false), 200)}
                />
                {showEmailDropdown && savedEmails.length > 0 && (
                  <div className="absolute z-10 mt-1 w-full bg-black rounded-md shadow-lg">
                    {savedEmails.map((email, index) => (
                      <div
                        key={index}
                        className="flex items-center px-4 py-3 text-sm text-white hover:bg-gray-800 cursor-pointer"
                        onClick={() => selectEmail(email)}
                      >
                        <div className="w-6 h-6 flex items-center justify-center bg-gray-700 rounded-full mr-2">
                          {email[0].toUpperCase()}
                        </div>
                        <div>
                          <div>{email}</div>
                          <div className="text-gray-400">••••••••</div>
                        </div>
                      </div>
                    ))}
                    <div className="border-t border-gray-700 px-4 py-2">
                      <button type="button" className="flex items-center text-gray-400 text-sm">
                        <span className="mr-2">Gérer les mots de passe...</span>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M8 12H16"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12 16V8"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
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
                  {...register('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
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
