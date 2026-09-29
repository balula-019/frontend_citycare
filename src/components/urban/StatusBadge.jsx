import { useTranslation } from 'react-i18next';
import { STATUS_STYLES } from '../../constants/problemTypes';

const FALLBACK = { label: 'Unknown', badge: 'bg-slate-100 text-slate-600' };

export default function StatusBadge({ status, className = '' }) {
  const { t } = useTranslation();
  const style = STATUS_STYLES[status] || FALLBACK;

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold uppercase tracking-wide ${style.badge} ${className}`}
    >
      {t(`cc.status.${status}`, style.label)}
    </span>
  );
}
