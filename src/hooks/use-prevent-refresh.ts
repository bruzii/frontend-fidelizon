'use client';

import { useState, useEffect } from 'react';

/**
 * A custom hook that helps manage warning dialogs when users try to refresh or navigate away from a page.
 *
 * @returns {Object} An object containing the state and handlers for the refresh warning dialog
 */
export const usePreventRefresh = () => {
  const [showRefreshWarning, setShowRefreshWarning] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState<null | (() => void)>(null);

  // Handle browser refresh or tab close
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      // Standard way to prompt user before unloading
      event.preventDefault();
      // This message might not be displayed as browsers have their own standardized messages
      event.returnValue = 'Changes you made may not be saved.';
      return 'Changes you made may not be saved.';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return { showRefreshWarning, pendingNavigation };
};
