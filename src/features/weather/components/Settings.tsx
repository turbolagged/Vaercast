// import { useState } from "react";
import { useOutletContext } from "react-router";
import type {
  Settings,
  TemperatureUnit,
  WeatherContext,
  WindSpeedUnit,
} from "../weather";
export default function Settings() {
  // let tempUnit = "celsius";
  const { settings, setSettings } = useOutletContext<WeatherContext>();

  const setTempUnit = (value: TemperatureUnit): void => {
    localStorage.setItem("temp_unit", value.toString());
    // setTemperatureUnit();
    setSettings((prevSettings: Settings) => ({
      ...prevSettings,
      temperatureUnit: value,
    }));
  };

  const setWindSpeedUnit = (value: WindSpeedUnit): void => {
    // localStorage.setItem("temp_unit", value.toString());
    // setTemperatureUnit({..});
    setSettings((prevSettings: Settings) => ({
      ...prevSettings,
      windSpeedUnit: value,
    }));
  };

  return (
    <>
      {" "}
      <label htmlFor="tempUnit">
        <span className="text-sm font-medium text-gray-700">
          Temperature unit
        </span>

        <select
          value={settings.temperatureUnit}
          onChange={(e) => setTempUnit(e.target.value as TemperatureUnit)}
          className="mt-0.5 w-full rounded border-gray-300 shadow-sm sm:text-sm"
        >
          <option value="celsius">Celsius (°C)</option>
          <option value="fahrenheit">Fahrenheit (°F)</option>
        </select>
      </label>
      <label htmlFor="tempUnit">
        <span className="text-sm font-medium text-gray-700">
          Wind Speed unit
        </span>

        <select
          value={settings.windSpeedUnit}
          onChange={(e) => setWindSpeedUnit(e.target.value as WindSpeedUnit)}
          className="mt-0.5 w-full rounded border-gray-300 shadow-sm sm:text-sm"
        >
          <option value="kmh">km/h</option>
          <option value="mph">mph</option>
          {/* <option value="kn">kn</option> */}
          {/* <option value="ms">m/s</option> */}
        </select>
      </label>
    </>
  );
}
