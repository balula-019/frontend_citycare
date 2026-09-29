import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  AlertTriangle,
  ArrowRight,
  Bell,
  CheckCircle2,
  Clock,
  Inbox,
  Loader2,
  MapPin,
  Navigation,
  RefreshCw,
  Ruler,
} from 'lucide-react';
import { getOrganisationReportsMap, getUrbanProblemStatistics } from '../../api/urbanReports';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { PROBLEM_TYPES, problemTypeLabelKey } from '../../constants/problemTypes';
import StatusBadge from '../../components/urban/StatusBadge';

/* One page covers everything an organisation realistically has open at once. */
const FETCH_SIZE = 100;

const OPEN_STATUSES = ['SUBMITTED', 'VERIFIED', 'ASSIGNED'];

const TYPE_BY_VALUE = Object.fromEntries(
  PROBLEM_TYPES.map((type) => [type.value, type]),
);

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  day: 'numeric',
  month: 'short',
  hour: '2-digit',
  minute: '2-digit',
});

const formatDate = (value) => {
  if (!value) return '';

  const parsed = new Date(value);

  return Number.isNaN(parsed.getTime()) ? '' : dateFormatter.format(parsed);
};

function StatCard({ icon: Icon, label, value, tone = 'primary', hint }) {
  const tones = {
    primary: 'bg-primary-soft text-primary',
    warning: 'bg-warning/15 text-warning',
    info: 'bg-info/15 text-info',
    success: 'bg-success/15 text-success',
  };

  return (
    <div className="rounded-2xl border border-border bg-white p-5">
      <span className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${tones[tone]}`}>
        <Icon size={18} />
      </span>
      <p className="mt-4 text-3xl font-black leading-none text-dark">{value}</p>
      <p className="mt-1.5 text-xs font-semibold uppercase tracking-wide text-muted">{label}</p>
      {hint && <p className="mt-1 text-[11px] text-muted">{hint}</p>}
    </div>
  );
}

export default function OrgDashboard() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { unreadCount } = useNotifications();

  const [reports, setReports] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let active = true;

    (async () => {
      try {
        /*
          Statistics are nationwide and only used for context, so a failure
          there must not empty the dashboard.
        */
        const [mine, national] = await Promise.all([
          getOrganisationReportsMap({ page: 1, size: FETCH_SIZE }),
          getUrbanProblemStatistics().catch(() => null),
        ]);

        if (!active) return;

        setReports(mine?.data?.content || []);
        setStatistics(national?.data || null);
        setError('');
      } catch (requestError) {
        if (!active) return;

        setReports([]);
        setError(
          requestError?.message ||
            t('cc.orgHome.loadFailed', 'Your reports could not be loaded.'),
        );
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, [reloadKey, t]);

  const refresh = useCallback(() => {
    setLoading(true);
    setReloadKey((key) => key + 1);
  }, []);

  const counts = useMemo(() => {
    const byStatus = reports.reduce((totals, report) => {
      totals[report.status] = (totals[report.status] || 0) + 1;
      return totals;
    }, {});

    const open = OPEN_STATUSES.reduce(
      (total, status) => total + (byStatus[status] || 0),
      0,
    );

    const distances = reports
      .map((report) => report.distanceFromOrganisationKm)
      .filter((distance) => typeof distance === 'number');

    return {
      total: reports.length,
      open,
      inProgress: byStatus.IN_PROGRESS || 0,
      resolved: byStatus.RESOLVED || 0,
      nearest: distances.length ? Math.min(...distances) : null,
    };
  }, [reports]);

  /* Which problems this organisation actually deals with, biggest first. */
  const byType = useMemo(() => {
    const totals = reports.reduce((map, report) => {
      map[report.problemType] = (map[report.problemType] || 0) + 1;
      return map;
    }, {});

    return Object.entries(totals)
      .map(([value, total]) => ({
        value,
        total,
        share: reports.length ? Math.round((total / reports.length) * 100) : 0,
      }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 5);
  }, [reports]);

  const queue = useMemo(
    () =>
      [...reports]
        .sort((a, b) => new Date(b.reportedAt || 0) - new Date(a.reportedAt || 0))
        .slice(0, 6),
    [reports],
  );

  const orgName =
    reports[0]?.organisationName ||
    user?.organizationName ||
    t('cc.orgHome.yourOrganisation', 'your organisation');

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-2 p-16 text-sm text-muted">
        <Loader2 size={16} className="animate-spin" />
        {t('cc.orgHome.loading', 'Loading your reports…')}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl p-4 sm:p-6 lg:p-8">
      {/* ── Greeting ─────────────────────────────────────────── */}
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-dark sm:text-3xl">
            {t('cc.orgHome.title', 'What your city has reported to you')}
          </h1>
          <p className="mt-1.5 text-sm text-muted">
            {t('cc.orgHome.subtitle', 'Every urban problem routed to {{name}}.', {
              name: orgName,
            })}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={refresh}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-border text-muted transition-colors hover:bg-surface hover:text-primary"
            title={t('cc.orgHome.refresh', 'Refresh')}
          >
            <RefreshCw size={15} />
          </button>
          <Link
            to="/org/map"
            className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-primary-hover"
          >
            <Navigation size={15} />
            {t('cc.orgHome.openMap', 'Open the map')}
          </Link>
        </div>
      </header>

      {error && (
        <p className="mt-6 flex items-start gap-2 rounded-xl bg-danger/10 px-4 py-3 text-sm text-danger">
          <AlertTriangle size={16} className="mt-0.5 shrink-0" />
          {error}
        </p>
      )}

      {unreadCount > 0 && (
        <Link
          to="/org/notifications"
          className="mt-6 flex items-center gap-3 rounded-2xl border border-primary/25 bg-primary-tint px-4 py-3.5 transition-colors hover:bg-primary-soft"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-white">
            <Bell size={16} />
          </span>
          <span className="min-w-0 flex-1 text-sm font-semibold text-dark">
            {t('cc.orgHome.unread', {
              count: unreadCount,
              defaultValue: '{{count}} new reports you have not opened yet',
            })}
          </span>
          <ArrowRight size={16} className="shrink-0 text-primary" />
        </Link>
      )}

      {/* ── The numbers ──────────────────────────────────────── */}
      <section className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          icon={Inbox}
          label={t('cc.orgHome.assigned', 'Assigned to you')}
          value={counts.total}
          tone="primary"
        />
        <StatCard
          icon={AlertTriangle}
          label={t('cc.orgHome.waiting', 'Waiting for you')}
          value={counts.open}
          tone="warning"
        />
        <StatCard
          icon={Clock}
          label={t('cc.orgHome.inProgress', 'Being worked on')}
          value={counts.inProgress}
          tone="info"
        />
        <StatCard
          icon={CheckCircle2}
          label={t('cc.orgHome.resolved', 'Resolved')}
          value={counts.resolved}
          tone="success"
          hint={
            typeof counts.nearest === 'number'
              ? t('cc.orgHome.nearest', 'Nearest open report {{km}} km away', {
                  km: counts.nearest,
                })
              : undefined
          }
        />
      </section>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        {/* ── Newest reports ─────────────────────────────────── */}
        <section className="rounded-2xl border border-border bg-white">
          <header className="flex items-center justify-between border-b border-border px-5 py-4">
            <h2 className="text-sm font-black uppercase tracking-wide text-dark">
              {t('cc.orgHome.newest', 'Newest reports')}
            </h2>
            <Link
              to="/org/map"
              className="text-xs font-bold text-primary hover:underline"
            >
              {t('cc.orgHome.viewAll', 'See all on the map')}
            </Link>
          </header>

          {queue.length === 0 ? (
            <div className="px-5 py-12 text-center">
              <MapPin size={26} className="mx-auto mb-3 text-border" />
              <p className="text-sm font-semibold text-dark">
                {t('cc.orgHome.emptyTitle', 'No reports yet')}
              </p>
              <p className="mt-1 text-xs text-muted">
                {t(
                  'cc.orgHome.emptyBody',
                  'When a resident reports a problem the admin registered you for, it lands here.',
                )}
              </p>
            </div>
          ) : (
            <ul>
              {queue.map((report) => {
                const type = TYPE_BY_VALUE[report.problemType];
                const Icon = type?.icon || MapPin;

                return (
                  <li key={report.reportId}>
                    <Link
                      to="/org/map"
                      className="flex items-start gap-3 border-b border-border px-5 py-4 transition-colors last:border-b-0 hover:bg-surface"
                    >
                      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
                        <Icon size={16} />
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="flex flex-wrap items-center gap-2">
                          <span className="text-sm font-bold text-dark">
                            {t(
                              problemTypeLabelKey(report.problemType),
                              type?.label || report.problemType,
                            )}
                          </span>
                          <StatusBadge status={report.status} className="scale-90" />
                        </span>

                        <span className="mt-1 block truncate text-xs text-muted">
                          {report.locationName ||
                            [report.ward, report.district].filter(Boolean).join(', ')}
                        </span>

                        <span className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-muted">
                          <span className="font-mono">{report.reportReference}</span>
                          {formatDate(report.reportedAt) && (
                            <span>{formatDate(report.reportedAt)}</span>
                          )}
                          {typeof report.distanceFromOrganisationKm === 'number' && (
                            <span className="flex items-center gap-1 font-bold text-primary">
                              <Ruler size={10} />
                              {t('cc.map.kmAway', '{{km}} km away', {
                                km: report.distanceFromOrganisationKm,
                              })}
                            </span>
                          )}
                        </span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        {/* ── What you are asked to fix ──────────────────────── */}
        <section className="space-y-6">
          <div className="rounded-2xl border border-border bg-white p-5">
            <h2 className="text-sm font-black uppercase tracking-wide text-dark">
              {t('cc.orgHome.mix', 'What you are asked to fix')}
            </h2>

            {byType.length === 0 ? (
              <p className="mt-4 text-xs text-muted">
                {t('cc.orgHome.mixEmpty', 'Nothing has been routed to you yet.')}
              </p>
            ) : (
              <ul className="mt-4 space-y-3.5">
                {byType.map((entry) => (
                  <li key={entry.value}>
                    <div className="flex items-center justify-between gap-3 text-xs">
                      <span className="truncate font-semibold text-dark">
                        {t(
                          problemTypeLabelKey(entry.value),
                          TYPE_BY_VALUE[entry.value]?.label || entry.value,
                        )}
                      </span>
                      <span className="shrink-0 font-bold text-muted">
                        {entry.total} · {entry.share}%
                      </span>
                    </div>
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-surface">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${Math.max(entry.share, 3)}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {statistics && (
            <div className="rounded-2xl border border-border bg-white p-5">
              <h2 className="text-sm font-black uppercase tracking-wide text-dark">
                {t('cc.orgHome.national', 'Across the country')}
              </h2>

              <dl className="mt-4 space-y-3 text-xs">
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-muted">
                    {t('cc.orgHome.nationalReports', 'Reports filed')}
                  </dt>
                  <dd className="font-black text-dark">{statistics.totalReports}</dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-muted">
                    {t('cc.orgHome.nationalReporters', 'People reporting')}
                  </dt>
                  <dd className="font-black text-dark">{statistics.totalReporters}</dd>
                </div>
                {statistics.topProblemType && (
                  <div className="flex items-center justify-between gap-3">
                    <dt className="text-muted">
                      {t('cc.orgHome.nationalTop', 'Most reported')}
                    </dt>
                    <dd className="truncate font-black text-dark">
                      {t(
                        problemTypeLabelKey(statistics.topProblemType),
                        TYPE_BY_VALUE[statistics.topProblemType]?.label ||
                          statistics.topProblemType,
                      )}
                    </dd>
                  </div>
                )}
              </dl>

              <p className="mt-4 text-[11px] leading-relaxed text-muted">
                {t(
                  'cc.orgHome.nationalNote',
                  'Your share of this is the reports above, routed to you by problem type and distance.',
                )}
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
