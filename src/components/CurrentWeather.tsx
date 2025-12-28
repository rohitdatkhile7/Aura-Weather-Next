// components/CurrentWeather.tsx
"use client";

import { useState, useEffect } from "react";
import { WeatherData, LocationData } from "@/types/types";
import { CurrentWeatherSkeleton } from "./SkeletonLoader";
import {
  getWeatherDescription,
  getWeatherIcon,
  getUvIndexDescription,
  getAqiDescription,
  calculateFeelsLikeTemp,
  formatTime,
} from "@/utils/service";
import Image from "next/image";

interface CurrentWeatherProps {
  weatherData: WeatherData | null;
  location: LocationData | null;
  loading: boolean;
}

export default function CurrentWeather({
  weatherData,
  location,
  loading,
}: CurrentWeatherProps) {
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

  if (loading || !weatherData || !location) {
    return <CurrentWeatherSkeleton />;
  }

  const { current, daily } = weatherData;
  const feelsLike = calculateFeelsLikeTemp(
    current.temperature_2m,
    current.relative_humidity_2m,
    current.wind_speed_10m
  );

  return (
    <div className="glass-container max-w-6xl mx-auto p-6 md:p-8 mb-6 fade-in">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Location & Condition */}
        <div className="text-center lg:text-left">
          <h1 className="text-4xl font-bold mb-2">
            {location.city}, {location.countryCode}
          </h1>
          <p className="text-xl text-white/80 mb-4">
            {getWeatherDescription(current.weather_code)}
          </p>
          <div className="flex flex-wrap justify-center lg:justify-start gap-3 mt-4">
            <span className="glass-item px-3 py-1 text-sm">
              <i className="fas fa-calendar-day mr-2"></i>
              {currentDate}
            </span>
            <span className="glass-item px-3 py-1 text-sm">
              <i className="fas fa-clock mr-2"></i>
              {currentTime}
            </span>
          </div>
        </div>

        {/* Temperature & Icon */}
        <div className="flex items-center gap-4">
          <Image
            width={100}
            height={100}
            src={getWeatherIcon(current.weather_code)}
            alt="Weather icon"
            className="w-24 h-24 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] transition-transform duration-500 hover:scale-110 hover:rotate-6"
          />
          <div className="text-center">
            <p className="text-7xl font-bold">
              {Math.round(current.temperature_2m)}°
            </p>
            <p className="text-sm text-white/70">
              Feels like {Math.round(feelsLike)}°
            </p>
          </div>
        </div>
      </div>

      {/* Weather Details Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 text-center mt-8">
        <div className="glass-item p-4 transition-transform duration-300">
          <i className="fas fa-droplet text-blue-300 mb-2"></i>
          <h5>Humidity</h5>
          <p className="font-bold text-lg">{current.relative_humidity_2m}%</p>
        </div>
        <div className="glass-item p-4 transition-transform duration-300">
          <i className="fas fa-wind text-gray-300 mb-2"></i>
          <h5>Wind</h5>
          <p className="font-bold text-lg">{current.wind_speed_10m} km/h</p>
        </div>
        <div className="glass-item p-4 transition-transform duration-300">
          <i className="fas fa-sun text-yellow-300 mb-2"></i>
          <h5>UV Index</h5>
          <p className="font-bold text-lg">
            {Math.round(current.uv_index)} (
            {getUvIndexDescription(current.uv_index)})
          </p>
        </div>
        <div className="glass-item p-4 transition-transform duration-300">
          <i className="fas fa-lungs text-green-300 mb-2"></i>
          <h5>AQI</h5>
          <p className="font-bold text-lg">
            {current.us_aqi !== undefined
              ? `${current.us_aqi} (${getAqiDescription(current.us_aqi)})`
              : "N/A"}
          </p>
        </div>
        <div className="glass-item p-4 transition-transform duration-300">
          <i className="fas fa-sun text-orange-300 mb-2"></i>
          <h5>Sunrise</h5>
          <p className="font-bold text-lg">{formatTime(daily.sunrise[0])}</p>
        </div>
        <div className="glass-item p-4 transition-transform duration-300">
          <i className="fas fa-moon text-indigo-300 mb-2"></i>
          <h5>Sunset</h5>
          <p className="font-bold text-lg">{formatTime(daily.sunset[0])}</p>
        </div>
      </div>
    </div>
  );
}