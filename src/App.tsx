import { Routes, Route } from "react-router";
import SearchLocation from "./features/weather/components/City-select";
import Settings from "./features/weather/components/Settings";
import Weather from "./features/weather/weather";

export default function App() {
  return (
    <Routes>
      <Route element={<Weather />}>
        <Route path="/" element={<SearchLocation />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}
