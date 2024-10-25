"use client";
import { useEffect, useState } from "react";
import {
  WeatherCard,
  WeatherCardProps,
} from "@/components/WeatherCard.component";
import { LocationSearch } from "@/components/LocationSearch.component";
import { UserLocation } from "@/types/geocoding.types";
import { weatherService } from "@/services";

/**
 * App todo:
 * [DONE] 1. Get and set location from open-meteo
 * [DONE] 1. Fetch weather from weather open-meteo
 * [DONE] 1. Add prettier-eslint and build in some sort of consistency
 * 1. Make it damn responsive and make the form pretty
 * [DONE] 1. Introduce the option to use user location via geolocation api - this could just be a diff button
 * 1. Consider handline errors in some capacity?
 * 1. We could add a loading icon?
 */

const App = () => {
  const [location, setLocation] = useState<UserLocation>();

  // todo: don't use the prop type as the global type
  const [weather, setWeather] = useState<WeatherCardProps[]>([]);

  useEffect(() => {
    if (!location) return;
    weatherService.getWeather(location).then(setWeather);
  }, [location]);

  return (
    <main className="p-5">
      <section className="flex flex-col items-center justify-center p-6 ">
        <h2 className="text-3xl font-bold mb-4">Find Your Location</h2>
        <div className="w-full max-w-md">
          <LocationSearch setLocation={setLocation} />
        </div>
      </section>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-5">
        {weather.map((weather) => (
          <WeatherCard
            key={weather.date}
            date={weather.date}
            description={weather.description}
            temp={weather.temp}
            windSpeed={weather.windSpeed}
          />
        ))}
      </div>
    </main>
  );
};

export default App;
