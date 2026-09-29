import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, CheckCircle2, ShieldAlert } from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import UrbanProblemForm from '../../components/urban/UrbanProblemForm';
import VerificationResult from '../../components/urban/VerificationResult';
import {
  verificationFromError,
  verificationFromReport,
} from '../../components/urban/verification';
import StatusBadge from '../../components/urban/StatusBadge';
import { createUrbanProblemReport } from '../../api/urbanReports';

export default function ReportUrbanProblem() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [submitting, setSubmitting] = useState(false);
  const [created, setCreated] = useState(null);
  const [rejection, setRejection] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (payload, photos) => {
    setSubmitting(true);
    setRejection(null);
    setError(null);

    try {
      const response = await createUrbanProblemReport(payload, photos);
      setCreated(response?.data || null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      // A photo that does not match the description comes back as a
      // business error carrying the verification detail.
      const verification = verificationFromError(err);
      if (verification) {
        setRejection(verification);
      } else {
        setError(err.message || t('cc.report.genericError', 'Could not send your report.'));
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setSubmitting(false);
    }
  };

  if (created) {
    return (
      <div className="min-h-screen bg-surface">
        <Navbar />
        <main className="mx-auto max-w-2xl px-4 pb-20 pt-28 sm:px-6">
          <div className="rounded-2xl border border-border bg-white p-8 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-success/10 text-success">
              <CheckCircle2 size={32} />
            </div>
            <h1 className="mb-2 text-2xl font-bold text-dark">
              {t('cc.report.successHeading', 'Your report is in')}
            </h1>
            <p className="mb-6 text-muted">
              {created.assignedOrganisationName
                ? t('cc.report.successRouted', 'It has been sent to {{organisation}}.', {
                    organisation: created.assignedOrganisationName,
                  })
                : t(
                    'cc.report.successUnrouted',
                    'It has been verified and is waiting to be picked up by the responsible authority.',
                  )}
            </p>

            <div className="mb-6 flex flex-wrap items-center justify-center gap-3">
              <span className="rounded-lg bg-surface px-3 py-1.5 font-mono text-sm font-bold text-dark">
                {created.reportReference || created.id}
              </span>
              <StatusBadge status={created.status} />
            </div>

            <VerificationResult
              verification={verificationFromReport(created)}
              className="mb-6 text-left"
            />

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                onClick={() => navigate(`/owner/reports/${created.id}`)}
                className="rounded-xl bg-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-hover"
              >
                {t('cc.report.viewReport', 'View report')}
              </button>
              <button
                onClick={() => {
                  setCreated(null);
                  setRejection(null);
                }}
                className="rounded-xl border-2 border-border bg-white px-6 py-3 font-semibold text-dark transition-colors hover:border-primary hover:text-primary"
              >
                {t('cc.report.reportAnother', 'Report another problem')}
              </button>
            </div>
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
          onClick={() => navigate('/owner/reports')}
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-primary"
        >
          <ArrowLeft size={16} />
          {t('cc.report.backToReports', 'My reports')}
        </button>

        <header className="mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-dark sm:text-4xl">
            {t('cc.report.heading', 'Report a problem')}
          </h1>
          <p className="mt-2 max-w-2xl text-muted">
            {t(
              'cc.report.subheading',
              'Your photo is checked against your description before the report is saved, then sent to the authority responsible for that kind of problem.',
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
                  {t('cc.report.rejectedHeading', 'This photo was not accepted')}
                </h2>
                <p className="text-sm text-muted">
                  {t(
                    'cc.report.rejectedHelp',
                    'Nothing was saved. Adjust the problem type or the description, or attach a clearer photo of the problem itself, then send again.',
                  )}
                </p>
              </div>
            </div>
            <VerificationResult verification={rejection} />
          </div>
        )}

        {error && (
          <div className="mb-8 rounded-xl border border-danger/30 bg-danger/5 px-4 py-3 text-sm font-medium text-danger">
            {error}
          </div>
        )}

        <UrbanProblemForm mode="create" submitting={submitting} onSubmit={handleSubmit} />
      </main>
    </div>
  );
}
