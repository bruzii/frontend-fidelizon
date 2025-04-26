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

interface UseEstablishmentProfileOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const useEstablishmentProfile = (options?: UseEstablishmentProfileOptions) => {
  const [isLoading, setIsLoading] = useState(false);
  const clientApi = useClientApi();

  const updateEstablishmentProfile = async (
    establishmentId: string,
    profile: UpdateEstablishmentProfileDto,
    pictures?: File[]
  ) => {
    if (!clientApi) return;
    console.log('profile', profile);
    setIsLoading(true);

    try {
      if (pictures) {
        await establishmentControllerUploadEstablishmentProfilePictures({
          client: clientApi,
          path: {
            id: establishmentId,
          },
          body: {
            pictures,
          },
        });
      }

      await establishmentControllerUpdateEstablishmentProfile({
        client: clientApi,
        path: {
          id: establishmentId,
        },
        body: profile,
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
