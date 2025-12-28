// components/ErrorMessage.tsx
"use client";

import { useEffect, useState } from "react";

interface ErrorMessageProps {
  message: string | null;
  duration?: number;
  onClose?: () => void;
}

export default function ErrorMessage({
  message,
  duration = 5000,
  onClose,
}: ErrorMessageProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let rafId: number | null = null;
    let timerId: number | null = null;

    if (message) {
      // schedule enter animation on next frame to avoid synchronous setState in effect
      rafId = requestAnimationFrame(() => setIsVisible(true));

      timerId = window.setTimeout(() => {
        setIsVisible(false);
        if (onClose) {
          // Wait for fade-out animation
          window.setTimeout(onClose, 300);
        }
      }, duration);
    } else {
      // schedule hide on next frame to avoid synchronous setState in effect
      rafId = requestAnimationFrame(() => setIsVisible(false));
    }

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      if (timerId !== null) clearTimeout(timerId);
    };
  }, [message, duration, onClose]);

  if (!message) return null;

  return (
    <div
      className={`max-w-6xl mx-auto mb-6 transition-all duration-300 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
      }`}
    >
      <div className="bg-red-500/70 backdrop-blur-md text-white text-center p-4 rounded-xl border border-red-400/30 shadow-lg shadow-red-500/20 fade-in">
        <div className="flex items-center justify-center gap-3">
          <i className="fas fa-exclamation-triangle text-xl"></i>
          <p className="font-medium">{message}</p>
          <button
            onClick={() => {
              setIsVisible(false);
              if (onClose) {
                setTimeout(onClose, 300);
              }
            }}
            className="ml-2 hover:bg-white/10 rounded-full w-6 h-6 flex items-center justify-center transition-colors"
          >
            <i className="fas fa-times text-sm"></i>
          </button>
        </div>
      </div>
    </div>
  );
}