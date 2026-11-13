import type { Coords } from "../types";
import { LuLocateFixed } from "react-icons/lu";
type geolocationProps = {
  onLocation: (c: Coords) => void;
  setGeolocateStatus: (value: "loading" | "error" | "idle") => void;
  uiState: "top" | "initial";
};

export default function UseGeolocation({ onLocation, uiState = "initial", setGeolocateStatus }: geolocationProps) {
  function success(position: any) {
    onLocation({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
    setGeolocateStatus("idle");
  }

  function error() {
    setGeolocateStatus("error");
    console.log("Unable to retrieve your location");
  }

  function getLocation() {
    if (!navigator.geolocation) {
      setGeolocateStatus("error");
    } else {
      setGeolocateStatus("loading");
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }

  return (
    <>
      {uiState === "top" && (
        <button
          onClick={getLocation}
          id="locate-btn"
          type="button"
          aria-label="Use my location"
          className="cursor-pointer flex size-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/3 text-neutral-200 hover:bg-white/10 hover:border-lime-500 focus-visible:outline focus-visible:outline-lime-500">
          <LuLocateFixed className="h-4 w-4 text-white" aria-hidden="true" />
        </button>
      )}

      {uiState === "initial" && (
        <button
          onClick={getLocation}
          className="bg-transparent flex justify-between items-center border border-white py-2 px-4 rounded-xl h-11 mt-5 cursor-pointer"
          type="button">
          <LuLocateFixed className="h-4 w-4 text-white mr-2" aria-hidden="true" />
          <span>Use my location</span>
        </button>
      )}
    </>
  );
}
