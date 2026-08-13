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
import ChangePasswordPage from './pages/ChangePasswordPage';   // ✅ forced password change

// Owner
import SearchItems from './pages/owner/SearchItems';
import ReportItem from './pages/owner/ReportItem';
import ClaimItem from './pages/owner/ClaimItem';
import PaymentDemo from './pages/owner/PaymentDemo';
import MyReports from './pages/owner/MyReports';
import OwnerProfile from './pages/owner/Profile';

// Organisation
import OrgLayout from './pages/organisation/Layout';
import OrgDashboard from './pages/organisation/Dashboard';
import PublishItem from './pages/organisation/PublishItem';
import MyItems from './pages/organisation/MyItems';
import ViewItem from './pages/organisation/ViewItem';
import EditItem from './pages/organisation/EditItem';
import Claims from './pages/organisation/Claims';
import Notifications from './pages/organisation/Notifications';
import Analytics from './pages/organisation/Analytics';
import OrganisationProfile from './pages/organisation/Profile';
import Settings from './pages/organisation/Settings';

// Admin
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import CreateOrganisation from './pages/admin/CreateOrganisation';
import ManageUsers from './pages/admin/ManageUsers';
import AdminProfile from './pages/admin/AdminProfile';
import AdminItems from './pages/admin/AdminItems';          // ✅ manage items list
import AdminEditItem from './pages/admin/AdminEditItem';    // ✅ edit item (admin)

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

      {/* ✅ Change Password – accessible to any authenticated user */}
      <Route path="/change-password" element={
        <ProtectedRoute allowedRoles={['OWNER', 'ORGANISATION', 'ADMIN']}>
          <ChangePasswordPage />
        </ProtectedRoute>
      } />

      {/* Owner */}
      <Route path="/owner/dashboard" element={<Navigate to="/owner/search" replace />} />
      <Route path="/owner/search" element={<ProtectedRoute allowedRoles={['OWNER']}><SearchItems /></ProtectedRoute>} />
      <Route path="/owner/report" element={<ProtectedRoute allowedRoles={['OWNER']}><ReportItem /></ProtectedRoute>} />
      <Route path="/owner/claim/:reportId" element={<ProtectedRoute allowedRoles={['OWNER']}><ClaimItem /></ProtectedRoute>} />
      <Route path="/owner/payment/:reportId" element={<ProtectedRoute allowedRoles={['OWNER']}><PaymentDemo /></ProtectedRoute>} />
      <Route path="/owner/reports" element={<ProtectedRoute allowedRoles={['OWNER']}><MyReports /></ProtectedRoute>} />
      <Route path="/owner/profile" element={<ProtectedRoute allowedRoles={['OWNER']}><OwnerProfile /></ProtectedRoute>} />
      <Route path="/owner/notifications" element={<ProtectedRoute allowedRoles={['OWNER']}><Notifications /></ProtectedRoute>} />

      {/* Organisation */}
      <Route path="/org" element={<ProtectedRoute allowedRoles={['ORGANISATION']}><OrgLayout /></ProtectedRoute>}>
        <Route path="dashboard" element={<OrgDashboard />} />
        <Route path="publish" element={<PublishItem />} />
        <Route path="items" element={<MyItems />} />
        <Route path="items/:itemId" element={<ViewItem />} />
        <Route path="items/:itemId/edit" element={<EditItem />} />
        <Route path="claims" element={<Claims />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="profile" element={<OrganisationProfile />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* Admin */}
      <Route path="/admin" element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminLayout /></ProtectedRoute>}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="create-org" element={<CreateOrganisation />} />
        <Route path="manage-users" element={<ManageUsers />} />
        <Route path="profile" element={<AdminProfile />} />
        <Route path="items" element={<AdminItems />} />                {/* ✅ manage items list */}
        <Route path="edit-item/:itemId" element={<AdminEditItem />} />  {/* ✅ edit item (admin) */}
        <Route path="settings" element={<div className="p-8 text-gray-500">Settings page coming soon.</div>} />
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