'use client';

import { useState } from 'react';
import Dashboard from './components/Dashboard';

interface ForecastData {
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    description: string;
  }[];
  dt_txt: string;
}

interface WeatherData {
  city: {
    name: string;
  };
  list: ForecastData[];
}

const fetchWeather = async (city: string): Promise<WeatherData> => {
  const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY; // Use NEXT_PUBLIC_ prefix for client-side env variables
  if (!apiKey) {
    throw new Error('API Key is missing');
  }
  const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`);
  if (!response.ok) {
    throw new Error('Error fetching weather data');
  }
  return response.json();
};

const groupForecastsByDay = (list: ForecastData[]) => {
  const dailyForecasts: { [key: string]: ForecastData[] } = {};

  list.forEach((forecast) => {
    const date = forecast.dt_txt.split(' ')[0];
    if (!dailyForecasts[date]) {
      dailyForecasts[date] = [];
    }
    dailyForecasts[date].push(forecast);
  });

  return dailyForecasts;
};

const convertToCelsius = (temp: number) => (temp - 273.15).toFixed(2);

const calculateDewPoint = (tempK: number, humidity: number) => {
  const tempCelsius = tempK - 273.15;
  const alpha = ((17.625 * tempCelsius) / (243.04 + tempCelsius)) + Math.log(humidity / 100);
  const dewPoint = (243.04 * alpha) / (17.625 - alpha);
  return dewPoint;
};

const WeatherPage = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFetchWeather = async () => {
    try {
      const data = await fetchWeather(city);
      setWeather(data);
      setError(null);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
      setWeather(null);
    }
  };

  const getWeatherSummary = (forecasts: ForecastData[]) => {
    const temps = forecasts.map(forecast => forecast.main.temp);
    const dewPoints = forecasts.map(forecast => calculateDewPoint(forecast.main.temp, forecast.main.humidity));
    const humidities = forecasts.map(forecast => forecast.main.humidity);
    const descriptions = forecasts.map(forecast => forecast.weather[0].description);

    const minTemp = Math.min(...temps);
    const maxTemp = Math.max(...temps);
    const minDewPoint = Math.min(...dewPoints);
    const maxDewPoint = Math.max(...dewPoints);
    const avgHumidity = (humidities.reduce((sum, humidity) => sum + humidity, 0) / humidities.length).toFixed(2);

    const mostFrequentDescription = descriptions.sort((a, b) =>
      descriptions.filter(desc => desc === a).length - descriptions.filter(desc => desc === b).length
    ).pop();

    return {
      minTemp: convertToCelsius(minTemp),
      maxTemp: convertToCelsius(maxTemp),
      minDewPoint: minDewPoint.toFixed(2),
      maxDewPoint: maxDewPoint.toFixed(2),
      avgHumidity,
      description: mostFrequentDescription
    };
  };

  return (
    <div>
      <Dashboard />
      <h1>Weather App</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city"
      />
      <button onClick={handleFetchWeather}>Get Weather</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {weather && (
        <div>
          <h3>City: {weather.city.name}</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {Object.entries(groupForecastsByDay(weather.list)).map(([date, forecasts]) => {
              const { minTemp, maxTemp, minDewPoint, maxDewPoint, avgHumidity, description } = getWeatherSummary(forecasts);
              return (
                <div key={date} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px', width: '200px' }}>
                  <h4>Date: {date}</h4>
                  <p>Temperature Range: {minTemp}°C - {maxTemp}°C</p>
                  <p>Dew Point Range: {minDewPoint}°C - {maxDewPoint}°C</p>
                  <p>Average Humidity: {avgHumidity}%</p>
                  <p>Overall Weather: {description}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherPage;
