'use client';

import { useState } from 'react';
import { usePWA } from './pwa-providers';
import { X, Download, Share } from 'lucide-react';

export function InstallPrompt() {
  const { install } = usePWA();
  const [dismissed, setDismissed] = useState(false);

  if (!install.isInstallable || install.isInstalled || dismissed) {
    return null;
  }

  const handleInstall = async () => {
    if (install.isIOS) {
      // iOS doesn't support programmatic install, show instructions
      return;
    }
    const accepted = await install.promptInstall();
    if (accepted) {
      setDismissed(true);
    }
  };

  const handleDismiss = () => {
    setDismissed(true);
    install.dismissPrompt();
  };

  return (
    <div className="sticky top-0 left-0 right-0 bg-black text-white border-b border-white/10 safe-area-pt z-50">
      <div className="flex items-center gap-3 p-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Download className="w-5 h-5" />
            <h3 className="font-semibold">Install App</h3>
          </div>

          {install.isIOS ? (
            <div className="text-sm text-white/60">
              Tap <Share className="inline w-4 h-4" /> then &quot;Add to Home Screen&quot;
            </div>
          ) : (
            <p className="text-sm text-white/60">
              Install this app for a better experience
            </p>
          )}
        </div>

        <div className="flex gap-2">
          {!install.isIOS && (
            <button
              onClick={handleInstall}
              className="px-4 py-2 bg-white text-black rounded-lg font-medium hover:bg-white/90 transition-colors"
            >
              Install
            </button>
          )}
          <button
            onClick={handleDismiss}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Dismiss"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
