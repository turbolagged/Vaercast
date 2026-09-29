const BASE_URL = import.meta.env.VITE_WEATHER_API_URL;

export const weatherUrl = (city: string) => `${BASE_URL}/${city}?format=j2`;
export const fetcher = (url: string) => {
    return fetch(url)
        .then(response => {
            if (response.status !== 200) throw new Error(`${response.status}`);
            return response.json();
        })
}