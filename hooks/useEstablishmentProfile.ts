import { useState } from 'react';
import { useClientApi } from './use-client-api';
import { toast } from 'sonner';
import { UpdateEstablishmentProfileDto } from '@/types/api/types.gen';
import {
  establishmentControllerUpdateEstablishmentProfile,
  establishmentControllerUploadEstablishmentProfilePictures,
} from '@/types/api/sdk.gen';
import axios from 'axios';
import tokenManager from '@/utils/tokenManager';
import { EstablishmentProfileFormValues } from '@/schemas/establishment.schema';

interface UseEstablishmentProfileOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const useEstablishmentProfile = (options?: UseEstablishmentProfileOptions) => {
  const [isLoading, setIsLoading] = useState(false);
  const clientApi = useClientApi();

  const updateEstablishmentProfile = async (
    establishmentId: string,
    profile: EstablishmentProfileFormValues
  ) => {
    if (!clientApi) return;
    const { pictures, ...profileData } = profile;

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
              client: clientApi,
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

      await establishmentControllerUpdateEstablishmentProfile({
        client: clientApi,
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
