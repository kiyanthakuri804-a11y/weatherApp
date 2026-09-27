// Weather utility functions

export const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
export const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const kelvinToCelsius = (k) => Math.round(k - 273.15);
export const kelvinToFahrenheit = (k) => Math.round(((k - 273.15) * 9) / 5 + 32);
export const celsiusToFahrenheit = (c) => Math.round((c * 9) / 5 + 32);
export const fahrenheitToCelsius = (f) => Math.round(((f - 32) * 5) / 9);

export const formatTemp = (kelvin, unit) => {
  if (unit === 'C') return `${kelvinToCelsius(kelvin)}°C`;
  return `${kelvinToFahrenheit(kelvin)}°F`;
};

export const formatDate = (timestamp, timezone) => {
  const date = new Date((timestamp + timezone) * 1000);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
};

export const formatTime = (timestamp, timezone) => {
  const date = new Date((timestamp + timezone) * 1000);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC',
  });
};

export const getWeatherGradient = (weatherId, isDay) => {
  // Thunderstorm
  if (weatherId >= 200 && weatherId < 300) return 'gradient-thunder';
  // Drizzle / Rain
  if (weatherId >= 300 && weatherId < 600) return 'gradient-rain';
  // Snow
  if (weatherId >= 600 && weatherId < 700) return 'gradient-snow';
  // Atmosphere (fog, mist, etc)
  if (weatherId >= 700 && weatherId < 800) return 'gradient-fog';
  // Clear sky
  if (weatherId === 800) return isDay ? 'gradient-clear-day' : 'gradient-clear-night';
  // Clouds
  if (weatherId > 800) return isDay ? 'gradient-clouds-day' : 'gradient-clouds-night';
  return 'gradient-default';
};

export const getWeatherEmoji = (weatherId) => {
  if (weatherId >= 200 && weatherId < 300) return '⛈️';
  if (weatherId >= 300 && weatherId < 400) return '🌦️';
  if (weatherId >= 400 && weatherId < 600) return '🌧️';
  if (weatherId >= 600 && weatherId < 700) return '❄️';
  if (weatherId >= 700 && weatherId < 800) return '🌫️';
  if (weatherId === 800) return '☀️';
  if (weatherId === 801 || weatherId === 802) return '⛅';
  return '☁️';
};

export const formatForecastDay = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
};

export const groupForecastByDay = (list) => {
  const grouped = {};
  list.forEach((item) => {
    const date = new Date(item.dt * 1000).toLocaleDateString('en-US');
    if (!grouped[date]) {
      grouped[date] = [];
    }
    grouped[date].push(item);
  });

  return Object.entries(grouped)
    .slice(0, 5)
    .map(([date, items]) => {
      const midday = items.find((i) => new Date(i.dt * 1000).getHours() >= 11) || items[Math.floor(items.length / 2)];
      const maxTemp = Math.max(...items.map((i) => i.main.temp_max));
      const minTemp = Math.min(...items.map((i) => i.main.temp_min));
      return {
        date,
        dt: midday.dt,
        temp: midday.main.temp,
        temp_max: maxTemp,
        temp_min: minTemp,
        weather: midday.weather[0],
        humidity: midday.main.humidity,
        wind_speed: midday.wind.speed,
        description: midday.weather[0].description,
      };
    });
};

export const getWindDirection = (deg) => {
  const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  return dirs[Math.round(deg / 45) % 8];
};

export const getUVIndexLabel = (uvi) => {
  if (uvi <= 2) return { label: 'Low', color: '#4caf50' };
  if (uvi <= 5) return { label: 'Moderate', color: '#ffeb3b' };
  if (uvi <= 7) return { label: 'High', color: '#ff9800' };
  if (uvi <= 10) return { label: 'Very High', color: '#f44336' };
  return { label: 'Extreme', color: '#9c27b0' };
};

export const mpsToKmh = (mps) => Math.round(mps * 3.6);
export const mpsToMph = (mps) => Math.round(mps * 2.237);
