/**
 * Nominatim OpenStreetMap API service
 * Handles search and reverse geocoding with proper rate-limiting headers.
 */

const BASE_URL = 'https://nominatim.openstreetmap.org';

// Nominatim requires a User-Agent header (policy compliance)
const HEADERS = {
  'Accept-Language': 'en',
};

/**
 * Parse a raw Nominatim result into a clean { title, subtitle, lat, lng } shape.
 */
export function parseResult(result) {
  const parts = result.display_name.split(', ');
  const title = parts[0] || result.name || result.display_name;

  // Build a human-readable subtitle (city / state level)
  const subtitleParts = parts.slice(1).filter(
    (p) =>
      !p.match(/^\d+$/) && // skip raw postcodes
      p.length > 1
  );
  const subtitle = subtitleParts.slice(0, 2).join(', ');

  return {
    id: result.place_id,
    title,
    subtitle,
    locationName: `${title}${subtitle ? ', ' + subtitle : ''}`,
    lat: parseFloat(result.lat),
    lng: parseFloat(result.lon),
    type: result.type,
    raw: result,
  };
}

/**
 * Search Nominatim for a query string.
 * @param {string} query
 * @param {AbortSignal} signal
 * @returns {Promise<Array>}
 */
export async function searchLocations(query, signal) {
  if (!query || query.trim().length < 2) return [];

  const params = new URLSearchParams({
    format: 'json',
    q: query.trim(),
    limit: '6',
    addressdetails: '1',
  });

  const response = await fetch(`${BASE_URL}/search?${params}`, {
    signal,
    headers: HEADERS,
  });

  if (!response.ok) throw new Error(`Nominatim search failed: ${response.status}`);

  const data = await response.json();
  return data.map(parseResult);
}

/**
 * Reverse geocode a lat/lng pair into a location name.
 * @param {number} lat
 * @param {number} lng
 * @param {AbortSignal} [signal]
 * @returns {Promise<string>} Human-readable location name
 */
export async function reverseGeocode(lat, lng, signal) {
  const params = new URLSearchParams({
    format: 'json',
    lat: lat.toString(),
    lon: lng.toString(),
    zoom: '16',
    addressdetails: '1',
  });

  const response = await fetch(`${BASE_URL}/reverse?${params}`, {
    signal,
    headers: HEADERS,
  });

  if (!response.ok) throw new Error(`Reverse geocode failed: ${response.status}`);

  const data = await response.json();
  if (!data || data.error) throw new Error(data?.error || 'No result');

  const parsed = parseResult(data);
  return parsed.locationName;
}