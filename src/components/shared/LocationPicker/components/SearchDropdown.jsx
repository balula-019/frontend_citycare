import { memo } from 'react';
import { MapPin } from 'lucide-react';

/**
 * Renders the autocomplete dropdown list.
 * Keyboard navigation (activeIndex) is owned by the parent.
 */
const SearchDropdown = memo(function SearchDropdown({
  results,
  activeIndex,
  onSelect,
  onMouseEnter,
}) {
  if (!results.length) return null;

  return (
    <div
      className="lp-dropdown"
      role="listbox"
      aria-label="Location suggestions"
    >
      {results.map((result, idx) => (
        <div
          key={result.id}
          role="option"
          aria-selected={idx === activeIndex}
          className={`lp-dropdown-item${idx === activeIndex ? ' lp-active' : ''}`}
          onMouseDown={(e) => {
            e.preventDefault(); // keep input focused
            onSelect(result);
          }}
          onMouseEnter={() => onMouseEnter(idx)}
        >
          <MapPin size={15} className="lp-item-icon" />
          <div>
            <div className="lp-item-title">{result.title}</div>
            {result.subtitle && (
              <div className="lp-item-subtitle">{result.subtitle}</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
});

export default SearchDropdown;