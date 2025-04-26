import { EstablishmentProfilePicturesSchema } from '@/schemas/establishment.schema';

export const isFile = (value: File | string): value is File => {
  return value instanceof File;
};

export const getFileUrlFromFileOrUrl = (value: File | string): string => {
  if (isFile(value)) {
    return URL.createObjectURL(value);
  }
  return value;
};

export const findPictureByPosition = (
  pictures: EstablishmentProfilePicturesSchema[],
  index: number
) => {
  return pictures.find(picture => picture.position === index);
};

export const sortPicturesByPosition = (pictures: EstablishmentProfilePicturesSchema[]) => {
  return pictures.sort((a, b) => a.position - b.position);
};
