export type GeocodingResponseDTO = {
  generationtime_ms: number;
  results: Result[];
};

type Result = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  elevation?: number;
  feature_code: string;
  country_code: string;
  admin1_id: number;
  admin2_id?: number;
  timezone: string;
  population?: number;
  country_id: number;
  country: string;
  admin1: string;
  admin2?: string;
  postcodes?: string[];
  admin3_id?: number;
  admin3?: string;
};

export type UserLocation = {
  lat: string;
  lng: string;
};
