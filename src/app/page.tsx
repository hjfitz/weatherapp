"use client";
import { useEffect } from "react";
import { WeatherCard } from "@/components/WeatherCard.component";
import { LocationSearch } from "@/components/LocationSearch.component";
import { weatherService } from "@/services";
import { useForecast, useLocation } from "@/hooks/context.hooks";

/**
 * App todo:
 * [DONE] 1. Get and set location from open-meteo
 * [DONE] 1. Fetch weather from weather open-meteo
 * [DONE] 1. Add prettier-eslint and build in some sort of consistency
 * [DONE] 1. Make it damn responsive and make the form pretty
 * [DONE] 1. Introduce the option to use user location via geolocation api - this could just be a diff button
 * [DONE] 1. Add retries to flaky browser api
 * [DONE] 1. Rename use of WeatherCardProps
 * [DONE] 1. Switch states to context for a little cleanup
 * 1. update updateLocation stuff
 * 1. Move getWeather hook functionality to provider
 * 1. Move button to own component
 * 1. Consider handline errors in some capacity?
 * 1. We could add a loading icon?
 */

const App = () => {
  const { location } = useLocation();
  const { forecast, setForecast } = useForecast();

  // todo: makes sense to decouple this from the view layer and shove in provider
  useEffect(() => {
    if (!location) return;
    weatherService.getWeather(location).then(setForecast);
  }, [location]);

  return (
    <main className="p-5">
      <section className="py-6 ">
        <h2 className="text-3xl font-bold mb-4">Find Your Location</h2>
        <div className="w-full max-w-md">
          <LocationSearch />
        </div>
      </section>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-5">
        {forecast.map((weather) => (
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
