import React from 'react';
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';

interface FormErrorMessageProps {
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
}

export const FormErrorMessage: React.FC<FormErrorMessageProps> = ({ error }) => {
  if (!error) return null;

  return (
    <p className="text-sm font-medium text-destructive mt-1">
      {typeof error.message === 'string' ? error.message : 'Invalid field'}
    </p>
  );
};
