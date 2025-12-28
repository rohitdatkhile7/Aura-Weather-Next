/* eslint-disable @typescript-eslint/no-explicit-any */

// hooks/useWeather.ts
import { useState } from "react";
import { WeatherData, LocationData } from "@/types/types";
import { fetchWeatherData, geocodeCity, reverseGeocode } from "@/utils/weather";

export function useWeather() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [location, setLocation] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (
    lat: number,
    lon: number,
    city?: string,
    countryCode?: string
  ) => {
    setLoading(true);
    setError(null);

    try {
      const weather = await fetchWeatherData(lat, lon, countryCode);

      if (!city || !countryCode) {
        const geoData = await reverseGeocode(lat, lon);
        city = geoData.city;
        countryCode = geoData.countryCode;
      }

      setWeatherData(weather);
      setLocation({
        latitude: lat,
        longitude: lon,
        city: city,
        countryCode: countryCode,
      });
    } catch (err: any) {
      setError(err.message || "Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  const searchCity = async (cityName: string) => {
    setLoading(true);
    setError(null);

    try {
      const geoData = await geocodeCity(cityName);

      if (geoData.results && geoData.results.length > 0) {
        const result = geoData.results[0];
        await fetchWeather(
          result.latitude,
          result.longitude,
          result.name,
          result.country_code.toUpperCase()
        );
      } else {
        setError(`Could not find location: "${cityName}"`);
      }
    } catch (err: any) {
      setError(err.message || "Search failed. Please check spelling.");
    } finally {
      setLoading(false);
    }
  };

  return {
    weatherData,
    location,
    loading,
    error,
    fetchWeather,
    searchCity,
    clearError: () => setError(null),
  };
}