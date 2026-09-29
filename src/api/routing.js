/*
  Road routing for the organisation map.

  Leaflet draws tiles and lines but knows nothing about roads, so the driving
  path comes from OSRM — the same engine the OpenStreetMap website uses for its
  directions. The public demo server needs no key and has no quota, but it is a
  demo: it offers no uptime guarantee and is not meant to carry production
  traffic. Point VITE_OSRM_URL at a self-hosted OSRM before going live.

  Every caller must cope with this failing; the map falls back to a straight
  line between the two points.
*/
const OSRM_BASE =
  import.meta.env.VITE_OSRM_URL || 'https://router.project-osrm.org';

/**
 * Driving route between two { latitude, longitude } points.
 *
 * Returns the path as Leaflet-ready [lat, lng] pairs, plus the real road
 * distance and duration, which are both longer than the straight line the
 * backend reports.
 */
export const fetchDrivingRoute = async (from, to, { signal } = {}) => {
  const coordinates =
    `${from.longitude},${from.latitude};${to.longitude},${to.latitude}`;

  const response = await fetch(
    `${OSRM_BASE}/route/v1/driving/${coordinates}?overview=full&geometries=geojson`,
    { signal },
  );

  if (!response.ok) {
    throw new Error(`Routing service returned ${response.status}`);
  }

  const data = await response.json();
  const route = data?.routes?.[0];

  if (!route?.geometry?.coordinates?.length) {
    throw new Error('No road route between these two points');
  }

  return {
    // GeoJSON is [lng, lat]; Leaflet wants [lat, lng].
    path: route.geometry.coordinates.map(([lng, lat]) => [lat, lng]),
    distanceKm: Math.round((route.distance / 1000) * 10) / 10,
    durationMinutes: Math.round(route.duration / 60),
  };
};
