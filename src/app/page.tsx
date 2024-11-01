"use client";
import { WeatherCard } from "@/components/WeatherCard.component";
import { LocationSearch } from "@/components/LocationSearch.component";
import { useErrors, useForecast, useLoading } from "@/hooks/context.hooks";
import { Spinner } from "@/components/Spinner.component";
import { ErrorNotification } from "@/components/ErrorNotification.component";

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
 * [DONE] 1. update updateLocation stuff
 * [DONE] 1. Handle errors and loading
 * [DONE] 1. Move getWeather hook functionality to provider
 * [DONE] 1. Move button to own component
 * [DONE] 1. Consider handline errors in some capacity?
 * [DONE] 1. We could add a loading icon?
 * [DONE] 1. Switch out the placholder icon!
 * [DONE] 1. Create a README that actually works and strip out remainder of CNA stuff
 * 1. Consider adding a toggle for Celsius and Farenheit?
 */

const App = () => {
  const { forecast } = useForecast();
  const { loading } = useLoading();
  const { errors } = useErrors();

  return (
    <main className="p-5">
      <header className="py-6 [ flex flex-col items-center ]">
        <h1 className="text-5xl font-bold mb-6">Weather App</h1>
        <h2 className="text-3xl font-bold mb-4">Find Your Location</h2>
        <div className="w-full max-w-md">
          <LocationSearch />
        </div>
      </header>

      {loading && <Spinner />}

      {errors && <ErrorNotification message={errors} />}

      <div className="grid [ grid-cols-1 md:grid-cols-3 lg:grid-cols-5 ] gap-8">
        {forecast.map((weather) => (
          <WeatherCard
            key={weather.date}
            date={weather.date}
            description={weather.description}
            descriptiveIcon={weather.descriptiveIcon}
            temp={weather.temp}
            windSpeed={weather.windSpeed}
          />
        ))}
      </div>
    </main>
  );
};

export default App;
