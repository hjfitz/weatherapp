import { UserLocation } from "@/types/geocoding.types";
import { WeatherResponseDTO } from "@/types/open-meteo.types";
import { Weather } from "@/types/weather.type";
import axios, { AxiosInstance } from "axios";
import { format } from "date-fns/format";

export class WeatherService {
  private readonly apiBase: AxiosInstance;

  constructor() {
    this.apiBase = axios.create({
      baseURL: "https://api.open-meteo.com/v1/forecast",
      headers: {
        Accept: "application/json",
      },
    });
  }

  public async getWeather({ lat, lng }: UserLocation): Promise<Weather[]> {
    console.log(lat, lng);
    const { data } = await this.apiBase.get<WeatherResponseDTO>("/", {
      params: {
        latitude: lat,
        longitude: lng,
        daily:
          "weather_code,temperature_2m_max,temperature_2m_min,wind_speed_10m_max",
        timezone: "Europe/London",
      },
    });

    return this.transformResponse(data);
  }

  public transformResponse(weatherResponseDTO: WeatherResponseDTO): Weather[] {
    const normalisedWeather: Weather[] = [];

    // optimisation: check the shortest length
    for (let i = 0; i < 5; i++) {
      const date = format(weatherResponseDTO.daily.time[i], "EEE, do LLL");

      const wmoCode = weatherResponseDTO.daily.weather_code[i];

      const description = this.deriveWeatherDescriptionFromWMOCode(wmoCode);

      const descriptiveIcon = this.deriveWeatherIconFromWMOCode(wmoCode);

      const maxTemp = weatherResponseDTO.daily.temperature_2m_max[i];
      const minTemp = weatherResponseDTO.daily.temperature_2m_min[i];
      const avgTmp = (maxTemp + minTemp) / 2;

      const windSpeed = weatherResponseDTO.daily.wind_speed_10m_max[i];

      normalisedWeather.push({
        date,
        description,
        descriptiveIcon,
        temp: avgTmp.toFixed(2),
        windSpeed: windSpeed.toFixed(2),
      });
    }

    return normalisedWeather;
  }

  private deriveWeatherDescriptionFromWMOCode(wmoCode: number): string {
    switch (wmoCode) {
      case 0:
        return "Clear sky";
      case 1:
      case 2:
      case 3:
        return "Mainly clear, partly cloudy, or overcast";
      case 45:
      case 48:
        return "Fog or freezing fog";
      case 51:
      case 53:
      case 55:
        return "Drizzle";
      case 56:
      case 57:
        return "Freezing drizzle";
      case 61:
      case 63:
      case 65:
        return "Rain";
      case 66:
      case 67:
        return "Freezing rain";
      case 71:
      case 73:
      case 75:
      case 77:
        return "Snowfall";
      case 80:
      case 81:
      case 82:
        return "Rain and showers";
      case 85:
      case 86:
        return "Snowy showers";
      case 95:
        return "Thunderstorm";
      case 96:
      case 99:
        return "Thunderstorm with hail";
      default:
        return "Unknown weather condition!";
    }
  }

  public deriveWeatherIconFromWMOCode(wmoCode: number): string {
    switch (wmoCode) {
      case 0:
        return "☀️";
      case 1:
      case 2:
      case 3:
        return "🌤️";
      case 45:
      case 48:
        return "🌬️";
      case 51:
      case 53:
      case 55:
      case 56:
      case 57:
      case 61:
      case 63:
      case 65:
      case 66:
      case 67:
      case 80:
      case 81:
      case 82:
        return "🌧️";
      case 71:
      case 73:
      case 75:
      case 77:
        return "🌨️";
      case 85:
      case 86:
        return "🌨️";
      case 95:
      case 96:
      case 99:
        return "🌩️";
      default:
        return "⁉️";
    }
  }
}
