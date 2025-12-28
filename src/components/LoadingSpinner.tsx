// components/LoadingSpinner.tsx
"use client";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  text?: string;
  className?: string;
}

export default function LoadingSpinner({
  size = "md",
  text = "Loading...",
  className = "",
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-20 h-20",
    lg: "w-28 h-28",
  };

  const iconSizes = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl",
  };

  const sparkleSizes = {
    sm: { s1: "text-xs", s2: "text-xs", s3: "text-[0.5rem]" },
    md: { s1: "text-base", s2: "text-sm", s3: "text-xs" },
    lg: { s1: "text-xl", s2: "text-lg", s3: "text-sm" },
  };

  return (
    <div className={`flex flex-col items-center justify-center gap-6 py-12 ${className}`}>
      {/* Orbital System */}
      <div className={`relative ${sizeClasses[size]} flex justify-center items-center`}>
        {/* Outer Ring - Purple/Blue */}
        <div className="absolute w-full h-full border-2 border-transparent border-t-purple-500 border-r-blue-500 rounded-full outer-ring opacity-80 shadow-[0_0_15px_rgba(168,85,247,0.2)]"></div>

        {/* Inner Ring - Pink/Gold (Reverse Spin) */}
        <div className="absolute w-[70%] h-[70%] border-2 border-transparent border-b-pink-500 border-l-yellow-500 rounded-full inner-ring opacity-90"></div>

        {/* Core Icon */}
        <i
          className={`fas fa-robot ${iconSizes[size]} text-purple-200 core-icon drop-shadow-[0_0_5px_rgba(192,132,252,0.5)] z-10`}
        ></i>

        {/* Sparkles */}
        <span
          className={`sparkle s1 absolute -top-2 right-0 text-yellow-300 ${sparkleSizes[size].s1}`}
        >
          ✨
        </span>
        <span
          className={`sparkle s2 absolute bottom-1 -left-2 text-purple-500 ${sparkleSizes[size].s2}`}
        >
          ✦
        </span>
        <span
          className={`sparkle s3 absolute top-1/2 -right-4 text-pink-500 ${sparkleSizes[size].s3}`}
        >
          ✴
        </span>
      </div>

      {/* Loading Text */}
      <div className="relative overflow-hidden">
        <span
          className="text-lg font-medium bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent"
          style={{
            backgroundSize: "200% auto",
            animation: "gradient-flow 3s linear infinite",
          }}
        >
          {text}
        </span>
      </div>
    </div>
  );
}