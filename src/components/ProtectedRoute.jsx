import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
  if (allowedRoles && !allowedRoles.includes(storedUser.user_type)) {
    return <Navigate to="/login" />;
  }
  return children;
};
export default ProtectedRoute;