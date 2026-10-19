const GEOCODE_URL = import.meta.env.VITE_GEOFENCING_URL;
const FORECAST_URL = import.meta.env.VITE_FORCAST_URL;

export const geocodeUrl = (location: string) =>
  `${GEOCODE_URL}?name=${location}&language=en&format=json`;
export const forecastUrl = (
  latitude: number,
  longitude: number,
  timezone = "auto",
  temperatureUnit = "celsius",
) =>
  `${FORECAST_URL}?temperature_unit=${temperatureUnit}&timezone=${timezone}&latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,relative_humidity_2m&daily=temperature_2m_mean&forecast_days=5`;

export const fetcher = (url: string) => {
  return fetch(url).then((response) => {
    if (response.status !== 200) throw new Error(`${response.status}`);
    return response.json();
  });
};
