'use client';

import { ReactNode } from 'react';
import { usePWA } from './pwa-providers';

interface SafeAreaLayoutProps {
  children: ReactNode;
  className?: string;
}

export function SafeAreaLayout({ children, className = '' }: SafeAreaLayoutProps) {
  const { display } = usePWA();

  return (
    <div
      className={`min-h-screen ${className}`}
      style={{
        paddingTop: display.safeAreaInsets.top || 'env(safe-area-inset-top)',
        paddingRight: display.safeAreaInsets.right || 'env(safe-area-inset-right)',
        paddingBottom: display.safeAreaInsets.bottom || 'env(safe-area-inset-bottom)',
        paddingLeft: display.safeAreaInsets.left || 'env(safe-area-inset-left)',
      }}
    >
      {children}
    </div>
  );
}
