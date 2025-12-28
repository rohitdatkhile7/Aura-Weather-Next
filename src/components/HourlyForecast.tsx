/* eslint-disable @typescript-eslint/no-explicit-any */
// components/HourlyForecast.tsx
"use client";

import { WeatherData } from "@/types/types";
import { HourlyForecastSkeleton } from "./SkeletonLoader";
import { getWeatherIcon } from "@/utils/service";
import Image from "next/image";

interface HourlyForecastProps {
  weatherData: WeatherData | null;
  loading: boolean;
}

export default function HourlyForecast({
  weatherData,
  loading,
}: HourlyForecastProps) {
  if (loading || !weatherData) {
    return <HourlyForecastSkeleton />;
  }

  const { time, temperature_2m, weather_code } = weatherData.hourly;
  const now = new Date();
  let startIndex = time.findIndex((t:any) => new Date(t) >= now);

  if (startIndex === -1) {
    return (
      <div className="glass-container max-w-6xl mx-auto p-6 md:p-8 mb-6 fade-in">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <i className="fas fa-clock mr-2"></i> Hourly Forecast
        </h3>
        <p className="text-center text-white/50">No upcoming data</p>
      </div>
    );
  }

  const hourlyData = [];
  for (let i = 0; i < 24 && startIndex < time.length; i++, startIndex++) {
    const hourTime = new Date(time[startIndex]).toLocaleTimeString("en-US", {
      hour: "numeric",
      hour12: true,
    });

    hourlyData.push({
      time: hourTime,
      temp: Math.round(temperature_2m[startIndex]),
      icon: getWeatherIcon(weather_code[startIndex]),
    });
  }

  return (
    <div className="glass-container max-w-6xl mx-auto p-6 md:p-8 mb-6 fade-in">
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <i className="fas fa-clock mr-2"></i> Hourly Forecast
      </h3>
      <div className="flex gap-4 overflow-x-auto pb-2 hourly-forecast-container">
        {hourlyData.map((hour, index) => (
          <div
            key={index}
            className="glass-item text-center flex-shrink-0 p-3 w-24 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 active:scale-95"
          >
            <h6 className="text-xs text-white/70 mb-2 font-medium">
              {hour.time}
            </h6>
            <Image
              width={20}
              height={20}
              src={hour.icon}
              className="w-8 h-8 mx-auto mb-2 transition-transform duration-300"
              alt="icon"
            />
            <p className="font-bold text-sm">{hour.temp}°</p>
          </div>
        ))}
      </div>
    </div>
  );
}