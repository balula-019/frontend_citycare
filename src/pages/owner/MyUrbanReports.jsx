import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  AlertCircle,
  BarChart3,
  Building2,
  Camera,
  ChevronLeft,
  ChevronRight,
  ImageOff,
  Loader2,
  MapPin,
  Pencil,
  RefreshCw,
  Users,
} from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import StatusBadge from '../../components/urban/StatusBadge';
import { useAuth } from '../../context/AuthContext';
import { getUrbanProblemReports, getUrbanProblemStatistics } from '../../api/urbanReports';
import {
  EDITABLE_STATUSES,
  PROBLEM_TYPES,
  STATUS_STYLES,
  problemTypeLabelKey,
} from '../../constants/problemTypes';
import { regionLabel } from '../../constants/regions';

const PAGE_SIZE = 9;

const resolveUserId = (user) => {
  const stored = (() => {
    try {
      return JSON.parse(localStorage.getItem('user') || '{}');
    } catch {
      return {};
    }
  })();

  return (
    user?.id || user?.user_id || user?.userId || stored.id || stored.user_id || stored.userId || null
  );
};

function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl border border-border bg-white p-5">
      <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
        <Icon size={18} />
      </span>
      <p className="text-2xl font-extrabold text-dark">{value}</p>
      <p className="text-sm text-muted">{label}</p>
    </div>
  );
}

