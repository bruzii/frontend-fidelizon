import { UseFormReturn } from 'react-hook-form';
import {
  EstablishmentProfileFormValues,
  certificationEnum,
} from '@/src/schemas/establishment.schema';

export type CertificationOption = {
  value: typeof certificationEnum._type;
  label: string;
};

export const certificationOptions: CertificationOption[] = [
  { value: 'vegetarian' as const, label: 'Vegetariano' },
  { value: 'vegan' as const, label: 'Vegano' },
  { value: 'gluten_free' as const, label: 'Sem Glúten' },
  { value: 'lactose_free' as const, label: 'Sem Lactose' },
  { value: 'kosher' as const, label: 'Kosher' },
  { value: 'halal' as const, label: 'Halal' },
  { value: 'bio' as const, label: 'Bio/Orgânico' },
];

export const certificationLabels: Record<string, string> = certificationOptions.reduce(
  (acc, option) => ({ ...acc, [option.value]: option.label }),
  {}
);

export function useEstablishmentCertifications(
  form: UseFormReturn<EstablishmentProfileFormValues>
) {
  const { watch, setValue } = form;

  const toggleCertification = (certification: typeof certificationEnum._type) => {
    const current = watch('certifications') || [];
    if (current.includes(certification)) {
      setValue(
        'certifications',
        current.filter(c => c !== certification)
      );
    } else {
      setValue('certifications', [...current, certification]);
    }
  };

  return {
    certificationOptions,
    certificationLabels,
    toggleCertification,
  };
}
