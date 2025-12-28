"use client";

import { useMemo } from "react";

interface AmbientLightProps {
  color?: string; // rgba() string with alpha
}

// Full-screen ambient glow overlay that sits above the background video
// but below the main glass containers.
export default function AmbientLight({ color }: AmbientLightProps) {
  const style = useMemo(() => {
    const c = color || "rgba(129, 140, 248, 0.9)"; // fallback indigo

    // Softer ambient glow: smaller radius + lower overall opacity
    return {
      background:
        `radial-gradient(circle at 15% 0%, ${c} 0, transparent 55%),` +
        `radial-gradient(circle at 85% 100%, ${c} 0, transparent 55%),` +
        `radial-gradient(circle at 50% 50%, ${c} 0, transparent 70%)`,
      opacity: 0.45,
    } as React.CSSProperties;
  }, [color]);

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-20 transition-all duration-700 ease-out mix-blend-screen"
      style={style}
    />
  );
}
