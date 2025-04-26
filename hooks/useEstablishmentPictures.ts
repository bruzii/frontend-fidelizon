import { useRef } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { EstablishmentProfileFormValues } from '@/schemas/establishment.schema';

export function useEstablishmentPictures(form: UseFormReturn<EstablishmentProfileFormValues>) {
  const { watch, setValue } = form;
  const fileInputRefs = useRef<HTMLInputElement[]>([]);

  // Initialize picture slots if they don't exist
  const initializePictures = () => {
    [0, 1, 2].forEach(index => {
      if (!watch('pictures')?.[index]) {
        setValue(`pictures.${index}`, { position: index, file: undefined });
      }
    });
  };

  const handleFileChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const pictures = [...(watch('pictures') || [])];
    const newPictures = pictures.map((picture, i) => {
      if (i === index) {
        return { ...picture, file };
      }
      return picture;
    });
    setValue('pictures', newPictures);
  };

  const removePicture = (index: number) => {
    const pictures = [...(watch('pictures') || [])];
    const newPictures = pictures.map((picture, i) => {
      if (i === index) {
        return { ...picture, file: undefined };
      }
      return picture;
    });
    setValue('pictures', newPictures);
  };

  const handleClickUpload = (index: number) => {
    if (fileInputRefs.current[index]) {
      fileInputRefs.current[index].click();
    }
  };

  return {
    fileInputRefs,
    initializePictures,
    handleFileChange,
    removePicture,
    handleClickUpload,
  };
}
