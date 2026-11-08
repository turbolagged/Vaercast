import type { Coords } from "../types";
import locationIcon from "../../../assets/location_user.svg";

export default function UseGeolocation({
  onLocation,
}: {
  onLocation: (c: Coords) => void;
}) {
  function success(position: any) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log(latitude, longitude);
    onLocation({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
  }

  function error() {
    console.log("Unable to retrieve your location");
  }

  function getLocation() {
    if (!navigator.geolocation) {
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }

  return (
    <>
      <button
        onClick={getLocation}
        id="locate-btn"
        type="button"
        aria-label="Use my location"
        className="cursor-pointer flex size-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/3 text-neutral-200 hover:bg-white/10 focus-visible:outline focus-visible:outline-lime-500"
      >
        <span data-icon="locate" className="size-4">
          <img src={locationIcon} alt="loation_icon" />
        </span>
      </button>
    </>
  );
}
