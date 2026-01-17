'use client';

import { usePWA } from '../pwa/pwa-providers';
import { useState, useEffect } from 'react';
import Image from 'next/image';

interface SmartImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
}

/**
 * Smart Image Loader
 * - Loads low-quality on slow connections
 * - Respects data saver mode
 * - Shows offline placeholder
 * - Lazy loads when not visible
 */
export function SmartImageLoader({ src, alt, width, height, priority = false }: SmartImageProps) {
  const { network, visibility } = usePWA();
  const [shouldLoad, setShouldLoad] = useState(false);

  // Determine image quality based on network
  const getImageUrl = () => {
    if (!network.isOnline) {
      return '/images/offline-placeholder.png';
    }

    if (network.saveData || network.isSlowConnection) {
      // Append quality parameter (depends on your image CDN)
      return `${src}?quality=low`;
    }

    return src;
  };

  useEffect(() => {
    // Only load when app is visible and online
    if (visibility.isVisible && (network.isOnline || priority)) {
      setShouldLoad(true);
    }
  }, [visibility.isVisible, network.isOnline, priority]);

  if (!shouldLoad && !priority) {
    return (
      <div
        className="bg-muted animate-pulse"
        style={{ width, height }}
        aria-label="Loading image"
      />
    );
  }

  return (
    <Image
      src={getImageUrl()}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      loading={priority ? 'eager' : 'lazy'}
      quality={network.saveData ? 50 : 90}
      className="transition-opacity duration-300"
    />
  );
}
