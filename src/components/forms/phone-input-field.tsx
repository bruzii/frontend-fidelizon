// components/forms/phone-input-field.tsx
import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { InternationalPhoneInput } from '@/components/forms/international-phone-input';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

interface PhoneInputFieldProps {
  name?: string;
  label: string;
  required?: boolean;
  defaultCountry?: string;
  // Ces champs supplémentaires sont pour synchroniser avec les champs requis par l'API
  phoneNumberFieldName?: string;
  countryCodeFieldName?: string;
}

export const PhoneInputField: React.FC<PhoneInputFieldProps> = ({
  name = 'phone',
  label,
  required = false,
  defaultCountry = 'br',
  phoneNumberFieldName = 'phone_number',
  countryCodeFieldName = 'phone_country_code',
}) => {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext();

  // Gestionnaire pour mettre à jour les champs nécessaires à l'API
  const handlePhoneChange = (value: string, onChange: (value: string) => void) => {
    // Appeler le onChange standard du Controller pour mettre à jour le champ visuel
    onChange(value);

    // Extraire le code pays (préfixe avec '+') et le numéro brut
    const parts = value.split(' ');
    const countryCode = parts[0] || '';

    // Extraire seulement les chiffres pour le numéro de téléphone
    const numericValue = value.replace(/\D/g, '');

    // Mettre à jour les champs nécessaires pour l'API
    if (countryCode.startsWith('+')) {
      setValue(countryCodeFieldName, countryCode, { shouldValidate: true });
    }
    setValue(phoneNumberFieldName, numericValue, { shouldValidate: true });
  };

  return (
    <>
      <FormField
        name={name}
        control={control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {label}
              {required && '*'}
            </FormLabel>
            <FormControl>
              <InternationalPhoneInput
                id={name}
                defaultCountry={defaultCountry as any}
                error={!!errors[name] || !!errors[phoneNumberFieldName]}
                {...field}
                onChange={value => handlePhoneChange(value, field.onChange)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Champs cachés pour stocker les valeurs nécessaires à l'API */}
      <input type="hidden" {...control.register(phoneNumberFieldName)} />
      <input type="hidden" {...control.register(countryCodeFieldName)} />
    </>
  );
};
