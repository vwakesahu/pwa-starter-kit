'use client';

import { ThemeToggle } from '@/components/theme-toggle';

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold">Shielded Wallet PWA</h1>
        <p className="text-muted-foreground">
          Production-ready Progressive Web App
        </p>

        <div className="flex items-center justify-center gap-4">
          <ThemeToggle />
          <span className="text-sm text-muted-foreground">Toggle theme</span>
        </div>
      </div>
    </div>
  );
}