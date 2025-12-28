// components/WeatherIcon.tsx
"use client";

import { useState } from "react";
import Image from "next/image";

interface WeatherIconProps {
  src: string;
  alt: string;
  size?: number;
  className?: string;
  animate?: boolean;
}

export default function WeatherIcon({
  src,
  alt,
  size = 96,
  className = "",
  animate = true,
}: WeatherIconProps) {
  const [imageError, setImageError] = useState(false);

  const fallbackIcon = "https://img.icons8.com/color/96/cloud.png";

  return (
    <div className={`relative ${className}`}>
      <Image
        src={imageError ? fallbackIcon : src}
        alt={alt}
        width={size}
        height={size}
        onError={() => setImageError(true)}
        className={`${
          animate
            ? "drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] transition-transform duration-500 hover:scale-110 hover:rotate-6"
            : ""
        }`}
      />
    </div>
  );
}