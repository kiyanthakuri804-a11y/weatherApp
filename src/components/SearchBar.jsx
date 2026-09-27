import { useState, useRef, useEffect } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch, loading, searchHistory, onHistorySelect, onRemoveHistory, onClearHistory, onGeolocate, geoLoading }) => {
  const [query, setQuery] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowHistory(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setShowHistory(false);
    }
  };

  const handleHistoryClick = (city) => {
    setQuery(city);
    onHistorySelect(city);
    setShowHistory(false);
  };

  const handleFocus = () => {
    if (searchHistory.length > 0) setShowHistory(true);
  };

  return (
    <div className="search-container" ref={containerRef}>
      <form className="search-form" onSubmit={handleSubmit} id="city-search-form">
        <div className="search-input-wrapper">
          <span className="search-icon">🔍</span>
          <input
            ref={inputRef}
            id="city-search-input"
            type="text"
            className="search-input"
            placeholder="Search for a city..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={handleFocus}
            autoComplete="off"
            aria-label="Search city"
          />
          {query && (
            <button
              type="button"
              className="clear-input-btn"
              onClick={() => { setQuery(''); inputRef.current.focus(); }}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>
        <button
          id="search-submit-btn"
          type="submit"
          className="search-btn"
          disabled={loading || !query.trim()}
          aria-label="Search"
        >
          {loading ? <span className="btn-spinner" /> : 'Search'}
        </button>
        <button
          id="geolocate-btn"
          type="button"
          className="geo-btn"
          onClick={onGeolocate}
          disabled={geoLoading || loading}
          title="Use my location"
          aria-label="Use my location"
        >
          {geoLoading ? <span className="btn-spinner" /> : '📍'}
        </button>
      </form>

      {showHistory && searchHistory.length > 0 && (
        <div className="search-history-dropdown" role="listbox">
          <div className="history-header">
            <span>Recent Searches</span>
            <button
              className="clear-history-btn"
              onClick={() => { onClearHistory(); setShowHistory(false); }}
              aria-label="Clear history"
            >
              Clear all
            </button>
          </div>
          <ul className="history-list">
            {searchHistory.map((city) => (
              <li key={city} className="history-item" role="option">
                <button
                  className="history-city-btn"
                  onClick={() => handleHistoryClick(city)}
                >
                  <span className="history-icon">🕐</span>
                  {city}
                </button>
                <button
                  className="remove-history-btn"
                  onClick={(e) => { e.stopPropagation(); onRemoveHistory(city); }}
                  aria-label={`Remove ${city} from history`}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
