import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading, mustChangePassword } = useAuth();
  const location = useLocation();

  // Show loading while auth state is initializing
  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;

  // Not authenticated → redirect to login
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;

  // Check if user must change password (newly created org account)
  if (mustChangePassword && location.pathname !== '/change-password') {
    return <Navigate to="/change-password" replace />;
  }

  // Role-based access control (fallback to localStorage for backward compatibility)
  const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
  const userRole = user.user_type || storedUser.user_type;
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;