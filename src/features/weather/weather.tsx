import {
  useState,
  type ChangeEvent,
  type Dispatch,
  type SetStateAction,
} from "react";
import {
  Link,
  NavLink,
  Outlet,
  Route,
  Routes,
  useLocation,
} from "react-router";
// import Weather from "./features/weather/weather";
// import type { WeatherResponse } from "./types";
// import { weatherUrl, fetcher } from "./api";
// import CitySelect from "./components/City-select";
// import useSWR from "swr";
// import useDebounce from "../../hooks/useDebounce";
// import SearchLocation from "./components/City-select";
// import Settings from "./components/Settings";

export type TemperatureUnit = "celsius" | "fahrenheit";
export type WindSpeedUnit = "kmh" | "ms" | "mph" | "kn";
export type PrecipitationUnit = "mm" | "inch";

export type Settings = {
  temperatureUnit: TemperatureUnit;
  windSpeedUnit: WindSpeedUnit;
  precipitationUnit: PrecipitationUnit;
};

const DEFAULT_SETTINGS: Settings = {
  temperatureUnit: "celsius",
  windSpeedUnit: "kmh",
  precipitationUnit: "mm",
};

export interface WeatherContext {
  settings: Settings;
  setSettings: Dispatch<SetStateAction<Settings>>;
}

export default function Weather() {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);

  // const setTempUnit = (value: TemperatureUnit) => {
  //   setTemperatureUnit(value);
  // };

  const onSettings = useLocation().pathname === "/settings";

  // const updateSettings = (key: string, value: string)

  return (
    <>
      <main className="pt-10">
        <Outlet context={{ settings, setSettings } satisfies WeatherContext} />
      </main>

      <nav className="fixed bottom-0">
        <NavLink to={onSettings ? "/" : "/settings"}>
          {onSettings ? "Weather" : "Settings"}
        </NavLink>
      </nav>
    </>
  );
}

// interface CitySelectProps {
//   city?: string;
//   setCity: (city: string) => void;
// }

// type tempInfo = Pick<CurrentCondition, 'temp_C' | 'FeelsLikeC'>

// export default function Weather() {
// const [temperature, setTemperature] = useState<tempInfo | null>(null);
// const [city, setCity] = useState<string>("dhaka");
// const deboucnedCity = useDebounce(city, 1000);
// const { data, error, isLoading } = useSWR<WeatherResponse>(
//   deboucnedCity ? weatherUrl(deboucnedCity) : null,
//   fetcher,
// );

// return (
//   <div className="p-1 bg-black text-white min-h-screen">
//     <SearchLocation />
//   </div>
// <>
//   <div className="flex items-center justify-center bg-page min-h-screen">
//     <div className="w-[90%] max-w-sm rounded-2xl bg-card shadow-md p-6 ring-1 ring-line">
//       <SearchLocation setCity={setCity} city="city" />
//       <h4 className="text-lg font-semibold text-emerslateld-700 capitalize">
//         {city} Weather
//       </h4>
//       {isLoading && (
//         <div className="flex py-6">
//           <div className="h-6 w-6 animate-spin rounded-full border-2 border-slate-200 border-t-slate-600" />
//         </div>
//       )}
//       {error && <p>Weather data is not available :( Try later</p>}
//       {data && (
//         <>
//           <p className="mt-4 text-5xl font-bold text-main">
//             {data.current_condition[0].temp_C} ℃
//           </p>
//           <p className="mt-2 text-sm text-muted">
//             Feels Like {data.current_condition[0].FeelsLikeC} ℃
//           </p>
//         </>
//       )}
//     </div>
//   </div>
// </>
// );
// }

// function SearchLocation({ setCity }: CitySelectProps) {
//   // const [searchValue, setValue] = useState<string>("");

//   // const debounced = useDebounce(searchValue, 1000);
//   const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
//     // console.log("input: " + e.target.value);
//     // console.log("trimmer input: " + e.target.value.trim());
//     setCity(e.target.value.trim());
//   };

//   return (
//     <div className="flex w-full items-center justify-center">
//       <input
//         type="text"
//         onChange={handleSearch}
//         // value={city}
//         className="text-main h-xl w-full mb-2  ring-black p-2 outline-none bg-transparent  border"
//         placeholder="Search City"
//       />
//     </div>
//   );
// }