export default function MyUrbanReports() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user } = useAuth();

  const userId = useMemo(() => resolveUserId(user), [user]);

  const [reports, setReports] = useState([]);
  const [paging, setPaging] = useState({ pageNumber: 1, totalPages: 1, totalElements: 0 });
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filters, setFilters] = useState({ problemType: '', status: '', mineOnly: true });
  const [page, setPage] = useState(1);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const response = await getUrbanProblemReports({
          problemType: filters.problemType || undefined,
          status: filters.status || undefined,
          reportedBy: filters.mineOnly ? userId || undefined : undefined,
          page,
          size: PAGE_SIZE,
        });
        if (cancelled) return;

        const data = response?.data;
        setError(null);
        setReports(data?.content || []);
        setPaging({
          pageNumber: data?.pageNumber || 1,
          totalPages: data?.totalPages || 1,
          totalElements: data?.totalElements || 0,
        });
      } catch (err) {
        if (cancelled) return;
        setError(err.message || t('cc.reports.loadError', 'Could not load reports.'));
        setReports([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [filters, page, reloadKey, userId, t]);

  // Statistics are city-wide and cheap, so they load once alongside the list.
  useEffect(() => {
    getUrbanProblemStatistics()
      .then((response) => setStatistics(response?.data || null))
      .catch(() => setStatistics(null));
  }, []);

  // The spinner is turned on here rather than inside the effect, so a
  // fetch is always the result of something the user did.
  const setFilter = (field, value) => {
    setLoading(true);
    setFilters((prev) => ({ ...prev, [field]: value }));
    setPage(1);
  };

  const goToPage = (next) => {
    setLoading(true);
    setPage(next);
  };

  const refresh = () => {
    setLoading(true);
    setReloadKey((key) => key + 1);
  };

  const topTypes = statistics?.breakdown?.slice(0, 5) || [];

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 pb-20 pt-28 sm:px-6 lg:px-8">
        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-dark sm:text-4xl">
              {filters.mineOnly
                ? t('cc.reports.headingMine', 'My reports')
                : t('cc.reports.headingAll', 'Reports across the city')}
            </h1>
            <p className="mt-2 text-muted">
              {t('cc.reports.count', '{{count}} report(s)', { count: paging.totalElements })}
            </p>
          </div>

          <button
            onClick={() => navigate('/owner/report')}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-white shadow-lg shadow-primary/25 transition-colors hover:bg-primary-hover"
          >
            <Camera size={18} />
            {t('cc.reports.newReport', 'Report a problem')}
          </button>
        </header>

        {/* City statistics */}
        {statistics && (
          <section className="mb-10">
            <div className="mb-4 grid gap-4 sm:grid-cols-3">
              <StatCard
                icon={BarChart3}
                label={t('cc.reports.stats.total', 'Reports in total')}
                value={statistics.totalReports ?? 0}
              />
              <StatCard
                icon={Users}
                label={t('cc.reports.stats.reporters', 'People reporting')}
                value={statistics.totalReporters ?? 0}
              />
              <StatCard
                icon={RefreshCw}
                label={t('cc.reports.stats.average', 'Average reports per person')}
                value={(statistics.averageReportsPerReporter ?? 0).toFixed(2)}
              />
            </div>

            {topTypes.length > 0 && (
              <div className="rounded-2xl border border-border bg-white p-6">
                <h2 className="mb-5 text-sm font-bold uppercase tracking-wider text-muted">
                  {t('cc.reports.stats.mostReported', 'Most reported problems')}
                </h2>
                <ul className="space-y-4">
                  {topTypes.map((entry) => (
                    <li key={entry.problemType}>
                      <div className="mb-1.5 flex items-baseline justify-between gap-4">
                        <span className="text-sm font-semibold text-dark">
                          {t(problemTypeLabelKey(entry.problemType), entry.problemType)}
                        </span>
                        <span className="text-sm text-muted">
                          {(entry.percentage ?? 0).toFixed(1)}%
                          <span className="ml-2 text-xs">({entry.totalReports ?? 0})</span>
                        </span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-border">
                        <div
                          className="h-full rounded-full bg-primary"
                          style={{ width: `${Math.min(100, entry.percentage ?? 0)}%` }}
                        />
                      </div>
                      {entry.organisations?.length > 0 && (
                        <p className="mt-1.5 flex items-center gap-1.5 text-xs text-muted">
                          <Building2 size={12} />
                          {entry.organisations.map((org) => org.name).join(', ')}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        )}

        {/* Filters */}
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <select
            value={filters.problemType}
            onChange={(event) => setFilter('problemType', event.target.value)}
            className="rounded-xl border border-border bg-white px-4 py-2.5 text-sm font-medium text-dark outline-none focus:border-primary"
          >
            <option value="">{t('cc.reports.allTypes', 'All problem types')}</option>
            {PROBLEM_TYPES.map((type) => (
              <option key={type.value} value={type.value}>
                {t(problemTypeLabelKey(type.value), type.label)}
              </option>
            ))}
          </select>

          <select
            value={filters.status}
            onChange={(event) => setFilter('status', event.target.value)}
            className="rounded-xl border border-border bg-white px-4 py-2.5 text-sm font-medium text-dark outline-none focus:border-primary"
          >
            <option value="">{t('cc.reports.allStatuses', 'Any status')}</option>
            {Object.entries(STATUS_STYLES).map(([value, style]) => (
              <option key={value} value={value}>
                {t(`cc.status.${value}`, style.label)}
              </option>
            ))}
          </select>

          <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-border bg-white px-4 py-2.5 text-sm font-medium text-dark">
            <input
              type="checkbox"
              checked={filters.mineOnly}
              onChange={(event) => setFilter('mineOnly', event.target.checked)}
              className="h-4 w-4 accent-[var(--color-primary)]"
            />
            {t('cc.reports.onlyMine', 'Only mine')}
          </label>

          <button
            onClick={refresh}
            className="ml-auto inline-flex items-center gap-2 rounded-xl border border-border bg-white px-4 py-2.5 text-sm font-medium text-dark transition-colors hover:border-primary hover:text-primary"
          >
            <RefreshCw size={15} />
            {t('cc.reports.refresh', 'Refresh')}
          </button>
        </div>

        {/* List */}
        {loading ? (
          <div className="flex items-center justify-center gap-3 py-24 text-muted">
            <Loader2 size={20} className="animate-spin" />
            {t('cc.reports.loading', 'Loading reports…')}
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-danger/30 bg-danger/5 p-6 text-center">
            <AlertCircle size={22} className="mx-auto mb-2 text-danger" />
            <p className="font-medium text-danger">{error}</p>
          </div>
        ) : reports.length === 0 ? (
          <div className="rounded-2xl border border-border bg-white p-12 text-center">
            <ImageOff size={26} className="mx-auto mb-3 text-muted" />
            <h2 className="mb-1 text-lg font-bold text-dark">
              {t('cc.reports.emptyHeading', 'Nothing here yet')}
            </h2>
            <p className="mb-6 text-muted">
              {t('cc.reports.emptyText', 'Once you report a problem it will show up here.')}
            </p>
            <button
              onClick={() => navigate('/owner/report')}
              className="rounded-xl bg-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-hover"
            >
              {t('cc.reports.newReport', 'Report a problem')}
            </button>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {reports.map((report) => {
              const cover = report.imageUrls?.[0];
              const editable = EDITABLE_STATUSES.includes(report.status);

              return (
                <article
                  key={report.id}
                  className="flex flex-col overflow-hidden rounded-2xl border border-border bg-white transition-shadow hover:shadow-lg"
                >
                  <Link to={`/owner/reports/${report.id}`} className="block">
                    <div className="relative h-40 bg-surface">
                      {cover ? (
                        <img src={cover} alt="" className="h-full w-full object-cover" />
                      ) : (
                        <div className="flex h-full items-center justify-center text-muted">
                          <ImageOff size={22} />
                        </div>
                      )}
                      <div className="absolute left-3 top-3">
                        <StatusBadge status={report.status} />
                      </div>
                      {report.verificationRelevanceScore != null && (
                        <span className="absolute bottom-3 right-3 rounded-full bg-black/60 px-2.5 py-1 text-xs font-bold text-white backdrop-blur-sm">
                          {Number(report.verificationRelevanceScore).toFixed(0)}/100
                        </span>
                      )}
                    </div>
                  </Link>

                  <div className="flex flex-1 flex-col p-5">
                    <p className="mb-1 font-mono text-xs font-bold text-muted">
                      {report.reportReference}
                    </p>
                    <h3 className="mb-2 font-bold text-dark">
                      {t(problemTypeLabelKey(report.problemType), report.problemType)}
                    </h3>
                    <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-muted">
                      {report.description}
                    </p>

                    <div className="mt-auto space-y-1.5 text-xs text-muted">
                      <p className="flex items-center gap-1.5">
                        <MapPin size={12} className="shrink-0 text-accent" />
                        <span className="truncate">
                          {report.locationName ||
                            [report.district, regionLabel(report.region)]
                              .filter(Boolean)
                              .join(', ')}
                        </span>
                      </p>
                      {report.assignedOrganisationName && (
                        <p className="flex items-center gap-1.5">
                          <Building2 size={12} className="shrink-0 text-primary" />
                          <span className="truncate">{report.assignedOrganisationName}</span>
                        </p>
                      )}
                    </div>

                    <div className="mt-4 flex gap-2">
                      <Link
                        to={`/owner/reports/${report.id}`}
                        className="flex-1 rounded-lg border border-border px-3 py-2 text-center text-sm font-semibold text-dark transition-colors hover:border-primary hover:text-primary"
                      >
                        {t('cc.reports.view', 'View')}
                      </Link>
                      {editable && (
                        <Link
                          to={`/owner/edit-report/${report.id}`}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-primary-soft px-3 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
                        >
                          <Pencil size={14} />
                          {t('cc.reports.edit', 'Edit')}
                        </Link>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {paging.totalPages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-3">
            <button
              onClick={() => goToPage(Math.max(1, paging.pageNumber - 1))}
              disabled={paging.pageNumber <= 1}
              className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-white px-4 py-2.5 text-sm font-medium text-dark transition-colors hover:border-primary disabled:opacity-40"
            >
              <ChevronLeft size={16} />
              {t('cc.reports.previous', 'Previous')}
            </button>
            <span className="text-sm text-muted">
              {t('cc.reports.pageOf', 'Page {{page}} of {{total}}', {
                page: paging.pageNumber,
                total: paging.totalPages,
              })}
            </span>
            <button
              onClick={() => goToPage(paging.pageNumber + 1)}
              disabled={paging.pageNumber >= paging.totalPages}
              className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-white px-4 py-2.5 text-sm font-medium text-dark transition-colors hover:border-primary disabled:opacity-40"
            >
              {t('cc.reports.next', 'Next')}
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
