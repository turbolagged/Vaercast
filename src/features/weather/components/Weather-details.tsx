import weatherCodeDetails from "../../../utils/weatherCodeDetails";

export default function WeatherDetails(forecastData: any) {
  if (!forecastData) {
    return <p>Loading...</p>;
  }

  const { forecast }: any = forecastData;

  let { description, image: cloudImage } = weatherCodeDetails(
    forecast.weather_code,
    forecast.is_day,
  );

  return (
    <>
      {forecast && (
        <div>
          <legend>
            <img src={cloudImage} alt={description} /> <br />
            {description}
          </legend>

          <p>Weather Code: {forecast?.weather_Code}</p>
          <p>Current Temp: {forecast?.temperature_2m}</p>
          <p>Feels Like: {forecast?.temperature_2m}</p>
          <p>Cloud Cover: {forecast?.cloud_cover}</p>
          <p>Precipitation: {forecast?.precipitation}</p>
        </div>
      )}
    </>
  );

  // return <p>Dummy</p>;
}
