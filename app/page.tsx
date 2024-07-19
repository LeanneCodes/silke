'use client';

import { useState } from 'react';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import { WeatherData } from '../types';
import Footer from './components/Footer';

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

const HomePage = () => {
  const [error, setError] = useState<string | null>(null);

  const handleCitySubmit = async (city: string) => {
    try {
      const data = await fetchWeather(city);
      localStorage.setItem('selectedCity', city);
      localStorage.setItem(`city-${city}`, JSON.stringify(data));
      setError(null);
      window.location.href = '/dashboard';
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  return (
    <div>
      <Navbar />
      <LandingPage onCitySubmit={handleCitySubmit} />
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      <Footer />
    </div>
  );
};

export default HomePage;
