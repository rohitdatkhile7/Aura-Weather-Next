// components/TemperatureDisplay.tsx
"use client";

interface TemperatureDisplayProps {
  temperature: number;
  feelsLike?: number;
  unit?: "C" | "F";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export default function TemperatureDisplay({
  temperature,
  feelsLike,
  unit = "C",
  size = "xl",
  className = "",
}: TemperatureDisplayProps) {
  const sizeClasses = {
    sm: "text-3xl",
    md: "text-5xl",
    lg: "text-6xl",
    xl: "text-7xl",
  };

  return (
    <div className={`text-center ${className}`}>
      <p className={`${sizeClasses[size]} font-bold`}>
        {Math.round(temperature)}°{unit}
      </p>
      {feelsLike !== undefined && (
        <p className="text-sm text-white/70 mt-1">
          Feels like {Math.round(feelsLike)}°{unit}
        </p>
      )}
    </div>
  );
}