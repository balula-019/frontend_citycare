import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Check, MapPin, Building2, ScanLine, Image as ImageIcon } from 'lucide-react';

/*
  Mock of what the backend returns for a submitted report: the image
  verification result (topic match, description match, relevance score,
  decision) followed by the organisation the report was routed to.
*/
const VerificationPreview = () => {
  const { t } = useTranslation();

  const checks = [
    { key: 'topicMatch', fallback: 'Topic match', value: t('cc.preview.yes', 'Yes') },
    { key: 'descriptionMatch', fallback: 'Description match', value: t('cc.preview.yes', 'Yes') },
    { key: 'relevanceScore', fallback: 'Relevance score', value: '89 / 100' },
  ];

  return (
    <div className="relative mx-auto w-full max-w-md">
      {/* Card */}
      <div className="relative rounded-3xl border border-border bg-white p-5 shadow-2xl shadow-dark/10">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">
              {t('cc.preview.reference', 'Report')}
            </p>
            <p className="font-mono text-sm font-bold text-dark">UP-2K4F19</p>
          </div>
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary">
            {t('cc.preview.status.verified', 'Verified')}
          </span>
        </div>

        {/* Photo with scanning pass */}
        <div className="relative mb-4 h-44 overflow-hidden rounded-2xl bg-gradient-to-br from-primary-deep via-primary to-[#1f6f68]">
          <div className="absolute inset-0 dot-grid opacity-40" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-white/70">
            <ImageIcon size={26} />
            <span className="text-xs font-medium">
              {t('cc.preview.photoCaption', 'Pothole on Nyerere Road')}
            </span>
          </div>
          <div className="animate-scan absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-transparent via-white/25 to-transparent" />
          <div className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-black/35 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
            <MapPin size={11} />
            Ilala, Dar es Salaam
          </div>
        </div>

        {/* Verification rows */}
        <div className="mb-4 rounded-2xl border border-border bg-surface p-4">
          <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted">
            <ScanLine size={13} className="text-primary" />
            {t('cc.preview.aiCheck', 'AI image check')}
          </p>
          <ul className="space-y-2.5">
            {checks.map((check, index) => (
              <motion.li
                key={check.key}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.18 }}
                className="flex items-center justify-between text-sm"
              >
                <span className="text-muted">{t(`cc.preview.checks.${check.key}`, check.fallback)}</span>
                <span className="inline-flex items-center gap-1.5 font-semibold text-dark">
                  <Check size={14} className="text-success" />
                  {check.value}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Routing */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.15 }}
          className="flex items-center gap-3 rounded-2xl bg-dark p-4 text-white"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/20 text-accent">
            <Building2 size={18} />
          </span>
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-white/50">
              {t('cc.preview.routedTo', 'Sent to')}
            </p>
            <p className="truncate text-sm font-semibold">TANROADS — Dar es Salaam</p>
          </div>
        </motion.div>
      </div>

      {/* Floating decision chip */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.4, type: 'spring', stiffness: 220 }}
        className="animate-float absolute -bottom-5 -left-2 rounded-2xl border border-border bg-white px-4 py-3 shadow-xl sm:-left-6"
      >
        <p className="text-[10px] font-bold uppercase tracking-wider text-muted">
          {t('cc.preview.decision', 'Decision')}
        </p>
        <p className="flex items-center gap-1.5 text-sm font-extrabold text-success">
          <Check size={15} strokeWidth={3} />
          {t('cc.preview.accepted', 'ACCEPTED')}
        </p>
      </motion.div>
    </div>
  );
};

export default VerificationPreview;
