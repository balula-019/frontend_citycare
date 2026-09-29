import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AlertCircle, ArrowLeft, Loader2, Lock, ShieldAlert } from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import UrbanProblemForm from '../../components/urban/UrbanProblemForm';
import VerificationResult from '../../components/urban/VerificationResult';
import { verificationFromError } from '../../components/urban/verification';
import StatusBadge from '../../components/urban/StatusBadge';
import { getUrbanProblemReport, updateUrbanProblemReport } from '../../api/urbanReports';
import { EDITABLE_STATUSES } from '../../constants/problemTypes';

export default function EditUrbanProblem() {
  const { reportId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [report, setReport] = useState(null);
  const [loadedId, setLoadedId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [loadError, setLoadError] = useState(null);
  const [saveError, setSaveError] = useState(null);
  const [rejection, setRejection] = useState(null);

  // Derived rather than stored, so nothing has to be set while the effect runs.
  const loading = !loadError && loadedId !== reportId;

  useEffect(() => {
    let cancelled = false;

    getUrbanProblemReport(reportId)
      .then((response) => {
        if (cancelled) return;
        setReport(response?.data || null);
        setLoadError(null);
        setLoadedId(reportId);
      })
      .catch((err) => {
        if (!cancelled) {
          setLoadError(err.message || t('cc.edit.loadError', 'Could not load this report.'));
        }
      });

    return () => {
      cancelled = true;
    };
  }, [reportId, t]);

  const handleSubmit = async (payload, photos) => {
    setSubmitting(true);
    setSaveError(null);
    setRejection(null);

    try {
      await updateUrbanProblemReport(reportId, payload, photos);
      navigate(`/owner/reports/${reportId}`, { replace: true });
    } catch (err) {
      // Changing the type, description or photo makes the image be checked
      // again, so an edit can be rejected exactly like a new report.
      const verification = verificationFromError(err);
      if (verification) {
        setRejection(verification);
      } else {
        setSaveError(err.message || t('cc.edit.saveError', 'Could not save your changes.'));
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-surface">
        <Navbar />
        <div className="flex items-center justify-center gap-3 py-40 text-muted">
          <Loader2 size={20} className="animate-spin" />
          {t('cc.edit.loading', 'Loading report…')}
        </div>
      </div>
    );
  }

  if (loadError || !report) {
    return (
      <div className="min-h-screen bg-surface">
        <Navbar />
        <main className="mx-auto max-w-xl px-4 pb-20 pt-32">
          <div className="rounded-2xl border border-danger/30 bg-white p-8 text-center">
            <AlertCircle size={24} className="mx-auto mb-3 text-danger" />
            <p className="mb-6 font-medium text-danger">
              {loadError || t('cc.edit.notFound', 'This report could not be found.')}
            </p>
            <Link
              to="/owner/reports"
              className="inline-block rounded-xl bg-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-hover"
            >
              {t('cc.edit.backToReports', 'Back to my reports')}
            </Link>
          </div>
        </main>
      </div>
    );
  }

  // The backend refuses edits once work has started, so say so up front
  // instead of letting the save fail.
  if (!EDITABLE_STATUSES.includes(report.status)) {
    return (
      <div className="min-h-screen bg-surface">
        <Navbar />
        <main className="mx-auto max-w-xl px-4 pb-20 pt-32">
          <div className="rounded-2xl border border-border bg-white p-8 text-center">
            <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-surface text-muted">
              <Lock size={24} />
            </span>
            <h1 className="mb-2 text-xl font-bold text-dark">
              {t('cc.edit.lockedHeading', 'This report can no longer be edited')}
            </h1>
            <p className="mb-4 text-muted">
              {t(
                'cc.edit.lockedText',
                'Work has already started on it, so its details are locked to keep the record straight.',
              )}
            </p>
            <div className="mb-6 flex justify-center">
              <StatusBadge status={report.status} />
            </div>
            <Link
              to={`/owner/reports/${report.id}`}
              className="inline-block rounded-xl bg-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-hover"
            >
              {t('cc.edit.viewReport', 'View report')}
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 pb-20 pt-28 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(`/owner/reports/${report.id}`)}
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-primary"
        >
          <ArrowLeft size={16} />
          {t('cc.edit.back', 'Back to report')}
        </button>

        <header className="mb-8">
          <div className="mb-2 flex flex-wrap items-center gap-3">
            <span className="font-mono text-sm font-bold text-muted">{report.reportReference}</span>
            <StatusBadge status={report.status} />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-dark sm:text-4xl">
            {t('cc.edit.heading', 'Correct your report')}
          </h1>
          <p className="mt-2 max-w-2xl text-muted">
            {t(
              'cc.edit.subheading',
              'Change what you need. If you change the problem type, the description or the photos, the image is checked again and the report may be routed to a different authority.',
            )}
          </p>
        </header>

        {rejection && (
          <div className="mb-8 rounded-2xl border border-danger/30 bg-white p-6">
            <div className="mb-4 flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-danger/10 text-danger">
                <ShieldAlert size={20} />
              </span>
              <div>
                <h2 className="font-bold text-dark">
                  {t('cc.edit.rejectedHeading', 'Your changes were not accepted')}
                </h2>
                <p className="text-sm text-muted">
                  {t(
                    'cc.edit.rejectedHelp',
                    'The photo no longer matches what you described, so nothing was changed.',
                  )}
                </p>
              </div>
            </div>
            <VerificationResult verification={rejection} />
          </div>
        )}

        {saveError && (
          <div className="mb-8 rounded-xl border border-danger/30 bg-danger/5 px-4 py-3 text-sm font-medium text-danger">
            {saveError}
          </div>
        )}

        <UrbanProblemForm
          mode="edit"
          submitting={submitting}
          onSubmit={handleSubmit}
          onCancel={() => navigate(`/owner/reports/${report.id}`)}
          initialValues={{
            problemType: report.problemType || '',
            description: report.description || '',
            suggestedSolution: report.suggestedSolution || '',
            locationName: report.locationName || '',
            region: report.region || '',
            district: report.district || '',
            ward: report.ward || '',
            latitude: report.latitude ?? null,
            longitude: report.longitude ?? null,
            imageUrls: report.imageUrls || [],
          }}
        />
      </main>
    </div>
  );
}
