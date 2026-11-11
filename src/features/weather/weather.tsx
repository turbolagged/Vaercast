import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { NavLink, Outlet, useLocation } from "react-router";

const TEMPERATURE_UNIT = ["celsius", "fahrenheit"] as const;
const WIND_SPEED_UNIT = ["kmh", "ms", "mph", "kn"] as const;

export type TemperatureUnit = (typeof TEMPERATURE_UNIT)[number];
export type WindSpeedUnit = (typeof WIND_SPEED_UNIT)[number];
// export type PrecipitationUnit = "mm" | "inch";

export type Settings = {
  temperatureUnit: TemperatureUnit;
  windSpeedUnit: WindSpeedUnit;
  // precipitationUnit: PrecipitationUnit;
};

const DEFAULT_SETTINGS: Settings = {
  temperatureUnit: "celsius",
  windSpeedUnit: "kmh",
  // precipitationUnit: "mm",
};

export interface WeatherContext {
  settings: Settings;
  setSettings: Dispatch<SetStateAction<Settings>>;
}

export default function Weather() {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);

  const onSettings = useLocation().pathname === "/settings";

  loadSettings({ settings, setSettings });

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

function loadSettings({ setSettings }: WeatherContext) {
  useEffect(() => {
    let windUnit;
    let tempUnit;
    try {
      windUnit = localStorage.getItem("wind_unit");
      tempUnit = localStorage.getItem("temp_unit");
    } catch (error) {
      windUnit = null;
      tempUnit = null;
    }

    const hasTempUnit = (value: unknown): value is TemperatureUnit =>
      TEMPERATURE_UNIT.includes(value as TemperatureUnit);
    const hasWindUnit = (value: unknown): value is WindSpeedUnit => WIND_SPEED_UNIT.includes(value as WindSpeedUnit);

    if (windUnit || tempUnit) {
      setSettings({
        temperatureUnit: hasTempUnit(tempUnit) ? tempUnit : DEFAULT_SETTINGS.temperatureUnit,
        windSpeedUnit: hasWindUnit(windUnit) ? windUnit : DEFAULT_SETTINGS.windSpeedUnit,
      });
    }
  }, []);
}
