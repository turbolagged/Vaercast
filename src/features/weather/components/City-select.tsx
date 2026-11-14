import { useState, type ChangeEvent } from "react";
import useDebounce from "../../../hooks/useDebounce";
import useSWR from "swr";
import { geocodeUrl, forecastUrl, fetcher } from "../api";
import { useOutletContext } from "react-router";
import type { WeatherContext } from "../weather";
import UseGeolocation from "./Geolocation";
import type { Coords } from "../types";
import WeatherDetails from "./Weather-details";
import searchIcon from "../../../assets/search_icon.svg";
import { TbCloudSearch } from "react-icons/tb";
import Spinner from "./Spinner";

function getSearchResults(location: string) {
  const { data, error, isLoading } = useSWR(location ? geocodeUrl(location) : null, fetcher);
  return { data, error, isLoading };
}

export default function SearchLocation() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [showSearchResults, setShowSearchResults] = useState<boolean>(false);
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [geolocateStatus, setGeolocateStatus] = useState<"loading" | "error" | "idle">("idle");
  // const [coords, setCoords] = useState<Coords | null>(null);

  const { settings } = useOutletContext<WeatherContext>();

  const debouncedValue = useDebounce(searchValue, 500);

  const handleSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
    setShowSearchResults(true);
    setSelectedLocation(null);
    setSearchValue(event.target.value);
    setGeolocateStatus("idle");
  };

  let { data } = getSearchResults(debouncedValue);

  let { forecastData, forecastLoading, forecastDataError } = useForecastForSelectedLocation(
    selectedLocation?.latitude,
    selectedLocation?.longitude,
    selectedLocation?.timezone,
    settings.temperatureUnit,
    settings.windSpeedUnit,
  );

  // const dailyMeanData = forecastData?.daily?.time.map(
  //   (day: string, index: number) => {
  //     return {
  //       date: day,
  //       meanTemp: forecastData.daily.temperature_2m_mean[index],
  //     };
  //   },
  // );

  const updateCoords = (c: Coords) => {
    setSelectedLocation(c);
  };

  const handleLocationSelect = (value: any) => {
    setShowSearchResults(false);
    setSelectedLocation(value);
  };

  const renderForecastContent = () => {
    if ((selectedLocation && forecastLoading) || geolocateStatus === "loading") {
      return <Spinner />;
    } else if (selectedLocation && forecastDataError) {
      return <p className="py-6 text-center text-lg">Something went wrong :( </p>;
    } else if (forecastData?.current) {
      return (
        <WeatherDetails forecast={forecastData?.current} settings={settings} selectedLocation={selectedLocation} />
      );
    }
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <div className="group relative flex-1">
          <label htmlFor="city-search" className="sr-only">
            Search city
          </label>
          <div className="flex h-11 items-center gap-2 rounded-lg border border-white/10 bg-white/3 px-3 focus-within:border-lime-500/60">
            <span className="size-4 text-natural-400 shrink-0">
              <img src={searchIcon} alt="search_icion" />
            </span>
            <input
              value={searchValue}
              id="city-search"
              type="text"
              onChange={handleSearchInput}
              placeholder="Search city"
              className="bg-transparent text-neutral-100 text-sm placeholder:text-neutral-500 focus:outline-none w-full"
            />
          </div>
          {/* search results  */}
          {showSearchResults && data?.results?.length > 0 && (
            <ul
              className="absolute inset-x-0 top-full z-50 mt-1 max-h-64 overflow-y-auto rounded-lg border border-white/10 bg-neutral-800 py-1 shadow-xl group-focus-within:block"
              role="listbox">
              {data?.results?.map((result: any) => (
                <li role="option" key={result.id} onClick={() => handleLocationSelect(result)}>
                  <button
                    type="button"
                    className="cursor-pointer flex w-full items-center gap-3 px-3 py-3 text-left text-sm hover:bg-white/5 focus:bg-white/5 focus:outline-none">
                    <span className="flex-1 truncate">
                      {result?.name}, {result?.admin1}
                    </span>
                    <span className="text-xs text-neutral-500">{result?.country_code}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        {forecastData?.current && (
          <UseGeolocation onLocation={updateCoords} uiState="top" setGeolocateStatus={setGeolocateStatus} />
        )}
      </div>
      {/* no data found  */}
      {searchValue && showSearchResults && !data?.results && (
        <section className="text-center py-7 px-2">
          <p className="text-base font-medium">No places found</p>
          <small className="mt-1 text-sm text-neutral-500">Check the spelling or try a nearby city. </small>
        </section>
      )}

      {/* intiaial state  */}
      {!searchValue.trim() && !selectedLocation && geolocateStatus === "idle" && (
        <section className="py-16 px-2 flex flex-col items-center gap-2 text-center">
          <TbCloudSearch className="h-16 w-16 text-lime-600" aria-hidden="true" />
          <h3 className="text-xl font-medium mt-4">Check the weather anywhere</h3>
          <p className="text-sm text-neutral-400 leading-relaxed text-balance">
            Search for a city, or let Vaercast find <br></br>where you are.
          </p>

          {!data?.result && (
            <UseGeolocation onLocation={updateCoords} uiState="initial" setGeolocateStatus={setGeolocateStatus} />
          )}
        </section>
      )}
      {geolocateStatus === "error" && <p className="text-center mt-12 text-lg">Unable to retrive your location</p>}

      {/* -------- loc details*/}
      {renderForecastContent()}

      {/* <div className="mt-2">
          {dailyMeanData?.length > 0 &&
            dailyMeanData.map((item: any) => (
              <p key={item.date}>
                {item.date} : {item.meanTemp}
                {currentTempUnit(settings.temperatureUnit)}
              </p>
            ))}
        </div> */}
      {/* end details  */}
    </>
  );
}

function useForecastForSelectedLocation(
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
    latitude != null && longitude != null ? forecastUrl(latitude, longitude, timezone, tempUnit, windUnit) : null,
    fetcher,
  );

  // if (error) return {};
  // if (isLoading) return {};
  // // return  { forecastData, forecastDataError, forecastLoading };
  return { forecastData, forecastDataError, forecastLoading };
}
