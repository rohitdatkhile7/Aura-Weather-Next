export interface WeatherData {
  latitude: number;
  longitude: number;
  current: {
    time: string;
    temperature_2m: number;
    relative_humidity_2m: number;
    weather_code: number;
    wind_speed_10m: number;
    uv_index: number;
    us_aqi?: number;
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    weather_code: number[];
  };
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    sunrise: string[];
    sunset: string[];
  };
}

export interface LocationData {
  latitude: number;
  longitude: number;
  city: string;
  countryCode: string;
}

export interface GeocodingResult {
  results?: Array<{
    name: string;
    latitude: number;
    longitude: number;
    country_code: string;
  }>;
}