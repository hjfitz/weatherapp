import { Weather } from "@/types/weather.type";

export type WeatherCardProps = Weather;

export const WeatherCard = ({
  date,
  description,
  temp,
  windSpeed,
  descriptiveIcon,
}: WeatherCardProps) => (
  <div className="bg-gray-100 rounded-lg text-center shadow-lg p-2">
    <h3 className="text-xl font-bold">{date}</h3>
    <div className="text-6xl my-3">{descriptiveIcon}</div>
    <p className="text-lg">{description}</p>
    <p className="">Temp: {temp} °C</p>
    <p className="">Wind Speed: {windSpeed} Mph</p>
  </div>
);
