import React from 'react';
import { format } from 'date-fns';
import { WiDayCloudy, WiDaySunny, WiRain, WiSnow, WiThunderstorm, WiCloud } from 'react-icons/wi';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { ForecastData } from '../../types';

interface WeatherDashboardProps {
  cityName: string;
  currentWeather: ForecastData;
  forecasts: ForecastData[];
  onBack: () => void;
}

const WeatherDashboard: React.FC<WeatherDashboardProps> = ({ cityName, currentWeather, forecasts }) => {
  const convertToCelsius = (temp: number) => Math.round(temp - 273.15);

  const calculateDewPoint = (tempK: number, humidity: number) => {
    const tempCelsius = tempK - 273.15;
    const alpha = ((17.625 * tempCelsius) / (243.04 + tempCelsius)) + Math.log(humidity / 100);
    const dewPoint = (243.04 * alpha) / (17.625 - alpha);
    return Math.round(dewPoint);
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

  const currentDewPoint = calculateDewPoint(currentWeather.main.temp, currentWeather.main.humidity);
  const isSafeToSilkPress = currentDewPoint < 18; // Safe if dew point is less than 18°C

  return (
    <div className="flex flex-col justify-between px-5 py-10 md:px-20">
      <div className="flex flex-col justify-between w-full">

        {/* Current Weather Info */}
        <div className="flex flex-col items-center justify-around text-2xl font-montserrat capitalize my-5">
          <p className={`mb-6 text-2xl md:text-4xl ${isSafeToSilkPress ? 'text-green-500' : 'text-red-500'} flex items-center`}>
            {isSafeToSilkPress ? <FaCheck className="mr-2" /> : <FaTimes className="mr-2" />}
            {isSafeToSilkPress ? "Safe to Silk Press" : "Avoid Silk Press"}
          </p>
          <p className="text-4xl md:text-6xl mb-5">Dew Point: {calculateDewPoint(currentWeather.main.temp, currentWeather.main.humidity)}°C</p>
          <p>Temp: {convertToCelsius(currentWeather.main.temp)}°C</p>
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
              const forecastSafeToSilkPress = forecastDewPoint < 18;

              return (
                <div key={index} className="m-2 p-2 w-28 md:w-40">
                  <p className="mb-5">{format(new Date(forecast.dt_txt), 'dd MMMM')}</p>
                  <p>Dew Point: {forecastDewPoint}°C</p>
                  <p>Temp: {convertToCelsius(forecast.main.temp)}°C</p>
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
          <p className="text-center text-xs md:text-sm text-gray-600">This website is just a guide. Please take extra precautions where necessary.</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherDashboard;
