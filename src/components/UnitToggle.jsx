import './UnitToggle.css';

const UnitToggle = ({ unit, onToggle }) => {
  return (
    <div className="unit-toggle-wrapper" id="unit-toggle">
      <span className={`unit-label ${unit === 'C' ? 'active' : ''}`}>°C</span>
      <button
        className={`toggle-track ${unit === 'F' ? 'toggled' : ''}`}
        onClick={onToggle}
        role="switch"
        aria-checked={unit === 'F'}
        aria-label="Toggle temperature unit"
        id="unit-toggle-btn"
      >
        <span className="toggle-thumb" />
      </button>
      <span className={`unit-label ${unit === 'F' ? 'active' : ''}`}>°F</span>
    </div>
  );
};

export default UnitToggle;
