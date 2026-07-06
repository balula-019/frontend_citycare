
import { useState, useCallback, useRef } from 'react';
import { MapPin, AlertTriangle } from 'lucide-react';

import LocationSearch from './LocationSearch';
import LocationMap from './LocationMap';
import CurrentLocationButton from './CurrentLocationButton';
import { useReverseGeocode } from '../hooks/useReverseGeocode';
import { useCurrentLocation } from '../hooks/useCurrentLocation';

import '../styles/locationPicker.css';

const DEFAULT_LAT = -6.7924;
const DEFAULT_LNG = 39.2083;

export default function LocationPicker({
  onChange,
  locationName: externalName = '',
  initialLat,
  initialLng,
  placeholder = 'Search for a location…',
}) {
  const [selected, setSelected] = useState({
    locationName: externalName || '',
    lat: initialLat || DEFAULT_LAT,
    lng: initialLng || DEFAULT_LNG,
  });
  const [isGeocoding, setIsGeocoding] = useState(false);
  const [geocodeError, setGeocodeError] = useState(null);

  const hasSelection = useRef(!!(initialLat && initialLng));

  const commitSelection = useCallback(
    (locationName, lat, lng) => {
      hasSelection.current = true;
      setSelected({ locationName, lat, lng });
      onChange?.({ locationName, lat, lng });
    },
    [onChange]
  );

  const { geocode } = useReverseGeocode(
    useCallback(
      (name) => {
        setIsGeocoding(false);
        setGeocodeError(null);
        setSelected((prev) => {
          const next = { ...prev, locationName: name };
          onChange?.(next);
          return next;
        });
      },
      [onChange]
    ),
    useCallback((err) => {
      setIsGeocoding(false);
      // ✅ extract only the message string
      setGeocodeError(
        typeof err === 'string'
          ? err
          : err?.message || 'Could not determine location name.'
      );
    }, [])
  );

  const handleMarkerDrag = useCallback(
    (lat, lng) => {
      hasSelection.current = true;
      setIsGeocoding(true);
      setGeocodeError(null);
      setSelected((prev) => ({ ...prev, lat, lng }));
      geocode(lat, lng);
    },
    [geocode]
  );

  const handleMapClick = useCallback(
    (lat, lng) => {
      hasSelection.current = true;
      setIsGeocoding(true);
      setGeocodeError(null);
      setSelected((prev) => ({ ...prev, lat, lng }));
      geocode(lat, lng);
    },
    [geocode]
  );

  const handleSearchSelect = useCallback(
    (result) => {
      commitSelection(result.locationName, result.lat, result.lng);
    },
    [commitSelection]
  );

  const handleGeoSuccess = useCallback(
    (lat, lng) => {
      setIsGeocoding(true);
      setGeocodeError(null);
      setSelected((prev) => ({ ...prev, lat, lng }));
      geocode(lat, lng);
    },
    [geocode]
  );

  const { isLocating, locationError, requestLocation } = useCurrentLocation(handleGeoSuccess);

  const anyError = geocodeError || locationError;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className="flex-1">
          <LocationSearch
            value={selected.locationName}
            onChange={() => {}}
            onSelect={handleSearchSelect}
            placeholder={placeholder}
            isGeocoding={isGeocoding}
          />
        </div>
        <CurrentLocationButton
          onClick={requestLocation}
          isLocating={isLocating}
        />
      </div>

      {anyError && (
        <div className="lp-error flex items-center gap-2" role="alert">
          <AlertTriangle size={12} className="shrink-0" />
          {anyError}
        </div>
      )}

      <LocationMap
        lat={selected.lat}
        lng={selected.lng}
        onMarkerDrag={handleMarkerDrag}
        onMapClick={handleMapClick}
      />

      {hasSelection.current && selected.locationName && (
        <div className="lp-selected-card">
          <div className="lp-selected-card-icon">
            <MapPin size={15} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="lp-selected-name truncate">{selected.locationName}</div>
            <div className="lp-coord-row">
              <span className="lp-coord">
                <strong>Lat:</strong> {selected.lat.toFixed(6)}
              </span>
              <span className="lp-coord">
                <strong>Lng:</strong> {selected.lng.toFixed(6)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}