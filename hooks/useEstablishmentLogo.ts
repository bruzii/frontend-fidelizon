import { useRef } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { EstablishmentProfileFormValues } from '@/schemas/establishment.schema';

export function useEstablishmentLogo(form: UseFormReturn<EstablishmentProfileFormValues>) {
  const { watch, setValue } = form;
  const logoInputRef = useRef<HTMLInputElement | null>(null);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setValue('logo', file);
  };

  const handleLogoUploadClick = () => {
    if (logoInputRef.current) {
      logoInputRef.current.click();
    }
  };

  const removeLogo = () => {
    setValue('logo', undefined);
  };

  return {
    logoInputRef,
    logo: watch('logo'),
    handleLogoChange,
    handleLogoUploadClick,
    removeLogo,
  };
}
