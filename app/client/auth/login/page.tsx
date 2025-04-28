'use client';

import Link from 'next/link';
import LoginForm from './_components/login-form';

export default function ClientLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Connexion à votre compte
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">Accédez à votre espace client</p>
        </div>
        <LoginForm />
        <div className="text-center">
          <p className="mt-2 text-sm text-gray-600">
            Vous n&apos;avez pas de compte ?{' '}
            <Link
              href="/client/auth/register"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Inscrivez-vous
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
