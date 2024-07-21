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

const calculateDewPoint = (tempCelsius: number, humidity: number) => {
  const a = 17.27;
  const b = 237.7;
  const gamma = (a * tempCelsius) / (b + tempCelsius) + Math.log(humidity / 100);
  const dewPointCelsius = (b * gamma) / (a - gamma);
  return Math.round(dewPointCelsius);
};

const groupForecastsByDay = (list: ForecastData[]) => {
  const dailyForecasts: { [key: string]: { maxTemp: number, totalHumidity: number, totalDewPoint: number, count: number } } = {};

  list.forEach((forecast) => {
    const date = forecast.dt_txt.split(' ')[0];
    const tempCelsius = forecast.main.temp - 273.15;
    const dewPoint = calculateDewPoint(tempCelsius, forecast.main.humidity);

    if (!dailyForecasts[date]) {
      dailyForecasts[date] = { maxTemp: tempCelsius, totalHumidity: forecast.main.humidity, totalDewPoint: dewPoint, count: 1 };
    } else {
      dailyForecasts[date].maxTemp = Math.max(dailyForecasts[date].maxTemp, tempCelsius);
      dailyForecasts[date].totalHumidity += forecast.main.humidity;
      dailyForecasts[date].totalDewPoint += dewPoint;
      dailyForecasts[date].count += 1;
    }
  });

  return Object.keys(dailyForecasts).map(date => {
    const dayData = dailyForecasts[date];
    return {
      dt_txt: `${date} 12:00:00`,
      main: {
        temp: dayData.maxTemp + 273.15,
        humidity: Math.round(dayData.totalHumidity / dayData.count),
        dewPoint: Math.round(dayData.totalDewPoint / dayData.count),
      },
      weather: list.find(forecast => forecast.dt_txt.startsWith(date))!.weather,
    };
  });
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
          dewPoint: calculateDewPoint(data.list[0].main.temp - 273.15, data.list[0].main.humidity),
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
      <h1 className="text-4xl md:text-6xl lg:text-8xl font-montserrat my-4 mb-2 text-center capitalize">{selectedCity}</h1>
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
