import { useEffect } from 'react';
import useWeather from '../hooks/useWeather';
import useGeolocation from '../hooks/useGeolocation';
import SearchBar from '../components/SearchBar';
import WeatherCard from '../components/WeatherCard';
import ForecastCard from '../components/ForecastCard';
import SearchHistory from '../components/SearchHistory';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import EmptyState from '../components/EmptyState';
import UnitToggle from '../components/UnitToggle';
import './Dashboard.css';

const Dashboard = () => {
  const {
    currentWeather,
    forecast,
    loading,
    error,
    searchHistory,
    unit,
    fetchWeatherByCity,
    fetchWeatherByCoords,
    clearHistory,
    toggleUnit,
    removeFromHistory,
  } = useWeather();

  const { location, geoError, geoLoading, getLocation } = useGeolocation();

  // When geolocation resolves, fetch weather
  useEffect(() => {
    if (location) {
      fetchWeatherByCoords(location.lat, location.lon);
    }
  }, [location, fetchWeatherByCoords]);

  const handleSearch = (city) => {
    fetchWeatherByCity(city);
  };

  const hasData = currentWeather && !loading && !error;

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header" id="app-header">
        <div className="header-content">
          <div className="brand">
            <span className="brand-logo">🌤️</span>
            <div className="brand-text">
              <h1 className="brand-title">Skycast</h1>
              <p className="brand-subtitle">Live Weather Dashboard</p>
            </div>
          </div>
          <div className="header-controls">
            <UnitToggle unit={unit} onToggle={toggleUnit} />
          </div>
        </div>
      </header>

      {/* Search */}
      <section className="search-section" id="search-section">
        <SearchBar
          onSearch={handleSearch}
          loading={loading}
          searchHistory={searchHistory}
          onHistorySelect={handleSearch}
          onRemoveHistory={removeFromHistory}
          onClearHistory={clearHistory}
          onGeolocate={getLocation}
          geoLoading={geoLoading}
        />
        {geoError && (
          <p className="geo-error" role="alert">{geoError}</p>
        )}
      </section>

      {/* Main Content */}
      <main className="dashboard-main" id="main-content">
        {loading && <LoadingSpinner message="Fetching weather data..." />}

        {error && !loading && (
          <ErrorMessage
            message={error}
            onRetry={() => currentWeather && fetchWeatherByCity(currentWeather.name)}
          />
        )}

        {!loading && !error && !currentWeather && <EmptyState />}

        {hasData && (
          <div className="weather-content" id="weather-content">
            <WeatherCard data={currentWeather} unit={unit} />
            <ForecastCard forecastData={forecast} unit={unit} />
          </div>
        )}
      </main>

      {/* Search History Panel */}
      {searchHistory.length > 0 && (
        <section className="history-section-outer" id="history-outer">
          <SearchHistory
            history={searchHistory}
            onSelect={handleSearch}
            onRemove={removeFromHistory}
            onClear={clearHistory}
          />
        </section>
      )}

      {/* Footer */}
      <footer className="dashboard-footer" id="app-footer">
        <p>
          Powered by{' '}
          <a href="https://openweathermap.org" target="_blank" rel="noopener noreferrer">
            OpenWeatherMap
          </a>{' '}
          · Built with React + Vite
        </p>
      </footer>
    </div>
  );
};

export default Dashboard;
