'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Correct import for useRouter hook
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import WeatherDashboard from './components/WeatherDashboard';
import { WeatherData, ForecastData } from '../types';

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

const WeatherPage = () => {
  const router = useRouter();
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [currentWeather, setCurrentWeather] = useState<ForecastData | null>(null);
  const [forecasts, setForecasts] = useState<ForecastData[]>([]);
  const [savedCities, setSavedCities] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cities = JSON.parse(localStorage.getItem('savedCities') || '[]');
    setSavedCities(cities);

    const selectedCity = localStorage.getItem('selectedCity');
    if (selectedCity) {
      handleCitySubmit(selectedCity);
      localStorage.removeItem('selectedCity');
    }
  }, []);

  const handleCitySubmit = async (city: string) => {
    try {
      const data = await fetchWeather(city);
      setWeatherData(data);
      setCurrentWeather(data.list[0]);
      setForecasts(Object.values(groupForecastsByDay(data.list)).map(dayForecasts => dayForecasts[0]));
      setError(null);

      const updatedCities = Array.from(new Set([...savedCities, city])).sort();
      setSavedCities(updatedCities);
      localStorage.setItem('savedCities', JSON.stringify(updatedCities));
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

  const handleBack = () => {
    setWeatherData(null);
    setCurrentWeather(null);
    setForecasts([]);
  };

  return (
    <div>
      <Navbar />
      {!weatherData ? (
        <LandingPage onCitySubmit={handleCitySubmit} />
      ) : (
        <WeatherDashboard currentWeather={currentWeather!} forecasts={forecasts} onBack={handleBack} />
      )}
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
    </div>
  );
};

export default WeatherPage;
