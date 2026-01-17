'use client';

import { usePWA } from './pwa-providers';
import { RefreshCw, X } from 'lucide-react';
import { useState } from 'react';

export function UpdatePrompt() {
  const { update } = usePWA();
  const [dismissed, setDismissed] = useState(false);

  if (!update.updateAvailable || dismissed) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 bg-white text-black border-b border-black/10 p-4 safe-area-pt z-50">
      <div className="flex items-center gap-3">
        <RefreshCw className={`w-5 h-5 shrink-0 ${update.isUpdating ? 'animate-spin' : ''}`} />

        <div className="flex-1">
          <h3 className="font-semibold text-sm">Update Available</h3>
          <p className="text-xs text-black/60">
            {update.isUpdating ? 'Updating...' : 'A new version is ready'}
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={update.applyUpdate}
            disabled={update.isUpdating}
            className="px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-black/90 transition-colors disabled:opacity-50"
          >
            {update.isUpdating ? 'Updating...' : 'Update'}
          </button>
          <button
            onClick={() => setDismissed(true)}
            className="p-2 hover:bg-black/5 rounded-lg transition-colors"
            aria-label="Dismiss"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}