// app/manifest.ts (Next.js 13+ App Router)
import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Your App Name",
    short_name: "App",
    description: "Your app description",
    start_url: "/",
    display: "fullscreen", // 'standalone' | 'fullscreen' | 'minimal-ui'
    orientation: "portrait", // or 'landscape' or 'any'
    background_color: "#000000",
    theme_color: "#000000",
    icons: [
      {
        src: "/icons/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icons/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
