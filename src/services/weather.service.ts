import { WeatherCardProps } from "@/components/WeatherCard.component";
import { UserLocation } from "@/types/geocoding.types";
import { WeatherResponseDTO } from "@/types/weather.type";
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

  // todo: transform and return
  public async getWeather({
    lat,
    lng,
  }: UserLocation): Promise<WeatherCardProps[]> {
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

  public transformResponse(
    weatherResponseDTO: WeatherResponseDTO,
  ): WeatherCardProps[] {
    const normalisedWeather: WeatherCardProps[] = [];

    // api constract states 7 days. We only want 5
    // optimisation: check the shortedst length
    for (let i = 0; i < 5; i++) {
      // todo: parse these
      const date = format(weatherResponseDTO.daily.time[i], "EEE, do LLL");

      const description = this.deriveWeatherDescriptionFromWMOCode(
        weatherResponseDTO.daily.weather_code[i],
      );

      const maxTemp = weatherResponseDTO.daily.temperature_2m_max[i];
      const minTemp = weatherResponseDTO.daily.temperature_2m_min[i];

      const windSpeed = weatherResponseDTO.daily.wind_speed_10m_max[i];

      normalisedWeather.push({
        date,
        description,
        temp: maxTemp.toString(),
        windSpeed: windSpeed.toString(),
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
}
