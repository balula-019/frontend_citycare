import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Camera } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function FloatingReportButton({ onClick }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useTranslation();

  const handleClick = () => {
    if (onClick) {
      onClick();
      return;
    }
    navigate(user ? '/owner/report' : '/login');
  };

  const label = t('cc.floatingReport', 'Report a problem');

  return (
    <button
      onClick={handleClick}
      aria-label={label}
      className="fixed bottom-24 right-6 z-40 flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-white shadow-lg shadow-primary/30 transition-all duration-200 hover:bg-primary-hover active:scale-95"
    >
      <Camera size={20} />
      <span className="hidden font-medium sm:inline">{label}</span>
    </button>
  );
}
