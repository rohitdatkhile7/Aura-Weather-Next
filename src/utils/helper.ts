/* eslint-disable @typescript-eslint/no-explicit-any */
import { AQI_LEVELS, UV_INDEX_LEVELS } from './../types/constants';
/**
 * Get color class for UV index
 */
export function getUvIndexColor(uv: number): string {
  const level = UV_INDEX_LEVELS.find((l) => uv <= l.max);
  return level?.color || "text-gray-400";
}

/**
 * Get color class for AQI
 */
export function getAqiColor(aqi: number): string {
  const level = AQI_LEVELS.find((l) => aqi <= l.max);
  return level?.color || "text-gray-400";
}

/**
 * Convert Celsius to Fahrenheit
 */
export function celsiusToFahrenheit(celsius: number): number {
  return (celsius * 9) / 5 + 32;
}

/**
 * Convert Fahrenheit to Celsius
 */
export function fahrenheitToCelsius(fahrenheit: number): number {
  return ((fahrenheit - 32) * 5) / 9;
}

/**
 * Format temperature with unit
 */
export function formatTemperature(
  temp: number,
  unit: "C" | "F" = "C",
  decimals: number = 0
): string {
  return `${temp.toFixed(decimals)}°${unit}`;
}

/**
 * Get wind direction from degrees
 */
export function getWindDirection(degrees: number): string {
  const directions = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
}

/**
 * Convert wind speed from km/h to mph
 */
export function kmhToMph(kmh: number): number {
  return kmh * 0.621371;
}

/**
 * Get time of day (morning, afternoon, evening, night)
 */
export function getTimeOfDay(date: Date = new Date()): string {
  const hour = date.getHours();
  if (hour >= 5 && hour < 12) return "morning";
  if (hour >= 12 && hour < 17) return "afternoon";
  if (hour >= 17 && hour < 21) return "evening";
  return "night";
}

/**
 * Check if it's daytime based on sunrise/sunset
 */
export function isDaytime(
  currentTime: Date,
  sunrise: string,
  sunset: string
): boolean {
  const current = currentTime.getTime();
  const sunriseTime = new Date(sunrise).getTime();
  const sunsetTime = new Date(sunset).getTime();
  return current >= sunriseTime && current <= sunsetTime;
}

/**
 * Format relative time (e.g., "in 2 hours", "3 days ago")
 */
export function getRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = date.getTime() - now.getTime();
  const diffMins = Math.round(diffMs / 60000);
  const diffHours = Math.round(diffMs / 3600000);
  const diffDays = Math.round(diffMs / 86400000);

  if (Math.abs(diffMins) < 60) {
    return diffMins === 0
      ? "now"
      : diffMins > 0
      ? `in ${diffMins} min`
      : `${Math.abs(diffMins)} min ago`;
  }

  if (Math.abs(diffHours) < 24) {
    return diffHours > 0
      ? `in ${diffHours} hour${diffHours !== 1 ? "s" : ""}`
      : `${Math.abs(diffHours)} hour${Math.abs(diffHours) !== 1 ? "s" : ""} ago`;
  }

  return diffDays > 0
    ? `in ${diffDays} day${diffDays !== 1 ? "s" : ""}`
    : `${Math.abs(diffDays)} day${Math.abs(diffDays) !== 1 ? "s" : ""} ago`;
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Throttle function
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Check if device is mobile
 */
export function isMobile(): boolean {
  if (typeof window === "undefined") return false;
  return window.innerWidth < 768;
}

/**
 * Check if browser supports geolocation
 */
export function supportsGeolocation(): boolean {
  return typeof navigator !== "undefined" && "geolocation" in navigator;
}

/**
 * Format number with comma separators
 */
export function formatNumber(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * Clamp a number between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Generate a unique ID
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Parse markdown-like text to HTML (basic)
 */
export function parseSimpleMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/\n/g, "<br>");
}