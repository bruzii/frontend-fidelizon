'use client';

import Link from 'next/link';
import AdminLoginForm from './_components/login-form';

export default function LoginPage() {
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
          <AdminLoginForm />

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
