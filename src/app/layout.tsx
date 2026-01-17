import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { PWAProviders } from "@/components/pwa/pwa-providers";
import { InstallPrompt } from "@/components/pwa/install-prompt";
import { UpdatePrompt } from "@/components/pwa/update-prompt";
import { OfflineIndicator } from "@/components/pwa/offline-indicator";
import { AppBar } from "@/components/app-bar";
import { siteConfig } from "@/lib/constants";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: siteConfig.viewport.width,
  initialScale: siteConfig.viewport.initialScale,
  maximumScale: siteConfig.viewport.maximumScale,
  userScalable: siteConfig.viewport.userScalable,
  viewportFit: siteConfig.viewport.viewportFit,
};

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  appleWebApp: {
    capable: siteConfig.apple.capable,
    statusBarStyle: siteConfig.apple.statusBarStyle,
    title: siteConfig.apple.title,
  },
  formatDetection: {
    telephone: siteConfig.formatDetection.telephone,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          <PWAProviders>
            <OfflineIndicator />
            <UpdatePrompt />
            <InstallPrompt />
            <AppBar />
            {children}
          </PWAProviders>
        </ThemeProvider>
      </body>
    </html>
  );
}
