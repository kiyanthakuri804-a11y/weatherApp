import './ErrorMessage.css';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="error-container" id="error-message" role="alert" aria-live="assertive">
      <div className="error-icon-wrapper">
        <span className="error-icon">⚠️</span>
        <div className="error-pulse" />
      </div>
      <h3 className="error-title">Oops! Something went wrong</h3>
      <p className="error-text">{message}</p>
      {onRetry && (
        <button className="retry-btn" onClick={onRetry} id="retry-btn">
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
