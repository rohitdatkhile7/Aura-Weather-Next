// lib/weather.ts
import { WeatherData, GeocodingResult } from "../types/types";

export async function fetchWeatherData(
  lat: number,
  lon: number,
  countryCode?: string
): Promise<WeatherData> {
  let currentFields = "temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,uv_index";
  if (countryCode === "US") {
    currentFields += ",us_aqi";
  }

  const apiURL = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=${currentFields}&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto`;

  const response = await fetch(apiURL, {
    next: { revalidate: 300 }, // Cache for 5 minutes
  });

  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }

  return response.json();
}

export async function geocodeCity(cityName: string): Promise<GeocodingResult> {
  const geoURL = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
    cityName
  )}&count=1&language=en&format=json`;

  const response = await fetch(geoURL);

  if (!response.ok) {
    throw new Error("Failed to geocode city");
  }

  return response.json();
}

export async function reverseGeocode(
  lat: number,
  lon: number
): Promise<{ city: string; countryCode: string }> {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
    );
    const data = await response.json();

    const city =
      data.address.city ||
      data.address.town ||
      data.address.village ||
      "Current Location";
    const countryCode = data.address.country_code?.toUpperCase() || "";

    return { city, countryCode };
  } catch (error) {
    return { city: "Current Location", countryCode: "" };
  }
}  