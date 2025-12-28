// components/WeatherCard.tsx
"use client";

import { ReactNode } from "react";

interface WeatherCardProps {
  children: ReactNode;
  title?: string;
  icon?: string;
  className?: string;
}

export default function WeatherCard({
  children,
  title,
  icon,
  className = "",
}: WeatherCardProps) {
  return (
    <div className={`glass-container p-6 md:p-8 mb-6 fade-in ${className}`}>
      {title && (
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          {icon && <i className={`${icon} mr-2`}></i>}
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}