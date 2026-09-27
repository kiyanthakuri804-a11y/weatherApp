import './EmptyState.css';

const EmptyState = () => {
  return (
    <div className="empty-state" id="empty-state">
      <div className="empty-animation">
        <span className="empty-icon floating">🌍</span>
        <div className="floating-clouds">
          <span className="cloud c1">☁️</span>
          <span className="cloud c2">⛅</span>
          <span className="cloud c3">🌤️</span>
        </div>
      </div>
      <h2 className="empty-title">Explore the World's Weather</h2>
      <p className="empty-subtitle">
        Search for any city to get real-time weather conditions, 
        5-day forecasts, and detailed meteorological data.
      </p>
      <div className="empty-features">
        <div className="feature-item">
          <span>🌡️</span>
          <span>Temperature & Feels Like</span>
        </div>
        <div className="feature-item">
          <span>📅</span>
          <span>5-Day Forecast</span>
        </div>
        <div className="feature-item">
          <span>💧</span>
          <span>Humidity & Pressure</span>
        </div>
        <div className="feature-item">
          <span>📍</span>
          <span>Auto Geolocation</span>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;
