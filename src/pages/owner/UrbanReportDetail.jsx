import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  AlertCircle,
  ArrowLeft,
  Building2,
  Clock,
  ImageOff,
  Loader2,
  MapPin,
  Pencil,
  Wrench,
} from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import StatusBadge from '../../components/urban/StatusBadge';
import VerificationResult from '../../components/urban/VerificationResult';
import { verificationFromReport } from '../../components/urban/verification';
import { getUrbanProblemReport } from '../../api/urbanReports';
import { EDITABLE_STATUSES, problemTypeLabelKey } from '../../constants/problemTypes';
import { regionLabel } from '../../constants/regions';

const formatDateTime = (value) => {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toLocaleString();
};

export default function UrbanReportDetail() {
  const { reportId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [report, setReport] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [loadedId, setLoadedId] = useState(null);
  const [error, setError] = useState(null);

  // Derived rather than stored, so nothing has to be set while the effect runs.
  const loading = !error && loadedId !== reportId;

  useEffect(() => {
    let cancelled = false;

    getUrbanProblemReport(reportId)
      .then((response) => {
        if (cancelled) return;
        setReport(response?.data || null);
        setError(null);
        setLoadedId(reportId);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || t('cc.detail.error', 'Could not load this report.'));
      });

    return () => {
      cancelled = true;
    };
  }, [reportId, t]);

  if (loading) {
    return (
      <div className="min-h-screen bg-surface">
        <Navbar />
        <div className="flex items-center justify-center gap-3 py-40 text-muted">
          <Loader2 size={20} className="animate-spin" />
          {t('cc.detail.loading', 'Loading report…')}
        </div>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="min-h-screen bg-surface">
        <Navbar />
        <main className="mx-auto max-w-xl px-4 pb-20 pt-32">
          <div className="rounded-2xl border border-danger/30 bg-white p-8 text-center">
            <AlertCircle size={24} className="mx-auto mb-3 text-danger" />
            <p className="mb-6 font-medium text-danger">
              {error || t('cc.detail.notFound', 'This report could not be found.')}
            </p>
            <Link
              to="/owner/reports"
              className="inline-block rounded-xl bg-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-hover"
            >
              {t('cc.detail.backToReports', 'Back to my reports')}
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const images = report.imageUrls || [];
  const editable = EDITABLE_STATUSES.includes(report.status);
  const verifiedAt = formatDateTime(report.verifiedAt);
  const assignedAt = formatDateTime(report.assignedAt);

  const locationLine = [report.locationName, report.ward, report.district, regionLabel(report.region)]
    .filter(Boolean)
    .join(', ');

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 pb-20 pt-28 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate('/owner/reports')}
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-primary"
        >
          <ArrowLeft size={16} />
          {t('cc.detail.backToReports', 'Back to my reports')}
        </button>

        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="mb-2 flex flex-wrap items-center gap-3">
              <span className="font-mono text-sm font-bold text-muted">
                {report.reportReference}
              </span>
              <StatusBadge status={report.status} />
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-dark">
              {t(problemTypeLabelKey(report.problemType), report.problemType)}
            </h1>
          </div>

          {editable && (
            <Link
              to={`/owner/edit-report/${report.id}`}
              className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-border bg-white px-5 py-3 font-semibold text-dark transition-colors hover:border-primary hover:text-primary"
            >
              <Pencil size={17} />
              {t('cc.detail.edit', 'Edit report')}
            </Link>
          )}
        </header>

        <div className="grid gap-8 lg:grid-cols-5">
          <div className="space-y-6 lg:col-span-3">
            {/* Photos */}
            <section className="overflow-hidden rounded-2xl border border-border bg-white">
              <div className="h-72 bg-surface sm:h-96">
                {images.length > 0 ? (
                  <img src={images[activeImage]} alt="" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center text-muted">
                    <ImageOff size={26} />
                  </div>
                )}
              </div>
              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto p-3">
                  {images.map((url, index) => (
                    <button
                      key={url}
                      onClick={() => setActiveImage(index)}
                      className={`h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition-colors ${
                        index === activeImage ? 'border-primary' : 'border-transparent'
                      }`}
                    >
                      <img src={url} alt="" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </section>

            {/* Description */}
            <section className="rounded-2xl border border-border bg-white p-6">
              <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-muted">
                {t('cc.detail.description', 'Description')}
              </h2>
              <p className="leading-relaxed text-dark">{report.description}</p>

              {report.suggestedSolution && (
                <div className="mt-5 flex gap-3 rounded-xl bg-surface p-4">
                  <Wrench size={17} className="mt-0.5 shrink-0 text-accent" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-muted">
                      {t('cc.detail.suggestedSolution', 'Suggested fix')}
                    </p>
                    <p className="mt-1 text-sm text-dark">{report.suggestedSolution}</p>
                  </div>
                </div>
              )}
            </section>

            {/* Location */}
            <section className="rounded-2xl border border-border bg-white p-6">
              <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-muted">
                {t('cc.detail.location', 'Location')}
              </h2>
              <p className="flex items-start gap-2 text-dark">
                <MapPin size={17} className="mt-0.5 shrink-0 text-accent" />
                {locationLine || t('cc.detail.noLocation', 'No location recorded')}
              </p>
              {report.latitude != null && report.longitude != null && (
                <a
                  href={`https://www.openstreetmap.org/?mlat=${report.latitude}&mlon=${report.longitude}#map=18/${report.latitude}/${report.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block font-mono text-xs text-primary underline"
                >
                  {Number(report.latitude).toFixed(6)}, {Number(report.longitude).toFixed(6)}
                </a>
              )}
            </section>
          </div>

          <div className="space-y-6 lg:col-span-2">
            {/* Responsible authority */}
            <section className="rounded-2xl border border-border bg-white p-6">
              <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-muted">
                {t('cc.detail.authority', 'Responsible authority')}
              </h2>
              {report.assignedOrganisationName ? (
                <>
                  <p className="flex items-center gap-2.5 font-semibold text-dark">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
                      <Building2 size={18} />
                    </span>
                    {report.assignedOrganisationName}
                  </p>
                  {assignedAt && (
                    <p className="mt-3 flex items-center gap-1.5 text-xs text-muted">
                      <Clock size={12} />
                      {t('cc.detail.assignedAt', 'Notified on {{date}}', { date: assignedAt })}
                    </p>
                  )}
                </>
              ) : (
                <p className="text-sm text-muted">
                  {t(
                    'cc.detail.noAuthority',
                    'No authority is registered for this problem type yet, so the report is waiting to be picked up.',
                  )}
                </p>
              )}
            </section>

            {/* Verification */}
            <VerificationResult verification={verificationFromReport(report)} />

            {verifiedAt && (
              <p className="flex items-center gap-1.5 px-1 text-xs text-muted">
                <Clock size={12} />
                {t('cc.detail.verifiedAt', 'Photo checked on {{date}}', { date: verifiedAt })}
              </p>
            )}

            {/* AI enrichment, only when the backend has filled it in */}
            {(report.severity || report.aiDetectedType || report.priorityScore != null) && (
              <section className="rounded-2xl border border-border bg-white p-6">
                <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-muted">
                  {t('cc.detail.aiAssessment', 'AI assessment')}
                </h2>
                <dl className="space-y-2.5 text-sm">
                  {report.severity && (
                    <div className="flex justify-between gap-4">
                      <dt className="text-muted">{t('cc.detail.severity', 'Severity')}</dt>
                      <dd className="font-semibold text-dark">
                        {t(`cc.severity.${report.severity}`, report.severity)}
                      </dd>
                    </div>
                  )}
                  {report.aiDetectedType && (
                    <div className="flex justify-between gap-4">
                      <dt className="text-muted">{t('cc.detail.detectedType', 'Detected as')}</dt>
                      <dd className="font-semibold text-dark">{report.aiDetectedType}</dd>
                    </div>
                  )}
                  {report.priorityScore != null && (
                    <div className="flex justify-between gap-4">
                      <dt className="text-muted">{t('cc.detail.priority', 'Priority score')}</dt>
                      <dd className="font-semibold text-dark">
                        {Number(report.priorityScore).toFixed(0)}
                      </dd>
                    </div>
                  )}
                </dl>
                {report.aiReasoning && (
                  <p className="mt-4 border-t border-border pt-4 text-sm leading-relaxed text-muted">
                    {report.aiReasoning}
                  </p>
                )}
              </section>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
