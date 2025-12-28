// lib/utils.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getWeatherVideo(code: number): string {
  if ([0, 1].includes(code)) 
    return "https://res.cloudinary.com/dnhm4glyx/video/upload/v1754644015/sunny_weather_hmhd8d.mp4";
  if ([2, 3].includes(code)) 
    return "https://res.cloudinary.com/dnhm4glyx/video/upload/v1754643965/cloudy_weather_ub0bue.mp4";
  if ([45, 48].includes(code)) 
    return "https://res.cloudinary.com/dnhm4glyx/video/upload/v1754644156/fog_qwtjpm.mp4";
  if (code >= 51 && code <= 67) 
    return "https://res.cloudinary.com/dnhm4glyx/video/upload/v1754644213/forest_fog_psg0no.mp4";
  if (code >= 71 && code <= 77) 
    return "https://cdn.pixabay.com/video/2022/11/18/139519-772542591_large.mp4";
  if (code >= 80 && code <= 99) 
    return "https://cdn.pixabay.com/video/2023/04/30/161060-822582126_large.mp4";
  return "https://res.cloudinary.com/dnhm4glyx/video/upload/v1754643992/clear_weather_d8c80n.mp4";
}

export function getWeatherDescription(code: number): string {
  const descMap: Record<number, string> = {
    0: "Clear", 1: "Mainly Clear", 2: "Partly Cloudy", 3: "Overcast",
    45: "Fog", 48: "Rime Fog", 51: "Light Drizzle", 53: "Drizzle", 
    55: "Dense Drizzle", 61: "Slight Rain", 63: "Rain", 65: "Heavy Rain",
    71: "Light Snow", 73: "Snow", 75: "Heavy Snow", 80: "Showers",
    81: "Heavy Showers", 95: "Thunderstorm", 96: "Thunderstorm + Hail"
  };
  return descMap[code] || "Weather";
}

export function getWeatherIcon(code: number): string {
  if ([0, 1].includes(code)) 
    return "https://img.icons8.com/color/96/sun--v1.png";
  if ([2, 3].includes(code)) 
    return "https://img.icons8.com/color/96/cloud.png";
  if ([45, 48].includes(code)) 
    return "https://img.icons8.com/color/96/fog-day.png";
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) 
    return "https://img.icons8.com/color/96/rain.png";
  if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) 
    return "https://img.icons8.com/color/96/snow.png";
  if (code >= 95) 
    return "https://img.icons8.com/color/96/storm.png";
  return "https://img.icons8.com/color/96/cloud.png";
}

export function getUvIndexDescription(uv: number): string {
  if (uv <= 2) return "Low";
  if (uv <= 5) return "Moderate";
  if (uv <= 7) return "High";
  if (uv <= 10) return "Very High";
  return "Extreme";
}

export function getAqiDescription(aqi: number): string {
  if (aqi <= 50) return "Good";
  if (aqi <= 100) return "Moderate";
  if (aqi <= 150) return "Unhealthy-ish";
  return "Unhealthy";
}

export function calculateFeelsLikeTemp(
  temp: number,
  humidity: number,
  windSpeed: number
): number {
  if (temp > 27 && humidity > 40) return temp + (humidity - 40) / 10;
  if (temp < 10 && windSpeed > 5) return temp - (windSpeed - 5) / 5;
  return temp;
}

export function formatTime(isoString: string): string {
  return new Date(isoString).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Ambient light color for background glow, inspired by YouTube ambient mode
// Returns an rgba() string with alpha baked in for use in gradients.
export function getAmbientColor(code: number): string {
  // Clear / mainly clear -> warm sunset glow
  if ([0, 1].includes(code)) return "rgba(251, 191, 36, 0.9)"; // amber-400

  // Partly cloudy / overcast -> cooler blue-lilac
  if ([2, 3].includes(code)) return "rgba(59, 130, 246, 0.85)"; // blue-500

  // Fog / mist
  if ([45, 48].includes(code)) return "rgba(129, 140, 248, 0.9)"; // indigo-400

  // Drizzle / light rain
  if (code >= 51 && code <= 67) return "rgba(56, 189, 248, 0.85)"; // sky-400

  // Snow
  if (code >= 71 && code <= 77) return "rgba(96, 165, 250, 0.85)"; // blue-400

  // Showers / heavy rain
  if (code >= 80 && code <= 99) return "rgba(59, 130, 246, 0.9)"; // blue-500

  // Thunderstorms
  if (code >= 95) return "rgba(168, 85, 247, 0.9)"; // purple-500

  // Default subtle purple/blue blend
  return "rgba(129, 140, 248, 0.9)";
}
