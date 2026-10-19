// import { useState } from "react";
import { useOutletContext } from "react-router";
import type { TemperatureUnit, WeatherContext } from "../weather";
export default function Settings() {
  // let tempUnit = "celsius";
  const { temperatureUnit, setTemperatureUnit } =
    useOutletContext<WeatherContext>();

  const setTempUnit = (value: TemperatureUnit): void => {
    localStorage.setItem("temp_unit", value.toString());
    setTemperatureUnit(value);
  };

  return (
    <label htmlFor="tempUnit">
      <span className="text-sm font-medium text-gray-700">
        Temperature unit
      </span>

      <select
        value={temperatureUnit}
        onChange={(e) => setTempUnit(e.target.value as TemperatureUnit)}
        className="mt-0.5 w-full rounded border-gray-300 shadow-sm sm:text-sm"
      >
        <option value="celsius">Celsius (°C)</option>
        <option value="fahrenheit">Fahrenheit (°F)</option>
      </select>
    </label>
  );
}
