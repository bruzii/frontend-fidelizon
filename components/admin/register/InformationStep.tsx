import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';
import { usePreventRefresh } from '@/hooks/use-prevent-refresh';
import { Checkbox } from '@/components/ui/checkbox';

const InformationStep: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    formState: { errors },
  } = useFormContext();

  usePreventRefresh();

  return (
    <div className=" p-6 rounded-md shadow-sm max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-2">Informações</h2>
      <p className="text-gray-600 mb-6">Preencha os dados pessoais</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-1">
            Nome*
          </label>
          <input
            id="first_name"
            type="text"
            className={`block w-full rounded-md border ${
              errors.first_name ? 'border-red-500' : 'border-gray-300'
            } bg-gray-50 py-3 px-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black`}
            {...register('first_name')}
          />
          {errors.first_name && (
            <p className="mt-1 text-sm text-red-600">{errors.first_name.message as string}</p>
          )}
        </div>

        <div>
          <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-1">
            Sobrenome*
          </label>
          <input
            id="last_name"
            type="text"
            className={`block w-full rounded-md border ${
              errors.last_name ? 'border-red-500' : 'border-gray-300'
            } bg-gray-50 py-3 px-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black`}
            {...register('last_name')}
          />
          {errors.last_name && (
            <p className="mt-1 text-sm text-red-600">{errors.last_name.message as string}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email*
          </label>
          <input
            id="email"
            type="email"
            className={`block w-full rounded-md border ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            } bg-gray-50 py-3 px-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black`}
            {...register('email')}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message as string}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Telefone*
          </label>
          <div className="flex">
            <div className="w-24 mr-2">
              <select
                id="phone_country_code"
                className="block w-full rounded-md border border-gray-300 bg-gray-50 py-3 px-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black"
                {...register('phone_country_code')}
              >
                <option value="+55">🇧🇷 +55</option>
                <option value="+351">🇵🇹 +351</option>
                <option value="+1">🇺🇸 +1</option>
                <option value="+33">🇫🇷 +33</option>
                <option value="+44">🇬🇧 +44</option>
                <option value="+49">🇩🇪 +49</option>
              </select>
            </div>
            <div className="flex-1">
              <input
                id="phone_number"
                type="tel"
                placeholder="(00) 00000-0000"
                className={`block w-full rounded-md border ${
                  errors.phone_number ? 'border-red-500' : 'border-gray-300'
                } bg-gray-50 py-3 px-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black`}
                {...register('phone_number')}
              />
            </div>
          </div>
          {errors.phone_number && (
            <p className="mt-1 text-sm text-red-600">{errors.phone_number.message as string}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Senha*
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              className={`block w-full rounded-md border ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              } bg-gray-50 py-3 px-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black`}
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
            <p className="mt-1 text-sm text-red-600">{errors.password.message as string}</p>
          )}
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
            Confirmar senha*
          </label>
          <div className="relative">
            <input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              className={`block w-full rounded-md border ${
                errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
              } bg-gray-50 py-3 px-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black`}
              {...register('confirmPassword')}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400"
            >
              {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message as string}</p>
          )}
        </div>

        <div className="md:col-span-2 mt-4">
          <div className="flex items-start">
            <Checkbox id="terms" required />

            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
              Ao clicar nesta caixa, eu reconheço ter lido e concordado com os{' '}
              <a href="#" className="text-black underline">
                Termos e Condições
              </a>{' '}
              e{' '}
              <a href="#" className="text-black underline">
                Política de Privacidade
              </a>{' '}
              do Fidelizon.
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InformationStep;
