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

  const calculateDewPoint = (tempK: number, humidity: number) => {
    const tempCelsius = tempK - 273.15;
    const alpha = ((17.625 * tempCelsius) / (243.04 + tempCelsius)) + Math.log(humidity / 100);
    const dewPointCelsius = (243.04 * alpha) / (17.625 - alpha);
    return Math.round(dewPointCelsius);
  };

  const getTemperature = (tempK: number) => {
    return unit === 'C' ? convertToCelsius(tempK) : convertToFahrenheit(tempK);
  };

  const getDewPoint = (tempK: number, humidity: number) => {
    const dewPointCelsius = calculateDewPoint(tempK, humidity);
    return unit === 'C' ? dewPointCelsius : Math.round(dewPointCelsius * 9 / 5 + 32);
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
            <FaTimes className="mr-2" />
            <span className='text-2xl md:text-4xl'>Avoid Silk Press</span>
          </div>
          <p className="text-mustard text-sm mt-3 w-3/5 mx-auto">The air is relatively dry, which can lead to the hair becoming dry and potentially brittle.</p>
        </div>
      );
    } else if (dewPoint >= 10 && dewPoint <= 13) {
      return (
        <div className="text-center">
          <div className="flex items-center justify-center">
            <FaCheck className="mr-2" />
            <span>Safe to Silk Press</span>
          </div>
          <p className="text-mustard text-sm mt-3 w-3/5 mx-auto">You might need to ensure your hair is adequately moisturized to prevent dryness and brittleness.</p>
        </div>
      );
    } else if (dewPoint >= 14 && dewPoint <= 16) {
      return (
        <div className="text-center">
          <div className="flex items-center justify-center">
            <FaCheck className="mr-2" />
            <span>Sweet Spot for Silk Press</span>
          </div>
          <p className="text-mustard text-sm mt-3 w-3/5 mx-auto">There's enough moisture in the air to keep your hair hydrated without causing significant frizz.</p>
        </div>
      );
    } else if (dewPoint >= 17 && dewPoint <= 18) {
      return (
        <div className="text-center">
          <div className="flex items-center justify-center">
            <FaCheck className="mr-2" />
            <span>Safe with Risk</span>
          </div>
          <p className="text-mustard text-sm mt-3 w-3/5 mx-auto">You may need to use anti-humidity products to help maintain the style and reduce the risk of frizz.</p>
        </div>
      );
    } else {
      return (
        <div className="text-center">
          <div className="flex items-center justify-center">
            <FaTimes className="mr-2" />
            <span>Avoid Silk Press</span>
          </div>
        </div>
      );
    }
  };

  const currentDewPoint = calculateDewPoint(currentWeather.main.temp, currentWeather.main.humidity);

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
        <div className="flex flex-col items-center justify-around text-2xl font-montserrat capitalize my-5">
          <p className={`mb-6`}>
            {dewPointMessage(currentDewPoint)}
          </p>
          <p className="text-4xl md:text-6xl mb-5">Dew Point: {getDewPoint(currentWeather.main.temp, currentWeather.main.humidity)}°{unit}</p>
          <p>Temp: {getTemperature(currentWeather.main.temp)}°{unit}</p>
          <p>Humidity: {currentWeather.main.humidity}%</p>
          <div className="text-4xl md:text-6xl mt-4">
            {getWeatherIcon(currentWeather.weather[0].description)}
          </div>
        </div>

        {/* 5-Day Forecast */}
        <div className="flex flex-col items-center text-2xl font-montserrat">
          <h2 className="text-lg md:text-xl mt-4">5-Day Forecast</h2>
          <div className="flex flex-wrap justify-around w-full text-xs md:text-sm text-center">
            {forecasts.map((forecast, index) => {
              const forecastDewPoint = calculateDewPoint(forecast.main.temp, forecast.main.humidity);
              const forecastSafeToSilkPress = forecastDewPoint >= 10 && forecastDewPoint <= 18;

              return (
                <div key={index} className="m-2 p-2 w-28 md:w-40 text-white rounded-lg">
                  <p className="mb-5">{index === 0 ? "Today" : format(new Date(forecast.dt_txt), 'dd MMMM')}</p>
                  <p>Dew Point: {getDewPoint(forecast.main.temp, forecast.main.humidity)}°{unit}</p>
                  <p>Temp: {getTemperature(forecast.main.temp)}°{unit}</p>
                  <p>Humidity: {forecast.main.humidity}%</p>
                  <p className={`mb-6 flex items-center justify-center ${forecastSafeToSilkPress ? 'text-green-500' : 'text-red-500'}`}>
                    {forecastSafeToSilkPress ? <FaCheck className="mr-2" /> : <FaTimes className="mr-2" />}
                    {forecastSafeToSilkPress ? "Safe" : "Avoid"}
                  </p>
                  <div className="flex items-center justify-center text-2xl md:text-4xl mt-5">
                    {getWeatherIcon(forecast.weather[0].description)}
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-center mt-5 text-xs md:text-sm text-gray-400">This website is just a guide. Please take extra precautions where necessary.</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherDashboard;
