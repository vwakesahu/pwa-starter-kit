'use client';

import { useEffect, useState } from 'react';

type DisplayMode = 'browser' | 'standalone' | 'minimal-ui' | 'fullscreen';

interface DisplayModeState {
  displayMode: DisplayMode;
  isFullscreen: boolean;
  isStandalone: boolean;
  isBrowser: boolean;
  orientation: OrientationType;
  safeAreaInsets: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
}

export function useDisplayMode(): DisplayModeState {
  const [displayMode, setDisplayMode] = useState<DisplayMode>('browser');
  const [orientation, setOrientation] = useState<OrientationType>('portrait-primary');
  const [safeAreaInsets, setSafeAreaInsets] = useState({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  });

  useEffect(() => {
    const updateDisplayMode = () => {
      if (window.matchMedia('(display-mode: fullscreen)').matches) {
        setDisplayMode('fullscreen');
      } else if (window.matchMedia('(display-mode: standalone)').matches) {
        setDisplayMode('standalone');
      } else if (window.matchMedia('(display-mode: minimal-ui)').matches) {
        setDisplayMode('minimal-ui');
      } else {
        setDisplayMode('browser');
      }
    };

    const updateOrientation = () => {
      setOrientation(screen.orientation?.type || 'portrait-primary');
    };

    const updateSafeAreaInsets = () => {
      const computedStyle = getComputedStyle(document.documentElement);
      setSafeAreaInsets({
        top: parseInt(computedStyle.getPropertyValue('env(safe-area-inset-top)') || '0'),
        right: parseInt(computedStyle.getPropertyValue('env(safe-area-inset-right)') || '0'),
        bottom: parseInt(computedStyle.getPropertyValue('env(safe-area-inset-bottom)') || '0'),
        left: parseInt(computedStyle.getPropertyValue('env(safe-area-inset-left)') || '0'),
      });
    };

    updateDisplayMode();
    updateOrientation();
    updateSafeAreaInsets();

    const mediaQueries = [
      window.matchMedia('(display-mode: fullscreen)'),
      window.matchMedia('(display-mode: standalone)'),
      window.matchMedia('(display-mode: minimal-ui)'),
    ];

    mediaQueries.forEach((mq) => mq.addEventListener('change', updateDisplayMode));
    screen.orientation?.addEventListener('change', updateOrientation);
    window.addEventListener('resize', updateSafeAreaInsets);

    return () => {
      mediaQueries.forEach((mq) => mq.removeEventListener('change', updateDisplayMode));
      screen.orientation?.removeEventListener('change', updateOrientation);
      window.removeEventListener('resize', updateSafeAreaInsets);
    };
  }, []);

  return {
    displayMode,
    isFullscreen: displayMode === 'fullscreen',
    isStandalone: displayMode === 'standalone' || displayMode === 'fullscreen',
    isBrowser: displayMode === 'browser',
    orientation,
    safeAreaInsets,
  };
}
