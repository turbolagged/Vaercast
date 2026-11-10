import rawWeatherCodesDetails from "../assets/data/weather_code.json";

type WeatherCodeDetails = {
  description: string;
  image: string;
};
type DayNightWeather = {
  day: WeatherCodeDetails;
  night: WeatherCodeDetails;
};
const weatherCodes: Record<string, DayNightWeather> = rawWeatherCodesDetails;

export default function getWeatherCodeDetails(code: number, isDay: number) {
  const entry: DayNightWeather = weatherCodes[code] ?? fallbackResponses();

  if (!entry) return fallbackResponses();

  return isDay ? entry.day : entry.night;
}

function fallbackResponses() {
  return {
    description: "Unknown weather",
    image:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgetdrawings.com%2Ffree-icon-bw%2Fbroken-jpg-icon-6.png&f=1&nofb=1&ipt=fe2ce54c95601fcf49e8dede4dc4bae100252f53c9cfcd44fed5b87cf76fd563&ipo=images",
  };
}
