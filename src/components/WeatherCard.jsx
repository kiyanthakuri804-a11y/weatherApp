import { formatTemp, formatDate, formatTime, getWeatherGradient, mpsToKmh, mpsToMph, getWindDirection } from '../utils/weatherUtils';
import './WeatherCard.css';

const WeatherCard = ({ data, unit }) => {
  if (!data) return null;

  const { name, sys, main, weather, wind, visibility, clouds, dt, timezone } = data;
  const condition = weather[0];
  const isDay = dt > data.sys.sunrise && dt < data.sys.sunset;
  const gradient = getWeatherGradient(condition.id, isDay);
  const iconUrl = `https://openweathermap.org/img/wn/${condition.icon}@4x.png`;

  const windSpeed = unit === 'C'
    ? `${mpsToKmh(wind.speed)} km/h`
    : `${mpsToMph(wind.speed)} mph`;

  const feelsLike = formatTemp(main.feels_like, unit);
  const tempMax = formatTemp(main.temp_max, unit);
  const tempMin = formatTemp(main.temp_min, unit);

  return (
    <div className={`weather-card ${gradient}`} id="current-weather-card">
      <div className="card-overlay" />

      <div className="card-header">
        <div className="location-info">
          <h2 className="city-name">{name}</h2>
          <p className="country-flag">{sys.country}</p>
        </div>
        <div className="date-time-info">
          <p className="current-date">{formatDate(dt, timezone)}</p>
          <p className="current-time">{formatTime(dt, timezone)} local</p>
        </div>
      </div>

      <div className="card-main">
        <div className="weather-visual">
          <img
            src={iconUrl}
            alt={condition.description}
            className="weather-icon-large"
          />
          <p className="condition-text">{condition.description}</p>
        </div>

        <div className="temperature-display">
          <span className="temp-main">{formatTemp(main.temp, unit)}</span>
          <div className="temp-range">
            <span className="temp-high">↑ {tempMax}</span>
            <span className="temp-low">↓ {tempMin}</span>
          </div>
          <p className="feels-like">Feels like {feelsLike}</p>
        </div>
      </div>

      <div className="card-stats">
        <div className="stat-item" id="stat-humidity">
          <span className="stat-icon">💧</span>
          <div className="stat-info">
            <span className="stat-value">{main.humidity}%</span>
            <span className="stat-label">Humidity</span>
          </div>
        </div>
        <div className="stat-item" id="stat-wind">
          <span className="stat-icon">💨</span>
          <div className="stat-info">
            <span className="stat-value">{windSpeed}</span>
            <span className="stat-label">Wind {getWindDirection(wind.deg)}</span>
          </div>
        </div>
        <div className="stat-item" id="stat-visibility">
          <span className="stat-icon">👁️</span>
          <div className="stat-info">
            <span className="stat-value">{visibility ? `${(visibility / 1000).toFixed(1)} km` : 'N/A'}</span>
            <span className="stat-label">Visibility</span>
          </div>
        </div>
        <div className="stat-item" id="stat-clouds">
          <span className="stat-icon">☁️</span>
          <div className="stat-info">
            <span className="stat-value">{clouds.all}%</span>
            <span className="stat-label">Cloud Cover</span>
          </div>
        </div>
        <div className="stat-item" id="stat-pressure">
          <span className="stat-icon">🌡️</span>
          <div className="stat-info">
            <span className="stat-value">{main.pressure} hPa</span>
            <span className="stat-label">Pressure</span>
          </div>
        </div>
        <div className="stat-item" id="stat-sunrise">
          <span className="stat-icon">🌅</span>
          <div className="stat-info">
            <span className="stat-value">{formatTime(sys.sunrise, timezone)}</span>
            <span className="stat-label">Sunrise</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
