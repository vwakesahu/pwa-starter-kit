'use client';

import { useEffect, useState } from 'react';

type VisibilityState = 'active' | 'passive' | 'hidden' | 'frozen' | 'terminated';

export function useAppVisibility() {
  const [visibilityState, setVisibilityState] = useState<VisibilityState>('active');
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const updateVisibility = () => {
      const state = document.visibilityState;
      setIsVisible(state === 'visible');

      if (state === 'visible') {
        setVisibilityState(document.hasFocus() ? 'active' : 'passive');
      } else {
        setVisibilityState('hidden');
      }
    };

    const handleFocus = () => {
      if (document.visibilityState === 'visible') {
        setVisibilityState('active');
      }
    };

    const handleBlur = () => {
      setVisibilityState('passive');
    };

    const handleFreeze = () => {
      setVisibilityState('frozen');
    };

    const handleResume = () => {
      updateVisibility();
    };

    updateVisibility();

    document.addEventListener('visibilitychange', updateVisibility);
    window.addEventListener('focus', handleFocus);
    window.addEventListener('blur', handleBlur);
    document.addEventListener('freeze', handleFreeze);
    document.addEventListener('resume', handleResume);

    return () => {
      document.removeEventListener('visibilitychange', updateVisibility);
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('blur', handleBlur);
      document.removeEventListener('freeze', handleFreeze);
      document.removeEventListener('resume', handleResume);
    };
  }, []);

  return {
    visibilityState,
    isVisible,
    isActive: visibilityState === 'active',
    isHidden: visibilityState === 'hidden',
    isFrozen: visibilityState === 'frozen',
  };
}
