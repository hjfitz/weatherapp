"use client";
import { UserLocation } from "@/types/geocoding.types";
import { Weather } from "@/types/weather.type";
import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

export type WeatherProviderProps = {
  children: React.ReactNode;
};

type WeatherContextAttributes = {
  location?: UserLocation;
  forecast: Weather[];
  errors: string | null;
  loading: boolean;
  setLocation: Dispatch<SetStateAction<UserLocation | undefined>>;
  setForecast: Dispatch<SetStateAction<Weather[]>>;
  setErrors: Dispatch<SetStateAction<string | null>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

export const WeatherContext = createContext<
  WeatherContextAttributes | undefined
>(undefined);

export const WeatherProvider = ({ children }: WeatherProviderProps) => {
  const [location, setLocation] = useState<UserLocation>();
  const [forecast, setForecast] = useState<Weather[]>([]);
  const [errors, setErrors] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <WeatherContext.Provider
      value={{
        location,
        forecast,
        errors,
        loading,
        setLocation,
        setForecast,
        setErrors,
        setLoading,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
