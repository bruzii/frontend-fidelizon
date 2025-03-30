// components/forms/form-text-field.tsx
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { cn } from '@/lib/utils';

export interface FormTextFieldProps {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
}

export const FormTextField: React.FC<FormTextFieldProps> = ({
  name,
  label,
  type = 'text',
  required = false,
  disabled = false,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
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
            <Input
              type={type}
              {...field}
              className={cn(
                'border rounded-md',
                errors[name] ? 'border-destructive' : 'border-input',
                disabled ? 'opacity-50 cursor-not-allowed' : ''
              )}
              disabled={disabled}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
