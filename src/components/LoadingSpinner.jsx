import './LoadingSpinner.css';

const LoadingSpinner = ({ message = 'Fetching weather data...' }) => {
  return (
    <div className="loading-container" id="loading-spinner" aria-live="polite" aria-busy="true">
      <div className="spinner-wrapper">
        <div className="spinner-ring" />
        <div className="spinner-ring delay-1" />
        <div className="spinner-ring delay-2" />
        <div className="spinner-cloud">⛅</div>
      </div>
      <p className="loading-text">{message}</p>
      <div className="loading-dots">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
};

export default LoadingSpinner;
