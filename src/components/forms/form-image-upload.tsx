import React, { useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { Upload } from 'lucide-react';

export interface FormImageUploadProps {
  name: string;
  label: string;
  required?: boolean;
  disabled?: boolean;
  acceptedFormats?: string;
  className?: string;
  defaultValue?: File | null;
}

export const FormImageUpload: React.FC<FormImageUploadProps> = ({
  name,
  label,
  defaultValue = null,
  required = false,
  disabled = false,
  acceptedFormats = 'image/jpeg,image/png,image/webp',
  className,
}) => {
  const {
    control,
    setValue,
    formState: { errors },
    watch,
  } = useFormContext();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    defaultValue ? URL.createObjectURL(defaultValue) : null
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Mettre à jour la valeur dans le formulaire
    setValue(name, file, { shouldValidate: true });

    // Créer un aperçu de l'image
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleClickUpload = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <FormField
      name={name}
      control={control}
      render={({ field: { ref, ...field } }) => (
        <FormItem className={className}>
          <FormLabel>
            {label}
            {required && '*'}
          </FormLabel>
          <FormControl>
            <div>
              <input
                type="file"
                id={name}
                ref={fileInputRef}
                className="hidden"
                accept={acceptedFormats}
                onChange={handleFileChange}
                disabled={disabled}
              />
              <div
                onClick={handleClickUpload}
                className={cn(
                  'border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50',
                  errors[name] ? 'border-destructive' : 'border-gray-300',
                  disabled ? 'opacity-50 cursor-not-allowed' : ''
                )}
              >
                {imagePreview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={imagePreview} alt="Preview" className="max-h-32 mb-2" />
                ) : (
                  <>
                    <Upload className="w-10 h-10 text-gray-400 mb-2" />
                    <p className="text-sm text-center text-gray-600">
                      Clique para fazer upload
                      <br />
                      {acceptedFormats
                        .replace(/image\//g, '')
                        .toUpperCase()
                        .replace(/,/g, ', ')}
                    </p>
                  </>
                )}
              </div>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
