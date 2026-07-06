

// import { Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider } from './context/AuthContext';
// import { NotificationProvider } from './context/NotificationContext';   // ✅ polling context
// import ProtectedRoute from './components/ProtectedRoute';
// import HomePage from './pages/HomePage';

// // Auth pages
// import LoginPage from './pages/auth/LoginPage';
// import RegisterPage from './pages/auth/RegisterPage';
// import VerifyOtpPage from './pages/auth/VerifyOtpPage';
// import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
// import ResetPasswordPage from './pages/auth/ResetPasswordPage';

// // Owner
// import SearchItems from './pages/owner/SearchItems';
// import ReportItem from './pages/owner/ReportItem';
// import ClaimItem from './pages/owner/ClaimItem';
// import PaymentDemo from './pages/owner/PaymentDemo';
// import MyReports from './pages/owner/MyReports';
// import OwnerProfile from './pages/owner/Profile';

// // Organisation
// import OrgLayout from './pages/organisation/Layout';
// import OrgDashboard from './pages/organisation/Dashboard';
// import PublishItem from './pages/organisation/PublishItem';
// import MyItems from './pages/organisation/MyItems';
// import ViewItem from './pages/organisation/ViewItem';
// import EditItem from './pages/organisation/EditItem';
// import Claims from './pages/organisation/Claims';
// import Notifications from './pages/organisation/Notifications';   // same component for both roles
// import Analytics from './pages/organisation/Analytics';
// import OrganisationProfile from './pages/organisation/Profile';
// import Settings from './pages/organisation/Settings';

// // Admin
// import AdminDashboard from './pages/admin/AdminDashboard';
// import CreateOrganisation from './pages/admin/CreateOrganisation';
// import ManageUsers from './pages/admin/ManageUsers';

// function AppRoutes() {
//   return (
//     <Routes>
//       {/* Public landing + auth */}
//       <Route path="/" element={<HomePage />} />
//       <Route path="/login" element={<LoginPage />} />
//       <Route path="/register" element={<RegisterPage />} />
//       <Route path="/verify-otp" element={<VerifyOtpPage />} />
//       <Route path="/forgot-password" element={<ForgotPasswordPage />} />
//       <Route path="/reset-password" element={<ResetPasswordPage />} />

//       {/* Owner – dashboard redirect */}
//       <Route path="/owner/dashboard" element={<Navigate to="/owner/search" replace />} />

//       {/* Owner routes */}
//       <Route path="/owner/search" element={<ProtectedRoute allowedRoles={['OWNER']}><SearchItems /></ProtectedRoute>} />
//       <Route path="/owner/report" element={<ProtectedRoute allowedRoles={['OWNER']}><ReportItem /></ProtectedRoute>} />
//       <Route path="/owner/claim/:reportId" element={<ProtectedRoute allowedRoles={['OWNER']}><ClaimItem /></ProtectedRoute>} />
//       <Route path="/owner/payment/:reportId" element={<ProtectedRoute allowedRoles={['OWNER']}><PaymentDemo /></ProtectedRoute>} />
//       <Route path="/owner/reports" element={<ProtectedRoute allowedRoles={['OWNER']}><MyReports /></ProtectedRoute>} />
//       <Route path="/owner/profile" element={<ProtectedRoute allowedRoles={['OWNER']}><OwnerProfile /></ProtectedRoute>} />
//       <Route path="/owner/notifications" element={<ProtectedRoute allowedRoles={['OWNER']}><Notifications /></ProtectedRoute>} />   {/* ✅ new */}

//       {/* Organisation routes – nested under layout */}
//       <Route path="/org" element={<ProtectedRoute allowedRoles={['ORGANISATION']}><OrgLayout /></ProtectedRoute>}>
//         <Route path="dashboard" element={<OrgDashboard />} />
//         <Route path="publish" element={<PublishItem />} />
//         <Route path="items" element={<MyItems />} />
//         <Route path="items/:itemId" element={<ViewItem />} />
//         <Route path="items/:itemId/edit" element={<EditItem />} />
//         <Route path="claims" element={<Claims />} />
//         <Route path="notifications" element={<Notifications />} />
//         <Route path="analytics" element={<Analytics />} />
//         <Route path="profile" element={<OrganisationProfile />} />
//         <Route path="settings" element={<Settings />} />
//       </Route>

//       {/* Admin routes */}
//       <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminDashboard /></ProtectedRoute>} />
//       <Route path="/admin/create-org" element={<ProtectedRoute allowedRoles={['ADMIN']}><CreateOrganisation /></ProtectedRoute>} />
//       <Route path="/admin/manage-users" element={<ProtectedRoute allowedRoles={['ADMIN']}><ManageUsers /></ProtectedRoute>} />

//       {/* Fallback */}
//       <Route path="*" element={<Navigate to="/" />} />
//     </Routes>
//   );
// }

// export default function App() {
//   return (
//     <AuthProvider>
//       <NotificationProvider>
//         <AppRoutes />
//       </NotificationProvider>
//     </AuthProvider>
//   );
// }

import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';   // ✅ polling + sound
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';

// Auth pages
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import VerifyOtpPage from './pages/auth/VerifyOtpPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';

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
import Notifications from './pages/organisation/Notifications';   // shared by both roles
import Analytics from './pages/organisation/Analytics';
import OrganisationProfile from './pages/organisation/Profile';
import Settings from './pages/organisation/Settings';

// Admin
import AdminDashboard from './pages/admin/AdminDashboard';
import CreateOrganisation from './pages/admin/CreateOrganisation';
import ManageUsers from './pages/admin/ManageUsers';

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

      {/* Owner – dashboard redirect */}
      <Route path="/owner/dashboard" element={<Navigate to="/owner/search" replace />} />

      {/* Owner routes */}
      <Route path="/owner/search" element={<ProtectedRoute allowedRoles={['OWNER']}><SearchItems /></ProtectedRoute>} />
      <Route path="/owner/report" element={<ProtectedRoute allowedRoles={['OWNER']}><ReportItem /></ProtectedRoute>} />
      <Route path="/owner/claim/:reportId" element={<ProtectedRoute allowedRoles={['OWNER']}><ClaimItem /></ProtectedRoute>} />
      <Route path="/owner/payment/:reportId" element={<ProtectedRoute allowedRoles={['OWNER']}><PaymentDemo /></ProtectedRoute>} />
      <Route path="/owner/reports" element={<ProtectedRoute allowedRoles={['OWNER']}><MyReports /></ProtectedRoute>} />
      <Route path="/owner/profile" element={<ProtectedRoute allowedRoles={['OWNER']}><OwnerProfile /></ProtectedRoute>} />
      <Route path="/owner/notifications" element={<ProtectedRoute allowedRoles={['OWNER']}><Notifications /></ProtectedRoute>} />

      {/* Organisation routes – nested under layout */}
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

      {/* Admin routes */}
      <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/create-org" element={<ProtectedRoute allowedRoles={['ADMIN']}><CreateOrganisation /></ProtectedRoute>} />
      <Route path="/admin/manage-users" element={<ProtectedRoute allowedRoles={['ADMIN']}><ManageUsers /></ProtectedRoute>} />

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
