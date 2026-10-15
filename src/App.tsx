import { Link, Route, Routes } from "react-router";
// import Weather from "./features/weather/weather";
import SearchLocation from "./features/weather/components/City-select";
import Settings from "./features/weather/components/Settings";
export default function App() {
  // return <Weather />;
  return (
    <>
      <nav>
        <Link to="/">Weather</Link>
        <Link to="/settings">Settings</Link>
      </nav>

      <Routes>
        <Route path="/" element={<SearchLocation />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </>
  );
}
