import { useLocation } from "@/hooks/context.hooks";
import { locationService } from "@/services";
import { MouseEventHandler, useRef } from "react";

export const LocationSearch = () => {
  const { setLocation } = useLocation();
  const searchQuery = useRef<HTMLInputElement>(null);

  const queryLocation: MouseEventHandler<HTMLButtonElement> = async (
    event,
  ) => {
    event.preventDefault();
    const query = searchQuery.current?.value;
    if (!query) return;

    const userLocation = await locationService.searchLocation(query);
    if (userLocation) {
      setLocation(userLocation);
    }
  };

  const getUserLocation: MouseEventHandler<HTMLButtonElement> = async (
    event,
  ) => {
    event.preventDefault();
    const location = await locationService.getPosition();
    setLocation(location);
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
        <button
          onClick={queryLocation}
          className="w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition col-span-3"
        >
          Search
        </button>
      </form>
      <p className="text-center text-lg my-2">- OR -</p>
      <button
        onClick={getUserLocation}
        className="w-full p-3 bg-teal-500 text-white rounded hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
      >
        Use My Current Location
      </button>
    </div>
  );
};
