// lib/constants.ts

// Default fallback location (Mumbai)
export const DEFAULT_LOCATION = {
  latitude: 19.076,
  longitude: 72.8777,
  city: "Mumbai",
  countryCode: "IN",
};

// Weather code descriptions
export const WEATHER_CODES = {
  0: "Clear",
  1: "Mainly Clear",
  2: "Partly Cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Rime Fog",
  51: "Light Drizzle",
  53: "Drizzle",
  55: "Dense Drizzle",
  61: "Slight Rain",
  63: "Rain",
  65: "Heavy Rain",
  71: "Light Snow",
  73: "Snow",
  75: "Heavy Snow",
  80: "Showers",
  81: "Heavy Showers",
  95: "Thunderstorm",
  96: "Thunderstorm + Hail",
} as const;

// Weather icons mapping
export const WEATHER_ICONS = {
  clear: "https://img.icons8.com/color/96/sun--v1.png",
  cloudy: "https://img.icons8.com/color/96/cloud.png",
  fog: "https://img.icons8.com/color/96/fog-day.png",
  rain: "https://img.icons8.com/color/96/rain.png",
  snow: "https://img.icons8.com/color/96/snow.png",
  storm: "https://img.icons8.com/color/96/storm.png",
} as const;

// Video backgrounds for weather conditions
export const WEATHER_VIDEOS = {
  clear: "https://res.cloudinary.com/dnhm4glyx/video/upload/v1754644015/sunny_weather_hmhd8d.mp4",
  cloudy: "https://res.cloudinary.com/dnhm4glyx/video/upload/v1754643965/cloudy_weather_ub0bue.mp4",
  fog: "https://res.cloudinary.com/dnhm4glyx/video/upload/v1754644156/fog_qwtjpm.mp4",
  rain: "https://res.cloudinary.com/dnhm4glyx/video/upload/v1754644213/forest_fog_psg0no.mp4",
  snow: "https://cdn.pixabay.com/video/2022/11/18/139519-772542591_large.mp4",
  storm: "https://cdn.pixabay.com/video/2023/04/30/161060-822582126_large.mp4",
  default: "https://res.cloudinary.com/dnhm4glyx/video/upload/v1754643992/clear_weather_d8c80n.mp4",
} as const;

// UV Index levels
export const UV_INDEX_LEVELS = [
  { max: 2, label: "Low", color: "text-green-400" },
  { max: 5, label: "Moderate", color: "text-yellow-400" },
  { max: 7, label: "High", color: "text-orange-400" },
  { max: 10, label: "Very High", color: "text-red-400" },
  { max: Infinity, label: "Extreme", color: "text-purple-400" },
] as const;

// AQI levels
export const AQI_LEVELS = [
  { max: 50, label: "Good", color: "text-green-400" },
  { max: 100, label: "Moderate", color: "text-yellow-400" },
  { max: 150, label: "Unhealthy-ish", color: "text-orange-400" },
  { max: Infinity, label: "Unhealthy", color: "text-red-400" },
] as const;

// API Configuration
export const API_CONFIG = {
  OPEN_METEO_BASE: "https://api.open-meteo.com/v1",
  GEOCODING_BASE: "https://geocoding-api.open-meteo.com/v1",
  NOMINATIM_BASE: "https://nominatim.openstreetmap.org",
  GEMINI_BASE: "https://generativelanguage.googleapis.com/v1beta",
  GEMINI_MODEL: "gemini-3-flash-preview",
} as const;

// Cache durations (in seconds)
export const CACHE_DURATIONS = {
  WEATHER: 300, // 5 minutes
  GEOCODING: 86400, // 24 hours
} as const;

// Update intervals
export const UPDATE_INTERVALS = {
  DATE_TIME: 60000, // 1 minute
  WEATHER: 300000, // 5 minutes
} as const;

// Animation durations
export const ANIMATIONS = {
  FADE_IN: 500,
  SLIDE_UP: 600,
  SKELETON: 2000,
} as const;

// Breakpoints (matching Tailwind)
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;