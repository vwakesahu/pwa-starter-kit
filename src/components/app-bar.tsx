'use client';

import { ThemeToggle } from '@/components/theme-toggle';
import { siteConfig } from '@/lib/constants';
import { Menu } from 'lucide-react';

export function AppBar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
      {/* Safe area top padding */}
      <div className="safe-area-pt" />

      {/* App bar content */}
      <div className="flex items-center justify-between h-14 safe-area-px">
        {/* Left section - Menu/Logo */}
        <div className="flex items-center gap-3">
          <button
            className="p-2 hover:bg-accent rounded-lg transition-colors"
            aria-label="Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-semibold">{siteConfig.shortName}</h1>
        </div>

        {/* Right section - Actions */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
