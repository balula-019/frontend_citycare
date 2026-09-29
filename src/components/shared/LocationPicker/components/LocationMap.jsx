import { useEffect, useRef, memo } from 'react';
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet's broken default icon paths in Vite/webpack builds
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

/** Custom marker that matches the City Care brand */
const brandIcon = new L.DivIcon({
  className: '',
  html: `
    <div style="
      width:26px; height:26px; border-radius:50% 50% 50% 0;
      background:#0f766e; border:3px solid #fff;
      box-shadow:0 2px 8px rgba(26,86,219,0.4);
      transform:rotate(-45deg);
      transform-origin:center;
    "></div>
  `,
  iconSize: [26, 26],
  iconAnchor: [13, 26],
  popupAnchor: [0, -28],
});

/** Inner component: keeps the map centred when `center` prop changes. */
function MapController({ center }) {
  const map = useMap();
  const prevCenter = useRef(null);

  useEffect(() => {
    if (!center) return;
    const [lat, lng] = center;
    if (
      prevCenter.current &&
      prevCenter.current[0] === lat &&
      prevCenter.current[1] === lng
    ) return;
    prevCenter.current = center;
    map.flyTo([lat, lng], Math.max(map.getZoom(), 15), { duration: 0.8 });
  }, [center, map]);

  return null;
}

/** Listens for map clicks to move the marker. */
function MapClickHandler({ onClick }) {
  useMapEvents({
    click(e) {
      onClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

/**
 * Props:
 *   lat, lng            {number}   current marker position
 *   onMarkerDrag        {fn}       called with (lat, lng) after drag ends
 *   onMapClick          {fn}       called with (lat, lng) on map click
 */
const LocationMap = memo(function LocationMap({ lat, lng, onMarkerDrag, onMapClick }) {
  const markerRef = useRef(null);

  const handleDragEnd = () => {
    const marker = markerRef.current;
    if (!marker) return;
    const pos = marker.getLatLng();
    onMarkerDrag(pos.lat, pos.lng);
  };

  return (
    <div className="lp-map-wrapper">
      <MapContainer
        center={[lat, lng]}
        zoom={14}
        className="lp-map"
        zoomControl
        scrollWheelZoom
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
        />

        <MapController center={[lat, lng]} />
        <MapClickHandler onClick={onMapClick} />

        <Marker
          ref={markerRef}
          position={[lat, lng]}
          icon={brandIcon}
          draggable
          eventHandlers={{ dragend: handleDragEnd }}
        />
      </MapContainer>

      {/* Hint overlay */}
      <div
        style={{
          position: 'absolute',
          bottom: 8,
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(15,23,42,0.65)',
          color: '#fff',
          fontSize: 10,
          fontWeight: 600,
          padding: '4px 10px',
          borderRadius: 20,
          pointerEvents: 'none',
          zIndex: 500,
          whiteSpace: 'nowrap',
          backdropFilter: 'blur(4px)',
        }}
      >
        Drag marker · Click map to reposition
      </div>
    </div>
  );
});

export default LocationMap;