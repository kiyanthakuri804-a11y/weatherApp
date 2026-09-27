import { formatTemp, formatForecastDay, getWeatherEmoji } from '../utils/weatherUtils';
import { groupForecastByDay } from '../utils/weatherUtils';
import './ForecastCard.css';

const ForecastCard = ({ forecastData, unit }) => {
  if (!forecastData) return null;

  const days = groupForecastByDay(forecastData.list);

  return (
    <div className="forecast-section" id="forecast-section">
      <h3 className="section-title">5-Day Forecast</h3>
      <div className="forecast-grid">
        {days.map((day, index) => (
          <div
            key={day.dt}
            className="forecast-day-card"
            id={`forecast-day-${index}`}
            style={{ animationDelay: `${index * 0.08}s` }}
          >
            <p className="forecast-date">{formatForecastDay(day.dt)}</p>
            <div className="forecast-icon-wrapper">
              <img
                src={`https://openweathermap.org/img/wn/${day.weather.icon}@2x.png`}
                alt={day.weather.description}
                className="forecast-icon"
              />
            </div>
            <p className="forecast-description">{day.weather.description}</p>
            <div className="forecast-temps">
              <span className="forecast-high">{formatTemp(day.temp_max, unit)}</span>
              <span className="forecast-divider">/</span>
              <span className="forecast-low">{formatTemp(day.temp_min, unit)}</span>
            </div>
            <div className="forecast-extra">
              <span className="forecast-humidity">💧 {day.humidity}%</span>
              <span className="forecast-wind">💨 {Math.round(day.wind_speed)} m/s</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastCard;
