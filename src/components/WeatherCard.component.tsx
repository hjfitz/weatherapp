export type WeatherCardProps = {
  date: string;
  description: string;
  temp: string;
  windSpeed: string;
};

export const WeatherCard = ({
  date,
  description,
  temp,
  windSpeed,
}: WeatherCardProps) => (
  <div className="bg-gray-100 rounded-lg text-center shadow-lg p-2">
    <h3 className="text-xl font-bold">{date}</h3>
    <div className="text-4xl my-3">[Icon Placeholder]</div>
    <p className="text-lg">{description}</p>
    <p className="">Temp: {temp}</p>
    <p className="">Wind Speed: {windSpeed}</p>
  </div>
);
