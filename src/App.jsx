import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';

// Auth pages
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import VerifyOtpPage from './pages/auth/VerifyOtpPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';
import ChangePasswordPage from './pages/ChangePasswordPage';

// Owner
import ReportUrbanProblem from './pages/owner/ReportUrbanProblem';
import MyUrbanReports from './pages/owner/MyUrbanReports';
import UrbanReportDetail from './pages/owner/UrbanReportDetail';
import EditUrbanProblem from './pages/owner/EditUrbanProblem';
import OwnerProfile from './pages/owner/Profile';

// Organisation
import OrgLayout from './pages/organisation/Layout';
import OrgDashboard from './pages/organisation/Dashboard';
import UrbanProblemMap from './pages/organisation/UrbanProblemMap';
import Notifications from './pages/organisation/Notifications';
import OrganisationProfile from './pages/organisation/Profile';
import Settings from './pages/organisation/Settings';

// Admin
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import CreateOrganisation from './pages/admin/CreateOrganisation';
import ManageUsers from './pages/admin/ManageUsers';
import AdminProfile from './pages/admin/AdminProfile';

function AppRoutes() {
  return (
    <Routes>
      {/* Public landing + auth */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/verify-otp" element={<VerifyOtpPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />

      {/* ✅ Change Password */}
      <Route
        path="/change-password"
        element={
          <ProtectedRoute allowedRoles={['OWNER', 'ORGANISATION', 'ADMIN']}>
            <ChangePasswordPage />
          </ProtectedRoute>
        }
      />

      {/* Owner */}
      <Route path="/owner/dashboard" element={<Navigate to="/owner/reports" replace />} />
      <Route path="/owner/report" element={<ProtectedRoute allowedRoles={['OWNER']}><ReportUrbanProblem /></ProtectedRoute>} />
      <Route path="/owner/reports" element={<ProtectedRoute allowedRoles={['OWNER']}><MyUrbanReports /></ProtectedRoute>} />
      <Route path="/owner/reports/:reportId" element={<ProtectedRoute allowedRoles={['OWNER']}><UrbanReportDetail /></ProtectedRoute>} />
      <Route path="/owner/edit-report/:reportId" element={<ProtectedRoute allowedRoles={['OWNER']}><EditUrbanProblem /></ProtectedRoute>} />
      <Route path="/owner/profile" element={<ProtectedRoute allowedRoles={['OWNER']}><OwnerProfile /></ProtectedRoute>} />
      <Route path="/owner/notifications" element={<ProtectedRoute allowedRoles={['OWNER']}><Notifications /></ProtectedRoute>} />

      {/* Organisation */}
      <Route
        path="/org"
        element={
          <ProtectedRoute allowedRoles={['ORGANISATION']}>
            <OrgLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<OrgDashboard />} />
        <Route path="map" element={<UrbanProblemMap />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="profile" element={<OrganisationProfile />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* Admin */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="create-org" element={<CreateOrganisation />} />
        <Route path="manage-users" element={<ManageUsers />} />
        <Route path="profile" element={<AdminProfile />} />
        <Route
          path="settings"
          element={<div className="p-8 text-gray-500">Settings page coming soon.</div>}
        />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <AppRoutes />
      </NotificationProvider>
    </AuthProvider>
  );
}