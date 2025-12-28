// components/DateTimeDisplay.tsx
"use client";

import { useState, useEffect } from "react";

interface DateTimeDisplayProps {
  className?: string;
}

export default function DateTimeDisplay({ className = "" }: DateTimeDisplayProps) {
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setCurrentDate(
        now.toLocaleDateString("en-US", {
          weekday: "long",
          month: "short",
          day: "numeric",
        })
      );
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`flex flex-wrap justify-center lg:justify-start gap-3 ${className}`}>
      <span className="glass-item px-3 py-1 text-sm flex items-center gap-2">
        <i className="fas fa-calendar-day"></i>
        <span>{currentDate || "Loading..."}</span>
      </span>
      <span className="glass-item px-3 py-1 text-sm flex items-center gap-2">
        <i className="fas fa-clock"></i>
        <span>{currentTime || "Loading..."}</span>
      </span>
    </div>
  );
}