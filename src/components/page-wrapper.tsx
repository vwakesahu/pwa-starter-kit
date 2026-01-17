'use client';

import { usePWA } from './pwa/pwa-providers';
import { ReactNode } from 'react';

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
}

export function PageWrapper({ children, className = '' }: PageWrapperProps) {
  const { install } = usePWA();

  // Check if install prompt is visible
  const isInstallPromptVisible = install.isInstallable && !install.isInstalled && !install.isDismissed;

  // Use different padding class based on whether install prompt is visible
  const paddingClass = isInstallPromptVisible
    ? 'safe-area-pt-with-header-and-banner'
    : 'safe-area-pt-with-header';

  return (
    <main className={`min-h-screen ${paddingClass} ${className}`}>
      {children}
    </main>
  );
}
