import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MapContainer, Marker, Polyline, TileLayer, Tooltip, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  AlertTriangle,
  Building2,
  Clock,
  ExternalLink,
  Loader2,
  MapPin,
  Navigation,
  RefreshCw,
  Route as RouteIcon,
  Ruler,
  Smartphone,
} from 'lucide-react';
import { getOrganisationReportsMap } from '../../api/urbanReports';
import { fetchDrivingRoute } from '../../api/routing';
import { PROBLEM_TYPES, STATUS_STYLES, problemTypeLabelKey } from '../../constants/problemTypes';
import StatusBadge from '../../components/urban/StatusBadge';

/* Dar es Salaam, used only until the first report arrives. */
const FALLBACK_CENTRE = [-6.7924, 39.2083];

const PAGE_SIZE = 50;

const TYPE_BY_VALUE = Object.fromEntries(
  PROBLEM_TYPES.map((type) => [type.value, type]),
);

// Leaflet ships broken default icon paths under Vite.
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const pinIcon = (colour, selected) =>
  new L.DivIcon({
    className: '',
    html: `
      <div style="
        width:${selected ? 30 : 22}px; height:${selected ? 30 : 22}px;
        border-radius:50% 50% 50% 0;
        background:${colour}; border:3px solid #fff;
        box-shadow:0 2px 10px rgba(11,31,38,0.45);
        transform:rotate(-45deg);
      "></div>
    `,
    iconSize: selected ? [30, 30] : [22, 22],
    iconAnchor: selected ? [15, 30] : [11, 22],
  });

const REPORT_PIN = pinIcon('#f59e0b', false);
const SELECTED_PIN = pinIcon('#dc2626', true);
const ORG_PIN = pinIcon('#0f766e', false);

const hasCoordinates = (point) =>
  typeof point?.latitude === 'number' && typeof point?.longitude === 'number';

/** Keeps every pin and the whole route inside the viewport. */
function FitBounds({ points }) {
  const map = useMap();

  useEffect(() => {
    if (points.length === 0) return;

    if (points.length === 1) {
      map.setView(points[0], 16);
      return;
    }

    map.fitBounds(L.latLngBounds(points), { padding: [60, 60] });
  }, [points, map]);

  return null;
}

