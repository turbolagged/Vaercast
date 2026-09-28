const BASE_URL = import.meta.env.VITE_WEATHER_API_URL;

export const weatherUrl = (city: string) => `${BASE_URL}/${city}?format=j2`;