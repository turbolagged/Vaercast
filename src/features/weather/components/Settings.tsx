import { useOutletContext } from "react-router";
import type { Settings, TemperatureUnit, WeatherContext, WindSpeedUnit } from "../weather";
export default function Settings() {
  const { settings, setSettings } = useOutletContext<WeatherContext>();

  const setTempUnit = (value: TemperatureUnit): void => {
    localStorage.setItem("temp_unit", value.toString());
    setSettings((prevSettings: Settings) => ({
      ...prevSettings,
      temperatureUnit: value,
    }));
  };

  const setWindSpeedUnit = (value: WindSpeedUnit): void => {
    localStorage.setItem("wind_unit", value.toString());
    setSettings((prevSettings: Settings) => ({
      ...prevSettings,
      windSpeedUnit: value,
    }));
  };

  return (
    <>
      <div>
        <h3 className="mb-6 flex items-center gap-3 text-base font-normal text-white">Settings</h3>

        <div className="rounded-xl bg-neutral-800 p-4">
          <div className="flex items-center justify-between border-b border-white/10 py-3">
            <div className="flex items-center gap-2 text-sm text-neutral-400">Temperature</div>

            <select
              value={settings.temperatureUnit}
              onChange={(e) => setTempUnit(e.target.value as TemperatureUnit)}
              className="rounded-lg border border-white/10 bg-neutral-900 px-3 py-2 text-sm text-white outline-none focus:border-lime-500/60">
              <option value="celsius">Celsius (°C)</option>
              <option value="fahrenheit">Fahrenheit (°F)</option>
            </select>
          </div>

          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-2 text-sm text-neutral-400">Wind Speed</div>

            <select
              value={settings.windSpeedUnit}
              onChange={(e) => setWindSpeedUnit(e.target.value as WindSpeedUnit)}
              className="rounded-lg border border-white/10 bg-neutral-900 px-3 py-2 text-sm text-white outline-none focus:border-lime-500/60">
              <option value="kmh">km/h</option>
              <option value="mph">mph</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
}
