export default function WeatherDetails(forecastData: any) {
  const { forecast }: any = forecastData;
  return (
    <>
      {forecast && (
        <div>
          <p>Weather Code: {forecast?.weather_Code}</p>
          <p>Current Temp: {forecast?.temperature_2m}</p>
          <p>Feels Like: {forecast?.temperature_2m}</p>
          <p>Cloud Cover: {forecast?.cloud_cover}</p>
          <p>Precipitation: {forecast?.precipitation}</p>
        </div>
      )}
    </>
  );
}
