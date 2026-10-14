const GEOCODE_URL = import.meta.env.VITE_GEOFENCING_URL;
const FORECAST_URL = import.meta.env.VITE_FORCAST_URL;

export const geocodeUrl = (location: string) =>
  `${GEOCODE_URL}?name=${location}&language=en&format=json`;
export const forecastUrl = (latitude: number, longitude: number) =>
  `${FORECAST_URL}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,relative_humidity_2m`;

export const fetcher = (url: string) => {
  return fetch(url).then((response) => {
    if (response.status !== 200) throw new Error(`${response.status}`);
    return response.json();
  });
};
