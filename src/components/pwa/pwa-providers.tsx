'use client';

import { createContext, useContext, ReactNode } from 'react';
import { usePWAInstall } from '@/hooks/pwa/use-pwa-install';
import { useNetworkStatus } from '@/hooks/pwa/use-network-status';
import { useSWUpdate } from '@/hooks/pwa/use-sw-update';
import { useAppVisibility } from '@/hooks/pwa/use-app-visibility';
import { useDisplayMode } from '@/hooks/pwa/use-display-mode';

interface PWAContextValue {
  install: ReturnType<typeof usePWAInstall>;
  network: ReturnType<typeof useNetworkStatus>;
  update: ReturnType<typeof useSWUpdate>;
  visibility: ReturnType<typeof useAppVisibility>;
  display: ReturnType<typeof useDisplayMode>;
}

const PWAContext = createContext<PWAContextValue | undefined>(undefined);

export function PWAProviders({ children }: { children: ReactNode }) {
  const install = usePWAInstall();
  const network = useNetworkStatus();
  const update = useSWUpdate();
  const visibility = useAppVisibility();
  const display = useDisplayMode();

  return (
    <PWAContext.Provider value={{ install, network, update, visibility, display }}>
      {children}
    </PWAContext.Provider>
  );
}

export function usePWA() {
  const context = useContext(PWAContext);
  if (!context) {
    throw new Error('usePWA must be used within PWAProviders');
  }
  return context;
}
