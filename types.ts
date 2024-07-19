export interface ForecastData {
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    description: string;
  }[];
  dt_txt: string;
}

export interface WeatherData {
  city: {
    name: string;
  };
  list: ForecastData[];
}
