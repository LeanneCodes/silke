export interface MainData {
  temp: number;
  humidity: number;
  dewPoint?: number; // Optional property
}

export interface WeatherDescription {
  description: string;
}

export interface ForecastData {
  main: MainData;
  weather: WeatherDescription[];
  dt_txt: string;
}

export interface WeatherData {
  city: {
    name: string;
  };
  list: ForecastData[];
}
