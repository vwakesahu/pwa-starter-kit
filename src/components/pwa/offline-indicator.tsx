'use client';

import { usePWA } from './pwa-providers';
import { WifiOff, Wifi } from 'lucide-react';
import { useEffect, useState } from 'react';

export function OfflineIndicator() {
  const { network } = usePWA();
  const [show, setShow] = useState(false);
  const [wasOffline, setWasOffline] = useState(false);

  useEffect(() => {
    if (!network.isOnline) {
      setShow(true);
      setWasOffline(true);
    } else if (wasOffline) {
      // Show "back online" briefly
      setShow(true);
      const timer = setTimeout(() => setShow(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [network.isOnline, wasOffline]);

  if (!show) return null;

  return (
    <div
      className={`fixed top-0 left-0 right-0 safe-area-pt z-40 transition-transform ${
        show ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div
        className={`p-2 text-center text-sm font-medium flex items-center justify-center gap-2 ${
          network.isOnline
            ? 'bg-green-500 dark:bg-green-600 text-white'
            : 'bg-yellow-500 dark:bg-yellow-600 text-black dark:text-white'
        }`}
      >
        {network.isOnline ? (
          <>
            <Wifi className="w-4 h-4" />
            Back online
          </>
        ) : (
          <>
            <WifiOff className="w-4 h-4" />
            You're offline
            {network.isSlowConnection && ' - Slow connection'}
          </>
        )}
      </div>
    </div>
  );
}
