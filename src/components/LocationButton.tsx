// components/LocationButton.tsx
"use client";

import { useState } from "react";

interface LocationButtonProps {
  onLocationDetect: () => Promise<void>;
  className?: string;
}

export default function LocationButton({
  onLocationDetect,
  className = "",
}: LocationButtonProps) {
  const [isDetecting, setIsDetecting] = useState(false);

  const handleClick = async () => {
    setIsDetecting(true);
    try {
      await onLocationDetect();
    } finally {
      setIsDetecting(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isDetecting}
      className={`glass-item p-3 rounded-full hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      title="Detect my location"
    >
      <i
        className={`fas ${
          isDetecting ? "fa-spinner fa-spin" : "fa-location-crosshairs"
        } text-lg`}
      ></i>
    </button>
  );
}