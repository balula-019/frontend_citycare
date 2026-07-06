import { useState, useRef, useCallback, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useLocationSearch } from '../hooks/useLocationSearch';
import SearchDropdown from './SearchDropdown';

/**
 * Search input with debounced Nominatim autocomplete dropdown.
 * Handles keyboard navigation (↑↓ Enter Escape) and click-outside.
 *
 * Props:
 *  - value          {string}   controlled display value
 *  - onChange       {fn}       called with query text (typing)
 *  - onSelect       {fn}       called with full result object when user picks one
 *  - placeholder    {string}
 *  - isGeocoding    {boolean}  show spinner during reverse geocoding
 */
export default function LocationSearch({
  value,
  onChange,
  onSelect,
  placeholder = 'Search location…',
  isGeocoding = false,
}) {
  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const {
    query,
    setQuery,
    results,
    isLoading,
    error,
    clearResults,
  } = useLocationSearch();

  // Sync external value → internal query when the parent resets the field
  // (e.g. after selecting from map and the location name is populated externally)
  useEffect(() => {
    // Only sync if the user isn't actively typing (avoids fighting the hook)
    if (document.activeElement !== inputRef.current) {
      setQuery(value ?? '');
    }
  }, [value]); // eslint-disable-line react-hooks/exhaustive-deps

  // Open dropdown when results arrive
  useEffect(() => {
    if (results.length > 0) {
      setIsOpen(true);
      setActiveIndex(-1);
    } else {
      setIsOpen(false);
    }
  }, [results]);

  // Click-outside to close
  useEffect(() => {
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleChange = useCallback(
    (e) => {
      const val = e.target.value;
      setQuery(val);
      onChange?.(val);
      if (!val) {
        clearResults();
        setIsOpen(false);
      }
    },
    [setQuery, onChange, clearResults]
  );

  const handleSelect = useCallback(
    (result) => {
      setIsOpen(false);
      clearResults();
      setQuery(result.locationName);
      onSelect(result);
    },
    [clearResults, setQuery, onSelect]
  );

  const handleClear = useCallback(() => {
    setQuery('');
    onChange?.('');
    clearResults();
    setIsOpen(false);
    inputRef.current?.focus();
  }, [setQuery, onChange, clearResults]);

  const handleKeyDown = useCallback(
    (e) => {
      if (!isOpen) return;
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setActiveIndex((i) => Math.min(i + 1, results.length - 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setActiveIndex((i) => Math.max(i - 1, 0));
          break;
        case 'Enter':
          e.preventDefault();
          if (activeIndex >= 0 && results[activeIndex]) {
            handleSelect(results[activeIndex]);
          }
          break;
        case 'Escape':
          setIsOpen(false);
          setActiveIndex(-1);
          break;
        default:
          break;
      }
    },
    [isOpen, activeIndex, results, handleSelect]
  );

  const showSpinner = isLoading || isGeocoding;

  return (
    <div className="lp-search-container" ref={containerRef}>
      {/* Input row */}
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          <Search size={15} />
        </span>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => results.length > 0 && setIsOpen(true)}
          placeholder={placeholder}
          autoComplete="off"
          aria-autocomplete="list"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          role="combobox"
          className="w-full pl-9 pr-16 py-2.5 rounded-xl border border-[#e2e8f0]
                     focus:ring-2 focus:ring-[#1a56db]/20 focus:border-[#1a56db]
                     outline-none text-sm text-[#0f172a] bg-white transition-all
                     placeholder:text-gray-400"
        />

        {/* Right-side indicators */}
        <span className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
          {showSpinner && <span className="lp-spinner" aria-label="Searching…" />}
          {query && !showSpinner && (
            <button
              onClick={handleClear}
              aria-label="Clear search"
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={14} />
            </button>
          )}
        </span>
      </div>

      {/* Error */}
      {error && <div className="lp-error" role="alert">{error}</div>}

      {/* Dropdown */}
      {isOpen && (
        <SearchDropdown
          results={results}
          activeIndex={activeIndex}
          onSelect={handleSelect}
          onMouseEnter={setActiveIndex}
        />
      )}
    </div>
  );
}