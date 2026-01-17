'use client';

import { usePWA } from '@/components/pwa/pwa-providers';

export default function PWADemoPage() {
  const { install, network, update, visibility, display } = usePWA();

  return (
    <div className="fullscreen-container min-h-screen p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-8">PWA State Dashboard</h1>

      {/* Installation Status */}
      <section className="p-4 border border-border rounded-lg">
        <h2 className="text-xl font-semibold mb-3">Installation</h2>
        <div className="space-y-2 text-sm">
          <div>Installable: <span className="font-mono">{install.isInstallable ? '✅' : '❌'}</span></div>
          <div>Installed: <span className="font-mono">{install.isInstalled ? '✅' : '❌'}</span></div>
          <div>iOS Device: <span className="font-mono">{install.isIOS ? '✅' : '❌'}</span></div>
          <div>Standalone Mode: <span className="font-mono">{install.isStandalone ? '✅' : '❌'}</span></div>
        </div>
      </section>

      {/* Network Status */}
      <section className="p-4 border border-border rounded-lg">
        <h2 className="text-xl font-semibold mb-3">Network</h2>
        <div className="space-y-2 text-sm">
          <div>Online: <span className="font-mono">{network.isOnline ? '✅' : '❌'}</span></div>
          <div>Connection Type: <span className="font-mono">{network.effectiveType}</span></div>
          <div>Downlink: <span className="font-mono">{network.downlink} Mbps</span></div>
          <div>RTT: <span className="font-mono">{network.rtt} ms</span></div>
          <div>Slow Connection: <span className="font-mono">{network.isSlowConnection ? '⚠️' : '✅'}</span></div>
          <div>Data Saver: <span className="font-mono">{network.saveData ? '✅' : '❌'}</span></div>
        </div>
      </section>

      {/* Update Status */}
      <section className="p-4 border border-border rounded-lg">
        <h2 className="text-xl font-semibold mb-3">Updates</h2>
        <div className="space-y-2 text-sm">
          <div>Update Available: <span className="font-mono">{update.updateAvailable ? '✅' : '❌'}</span></div>
          <div>Updating: <span className="font-mono">{update.isUpdating ? '⏳' : '❌'}</span></div>
          {update.updateAvailable && (
            <button
              onClick={update.applyUpdate}
              className="mt-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg"
            >
              Apply Update
            </button>
          )}
        </div>
      </section>

      {/* Visibility State */}
      <section className="p-4 border border-border rounded-lg">
        <h2 className="text-xl font-semibold mb-3">App Visibility</h2>
        <div className="space-y-2 text-sm">
          <div>State: <span className="font-mono">{visibility.visibilityState}</span></div>
          <div>Visible: <span className="font-mono">{visibility.isVisible ? '✅' : '❌'}</span></div>
          <div>Active: <span className="font-mono">{visibility.isActive ? '✅' : '❌'}</span></div>
          <div>Hidden: <span className="font-mono">{visibility.isHidden ? '✅' : '❌'}</span></div>
        </div>
      </section>

      {/* Display Mode */}
      <section className="p-4 border border-border rounded-lg">
        <h2 className="text-xl font-semibold mb-3">Display Mode</h2>
        <div className="space-y-2 text-sm">
          <div>Mode: <span className="font-mono">{display.displayMode}</span></div>
          <div>Fullscreen: <span className="font-mono">{display.isFullscreen ? '✅' : '❌'}</span></div>
          <div>Standalone: <span className="font-mono">{display.isStandalone ? '✅' : '❌'}</span></div>
          <div>Browser: <span className="font-mono">{display.isBrowser ? '✅' : '❌'}</span></div>
          <div>Orientation: <span className="font-mono">{display.orientation}</span></div>
          <div className="mt-3">
            <div className="font-semibold mb-1">Safe Area Insets:</div>
            <div className="ml-4 space-y-1">
              <div>Top: <span className="font-mono">{display.safeAreaInsets.top}px</span></div>
              <div>Right: <span className="font-mono">{display.safeAreaInsets.right}px</span></div>
              <div>Bottom: <span className="font-mono">{display.safeAreaInsets.bottom}px</span></div>
              <div>Left: <span className="font-mono">{display.safeAreaInsets.left}px</span></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
