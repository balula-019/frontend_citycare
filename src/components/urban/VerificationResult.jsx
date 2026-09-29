import { useTranslation } from 'react-i18next';
import { Check, X, ScanLine, AlertTriangle } from 'lucide-react';

const isMatch = (value) => (value == null ? null : Number(value) >= 0.5);

function MatchRow({ label, value }) {
  const matched = isMatch(value);

  return (
    <div className="flex items-center justify-between gap-4 text-sm">
      <span className="text-muted">{label}</span>
      {matched === null ? (
        <span className="text-muted">—</span>
      ) : (
        <span
          className={`inline-flex items-center gap-1.5 font-semibold ${
            matched ? 'text-success' : 'text-danger'
          }`}
        >
          {matched ? <Check size={15} /> : <X size={15} />}
          {matched ? 'Yes' : 'No'}
        </span>
      )}
    </div>
  );
}

export default function VerificationResult({ verification, className = '' }) {
  const { t } = useTranslation();

  if (!verification) return null;

  const rejected = verification.decision === 'REJECT';
  const score = verification.relevanceScore;
  const threshold = verification.threshold ?? 30;
  const percent = score == null ? 0 : Math.max(0, Math.min(100, Number(score)));

  return (
    <div
      className={`rounded-2xl border p-5 ${
        rejected ? 'border-danger/30 bg-danger/5' : 'border-border bg-surface'
      } ${className}`}
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted">
          {rejected ? (
            <AlertTriangle size={14} className="text-danger" />
          ) : (
            <ScanLine size={14} className="text-primary" />
          )}
          {t('cc.verification.title', 'AI image check')}
        </p>
        {verification.decision && (
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-bold uppercase tracking-wide ${
              rejected ? 'bg-danger/10 text-danger' : 'bg-success/10 text-success'
            }`}
          >
            {rejected
              ? t('cc.verification.rejected', 'Rejected')
              : t('cc.verification.accepted', 'Accepted')}
          </span>
        )}
      </div>

      {score != null && (
        <div className="mb-4">
          <div className="mb-1.5 flex items-baseline justify-between">
            <span className="text-sm text-muted">
              {t('cc.verification.relevance', 'Relevance score')}
            </span>
            <span className="text-sm font-bold text-dark">
              {Number(score).toFixed(0)} / 100
            </span>
          </div>
          <div className="relative h-2 overflow-hidden rounded-full bg-border">
            <div
              className={`h-full rounded-full ${rejected ? 'bg-danger' : 'bg-primary'}`}
              style={{ width: `${percent}%` }}
            />
          </div>
          <p className="mt-1.5 text-xs text-muted">
            {t('cc.verification.threshold', 'Minimum to be accepted: {{threshold}}', {
              threshold: Number(threshold).toFixed(0),
            })}
          </p>
        </div>
      )}

      <div className="space-y-2.5 border-t border-border pt-4">
        <MatchRow
          label={t('cc.verification.topicMatch', 'Matches the problem type')}
          value={verification.topicMatch}
        />
        <MatchRow
          label={t('cc.verification.descriptionMatch', 'Matches your description')}
          value={verification.descriptionMatch}
        />
      </div>

      {verification.reason && (
        <p className="mt-4 border-t border-border pt-4 text-sm leading-relaxed text-dark/80">
          {verification.reason}
        </p>
      )}

      {verification.evidence?.length > 0 && (
        <div className="mt-4">
          <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted">
            {t('cc.verification.evidence', 'What the AI saw')}
          </p>
          <ul className="flex flex-wrap gap-2">
            {verification.evidence.map((item) => (
              <li
                key={item}
                className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-dark ring-1 ring-border"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {verification.model && (
        <p className="mt-4 text-xs text-muted">
          {t('cc.verification.model', 'Checked by {{model}}', { model: verification.model })}
        </p>
      )}
    </div>
  );
}
