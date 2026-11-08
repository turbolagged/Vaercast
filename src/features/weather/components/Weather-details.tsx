import weatherCodeDetails from "../../../utils/weatherCodeDetails";

export default function WeatherDetails({
  forecast,
  settings,
  selectedLocation,
}: any) {
  if (!forecast) {
    return <p>No data found ...</p>;
  }

  let { description, image: cloudImage } = weatherCodeDetails(
    forecast.weather_code,
    forecast.is_day,
  );
  const tempUnit = settings.temperatureUnit === "celsius" ? "℃" : "℉";

  return (
    <>
      {forecast && (
        <section className="flex flex-col items-center gap-2 text-center">
          <img
            src={cloudImage}
            alt={description}
            className="size-25 object-contain"
          />

          <p className=" text-6xl font-light tracking-tight sm:text-7xl">
            {forecast?.temperature_2m}
            {tempUnit}
          </p>
          <p className="mt-1 min-h-5 text-sm tabular-nums text-neutral-400">
            Feels Like {forecast?.apparent_temperature} {tempUnit}
          </p>
          <p className="mt-2 text-base text-neutral-300"> {description}</p>
          <p className="text-sm text-neutral-500">
            {selectedLocation?.name}, {selectedLocation?.admin1},{" "}
            {selectedLocation?.country_code}
          </p>
        </section>
      )}
    </>
  );
}
// {
//   /* <p>Precipitation: {forecast?.precipitation}</p> */
//   /* <p>Cloud Cover: {forecast?.cloud_cover}</p> */
//   /* <p>Weather Code: {forecast?.weather_Code}</p> */
// }
