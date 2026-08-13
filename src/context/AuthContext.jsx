import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as apiLogin, logout as apiLogout, refreshToken as apiRefreshToken } from '../api/auth';
import { showToast } from '../api/client';

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mustChangePassword, setMustChangePassword] = useState(false);
  const navigate = useNavigate();

  // Initialise user from localStorage
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      const changePwdFlag = localStorage.getItem('mustChangePassword');
      if (changePwdFlag === 'true') {
        setMustChangePassword(true);
      }
    } catch (e) {
      console.error('Failed to parse stored user:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (username, password) => {
    const response = await apiLogin(username, password);
    const userData = response?.data?.user;
    const passwordChangeRequired = response?.data?.password_change_required === true;

    if (!userData) throw new Error('Invalid login response');

    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('accessToken', response.data.access_token);
    localStorage.setItem('refreshToken', response.data.refresh_token);

    if (passwordChangeRequired) {
      localStorage.setItem('mustChangePassword', 'true');
      setMustChangePassword(true);
    } else {
      localStorage.removeItem('mustChangePassword');
      setMustChangePassword(false);
    }

    setUser(userData);
    return { user: userData, passwordChangeRequired };
  }, []);

  const logout = useCallback(async () => {
    try {
      await apiLogout();
    } catch (e) {
      // Continue even if backend logout fails
    }
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('mustChangePassword');
    setUser(null);
    setMustChangePassword(false);

    showToast({
      type: 'success',
      title: 'Signed out',
      message: 'You have been signed out successfully.',
      duration: 4000,
    });

    setTimeout(() => {
      navigate('/login');
    }, 500);
  }, [navigate]);

  const clearPasswordChangeFlag = useCallback(() => {
    localStorage.removeItem('mustChangePassword');
    setMustChangePassword(false);
  }, []);

  const refreshTokenIfNeeded = useCallback(async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) return false;

    try {
      const res = await apiRefreshToken(refreshToken);
      if (res?.data?.access_token) {
        localStorage.setItem('accessToken', res.data.access_token);
        localStorage.setItem('refreshToken', res.data.refresh_token);
        return true;
      }
      return false;
    } catch (e) {
      logout();
      return false;
    }
  }, [logout]);

  const value = {
    user,
    loading,
    login,
    logout,
    mustChangePassword,
    clearPasswordChangeFlag,
    refreshToken: refreshTokenIfNeeded,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}