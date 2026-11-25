import type { Settings } from "../weather";
import type { ForecastDay } from "./City-select";
type FiveDayForecastProp = {
  dailyMeanData: ForecastDay[];
  settings: Settings;
};

export default function FiveDayForecast({ dailyMeanData, settings }: FiveDayForecastProp) {
  const tempUnit = settings.temperatureUnit === "celsius" ? "℃" : "℉";

  return (
    <>
      <div className="flex items-center justify-between text-center">
        {dailyMeanData?.map(({ date, meanTemp }, index) => (
          <div key={date}>
            {getDayByDate(date, index)}
            <br /> {meanTemp} {tempUnit}
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
