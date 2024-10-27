import { WeatherContext } from "@/providers/Weather.provider";
import { useContext } from "react";

const useWeatherContext = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error("useWeatherContext must be used within a WeatherProvider");
  }
  return context;
};

export const useLocation = () => {
  const { location, setLocation } = useWeatherContext();
  return { location, setLocation };
};

export const useForecast = () => {
  const { forecast, setForecast } = useWeatherContext();
  return { forecast, setForecast };
};

export const useErrors = () => {
  const { errors, setErrors } = useWeatherContext();
  return { errors, setErrors };
};

export const useLoading = () => {
  const { loading, setLoading } = useWeatherContext();
  return { loading, setLoading };
};
