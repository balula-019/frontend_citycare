import { useState, useCallback } from 'react';

/**
 * Hook that wraps browser Geolocation API with loading/error state.
 *
 * @param {(lat: number, lng: number) => void} onSuccess
 */
export function useCurrentLocation(onSuccess) {
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState(null);

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser.');
      return;
    }

    setIsLocating(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsLocating(false);
        onSuccess(pos.coords.latitude, pos.coords.longitude);
      },
      (err) => {
        setIsLocating(false);
        switch (err.code) {
          case err.PERMISSION_DENIED:
            setLocationError('Location access denied. Please allow it in your browser settings.');
            break;
          case err.POSITION_UNAVAILABLE:
            setLocationError('Your location is currently unavailable.');
            break;
          case err.TIMEOUT:
            setLocationError('Location request timed out. Try again.');
            break;
          default:
            setLocationError('Could not retrieve your location.');
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }, [onSuccess]);

  return { isLocating, locationError, requestLocation, clearLocationError: () => setLocationError(null) };
}