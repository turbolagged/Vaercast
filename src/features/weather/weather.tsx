import { useState } from "react";
import type { WeatherResponse } from "./types";
import { weatherUrl, fetcher } from "./api";
import CitySelect from "./components/City-select";
import useSWR from "swr";

// type tempInfo = Pick<CurrentCondition, 'temp_C' | 'FeelsLikeC'>

export default function Weather() {
  // const [temperature, setTemperature] = useState<tempInfo | null>(null);
  const [city, setCity] = useState<string>("dhaka");
  const { data, error, isLoading } = useSWR<WeatherResponse>(
    weatherUrl(city),
    fetcher,
  );

  return (
    <div className="flex items-center justify-center bg-page min-h-screen">
      <div className="w-full max-w-sm rounded-2xl bg-card shadow-md p-6 ring-1 ring-line">
        <h4 className="text-lg font-semibold text-emerslateld-700 capitalize">
          {city} Weather
        </h4>
        {isLoading && (
          <div className="flex py-6">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-slate-200 border-t-slate-600" />
          </div>
        )}
        {error && <p>Weather data is not available :( Try later</p>}

        {data && (
          <>
            <p className="mt-4 text-5xl font-bold text-main">
              {data.current_condition[0].temp_C} ℃
            </p>
            <p className="mt-2 text-sm text-muted">
              Feels Like {data.current_condition[0].FeelsLikeC} ℃
            </p>
          </>
        )}

        <CitySelect city={city} setCity={setCity} />
      </div>
    </div>
  );
}
