import { Link } from 'react-router-dom';
import Button from '../../components/shared/Button';
import FloatingReportButton from '../../components/shared/FloatingReportButton';
import { useAuth } from '../../context/AuthContext';

export default function OwnerDashboard() {
  const { user } = useAuth();
  const stored = JSON.parse(localStorage.getItem('user') || '{}');
  const userName = stored.name || user?.name || 'User';

  return (
    <div className="min-h-screen bg-surface p-8">
      <h1 className="text-3xl font-bold">Hi, {userName}! Welcome to PataChako.</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        <Link to="/owner/search" className="p-6 bg-white rounded-2xl shadow-sm border hover:shadow-md transition-shadow">
          <h2 className="text-xl font-semibold">🔍 Search Found Items</h2>
          <p className="text-gray-600 mt-2">Filter by region and find your lost items.</p>
        </Link>
        <Link to="/owner/report" className="p-6 bg-white rounded-2xl shadow-sm border hover:shadow-md transition-shadow">
          <h2 className="text-xl font-semibold">📝 Report Lost Item</h2>
          <p className="text-gray-600 mt-2">Submit a new lost report.</p>
        </Link>
        <Link to="/owner/reports" className="p-6 bg-white rounded-2xl shadow-sm border hover:shadow-md transition-shadow">
          <h2 className="text-xl font-semibold">📋 My Reports</h2>
          <p className="text-gray-600 mt-2">View your previous reports.</p>
        </Link>
      </div>
      <div className="mt-8">
        <Button variant="ghost" onClick={() => { useAuth().logoutUser(); window.location.hash = '#/login'; }}>Log Out</Button>
      </div>

      {/* Floating button */}
      <FloatingReportButton />
    </div>
  );
}