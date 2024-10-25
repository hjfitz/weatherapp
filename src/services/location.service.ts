import { GeocodingResponseDTO, UserLocation } from "@/types/geocoding.types";
import axios, { AxiosInstance } from "axios";

export class LocationService {
  private readonly apiBase: AxiosInstance;

  constructor() {
    this.apiBase = axios.create({
      baseURL: "https://geocoding-api.open-meteo.com/v1",
      headers: {
        Accept: "application/json",
      },
    });
  }

  public async searchLocation(query: string): Promise<UserLocation | null> {
    const { data } = await this.apiBase.get<GeocodingResponseDTO>("/search", {
      params: {
        name: query,
      },
    });

    // return the most relevant result
    if (data.results[0]) {
      const { latitude, longitude } = data.results[0];
      return {
        lat: latitude.toString(),
        lng: longitude.toString(),
      };
    }
    return null;
  }
}
