"use client";

import { useEffect, useRef } from "react";

interface BackgroundVideoProps {
  videoSrc: string;
}

export default function BackgroundVideo({ videoSrc }: BackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && videoSrc) {
      // Only reload if source actually changed to prevent flickering
      if (videoRef.current.src !== videoSrc) {
        videoRef.current.src = videoSrc;
        videoRef.current.load();
        videoRef.current.play().catch(() => {
          // Silent catch for autoplay blocks
        });
      }
    }
  }, [videoSrc]);

  return (
    <video
      id="background-video"
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      className="fixed right-0 bottom-0 w-full h-full object-cover -z-10 transition-opacity duration-700"
      style={{ zIndex: -100 }}
    />
  );
}
