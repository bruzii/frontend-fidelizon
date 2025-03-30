import React from 'react';
import { usePreventRefresh } from '@/hooks/use-prevent-refresh';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { PhoneInputField } from '@/components/forms/phone-input-field';
import { FormTextField } from '@/components/forms/form-text-field';
import { PasswordField } from '@/components/forms/password-input';

const InformationStep: React.FC = () => {
  usePreventRefresh();

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">Informações</CardTitle>
        <CardDescription className="text-muted-foreground">
          Preencha os dados pessoais
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormTextField name="first_name" label="Nome" required />

          <FormTextField name="last_name" label="Sobrenome" required />

          <div className="md:col-span-2">
            <FormTextField name="email" label="Email" type="email" required />
          </div>

          <div className="md:col-span-2">
            <PhoneInputField
              name="phone"
              label="Telefone"
              required
              defaultCountry="br"
              phoneNumberFieldName="phone_number"
              countryCodeFieldName="phone_country_code"
            />
          </div>

          <PasswordField name="password" label="Senha" required />

          <PasswordField name="confirmPassword" label="Confirmar senha" required />

          <div className="md:col-span-2 mt-4">
            <div className="flex items-start space-x-2">
              <Checkbox id="terms" required />
              <Label htmlFor="terms" className="font-normal text-sm">
                Ao clicar nesta caixa, eu reconheço ter lido e concordado com os{' '}
                <a href="#" className="text-primary underline">
                  Termos e Condições
                </a>{' '}
                e{' '}
                <a href="#" className="text-primary underline">
                  Política de Privacidade
                </a>{' '}
                do SpinforEat.
              </Label>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InformationStep;
