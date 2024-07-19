import { ForecastData } from '../../types';

interface WeatherDashboardProps {
  currentWeather: ForecastData;
  forecasts: ForecastData[];
  onBack: () => void;
}

const WeatherDashboard: React.FC<WeatherDashboardProps> = ({ currentWeather, forecasts, onBack }) => {
  const convertToCelsius = (temp: number) => (temp - 273.15).toFixed(2);

  const calculateDewPoint = (tempK: number, humidity: number) => {
    const tempCelsius = tempK - 273.15;
    const alpha = ((17.625 * tempCelsius) / (243.04 + tempCelsius)) + Math.log(humidity / 100);
    const dewPoint = (243.04 * alpha) / (17.625 - alpha);
    return dewPoint.toFixed(2);
  };

  return (
    <div style={{ padding: '20px' }}>
      <button onClick={onBack} style={{ marginBottom: '20px' }}>Back</button>
      <h2>Current Weather</h2>
      <p>Temperature: {convertToCelsius(currentWeather.main.temp)}°C</p>
      <p>Humidity: {currentWeather.main.humidity}%</p>
      <p>Dew Point: {calculateDewPoint(currentWeather.main.temp, currentWeather.main.humidity)}°C</p>
      <p>Overall Weather: {currentWeather.weather[0].description}</p>

      <h2>5-Day Forecast</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {forecasts.map((forecast, index) => (
          <div key={index} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px', width: '150px' }}>
            <p>Date: {forecast.dt_txt.split(' ')[0]}</p>
            <p>Temperature: {convertToCelsius(forecast.main.temp)}°C</p>
            <p>Humidity: {forecast.main.humidity}%</p>
            <p>Dew Point: {calculateDewPoint(forecast.main.temp, forecast.main.humidity)}°C</p>
            <p>Weather: {forecast.weather[0].description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherDashboard;
