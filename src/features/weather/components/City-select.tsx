import { useState, type ChangeEvent, type ReactHTMLElement } from "react";
import useDebounce from "../../../hooks/useDebounce";
import useSWR from "swr";
import { geocodeUrl, forecastUrl, fetcher } from "../api";
import { useOutletContext } from "react-router";
import type { TemperatureUnit, WeatherContext } from "../weather";

// interface CitySelectProps {
//   city: string;
//   setCity: (city: string) => void;
// }

// export default function CitySelect({ city, setCity }: CitySelectProps) {
//   const handlerFunction = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setCity(e.target.value);
//   };

//   return (
//     <div className="mt-4">
//       <label className="block mb-2.5 text-sm font-medium text-heading">
//         Choose a Division:{" "}
//       </label>

//       <select
//         onChange={handlerFunction}
//         value={city}
//         className="block w-full px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand
//                 focus:border-brand shadow-xs placeholder:text-body"
//       >
//         {DISTRICTS.map((item) => (
//           <option key={item.value} value={item.value}>
//             {item.label}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// }

function getSearchResults(location: string) {
  // if (!location) return;
  const { data, error, isLoading } = useSWR(
    location ? geocodeUrl(location) : null,
    fetcher,
  );

  // if (error) return {};
  // if (isLoading) return {};
  // return data;
  return { data, error, isLoading };
}

function currentTempUnit(tempUnit: TemperatureUnit) {
  if (!tempUnit) return "C";
  return tempUnit === "celsius" ? "C" : "F";
}

export default function SearchLocation() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [showSearchResults, setShowSearchResults] = useState<boolean>(false);
  const [selectedLocation, setSelectedLocation] = useState<any>(null);

  const { settings } = useOutletContext<WeatherContext>();

  // const [dailyMean, setDailyMean] = useState<any>(null);
  const debouncedValue = useDebounce(searchValue, 500);

  const tempUnit = localStorage.getItem("temp_unit")
    ? localStorage.getItem("temp_unit")
    : "celsius";

  console.log(tempUnit + "in city");
  // debugger;

  const handleSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
    // console.log(event.target.value);
    setShowSearchResults(true);
    setSelectedLocation(null);
    setSearchValue(event.target.value);
  };

  let { data, error, isLoading } = getSearchResults(debouncedValue);

  let { forecastData } = getforecastForSelectedLocation(
    selectedLocation?.latitude,
    selectedLocation?.longitude,
    selectedLocation?.timezone,
    settings.temperatureUnit,
    settings.windSpeedUnit,
  );

  const dailyMeanData = forecastData?.daily?.time.map(
    (day: string, index: number) => {
      return {
        date: day,
        meanTemp: forecastData.daily.temperature_2m_mean[index],
      };
    },
  );

  const handleLocationSelect = (value: any) => {
    console.log(value);
    setShowSearchResults(false);
    setSelectedLocation(value);
  };

  return (
    <>
      <div className="flex justify-center items-center w-full">
        <input
          type="text"
          onChange={handleSearchInput}
          placeholder="Search place"
          className="border border-gray-400 p-1 w-[80%] max-w-sm"
        />
      </div>
      <div>
        <ul>
          {showSearchResults &&
            data?.results?.map((result: any) => (
              <li
                key={result.id}
                onClick={() => handleLocationSelect(result)}
                className="cursor-pointer"
              >
                {result?.name}, {result?.admin1}, {result?.country_code}
              </li>
            ))}
        </ul>
        <div>
          {forecastData?.current && (
            <div>
              <p>
                Current Temp: {forecastData.current?.temperature_2m}{" "}
                {currentTempUnit(settings.temperatureUnit)}
              </p>

              <strong>
                Current Wind Speed: {forecastData?.current?.wind_speed_10m}{" "}
                {settings.windSpeedUnit}
              </strong>
            </div>
          )}
        </div>

        <div className="mt-2">
          <strong>Daily Average</strong>
          {dailyMeanData?.length > 0 &&
            dailyMeanData.map((item: any) => (
              <p key={item.date}>
                {item.date} : {item.meanTemp}
                {currentTempUnit(settings.temperatureUnit)}
              </p>
            ))}
        </div>
      </div>
    </>
  );
}

function getforecastForSelectedLocation(
  latitude: number,
  longitude: number,
  timezone: string,
  tempUnit: any,
  windUnit: string,
) {
  const {
    data: forecastData,
    error: forecastDataError,
    isLoading: forecastLoading,
  } = useSWR(
    latitude & longitude
      ? forecastUrl(latitude, longitude, timezone, tempUnit, windUnit)
      : null,
    fetcher,
  );

  // if (error) return {};
  // if (isLoading) return {};
  // return data;
  return { forecastData, forecastDataError, forecastLoading };
}
