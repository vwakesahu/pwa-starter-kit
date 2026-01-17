# Shielded Wallet PWA

Production-ready Progressive Web App built with Next.js 16 + Turbopack.

## Quick Start

```bash
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) • Demo: [/pwa-demo](http://localhost:3000/pwa-demo)

## Project Structure

```
src/
├── components/pwa/          # PWA components (install-prompt, update-prompt, etc)
├── hooks/pwa/               # PWA hooks (use-pwa-install, use-network-status, etc)
├── components/examples/     # Example implementations
└── app/                     # Pages
```

## Usage

```tsx
'use client';
import { usePWA } from '@/components/pwa';

export default function MyPage() {
  const { install, network, update, visibility, display } = usePWA();

  return (
    <div>
      {!network.isOnline && <p>Offline</p>}
      {install.isInstallable && <button onClick={install.promptInstall}>Install</button>}
    </div>
  );
}
```

## Available States

```tsx
install.isInstallable     // Can install?
install.promptInstall()   // Trigger install
network.isOnline          // Online?
network.isSlowConnection  // Slow network?
update.updateAvailable    // Update ready?
visibility.isVisible      // App visible?
display.isFullscreen      // Fullscreen?
display.safeAreaInsets    // Safe areas (notches)
```

## Scripts

```bash
bun run dev     # Development server
bun run build   # Production build
bun start       # Start production
```

## Configuration

**Update manifest** in `src/app/manifest.ts`:
```tsx
name: "Your App Name"
theme_color: "#000000"
```

**Replace icons** in `public/icons/`:
- web-app-manifest-192x192.png
- web-app-manifest-512x512.png

## Tech Stack

- Next.js 16 (Turbopack)
- React 19
- TypeScript (non-strict)
- Tailwind CSS v4
- next-pwa
