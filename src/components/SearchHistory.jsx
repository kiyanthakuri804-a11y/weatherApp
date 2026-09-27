import './SearchHistory.css';

const SearchHistory = ({ history, onSelect, onRemove, onClear }) => {
  if (history.length === 0) return null;

  return (
    <div className="search-history-section" id="search-history-section">
      <div className="history-section-header">
        <h3 className="section-title">Recent Searches</h3>
        <button className="clear-all-btn" onClick={onClear} id="clear-all-history-btn">
          Clear All
        </button>
      </div>
      <div className="history-chips">
        {history.map((city) => (
          <div key={city} className="history-chip" id={`history-chip-${city.replace(/[^a-z0-9]/gi, '-')}`}>
            <button
              className="chip-city-btn"
              onClick={() => onSelect(city)}
              aria-label={`Search ${city}`}
            >
              <span className="chip-icon">🕐</span>
              {city}
            </button>
            <button
              className="chip-remove-btn"
              onClick={() => onRemove(city)}
              aria-label={`Remove ${city}`}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchHistory;
