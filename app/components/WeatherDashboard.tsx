import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { WiDayCloudy, WiDaySunny, WiRain, WiSnow, WiThunderstorm, WiCloud } from 'react-icons/wi';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { ForecastData } from '../../types';
import '../styles/WeatherDashboard.css';

interface WeatherDashboardProps {
  cityName: string;
  currentWeather: ForecastData;
  forecasts: ForecastData[];
  onBack: () => void;
}

const WeatherDashboard: React.FC<WeatherDashboardProps> = ({ cityName, currentWeather, forecasts }) => {
  const getInitialUnit = () => {
    const savedUnit = localStorage.getItem('unit');
    return savedUnit === 'F' ? 'F' : 'C';
  };

  const [unit, setUnit] = useState<'C' | 'F'>(getInitialUnit);

  useEffect(() => {
    localStorage.setItem('unit', unit);
  }, [unit]);

  const convertToCelsius = (temp: number) => Math.round(temp - 273.15);
  const convertToFahrenheit = (temp: number) => Math.round((temp - 273.15) * 9 / 5 + 32);

  const getTemperature = (tempK: number) => {
    return unit === 'C' ? convertToCelsius(tempK) : convertToFahrenheit(tempK);
  };

  const getDewPoint = (dewPoint: number) => {
    return unit === 'C' ? dewPoint : Math.round(dewPoint * 9 / 5 + 32);
  };

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const getWeatherIcon = (description: string) => {
    switch (description) {
      case 'clear sky':
        return <WiDaySunny />;
      case 'few clouds':
      case 'scattered clouds':
      case 'broken clouds':
        return <WiDayCloudy />;
      case 'shower rain':
      case 'rain':
        return <WiRain />;
      case 'thunderstorm':
        return <WiThunderstorm />;
      case 'snow':
        return <WiSnow />;
      default:
        return <WiCloud />;
    }
  };

  const dewPointMessage = (dewPoint: number) => {
    if (dewPoint < 10) {
      return (
        <div className="text-center">
          <div className="flex items-center justify-center">
            <span className='text-2xl md:text-6xl'>Avoid silk press</span>
          </div>
          <p className="text-white text-sm mt-4 w-full mx-auto">The air is relatively dry, which can lead to the hair becoming dry and potentially brittle.</p>
        </div>
      );
    } else if (dewPoint >= 10 && dewPoint <= 13) {
      return (
        <div className="text-center">
          <div className="flex items-center justify-center">
            <span className='text-2xl md:text-6xl'>Safe to silk press</span>
          </div>
          <p className="text-white text-sm mt-4 w-full mx-auto">You might need to ensure your hair is adequately moisturised to prevent dryness and brittleness.</p>
        </div>
      );
    } else if (dewPoint >= 14 && dewPoint <= 16) {
      return (
        <div className="text-center">
          <div className="flex items-center justify-center">
            <span className='text-2xl md:text-6xl'>Sweet spot for a silk press</span>
          </div>
          <p className="text-white text-sm mt-4 w-full mx-auto">There's enough moisture in the air to keep your hair hydrated without causing significant frizz.</p>
        </div>
      );
    } else if (dewPoint >= 17 && dewPoint <= 18) {
      return (
        <div className="text-center">
          <div className="flex items-center justify-center">
            <span className='text-2xl md:text-6xl'>Safe with risk</span>
          </div>
          <p className="text-white text-sm mt-4 w-full mx-auto">You may need to use anti-humidity products to help maintain the style and reduce the risk of frizz.</p>
        </div>
      );
    } else {
      return (
        <div className="text-center">
          <div className="flex items-center justify-center">
            <span className='text-2xl md:text-6xl'>Avoid silk press</span>
          </div>
          <p className="text-white text-sm mt-4 w-full mx-auto">There is too much moisture in the air. Your hair will likely puff up.</p>
        </div>
      );
    }
  };

  const currentDewPoint = currentWeather.main.dewPoint!;

  return (
    <div className="flex flex-col justify-between px-5 pt-5 md:px-20">
      <div className="flex flex-col justify-between w-full">

        {/* Unit Selector */}
        <div className="flex flex-col w-full text-center justify-center my-4">
          <div className="flex items-center justify-center">
            <label className="mr-2 radio-container">
              <input 
                type="radio" 
                value="C" 
                checked={unit === 'C'} 
                onChange={() => setUnit('C')} 
              />
              <div className="radio-label">
                <div className="radio-button"></div>
                <span>Celsius</span>
              </div>
            </label>
            <label className="radio-container">
              <input 
                type="radio" 
                value="F" 
                checked={unit === 'F'} 
                onChange={() => setUnit('F')} 
              />
              <div className="radio-label">
                <div className="radio-button"></div>
                <span>Fahrenheit</span>
              </div>
            </label>
          </div>
        </div>

        {/* Current Weather Info */}
        <div className="flex flex-col items-center justify-around text-2xl font-montserrat my-5">
          <p className={`mb-6`}>
            {dewPointMessage(currentDewPoint)}
          </p>
          <p>Dew Point: {getDewPoint(currentDewPoint)}°{unit}</p>
          <p>Temperature: {getTemperature(currentWeather.main.temp)}°{unit}</p>
          <p>Humidity: {currentWeather.main.humidity}%</p>
          <div className="text-6xl md:text-8xl mt-4" title={currentWeather.weather[0].description}>
            {getWeatherIcon(currentWeather.weather[0].description)}
          </div>
        </div>

        {/* 5-Day Forecast */}
        <div className="flex flex-col items-center text-2xl font-montserrat bg-darkGrey bg-opacity-50 rounded-lg">
          <div className="flex flex-wrap justify-around w-full text-xs md:text-sm text-center">
            {forecasts.map((forecast, index) => {
              const forecastDewPoint = forecast.main.dewPoint!;
              const forecastSafeToSilkPress = forecastDewPoint >= 10 && forecastDewPoint <= 18;

              return (
                <div key={index} className="m-2 p-2 w-28 md:w-40 rounded-lg">
                  <p className="mb-5">{index === 0 ? "Today" : format(new Date(forecast.dt_txt), 'dd MMMM')}</p>
                  <p>Dew Point: {getDewPoint(forecastDewPoint)}°{unit}</p>
                  <p>Temp: {getTemperature(forecast.main.temp)}°{unit}</p>
                  <p>Humidity: {forecast.main.humidity}%</p>
                  <p className={`mb-6 flex items-center justify-center ${forecastSafeToSilkPress ? 'text-green-500' : 'text-red-500'}`}>
                    {forecastSafeToSilkPress ? <FaCheck className="mr-2" /> : <FaTimes className="mr-2" />}
                    {forecastSafeToSilkPress ? "Safe" : "Avoid"}
                  </p>
                  <div className="flex items-center justify-center text-2xl md:text-4xl mt-5" title={forecast.weather[0].description}>
                    {getWeatherIcon(forecast.weather[0].description)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <p className="text-center mt-3 text-xs md:text-sm text-gray-400">This site is a guide using data from OpenWeatherAPI's four daily predictions. Please take additional precautions as needed.</p>
      </div>
    </div>
  );
};

export default WeatherDashboard;
