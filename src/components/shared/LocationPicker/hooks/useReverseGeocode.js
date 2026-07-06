import { useCallback, useRef } from 'react';
import { reverseGeocode } from '../services/nominatim';

/**
 * Hook that exposes a stable `geocode(lat, lng)` function.
 * Automatically cancels any in-flight request before issuing a new one.
 *
 * @param {(name: string) => void} onSuccess
 * @param {(err: string) => void}  onError
 */
export function useReverseGeocode(onSuccess, onError) {
  const abortRef = useRef(null);

  const geocode = useCallback(
    async (lat, lng) => {
      if (abortRef.current) abortRef.current.abort();
      abortRef.current = new AbortController();

      try {
        const name = await reverseGeocode(lat, lng, abortRef.current.signal);
        onSuccess(name);
      } catch (err) {
        if (err.name === 'AbortError') return;
        onError?.('Could not determine location name.');
      }
    },
    [onSuccess, onError]
  );

  return { geocode };
}