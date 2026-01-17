import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/constants";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: siteConfig.pwa.startUrl,
    display: siteConfig.pwa.display,
    orientation: siteConfig.pwa.orientation,
    background_color: siteConfig.pwa.backgroundColor,
    theme_color: siteConfig.pwa.themeColor,
    icons: [
      {
        src: siteConfig.pwa.icons.icon192,
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: siteConfig.pwa.icons.icon512,
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: siteConfig.pwa.icons.icon512,
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
