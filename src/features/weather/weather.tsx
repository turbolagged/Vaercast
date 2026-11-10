import { useState, type Dispatch, type SetStateAction } from "react";
import { NavLink, Outlet, useLocation } from "react-router";

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

  const onSettings = useLocation().pathname === "/settings";

  return (
    <>
      <div className="min-h-dvh bg-neutral-900 text-neutral-100 antialiased">
        <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-4 pb-6 pt-5 sm:px-0 sm:pt-10">
          <main className="flex-1">
            <Outlet context={{ settings, setSettings } satisfies WeatherContext} />
          </main>

          <footer className="border-t border-white/10 pt-5 mt-5 flex items-center justify-center gap-10">
            <NavLink to={onSettings ? "/" : "/settings"}>{onSettings ? "Weather" : "Settings"}</NavLink>
          </footer>
        </div>
      </div>
    </>
  );
}
