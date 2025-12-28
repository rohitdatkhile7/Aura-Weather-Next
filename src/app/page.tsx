// app/page.tsx - UPDATED to use all created components
"use client";

import { useEffect } from "react";
import Navbar from "@/components/NavBar";
import BackgroundVideo from "@/components/BackgroundVideo";
import CurrentWeather from "@/components/CurrentWeather";
import HourlyForecast from "@/components/HourlyForecast";
import DailyForecast from "@/components/DailyForecast";
import AIVibeSection from "@/components/AIVibeSection";
import ErrorMessage from "@/components/ErrorMessage"; 
import Footer from "@/components/Footer"; 
import { useWeather } from "@/hooks/useWeather"; 
import { useGeolocation } from "@/hooks/useGeoLocation"; 
import { getWeatherVideo } from "@/utils/service";
import { DEFAULT_LOCATION } from "@/types/constants"; 

export default function Home() {
  // ✅ Using custom hooks instead of useState
  const {
    weatherData,
    location,
    loading,
    error,
    fetchWeather,
    searchCity,
    clearError,
  } = useWeather();

  const {
    latitude,
    longitude,
    error: geoError,
  } = useGeolocation();

  // Fetch weather when geolocation is available
  useEffect(() => {
    if (latitude && longitude) {
      fetchWeather(latitude, longitude);
    } else if (geoError) {
      // Fallback to default location (Mumbai)
      fetchWeather(
        DEFAULT_LOCATION.latitude,
        DEFAULT_LOCATION.longitude,
        DEFAULT_LOCATION.city,
        DEFAULT_LOCATION.countryCode
      );
    }
  }, [latitude, longitude, geoError]);

  const backgroundVideo = weatherData
    ? getWeatherVideo(weatherData.current.weather_code)
    : "";
 
  return (
    <div className="min-h-screen relative">
      <BackgroundVideo videoSrc={backgroundVideo} />
      
      {/* Navbar with search functionality */}
      <Navbar onSearch={searchCity} />

      <div className="h-16 md:h-20" />

      <main className="my-2 md:my-0 px-4 pb-8 relative z-10">
        {/* ✅ NEW: Using ErrorMessage component */}
        <ErrorMessage 
          message={error} 
          onClose={clearError}
          duration={5000}
        />

        <CurrentWeather
          weatherData={weatherData}
          location={location}
          loading={loading}
        />

        <HourlyForecast weatherData={weatherData} loading={loading} />

        <DailyForecast weatherData={weatherData} loading={loading} />

        <AIVibeSection weatherData={weatherData} location={location} />
      </main>

      {/* ✅ NEW: Using Footer component */}
      <Footer />
    </div>
  );
}