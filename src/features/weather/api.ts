const BASE_URL = import.meta.env.VITE_WEATHER_API_URL;

export const weatherUrl = (location: string) =>
  `${BASE_URL}?name=${location}&language=en&format=json`;
export const fetcher = (url: string) => {
  return fetch(url).then((response) => {
    if (response.status !== 200) throw new Error(`${response.status}`);
    return response.json();
  });
};
