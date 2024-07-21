'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import WeatherDashboard from '../components/WeatherDashboard';
import { WeatherData, ForecastData } from '../../types';

const fetchWeather = async (city: string): Promise<WeatherData> => {
  const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
  if (!apiKey) {
    throw new Error('API Key is missing');
  }
  const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`);
  if (!response.ok) {
    throw new Error('Error fetching weather data');
  }
  return response.json();
};

const calculateDewPoint = (tempK: number, humidity: number) => {
  const tempCelsius = tempK - 273.15;
  const alpha = ((17.625 * tempCelsius) / (243.04 + tempCelsius)) + Math.log(humidity / 100);
  const dewPointCelsius = (243.04 * alpha) / (17.625 - alpha);
  return Math.round(dewPointCelsius);
};

const groupForecastsByDay = (list: ForecastData[]) => {
  const dailyForecasts: { [key: string]: ForecastData } = {};

  list.forEach((forecast) => {
    const date = forecast.dt_txt.split(' ')[0];
    if (!dailyForecasts[date]) {
      dailyForecasts[date] = { ...forecast };
      dailyForecasts[date].main.dewPoint = calculateDewPoint(forecast.main.temp, forecast.main.humidity);
    } else {
      const currentForecast = dailyForecasts[date];
      currentForecast.main.temp = Math.max(currentForecast.main.temp, forecast.main.temp);
      currentForecast.main.humidity = Math.max(currentForecast.main.humidity, forecast.main.humidity);
      currentForecast.main.dewPoint = Math.max(currentForecast.main.dewPoint!, calculateDewPoint(forecast.main.temp, forecast.main.humidity));
    }
  });

  return Object.values(dailyForecasts);
};

const DashboardPage = () => {
  const router = useRouter();
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [currentWeather, setCurrentWeather] = useState<ForecastData | null>(null);
  const [forecasts, setForecasts] = useState<ForecastData[]>([]);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const city = localStorage.getItem('selectedCity');
    if (city) {
      setSelectedCity(city);
      handleCitySubmit(city);
    }
  }, []);

  const handleCitySubmit = async (city: string) => {
    try {
      const data = await fetchWeather(city);
      setWeatherData(data);
      setCurrentWeather({
        ...data.list[0],
        main: {
          ...data.list[0].main,
          dewPoint: calculateDewPoint(data.list[0].main.temp, data.list[0].main.humidity),
        },
      });
      setForecasts(groupForecastsByDay(data.list));
      setSelectedCity(city);
      setError(null);

      const key = `city-${city}`;
      if (!localStorage.getItem(key)) {
        localStorage.setItem(key, JSON.stringify(data));
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
      setWeatherData(null);
      setCurrentWeather(null);
      setForecasts([]);
    }
  };

  return (
    <div className='flex flex-col'>
      <h1 className="text-8xl font-montserrat mb-2 text-center capitalize">{selectedCity}</h1>
      {weatherData && currentWeather && selectedCity ? (
        <WeatherDashboard
          cityName={selectedCity}
          currentWeather={currentWeather}
          forecasts={forecasts}
          onBack={() => router.push('/')}
        />
      ) : (
        <p style={{ textAlign: 'center' }}>No recent weather data available. Please select a city.</p>
      )}
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
    </div>
  );
};

export default DashboardPage;
