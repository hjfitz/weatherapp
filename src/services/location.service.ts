import { UserLocation } from "@/types/geocoding.types";
import { GeocodingResponseDTO } from "@/types/open-meteo.types";
import { sleep } from "@/util";
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
    if (data.results?.[0]) {
      const { latitude, longitude } = data.results[0];
      return {
        lat: latitude.toString(),
        lng: longitude.toString(),
      };
    }
    return null;
  }

  public getPosition(
    timeoutMs = 100,
    backoffMs = 200,
    retries = 3,
  ): Promise<UserLocation> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude.toString(),
            lng: position.coords.longitude.toString(),
          });
        },
        async (error) => {
          if (retries > 0) {
            await sleep(backoffMs);
            resolve(
              this.getPosition(timeoutMs * 2, backoffMs * 2, retries - 1),
            );
          } else {
            reject(error);
          }
        },
        { timeout: timeoutMs },
      );
    });
  }
}