export default function UrbanProblemMap() {
  const { t } = useTranslation();

  const [points, setPoints] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [status, setStatus] = useState('');
  const [problemType, setProblemType] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [reloadKey, setReloadKey] = useState(0);

  const [route, setRoute] = useState(null);
  const [routeError, setRouteError] = useState('');
  const [routeLoading, setRouteLoading] = useState(false);

  const routeRequest = useRef(null);

  useEffect(() => {
    let active = true;

    (async () => {
      try {
        const response = await getOrganisationReportsMap({
          status: status || undefined,
          problemType: problemType || undefined,
          page: 1,
          size: PAGE_SIZE,
        });

        if (!active) return;

        setPoints(response?.data?.content || []);
        setError('');
      } catch (requestError) {
        if (!active) return;

        setPoints([]);
        setError(
          requestError?.message ||
            t('cc.map.loadFailed', 'The reports on your map could not be loaded.'),
        );
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, [status, problemType, reloadKey, t]);

  const selected = useMemo(
    () => points.find((point) => point.reportId === selectedId) || null,
    [points, selectedId],
  );

  const origin = useMemo(() => {
    if (
      typeof selected?.organisationLatitude !== 'number' ||
      typeof selected?.organisationLongitude !== 'number'
    ) {
      return null;
    }

    return {
      latitude: selected.organisationLatitude,
      longitude: selected.organisationLongitude,
    };
  }, [selected]);

  /* Ask OSRM for the road path once a report is picked. */
  useEffect(() => {
    routeRequest.current?.abort();

    if (!selected || !origin) return undefined;

    const controller = new AbortController();
    routeRequest.current = controller;

    (async () => {
      try {
        const driving = await fetchDrivingRoute(
          origin,
          { latitude: selected.latitude, longitude: selected.longitude },
          { signal: controller.signal },
        );

        if (controller.signal.aborted) return;

        setRoute(driving);
        setRouteError('');
      } catch {
        if (controller.signal.aborted) return;

        // Straight line rather than no line at all.
        setRoute({
          path: [
            [origin.latitude, origin.longitude],
            [selected.latitude, selected.longitude],
          ],
          straightLine: true,
        });
        setRouteError(
          t(
            'cc.map.routeFailed',
            'The road route is unavailable right now, so the line below is a straight one.',
          ),
        );
      } finally {
        if (!controller.signal.aborted) setRouteLoading(false);
      }
    })();

    return () => controller.abort();
  }, [selected, origin, t]);

  const bounds = useMemo(() => {
    const coordinates = points
      .filter(hasCoordinates)
      .map((point) => [point.latitude, point.longitude]);

    if (selected && origin) {
      coordinates.push([origin.latitude, origin.longitude]);
    }

    return coordinates;
  }, [points, selected, origin]);

  const routeBounds = useMemo(
    () => (route?.path?.length ? route.path : bounds),
    [route, bounds],
  );

  const selectReport = (reportId) => {
    setSelectedId(reportId);
    setRoute(null);
    setRouteError('');
    setRouteLoading(true);
  };

  const changeStatus = (value) => {
    setLoading(true);
    setSelectedId(null);
    setRoute(null);
    setStatus(value);
  };

  const changeProblemType = (value) => {
    setLoading(true);
    setSelectedId(null);
    setRoute(null);
    setProblemType(value);
  };

  const refresh = useCallback(() => {
    setLoading(true);
    setReloadKey((key) => key + 1);
  }, []);

  const centre = bounds[0] || FALLBACK_CENTRE;

  return (
    /* The organisation shell owns a 4rem header; fill what is left of the screen. */
    <div className="flex h-[calc(100vh-4rem)] flex-col lg:flex-row">
      {/* ── The list of places to go ───────────────────────────── */}
      <aside className="flex w-full shrink-0 flex-col border-border bg-white lg:w-[360px] lg:border-r">
        <header className="border-b border-border px-5 py-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h1 className="text-lg font-black text-dark">
                {t('cc.map.title', 'Reports on the map')}
              </h1>
              <p className="mt-0.5 text-xs text-muted">
                {t(
                  'cc.map.subtitle',
                  'Every place a resident pinned for your organisation.',
                )}
              </p>
            </div>
            <button
              onClick={refresh}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-border text-muted transition-colors hover:bg-surface hover:text-primary"
              title={t('cc.map.refresh', 'Refresh')}
            >
              <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
            </button>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <select
              value={status}
              onChange={(event) => changeStatus(event.target.value)}
              className="rounded-xl border border-border bg-surface px-3 py-2 text-xs font-semibold text-dark outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
            >
              <option value="">{t('cc.map.allStatuses', 'All statuses')}</option>
              {Object.keys(STATUS_STYLES).map((value) => (
                <option key={value} value={value}>
                  {t(`cc.status.${value}`, STATUS_STYLES[value].label)}
                </option>
              ))}
            </select>

            <select
              value={problemType}
              onChange={(event) => changeProblemType(event.target.value)}
              className="rounded-xl border border-border bg-surface px-3 py-2 text-xs font-semibold text-dark outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
            >
              <option value="">{t('cc.map.allTypes', 'All problems')}</option>
              {PROBLEM_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {t(problemTypeLabelKey(type.value), type.label)}
                </option>
              ))}
            </select>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto">
          {loading && (
            <p className="flex items-center gap-2 px-5 py-6 text-sm text-muted">
              <Loader2 size={15} className="animate-spin" />
              {t('cc.map.loading', 'Loading your reports…')}
            </p>
          )}

          {!loading && error && (
            <p className="mx-5 my-6 flex items-start gap-2 rounded-xl bg-danger/10 px-4 py-3 text-sm text-danger">
              <AlertTriangle size={16} className="mt-0.5 shrink-0" />
              {error}
            </p>
          )}

          {!loading && !error && points.length === 0 && (
            <div className="px-5 py-10 text-center">
              <MapPin size={28} className="mx-auto mb-3 text-border" />
              <p className="text-sm font-semibold text-dark">
                {t('cc.map.emptyTitle', 'Nothing to travel to yet')}
              </p>
              <p className="mt-1 text-xs text-muted">
                {t(
                  'cc.map.emptyBody',
                  'Reports routed to your organisation appear here with their exact location.',
                )}
              </p>
            </div>
          )}

          {!loading &&
            !error &&
            points.map((point) => {
              const type = TYPE_BY_VALUE[point.problemType];
              const Icon = type?.icon || MapPin;
              const active = point.reportId === selectedId;

              return (
                <button
                  key={point.reportId}
                  onClick={() => selectReport(point.reportId)}
                  className={`flex w-full items-start gap-3 border-b border-border px-5 py-4 text-left transition-colors ${
                    active ? 'bg-primary-tint' : 'hover:bg-surface'
                  }`}
                >
                  <span
                    className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                      active ? 'bg-primary text-white' : 'bg-primary-soft text-primary'
                    }`}
                  >
                    <Icon size={16} />
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2">
                      <span className="truncate text-sm font-bold text-dark">
                        {t(problemTypeLabelKey(point.problemType), type?.label || point.problemType)}
                      </span>
                      <StatusBadge status={point.status} className="shrink-0 scale-90" />
                    </span>

                    <span className="mt-1 block truncate text-xs text-muted">
                      {point.locationName ||
                        [point.ward, point.district].filter(Boolean).join(', ') ||
                        point.reportReference}
                    </span>

                    {typeof point.distanceFromOrganisationKm === 'number' && (
                      <span className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-bold text-primary">
                        <Ruler size={11} />
                        {t('cc.map.kmAway', '{{km}} km away', {
                          km: point.distanceFromOrganisationKm,
                        })}
                      </span>
                    )}
                  </span>
                </button>
              );
            })}
        </div>
      </aside>

      {/* ── The map itself ─────────────────────────────────────── */}
      <section className="relative min-h-[420px] flex-1">
        <MapContainer
          center={centre}
          zoom={12}
          scrollWheelZoom
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            maxZoom={19}
          />

          <FitBounds points={routeBounds} />

          {origin && (
            <Marker position={[origin.latitude, origin.longitude]} icon={ORG_PIN}>
              <Tooltip direction="top" offset={[0, -12]}>
                {selected?.organisationName ||
                  t('cc.map.yourOrganisation', 'Your organisation')}
              </Tooltip>
            </Marker>
          )}

          {points.filter(hasCoordinates).map((point) => (
            <Marker
              key={point.reportId}
              position={[point.latitude, point.longitude]}
              icon={point.reportId === selectedId ? SELECTED_PIN : REPORT_PIN}
              eventHandlers={{ click: () => selectReport(point.reportId) }}
            >
              <Tooltip direction="top" offset={[0, -12]}>
                {point.locationName || point.reportReference}
              </Tooltip>
            </Marker>
          ))}

          {route?.path?.length > 1 && (
            <Polyline
              positions={route.path}
              pathOptions={{
                color: route.straightLine ? '#94a3b8' : '#0f766e',
                weight: 5,
                opacity: 0.85,
                dashArray: route.straightLine ? '8 10' : undefined,
              }}
            />
          )}
        </MapContainer>

        {/* Travel card for the pin that is open */}
        {selected && (
          <div className="pointer-events-auto absolute bottom-4 left-4 right-4 z-[500] rounded-2xl border border-border bg-white/95 p-4 shadow-xl backdrop-blur sm:right-auto sm:w-[400px]">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-black text-dark">
                  {selected.locationName ||
                    t('cc.map.unnamedPlace', 'Location pinned by the reporter')}
                </p>
                <p className="mt-0.5 truncate text-xs text-muted">
                  {[selected.ward, selected.district, selected.region]
                    .filter(Boolean)
                    .join(' · ')}
                </p>
              </div>
              <span className="shrink-0 font-mono text-[11px] text-muted">
                {selected.reportReference}
              </span>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
              {routeLoading && (
                <span className="flex items-center gap-1.5 text-muted">
                  <Loader2 size={13} className="animate-spin" />
                  {t('cc.map.routeLoading', 'Working out the road route…')}
                </span>
              )}

              {!routeLoading && typeof route?.distanceKm === 'number' && (
                <span className="flex items-center gap-1.5 font-bold text-dark">
                  <RouteIcon size={13} className="text-primary" />
                  {t('cc.map.byRoad', '{{km}} km by road', { km: route.distanceKm })}
                </span>
              )}

              {!routeLoading && typeof route?.durationMinutes === 'number' && (
                <span className="flex items-center gap-1.5 font-bold text-dark">
                  <Clock size={13} className="text-primary" />
                  {t('cc.map.minutesDriving', '{{minutes}} min driving', {
                    minutes: route.durationMinutes,
                  })}
                </span>
              )}

              {typeof selected.distanceFromOrganisationKm === 'number' && (
                <span className="flex items-center gap-1.5 text-muted">
                  <Ruler size={13} />
                  {t('cc.map.straightLine', '{{km}} km straight line', {
                    km: selected.distanceFromOrganisationKm,
                  })}
                </span>
              )}
            </div>

            {!origin && (
              <p className="mt-3 flex items-start gap-2 rounded-xl bg-warning/10 px-3 py-2 text-[11px] text-warning">
                <AlertTriangle size={13} className="mt-0.5 shrink-0" />
                {t(
                  'cc.map.noOrigin',
                  'Your organisation has no coordinates on file, so no route can be drawn. An admin can add them to your profile.',
                )}
              </p>
            )}

            {routeError && (
              <p className="mt-3 flex items-start gap-2 rounded-xl bg-surface px-3 py-2 text-[11px] text-muted">
                <AlertTriangle size={13} className="mt-0.5 shrink-0" />
                {routeError}
              </p>
            )}

            <div className="mt-4 flex flex-wrap gap-2">
              <a
                href={selected.openStreetMapDirectionsUrl || selected.openStreetMapUrl}
                target="_blank"
                rel="noreferrer"
                className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-primary px-3 py-2.5 text-xs font-bold text-white transition-colors hover:bg-primary-hover"
              >
                <Navigation size={13} />
                {t('cc.map.openOsm', 'Open in OpenStreetMap')}
              </a>

              <a
                href={selected.googleMapsDirectionsUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-1.5 rounded-xl border border-border px-3 py-2.5 text-xs font-bold text-dark transition-colors hover:bg-surface"
              >
                <ExternalLink size={13} />
                {t('cc.map.openGoogle', 'Google Maps')}
              </a>

              <a
                href={selected.geoUri}
                className="flex items-center justify-center gap-1.5 rounded-xl border border-border px-3 py-2.5 text-xs font-bold text-dark transition-colors hover:bg-surface"
                title={t('cc.map.openPhoneHint', 'Opens the map app on a phone')}
              >
                <Smartphone size={13} />
                {t('cc.map.openPhone', 'Phone')}
              </a>
            </div>

            {selected.imageUrls?.length > 0 && (
              <div className="mt-4 flex gap-2 overflow-x-auto">
                {selected.imageUrls.map((url) => (
                  <a key={url} href={url} target="_blank" rel="noreferrer" className="shrink-0">
                    <img
                      src={url}
                      alt={t('cc.map.photoAlt', 'Photo of the reported problem')}
                      className="h-16 w-20 rounded-lg border border-border object-cover"
                    />
                  </a>
                ))}
              </div>
            )}

            {selected.description && (
              <p className="mt-3 line-clamp-3 text-xs leading-relaxed text-muted">
                {selected.description}
              </p>
            )}
          </div>
        )}

        {!selected && points.length > 0 && (
          <div className="pointer-events-none absolute bottom-4 left-1/2 z-[500] -translate-x-1/2 rounded-full bg-dark/80 px-4 py-2 text-xs font-semibold text-white backdrop-blur">
            <span className="flex items-center gap-1.5">
              <Building2 size={13} />
              {t('cc.map.pickHint', 'Pick a pin to draw the route from your office')}
            </span>
          </div>
        )}
      </section>
    </div>
  );
}
