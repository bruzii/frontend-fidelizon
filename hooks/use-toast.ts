'use client';

import { toast } from 'sonner';

/**
 * A custom hook to provide toast functionality with a consistent interface
 * This hook wraps the sonner toast library to provide a unified API
 */
export const useToast = () => {
  const showToast = {
    // Success toast
    success: (title: string, description?: string) => {
      toast.success(title, {
        description,
        position: 'top-center',
        duration: 3000,
      });
    },

    // Error toast
    error: (title: string, description?: string) => {
      toast.error(title, {
        description,
        position: 'top-center',
        duration: 5000,
      });
    },

    // Info toast
    info: (title: string, description?: string) => {
      toast.info(title, {
        description,
        position: 'top-center',
        duration: 3000,
      });
    },

    // Warning toast
    warning: (title: string, description?: string) => {
      toast.warning(title, {
        description,
        position: 'top-center',
        duration: 4000,
      });
    },
  };

  return showToast;
};
