import getUvDetails from "../../../utils/uvDetails";
import getWeatherCodeDetails from "../../../utils/weatherCodeDetails";
import { Tooltip } from "./Tooltip";
import { LuWind, LuDroplet, LuSun, LuGauge, LuInfo } from "react-icons/lu";

export default function WeatherDetails({ forecast, settings, selectedLocation }: any) {
  if (!forecast) {
    return <p>No data found ...</p>;
  }

  let { description, image: cloudImage } = getWeatherCodeDetails(forecast.weather_code, forecast.is_day);
  const tempUnit = settings.temperatureUnit === "celsius" ? "℃" : "℉";
  const uvStatus = getUvDetails(forecast.uv_index);
  console.log(uvStatus);

  return (
    <>
      {forecast && (
        <div>
          <section className="flex flex-col items-center gap-2 text-center">
            <img src={cloudImage} alt={description} className="size-25 object-contain" />

            <p className=" text-6xl font-light tracking-tight sm:text-7xl">
              {forecast?.temperature_2m}
              {tempUnit}
            </p>
            <p className="mt-1 min-h-5 text-sm tabular-nums text-neutral-400">
              Feels Like {forecast?.apparent_temperature} {tempUnit}
            </p>
            <p className="mt-2 text-base text-neutral-300"> {description}</p>
            <p className="text-sm text-neutral-500">
              {selectedLocation?.name}, {selectedLocation?.admin1}, {selectedLocation?.country_code}
            </p>
          </section>
          <section className="mt-8 grid grid-cols-2 gap-3">
            <div className="flex flex-col bg-natural-600 items-center rounded-xl bg-white/4 p-3">
              <LuWind className="mb-1 text-2xl text-neutral-400" strokeWidth={2} />

              <p className="text-base font-medium">{Math.round(forecast.wind_speed_10m)} km/h</p>
              <p className="text-sm text-neutral-500">Wind</p>
            </div>
            <div className="flex flex-col bg-natural-600 items-center rounded-xl bg-white/4 p-3">
              <LuDroplet className="mb-1 text-2xl text-neutral-400" strokeWidth={2} />

              <p className="text-base font-medium">{forecast.relative_humidity_2m}%</p>
              <p className="text-sm text-neutral-500">Humidity</p>
            </div>
            <div className="flex flex-col bg-natural-600 items-center rounded-xl bg-white/4 p-3">
              <LuSun className="mb-1 text-2xl text-neutral-400" strokeWidth={2} />

              <div className="flex items-center justify-around">
                <div className="">
                  {uvStatus?.category} ({uvStatus?.uvValue})
                </div>
                <div className="pl-2">
                  <Tooltip message={uvStatus?.protection ?? null}>
                    <LuInfo className="text-lg text-neutral-400" strokeWidth={2} />
                  </Tooltip>
                </div>
              </div>
              <p className="text-sm text-neutral-500">UV Index</p>
            </div>
            <div className="flex flex-col bg-natural-600 items-center rounded-xl bg-white/4 p-3">
              <LuGauge className="mb-1 text-2xl text-neutral-400" strokeWidth={2} />

              <p className="text-base font-medium">{forecast.pressure_msl} hPa</p>
              <p className="text-sm text-neutral-500">Pressure</p>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
// {
//   /* <p>Precipitation: {forecast?.precipitation}</p> */
//   /* <p>Cloud Cover: {forecast?.cloud_cover}</p> */
//   /* <p>Weather Code: {forecast?.weather_Code}</p> */
// }
// function calculateUvValue(uvIndex: number) {

// }
