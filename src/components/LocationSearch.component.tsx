import { useErrors, useLoading, useLocation } from "@/hooks/context.hooks";
import { locationService } from "@/services";
import { MouseEventHandler, useRef } from "react";
import { Button } from "./Button.component";

export const LocationSearch = () => {
  const { setLocation } = useLocation();
  const { setLoading } = useLoading();
  const { setErrors } = useErrors();
  const searchQuery = useRef<HTMLInputElement>(null);

  const queryLocation: MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault();
    const query = searchQuery.current?.value;
    if (!query) return;

    try {
      setLoading(true);
      const userLocation = await locationService.searchLocation(query);
      if (userLocation) {
        setLocation(userLocation);
      }
    } catch (err) {
      if (err instanceof Error) {
        setErrors(`There was an issue fetching your location: ${err.message}`);
      } else {
        setErrors("There was an unknown issue fetching your location");
      }
    } finally {
      setLoading(false);
    }
  };

  const getUserLocation: MouseEventHandler<HTMLButtonElement> = async (
    event,
  ) => {
    event.preventDefault();
    setLoading(true);
    try {
      const location = await locationService.getPosition();
      setLocation(location);
    } catch (err) {
      if (err instanceof Error) {
        setErrors(`There was an issue fetching your location: ${err.message}`);
      } else {
        setErrors("There was an unknown issue fetching your location");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form action="#" className="grid grid-cols-12 gap-2">
        <input
          type="text"
          ref={searchQuery}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 col-span-9"
          placeholder="Enter a location..."
        />
        <Button
          onClick={queryLocation}
        >
          Search
        </Button>
      </form>
      <p className="text-center text-lg my-2">- OR -</p>
      <Button
        onClick={getUserLocation}
        additionalClassNames="bg-teal-500 hover:bg-teal-600"
      >
        Use My Current Location
      </Button>
    </div>
  );
};
