export const siteConfig = {
  // Site Identity
  name: "Comfy",
  shortName: "Comfy",
  description: "",
  url: "https://comfy.inco.org",

  // PWA Configuration
  pwa: {
    startUrl: "/",
    display: "fullscreen" as const, // 'standalone' | 'fullscreen' | 'minimal-ui' | 'browser'
    orientation: "portrait" as const, // 'portrait' | 'landscape' | 'any'
    backgroundColor: "#000000",
    themeColor: "#000000",

    // Icon Configuration
    icons: {
      icon192: "/icons/web-app-manifest-192x192.png",
      icon512: "/icons/web-app-manifest-512x512.png",
    },
  },

  // Apple Specific Configuration
  apple: {
    capable: true,
    statusBarStyle: "black-translucent" as const, // 'default' | 'black' | 'black-translucent'
    title: "Shielded Wallet",
  },

  // Viewport Configuration
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: "cover" as const,
  },

  // Format Detection
  formatDetection: {
    telephone: false,
  },
} as const;

// Type exports for TypeScript
export type SiteConfig = typeof siteConfig;
export type PWADisplay = typeof siteConfig.pwa.display;
export type PWAOrientation = typeof siteConfig.pwa.orientation;
export type AppleStatusBarStyle = typeof siteConfig.apple.statusBarStyle;
