// components/DailyForecast.tsx
"use client";

import { WeatherData } from "@/types/types";
import { DailyForecastSkeleton } from "./SkeletonLoader";
import { getWeatherIcon } from "@/utils/service";
import Image from "next/image";

interface DailyForecastProps {
  weatherData: WeatherData | null;
  loading: boolean;
}

export default function DailyForecast({
  weatherData,
  loading,
}: DailyForecastProps) {
  if (loading || !weatherData) {
    return <DailyForecastSkeleton />;
  }

  const { time, temperature_2m_max, temperature_2m_min, weather_code } =
    weatherData.daily;

  const dailyData = [];
  for (let i = 1; i < Math.min(6, time.length); i++) {
    const day = new Date(time[i]).toLocaleDateString("en-US", {
      weekday: "short",
    });

    dailyData.push({
      day,
      maxTemp: Math.round(temperature_2m_max[i]),
      minTemp: Math.round(temperature_2m_min[i]),
      icon: getWeatherIcon(weather_code[i]),
    });
  }

  return (
    <div className="glass-container max-w-6xl mx-auto p-6 md:p-8 mb-6 fade-in">
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <i className="fas fa-calendar-week mr-2"></i> 5-Day Forecast
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 text-center">
        {dailyData.map((day, index) => (
          <div
            key={index}
            className="glass-item p-3 flex flex-col items-center justify-center transition-all duration-300 hover:shadow-lg hover:scale-105"
          >
            <h5 className="font-medium text-purple-200 mb-1 text-sm">
              {day.day}
            </h5>
            <Image
              width={40}
              height={40}
              src={day.icon}
              className="w-10 h-10 my-1 transition-transform duration-300"
              alt="icon"
            />
            <div className="flex gap-2 text-sm">
              <span className="font-bold">{day.maxTemp}°</span>
              <span className="text-white/60">{day.minTemp}°</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}