import { useState, useEffect, useRef, useCallback } from 'react';
import { searchLocations } from '../services/nominatim';
import { debounce } from '../utils/debounce';

const DEBOUNCE_MS = 300;

/**
 * Hook that manages search query state, debounced Nominatim calls,
 * AbortController cleanup, and result/loading/error states.
 */
export function useLocationSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Keep a ref to the active AbortController so we can cancel stale requests
  const abortRef = useRef(null);

  // Stable debounced search function
  const debouncedSearch = useRef(
    debounce(async (q, signal) => {
      if (!q || q.trim().length < 2) {
        setResults([]);
        setIsLoading(false);
        return;
      }
      try {
        const data = await searchLocations(q, signal);
        setResults(data);
        setError(null);
      } catch (err) {
        if (err.name === 'AbortError') return; // stale request – ignore
        setError('Search unavailable. Check your connection.');
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, DEBOUNCE_MS)
  ).current;

  useEffect(() => {
    // Cancel previous request
    if (abortRef.current) abortRef.current.abort();
    abortRef.current = new AbortController();

    if (!query || query.trim().length < 2) {
      setResults([]);
      setIsLoading(false);
      debouncedSearch.cancel();
      return;
    }

    setIsLoading(true);
    debouncedSearch(query, abortRef.current.signal);

    return () => {
      debouncedSearch.cancel();
      if (abortRef.current) abortRef.current.abort();
    };
  }, [query]); // eslint-disable-line react-hooks/exhaustive-deps

  const clearResults = useCallback(() => {
    setResults([]);
    setError(null);
  }, []);

  return { query, setQuery, results, isLoading, error, clearResults };
}