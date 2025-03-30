'use client';

import React, { useEffect, useState } from 'react';
import setupApiInterceptors from '@/utils/apiInterceptors';

interface ApiProviderProps {
  children: React.ReactNode;
}

/**
 * Provider qui configure les intercepteurs API au démarrage de l'application
 */
export function ApiProvider({ children }: ApiProviderProps) {
  useEffect(() => {
    setupApiInterceptors();
  }, []);

  return <>{children}</>;
}

export default ApiProvider;
