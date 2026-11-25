import getWeatherCodeDetails from "../../../utils/weatherCodeDetails";
import type { Settings } from "../weather";
import type { ForecastDay } from "./City-select";
type FiveDayForecastProp = {
  dailyMeanData: ForecastDay[];
  settings: Settings;
  isDay: number;
};

export default function FiveDayForecast({ dailyMeanData, settings, isDay }: FiveDayForecastProp) {
  const tempUnit = settings.temperatureUnit === "celsius" ? "℃" : "℉";

  return (
    <>
      <div className="flex items-center justify-between text-center">
        {dailyMeanData?.map((forecastData: ForecastDay, index) => (
          <div key={forecastData.date}>
            {getDayByDate(forecastData.date, index)}
            <br />
            {/* {getCloudImage(forecastData.couldCover, isDay)} */}
            {/* <br /> */}
            {forecastData.meanTemp} {tempUnit}
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

function getCloudImage(cloudCover: number, isDay: number) {
  const { description, image } = getWeatherCodeDetails(cloudCover, isDay);
  return <img src={image} alt={description} className="size-25 object-contain" />;
}
