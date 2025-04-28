import { useState } from 'react';
import {
  establishmentControllerUpdateEstablishmentProfile,
  establishmentControllerUploadEstablishmentLogo,
  establishmentControllerUploadEstablishmentProfilePictures,
} from '@/src/types/api/sdk.gen';
import { EstablishmentProfileFormValues } from '@/src/schemas/establishment.schema';

interface UseEstablishmentProfileOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const useEstablishmentProfile = (options?: UseEstablishmentProfileOptions) => {
  const [isLoading, setIsLoading] = useState(false);

  const updateEstablishmentProfile = async (
    establishmentId: string,
    profile: EstablishmentProfileFormValues
  ) => {
    const { pictures, logo, ...profileData } = profile;

    setIsLoading(true);

    // Filter out pictures that are already uploaded
    // picture with file as undefined will be deleted
    // picture with file as string will be uploaded
    const picturesToUpload = pictures?.filter(picture => typeof picture.file !== 'string');

    try {
      if (picturesToUpload) {
        await Promise.all(
          picturesToUpload.map(picture =>
            establishmentControllerUploadEstablishmentProfilePictures({
              path: {
                id: establishmentId,
                position: picture.position,
              },
              body: {
                picture: picture.file,
              },
            })
          )
        );
      }

      // Manage logo
      if (typeof profile.logo !== 'string') {
        console.log('Uploading logo', profile.logo);
        await establishmentControllerUploadEstablishmentLogo({
          path: { id: establishmentId },
          body: {
            picture: profile.logo,
          },
        });
      }

      await establishmentControllerUpdateEstablishmentProfile({
        path: {
          id: establishmentId,
        },
        body: profileData,
      });

      if (options?.onSuccess) {
        options.onSuccess();
      }
    } catch (error) {
      console.error('Error updating establishment profile:', error);
      if (options?.onError) {
        options.onError(error as Error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    updateEstablishmentProfile,
  };
};
