import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Button from '../../components/shared/Button';
import FloatingReportButton from '../../components/shared/FloatingReportButton';
import { useAuth } from '../../context/AuthContext';

export default function OwnerDashboard() {
  const { t } = useTranslation();
  const { user, logout } = useAuth();

  const stored = JSON.parse(localStorage.getItem('user') || '{}');
  const userName = stored.name || user?.name || t('ownerDashboard.defaultName');

  return (
    <div className="min-h-screen bg-surface p-8">
      <h1 className="text-3xl font-bold">
        {t('ownerDashboard.greeting', { name: userName })}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        <Link
          to="/owner/search"
          className="p-6 bg-white rounded-2xl shadow-sm border hover:shadow-md transition-shadow"
        >
          <h2 className="text-xl font-semibold">
            {t('ownerDashboard.cards.search.title')}
          </h2>
          <p className="text-gray-600 mt-2">
            {t('ownerDashboard.cards.search.desc')}
          </p>
        </Link>

        <Link
          to="/owner/report"
          className="p-6 bg-white rounded-2xl shadow-sm border hover:shadow-md transition-shadow"
        >
          <h2 className="text-xl font-semibold">
            {t('ownerDashboard.cards.report.title')}
          </h2>
          <p className="text-gray-600 mt-2">
            {t('ownerDashboard.cards.report.desc')}
          </p>
        </Link>

        <Link
          to="/owner/reports"
          className="p-6 bg-white rounded-2xl shadow-sm border hover:shadow-md transition-shadow"
        >
          <h2 className="text-xl font-semibold">
            {t('ownerDashboard.cards.reports.title')}
          </h2>
          <p className="text-gray-600 mt-2">
            {t('ownerDashboard.cards.reports.desc')}
          </p>
        </Link>
      </div>

      <div className="mt-8">
        <Button
          variant="ghost"
          onClick={() => {
            logout();
            window.location.hash = '#/login';
          }}
        >
          {t('common.logout')}
        </Button>
      </div>

      <FloatingReportButton />
    </div>
  );
}