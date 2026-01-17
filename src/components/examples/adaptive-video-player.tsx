'use client';

import { usePWA } from '../pwa/pwa-providers';
import { useRef, useEffect, useState } from 'react';
import { Play, Pause, WifiOff } from 'lucide-react';

interface VideoPlayerProps {
  src: string;
  poster?: string;
}

/**
 * Adaptive Video Player
 * - Pauses when app is hidden
 * - Disables autoplay on slow connections
 * - Shows offline message
 * - Respects data saver mode
 */
export function AdaptiveVideoPlayer({ src, poster }: VideoPlayerProps) {
  const { network, visibility } = usePWA();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Pause video when app is hidden
  useEffect(() => {
    if (!visibility.isVisible && videoRef.current && !videoRef.current.paused) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [visibility.isVisible]);

  // Pause video when going offline
  useEffect(() => {
    if (!network.isOnline && videoRef.current && !videoRef.current.paused) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [network.isOnline]);

  const togglePlay = () => {
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Don't load video on slow connection or data saver mode
  if (network.saveData || network.isSlowConnection) {
    return (
      <div className="relative aspect-video bg-muted rounded-lg flex items-center justify-center">
        <div className="text-center p-4">
          <WifiOff className="w-12 h-12 mx-auto mb-2 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            Video disabled on slow connection
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {network.saveData ? 'Data saver is on' : 'Slow network detected'}
          </p>
        </div>
      </div>
    );
  }

  if (!network.isOnline) {
    return (
      <div className="relative aspect-video bg-muted rounded-lg flex items-center justify-center">
        <div className="text-center p-4">
          <WifiOff className="w-12 h-12 mx-auto mb-2 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            Video unavailable offline
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative aspect-video bg-black rounded-lg overflow-hidden group">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="w-full h-full"
        playsInline
        preload={network.isSlowConnection ? 'none' : 'metadata'}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <button
        onClick={togglePlay}
        className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label={isPlaying ? 'Pause' : 'Play'}
      >
        {isPlaying ? (
          <Pause className="w-16 h-16 text-white" />
        ) : (
          <Play className="w-16 h-16 text-white" />
        )}
      </button>

      {network.effectiveType && (
        <div className="absolute top-2 right-2 px-2 py-1 bg-black/70 rounded text-xs text-white">
          {network.effectiveType.toUpperCase()}
        </div>
      )}
    </div>
  );
}
