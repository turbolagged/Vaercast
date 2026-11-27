import getWeatherCodeDetails from "../../../utils/weatherCodeDetails";
import type { Settings } from "../weather";
import type { ForecastDay } from "./City-select";
type FiveDayForecastProp = {
  dailyMeanData: ForecastDay[];
  settings: Settings;
  isDay: number;
};

export default function FiveDayForecast({ dailyMeanData, settings, isDay }: FiveDayForecastProp) {
  // const tempUnit = settings.temperatureUnit === "celsius" ? "℃" : "℉";

  return (
    <>
      <div className="flex items-center justify-between text-center px-2">
        {dailyMeanData?.map((forecastData: ForecastDay, index) => (
          <div key={forecastData.date} className={getClassName(index)}>
            <p className="text-sm text-neutral-300 p-0">{getDayByDate(forecastData.date, index)}</p>
            {getCloudBasedOnWeatherCode(forecastData.weatherCode, isDay)}
            <p>{forecastData.meanTemp}°</p>
          </div>
        ))}
      </div>
    </>
  );
}

function getDayByDate(date: string, index: number) {
  const formatOptions: Intl.DateTimeFormatOptions = {
    weekday: "short",
    timeZone: "UTC",
  };
  return index === 0 ? "Today" : new Date(date).toLocaleDateString("en-US", formatOptions);
}

function getCloudBasedOnWeatherCode(weatherCode: number, isDay: number) {
  const { description, image } = getWeatherCodeDetails(weatherCode, isDay);
  return <img src={image} alt={description} className="size-10 object-contain" />;
}

function getClassName(index: number) {
  return index === 0 ? "bg-natural-600 items-center rounded-xl bg-white/4 px-4 py-3" : "";
}
