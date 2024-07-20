import { NextApiRequest, NextApiResponse } from 'next';
import twilio from 'twilio';

const accountSid = process.env.NEXT_PUBLIC_TWILIO_ACCOUNT_SID;
const authToken = process.env.NEXT_PUBLIC_TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

const weatherApiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { appointmentDate, phoneNumber, city } = req.body;

    try {
      const forecast = await fetchWeatherForecast(city);
      const appointmentForecast = getForecastForDate(forecast, appointmentDate);

      if (!isSafeToSilkPress(appointmentForecast)) {
        console.log(`Sending SMS to ${phoneNumber}`);
        await sendSMSReminder(phoneNumber);
      }

      return res.status(200).json({ message: 'Reminder scheduled successfully' });
    } catch (error) {
      console.error('Error scheduling reminder:', error);
      return res.status(500).json({ error: 'Failed to schedule reminder' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function fetchWeatherForecast(city: string) {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${weatherApiKey}`);
  if (!response.ok) {
    throw new Error('Failed to fetch weather forecast');
  }
  const data = await response.json();
  console.log(`Fetched weather forecast for ${city}:`, data);
  return data.list;
}

function getForecastForDate(forecast: any, date: string) {
  const targetDate = new Date(date).setHours(0, 0, 0, 0);
  return forecast.find((entry: any) => {
    const entryDate = new Date(entry.dt_txt).setHours(0, 0, 0, 0);
    return entryDate === targetDate;
  });
}

function calculateDewPoint(temp: number, humidity: number) {
  const tempCelsius = temp - 273.15;
  const alpha = ((17.625 * tempCelsius) / (243.04 + tempCelsius)) + Math.log(humidity / 100);
  const dewPointCelsius = (243.04 * alpha) / (17.625 - alpha);
  return Math.round(dewPointCelsius);
}

function isSafeToSilkPress(forecast: any) {
  if (!forecast) return true; // Default to safe if no forecast is found

  const temp = forecast.main.temp;
  const humidity = forecast.main.humidity;
  const dewPoint = calculateDewPoint(temp, humidity);

  console.log(`Calculated dew point: ${dewPoint}`);
  return dewPoint < 18;
}

async function sendSMSReminder(phoneNumber: string) {
  try {
    const message = await client.messages.create({
      body: 'Your silk press appointment may need to be rescheduled due to weather conditions.',
      from: process.env.NEXT_PUBLIC_TWILIO_PHONE_NUMBER,
      to: phoneNumber,
    });
    console.log('SMS sent successfully:', message.sid);
  } catch (error) {
    console.error('Error sending SMS:', error);
    throw error;
  }
}
