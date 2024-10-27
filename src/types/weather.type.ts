export type WeatherResponseDTO = {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  daily_units: DailyUnits;
  daily: Daily;
};

type DailyUnits = {
  time: string;
  weather_code: string;
  temperature_2m_max: string;
  temperature_2m_min: string;
  wind_speed_10m_max: string;
};

type Daily = {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  wind_speed_10m_max: number[];
};

export type Weather = {
  date: string;
  description: string;
  temp: string;
  windSpeed: string;
};
