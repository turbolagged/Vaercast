import type { Coords } from "../types";

export default function UseGeolocation({
  onLocation,
}: {
  onLocation: (c: Coords) => void;
}) {
  let status: number;
  //   let mapLink;

  function success(position: any) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // status.textContent = "";
    // mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    // mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
    console.log(latitude, longitude);
    onLocation({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
  }

  function error() {
    // status.textContent =
    console.log("Unable to retrieve your location");
  }

  function getLocation() {
    if (!navigator.geolocation) {
      // status.textContent = "Geolocation is not supported by your browser";
    } else {
      // status.textContent = "Locating…";
      navigator.geolocation.getCurrentPosition(success, error);
      // console.log();
    }
  }

  return (
    <>
      <button
        onClick={getLocation}
        aria-label="Current location"
        className="w-fit rounded-full bg-slate-800 p-2 text-white shadow-md hover:bg-slate-700 cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          className="h-5 w-5"
        >
          <circle cx="12" cy="12" r="3" />
          <circle cx="12" cy="12" r="7" />
          <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
        </svg>
      </button>
    </>
  );
}
