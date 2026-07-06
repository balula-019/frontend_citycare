// // // // import {
// // // //   createContext, useContext, useState,
// // // //   useEffect, useCallback, useRef
// // // // } from 'react';
// // // // import { login as apiLogin, logout as apiLogout } from '../api/auth';
// // // // import { showToast } from '../api/client';

// // // // const STORAGE_KEYS = {
// // // //   ACCESS:  'accessToken',
// // // //   REFRESH: 'refreshToken',
// // // //   USER:    'user',
// // // // };

// // // // const EXPIRY_WARNING_MS = 2 * 60 * 1000;

// // // // const decodeJwt = (token) => {
// // // //   try {
// // // //     const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
// // // //     return JSON.parse(atob(base64));
// // // //   } catch {
// // // //     return null;
// // // //   }
// // // // };

// // // // const msUntilExpiry = (token) => {
// // // //   const payload = decodeJwt(token);
// // // //   if (!payload?.exp) return 0;
// // // //   return Math.max(0, payload.exp * 1000 - Date.now());
// // // // };

// // // // const isTokenExpired = (token) => {
// // // //   if (!token) return true;
// // // //   return msUntilExpiry(token) === 0;
// // // // };

// // // // const storage = {
// // // //   get: (key)        => localStorage.getItem(key),
// // // //   set: (key, value) => localStorage.setItem(key, value),
// // // //   del: (key)        => localStorage.removeItem(key),

// // // //   getUser: () => {
// // // //     try {
// // // //       const raw = localStorage.getItem(STORAGE_KEYS.USER);
// // // //       return raw ? JSON.parse(raw) : null;
// // // //     } catch {
// // // //       return null;
// // // //     }
// // // //   },

// // // //   setTokens: (access, refresh) => {
// // // //     if (access)  localStorage.setItem(STORAGE_KEYS.ACCESS,  access);
// // // //     if (refresh) localStorage.setItem(STORAGE_KEYS.REFRESH, refresh);
// // // //   },

// // // //   setUser: (user) => {
// // // //     localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
// // // //   },

// // // //   clearAll: () => {
// // // //     Object.values(STORAGE_KEYS).forEach((k) => localStorage.removeItem(k));
// // // //   },
// // // // };

// // // // const AuthContext = createContext(null);

// // // // export const AuthProvider = ({ children }) => {
// // // //   const [user, setUser]         = useState(null);
// // // //   const [ready, setReady]       = useState(false);
// // // //   const [loggingOut, setLoggingOut] = useState(false);

// // // //   const expiryWarningTimer = useRef(null);
// // // //   const expiryLogoutTimer  = useRef(null);

// // // //   const clearTimers = useCallback(() => {
// // // //     clearTimeout(expiryWarningTimer.current);
// // // //     clearTimeout(expiryLogoutTimer.current);
// // // //   }, []);

// // // //   const forceLogout = useCallback((reason = 'expired') => {
// // // //     clearTimers();
// // // //     storage.clearAll();
// // // //     setUser(null);

// // // //     if (reason === 'expired') {
// // // //       showToast({
// // // //         type:    'warning',
// // // //         title:   'Session expired',
// // // //         message: 'You have been signed out. Please log in again.',
// // // //         duration: 6000,
// // // //       });
// // // //     } else if (reason === 'manual') {
// // // //       showToast({
// // // //         type:    'success',
// // // //         title:   'Signed out',
// // // //         message: 'You have been signed out successfully.',
// // // //         duration: 4000,
// // // //       });
// // // //     }

// // // //     // Hard redirect – full page reload to wipe all in‑memory state
// // // //     setTimeout(() => {
// // // //       window.location.href = '#/login';
// // // //     }, 500);
// // // //   }, [clearTimers]);

// // // //   const scheduleExpiryHandlers = useCallback((accessToken) => {
// // // //     clearTimers();
// // // //     const remaining = msUntilExpiry(accessToken);
// // // //     if (remaining <= 0) return;

// // // //     if (remaining > EXPIRY_WARNING_MS) {
// // // //       expiryWarningTimer.current = setTimeout(() => {
// // // //         showToast({
// // // //           type:    'warning',
// // // //           title:   'Session expiring soon',
// // // //           message: 'Your session will expire in 2 minutes.',
// // // //           duration: 8000,
// // // //         });
// // // //       }, remaining - EXPIRY_WARNING_MS);
// // // //     }

// // // //     expiryLogoutTimer.current = setTimeout(() => {
// // // //       forceLogout('expired');
// // // //     }, remaining);
// // // //   }, [clearTimers, forceLogout]);

// // // //   useEffect(() => {
// // // //     const access  = storage.get(STORAGE_KEYS.ACCESS);
// // // //     const refresh = storage.get(STORAGE_KEYS.REFRESH);
// // // //     const stored  = storage.getUser();

// // // //     if (access && refresh && stored && !isTokenExpired(access)) {
// // // //       setUser(stored);
// // // //       scheduleExpiryHandlers(access);
// // // //     } else if (access || refresh || stored) {
// // // //       storage.clearAll();
// // // //     }

// // // //     setReady(true);
// // // //   }, [scheduleExpiryHandlers]);

// // // //   useEffect(() => () => clearTimers(), [clearTimers]);

// // // //   const login = useCallback(async (username, password) => {
// // // //     const res  = await apiLogin(username, password);
// // // //     const data = res?.data;

// // // //     if (!data?.access_token || !data?.refresh_token || !data?.user) {
// // // //       throw new Error('Invalid response from server. Please try again.');
// // // //     }

// // // //     storage.setTokens(data.access_token, data.refresh_token);
// // // //     storage.setUser(data.user);
// // // //     setUser(data.user);
// // // //     scheduleExpiryHandlers(data.access_token);

// // // //     showToast({
// // // //       type:    'success',
// // // //       title:   `Welcome back, ${data.user.name?.split(' ')[0] || 'there'}!`,
// // // //       message: 'You have signed in successfully.',
// // // //       duration: 4000,
// // // //     });

// // // //     return data.user;
// // // //   }, [scheduleExpiryHandlers]);

// // // //   const logout = useCallback(async () => {
// // // //     if (loggingOut) return;
// // // //     setLoggingOut(true);
// // // //     try {
// // // //       await apiLogout();
// // // //     } catch (err) {
// // // //       console.error('Backend logout failed, clearing session locally', err);
// // // //     } finally {
// // // //       setLoggingOut(false);
// // // //       forceLogout('manual');
// // // //     }
// // // //   }, [loggingOut, forceLogout]);

// // // //   const updateUser = useCallback((updates) => {
// // // //     setUser((prev) => {
// // // //       if (!prev) return prev;
// // // //       const merged = { ...prev, ...updates };
// // // //       storage.setUser(merged);
// // // //       return merged;
// // // //     });
// // // //   }, []);

// // // //   const isAuthenticated = !!user;

// // // //   const hasRole = useCallback(
// // // //     (role) => user?.role === role || user?.roles?.includes(role),
// // // //     [user]
// // // //   );

// // // //   const isOwner = useCallback(() => hasRole('OWNER'), [hasRole]);
// // // //   const isAdmin = useCallback(() => hasRole('ADMIN'), [hasRole]);
// // // //   const isOrg   = useCallback(() => hasRole('ORGANISATION') || hasRole('ORG'), [hasRole]);

// // // //   const value = {
// // // //     user,
// // // //     ready,
// // // //     loading: !ready,
// // // //     isAuthenticated,
// // // //     loggingOut,

// // // //     login,
// // // //     logout,
// // // //     updateUser,
// // // //     forceLogout,

// // // //     hasRole,
// // // //     isOwner,
// // // //     isAdmin,
// // // //     isOrg,

// // // //     getStoredUser: storage.getUser,
// // // //   };

// // // //   return (
// // // //     <AuthContext.Provider value={value}>
// // // //       {children}
// // // //     </AuthContext.Provider>
// // // //   );
// // // // };

// // // // export const useAuth = () => {
// // // //   const ctx = useContext(AuthContext);
// // // //   if (ctx === null) {
// // // //     throw new Error('useAuth must be used inside <AuthProvider>.');
// // // //   }
// // // //   return ctx;
// // // // };

// // // // export default AuthContext;

// // // import {
// // //   createContext, useContext, useState,
// // //   useEffect, useCallback, useRef
// // // } from 'react';
// // // import { login as apiLogin, logout as apiLogout } from '../api/auth';
// // // import { showToast } from '../api/client';
// // // import { removeTokenOnLogout } from '../services/notificationService';  // ✅ FCM cleanup

// // // const STORAGE_KEYS = {
// // //   ACCESS:  'accessToken',
// // //   REFRESH: 'refreshToken',
// // //   USER:    'user',
// // // };

// // // const EXPIRY_WARNING_MS = 2 * 60 * 1000;

// // // const decodeJwt = (token) => {
// // //   try {
// // //     const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
// // //     return JSON.parse(atob(base64));
// // //   } catch {
// // //     return null;
// // //   }
// // // };

// // // const msUntilExpiry = (token) => {
// // //   const payload = decodeJwt(token);
// // //   if (!payload?.exp) return 0;
// // //   return Math.max(0, payload.exp * 1000 - Date.now());
// // // };

// // // const isTokenExpired = (token) => {
// // //   if (!token) return true;
// // //   return msUntilExpiry(token) === 0;
// // // };

// // // const storage = {
// // //   get: (key)        => localStorage.getItem(key),
// // //   set: (key, value) => localStorage.setItem(key, value),
// // //   del: (key)        => localStorage.removeItem(key),

// // //   getUser: () => {
// // //     try {
// // //       const raw = localStorage.getItem(STORAGE_KEYS.USER);
// // //       return raw ? JSON.parse(raw) : null;
// // //     } catch {
// // //       return null;
// // //     }
// // //   },

// // //   setTokens: (access, refresh) => {
// // //     if (access)  localStorage.setItem(STORAGE_KEYS.ACCESS,  access);
// // //     if (refresh) localStorage.setItem(STORAGE_KEYS.REFRESH, refresh);
// // //   },

// // //   setUser: (user) => {
// // //     localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
// // //   },

// // //   clearAll: () => {
// // //     Object.values(STORAGE_KEYS).forEach((k) => localStorage.removeItem(k));
// // //   },
// // // };

// // // const AuthContext = createContext(null);

// // // export const AuthProvider = ({ children }) => {
// // //   const [user, setUser]         = useState(null);
// // //   const [ready, setReady]       = useState(false);
// // //   const [loggingOut, setLoggingOut] = useState(false);

// // //   const expiryWarningTimer = useRef(null);
// // //   const expiryLogoutTimer  = useRef(null);

// // //   const clearTimers = useCallback(() => {
// // //     clearTimeout(expiryWarningTimer.current);
// // //     clearTimeout(expiryLogoutTimer.current);
// // //   }, []);

// // //   const forceLogout = useCallback(async (reason = 'expired') => {
// // //     clearTimers();

// // //     // ✅ Unregister FCM token before clearing storage
// // //     await removeTokenOnLogout().catch((err) => {
// // //       console.warn('FCM token unregistration failed during force logout:', err);
// // //     });

// // //     storage.clearAll();
// // //     setUser(null);

// // //     if (reason === 'expired') {
// // //       showToast({
// // //         type:    'warning',
// // //         title:   'Session expired',
// // //         message: 'You have been signed out. Please log in again.',
// // //         duration: 6000,
// // //       });
// // //     } else if (reason === 'manual') {
// // //       showToast({
// // //         type:    'success',
// // //         title:   'Signed out',
// // //         message: 'You have been signed out successfully.',
// // //         duration: 4000,
// // //       });
// // //     }

// // //     // Hard redirect – full page reload to wipe all in‑memory state
// // //     setTimeout(() => {
// // //       window.location.href = '#/login';
// // //     }, 500);
// // //   }, [clearTimers]);

// // //   const scheduleExpiryHandlers = useCallback((accessToken) => {
// // //     clearTimers();
// // //     const remaining = msUntilExpiry(accessToken);
// // //     if (remaining <= 0) return;

// // //     if (remaining > EXPIRY_WARNING_MS) {
// // //       expiryWarningTimer.current = setTimeout(() => {
// // //         showToast({
// // //           type:    'warning',
// // //           title:   'Session expiring soon',
// // //           message: 'Your session will expire in 2 minutes.',
// // //           duration: 8000,
// // //         });
// // //       }, remaining - EXPIRY_WARNING_MS);
// // //     }

// // //     expiryLogoutTimer.current = setTimeout(() => {
// // //       forceLogout('expired');
// // //     }, remaining);
// // //   }, [clearTimers, forceLogout]);

// // //   useEffect(() => {
// // //     const access  = storage.get(STORAGE_KEYS.ACCESS);
// // //     const refresh = storage.get(STORAGE_KEYS.REFRESH);
// // //     const stored  = storage.getUser();

// // //     if (access && refresh && stored && !isTokenExpired(access)) {
// // //       setUser(stored);
// // //       scheduleExpiryHandlers(access);
// // //     } else if (access || refresh || stored) {
// // //       storage.clearAll();
// // //     }

// // //     setReady(true);
// // //   }, [scheduleExpiryHandlers]);

// // //   useEffect(() => () => clearTimers(), [clearTimers]);

// // //   const login = useCallback(async (username, password) => {
// // //     const res  = await apiLogin(username, password);
// // //     const data = res?.data;

// // //     if (!data?.access_token || !data?.refresh_token || !data?.user) {
// // //       throw new Error('Invalid response from server. Please try again.');
// // //     }

// // //     storage.setTokens(data.access_token, data.refresh_token);
// // //     storage.setUser(data.user);
// // //     setUser(data.user);
// // //     scheduleExpiryHandlers(data.access_token);

// // //     showToast({
// // //       type:    'success',
// // //       title:   `Welcome back, ${data.user.name?.split(' ')[0] || 'there'}!`,
// // //       message: 'You have signed in successfully.',
// // //       duration: 4000,
// // //     });

// // //     return data.user;
// // //   }, [scheduleExpiryHandlers]);

// // //   const logout = useCallback(async () => {
// // //     if (loggingOut) return;
// // //     setLoggingOut(true);
// // //     try {
// // //       // ✅ Unregister FCM token first
// // //       await removeTokenOnLogout().catch((err) => {
// // //         console.warn('FCM token unregistration failed during logout:', err);
// // //       });

// // //       await apiLogout();
// // //     } catch (err) {
// // //       console.error('Backend logout failed, clearing session locally', err);
// // //     } finally {
// // //       setLoggingOut(false);
// // //       forceLogout('manual');
// // //     }
// // //   }, [loggingOut, forceLogout]);

// // //   const updateUser = useCallback((updates) => {
// // //     setUser((prev) => {
// // //       if (!prev) return prev;
// // //       const merged = { ...prev, ...updates };
// // //       storage.setUser(merged);
// // //       return merged;
// // //     });
// // //   }, []);

// // //   const isAuthenticated = !!user;

// // //   const hasRole = useCallback(
// // //     (role) => user?.role === role || user?.roles?.includes(role),
// // //     [user]
// // //   );

// // //   const isOwner = useCallback(() => hasRole('OWNER'), [hasRole]);
// // //   const isAdmin = useCallback(() => hasRole('ADMIN'), [hasRole]);
// // //   const isOrg   = useCallback(() => hasRole('ORGANISATION') || hasRole('ORG'), [hasRole]);

// // //   const value = {
// // //     user,
// // //     ready,
// // //     loading: !ready,
// // //     isAuthenticated,
// // //     loggingOut,

// // //     login,
// // //     logout,
// // //     updateUser,
// // //     forceLogout,

// // //     hasRole,
// // //     isOwner,
// // //     isAdmin,
// // //     isOrg,

// // //     getStoredUser: storage.getUser,
// // //   };

// // //   return (
// // //     <AuthContext.Provider value={value}>
// // //       {children}
// // //     </AuthContext.Provider>
// // //   );
// // // };

// // // export const useAuth = () => {
// // //   const ctx = useContext(AuthContext);
// // //   if (ctx === null) {
// // //     throw new Error('useAuth must be used inside <AuthProvider>.');
// // //   }
// // //   return ctx;
// // // };

// // // export default AuthContext;
// // import {
// //   createContext, useContext, useState,
// //   useEffect, useCallback, useRef
// // } from 'react';
// // import { login as apiLogin, logout as apiLogout } from '../api/auth';
// // import { showToast } from '../api/client';
// // import { removeTokenOnLogout } from '../services/notificationService';  // ✅ FCM cleanup

// // const STORAGE_KEYS = {
// //   ACCESS:  'accessToken',
// //   REFRESH: 'refreshToken',
// //   USER:    'user',
// // };

// // const EXPIRY_WARNING_MS = 2 * 60 * 1000;

// // const decodeJwt = (token) => {
// //   try {
// //     const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
// //     return JSON.parse(atob(base64));
// //   } catch {
// //     return null;
// //   }
// // };

// // const msUntilExpiry = (token) => {
// //   const payload = decodeJwt(token);
// //   if (!payload?.exp) return 0;
// //   return Math.max(0, payload.exp * 1000 - Date.now());
// // };

// // const isTokenExpired = (token) => {
// //   if (!token) return true;
// //   return msUntilExpiry(token) === 0;
// // };

// // const storage = {
// //   get: (key)        => localStorage.getItem(key),
// //   set: (key, value) => localStorage.setItem(key, value),
// //   del: (key)        => localStorage.removeItem(key),

// //   getUser: () => {
// //     try {
// //       const raw = localStorage.getItem(STORAGE_KEYS.USER);
// //       return raw ? JSON.parse(raw) : null;
// //     } catch {
// //       return null;
// //     }
// //   },

// //   setTokens: (access, refresh) => {
// //     if (access)  localStorage.setItem(STORAGE_KEYS.ACCESS,  access);
// //     if (refresh) localStorage.setItem(STORAGE_KEYS.REFRESH, refresh);
// //   },

// //   setUser: (user) => {
// //     localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
// //   },

// //   clearAll: () => {
// //     Object.values(STORAGE_KEYS).forEach((k) => localStorage.removeItem(k));
// //   },
// // };

// // const AuthContext = createContext(null);

// // export const AuthProvider = ({ children }) => {
// //   const [user, setUser]         = useState(null);
// //   const [ready, setReady]       = useState(false);
// //   const [loggingOut, setLoggingOut] = useState(false);

// //   const expiryWarningTimer = useRef(null);
// //   const expiryLogoutTimer  = useRef(null);

// //   const clearTimers = useCallback(() => {
// //     clearTimeout(expiryWarningTimer.current);
// //     clearTimeout(expiryLogoutTimer.current);
// //   }, []);

// //   const forceLogout = useCallback(async (reason = 'expired') => {
// //     clearTimers();

// //     // ✅ Unregister FCM token before clearing storage
// //     await removeTokenOnLogout().catch((err) => {
// //       console.warn('FCM token unregistration failed during force logout:', err);
// //     });

// //     storage.clearAll();
// //     setUser(null);

// //     if (reason === 'expired') {
// //       showToast({
// //         type:    'warning',
// //         title:   'Session expired',
// //         message: 'You have been signed out. Please log in again.',
// //         duration: 6000,
// //       });
// //     } else if (reason === 'manual') {
// //       showToast({
// //         type:    'success',
// //         title:   'Signed out',
// //         message: 'You have been signed out successfully.',
// //         duration: 4000,
// //       });
// //     }

// //     // Hard redirect – full page reload to wipe all in‑memory state
// //     setTimeout(() => {
// //       window.location.href = '#/login';
// //     }, 500);
// //   }, [clearTimers]);

// //   const scheduleExpiryHandlers = useCallback((accessToken) => {
// //     clearTimers();
// //     const remaining = msUntilExpiry(accessToken);
// //     if (remaining <= 0) return;

// //     if (remaining > EXPIRY_WARNING_MS) {
// //       expiryWarningTimer.current = setTimeout(() => {
// //         showToast({
// //           type:    'warning',
// //           title:   'Session expiring soon',
// //           message: 'Your session will expire in 2 minutes.',
// //           duration: 8000,
// //         });
// //       }, remaining - EXPIRY_WARNING_MS);
// //     }

// //     expiryLogoutTimer.current = setTimeout(() => {
// //       forceLogout('expired');
// //     }, remaining);
// //   }, [clearTimers, forceLogout]);

// //   useEffect(() => {
// //     const access  = storage.get(STORAGE_KEYS.ACCESS);
// //     const refresh = storage.get(STORAGE_KEYS.REFRESH);
// //     const stored  = storage.getUser();

// //     if (access && refresh && stored && !isTokenExpired(access)) {
// //       setUser(stored);
// //       scheduleExpiryHandlers(access);
// //     } else if (access || refresh || stored) {
// //       storage.clearAll();
// //     }

// //     setReady(true);
// //   }, [scheduleExpiryHandlers]);

// //   useEffect(() => () => clearTimers(), [clearTimers]);

// //   const login = useCallback(async (username, password) => {
// //     const res  = await apiLogin(username, password);
// //     const data = res?.data;

// //     if (!data?.access_token || !data?.refresh_token || !data?.user) {
// //       throw new Error('Invalid response from server. Please try again.');
// //     }

// //     storage.setTokens(data.access_token, data.refresh_token);
// //     storage.setUser(data.user);
// //     setUser(data.user);
// //     scheduleExpiryHandlers(data.access_token);

// //     showToast({
// //       type:    'success',
// //       title:   `Welcome back, ${data.user.name?.split(' ')[0] || 'there'}!`,
// //       message: 'You have signed in successfully.',
// //       duration: 4000,
// //     });

// //     return data.user;
// //   }, [scheduleExpiryHandlers]);

// //   const logout = useCallback(async () => {
// //     if (loggingOut) return;
// //     setLoggingOut(true);
// //     try {
// //       // ✅ Unregister FCM token first
// //       await removeTokenOnLogout().catch((err) => {
// //         console.warn('FCM token unregistration failed during logout:', err);
// //       });

// //       await apiLogout();
// //     } catch (err) {
// //       console.error('Backend logout failed, clearing session locally', err);
// //     } finally {
// //       setLoggingOut(false);
// //       forceLogout('manual');
// //     }
// //   }, [loggingOut, forceLogout]);

// //   const updateUser = useCallback((updates) => {
// //     setUser((prev) => {
// //       if (!prev) return prev;
// //       const merged = { ...prev, ...updates };
// //       storage.setUser(merged);
// //       return merged;
// //     });
// //   }, []);

// //   const isAuthenticated = !!user;

// //   const hasRole = useCallback(
// //     (role) => user?.role === role || user?.roles?.includes(role),
// //     [user]
// //   );

// //   const isOwner = useCallback(() => hasRole('OWNER'), [hasRole]);
// //   const isAdmin = useCallback(() => hasRole('ADMIN'), [hasRole]);
// //   const isOrg   = useCallback(() => hasRole('ORGANISATION') || hasRole('ORG'), [hasRole]);

// //   const value = {
// //     user,
// //     ready,
// //     loading: !ready,
// //     isAuthenticated,
// //     loggingOut,

// //     login,
// //     logout,
// //     updateUser,
// //     forceLogout,

// //     hasRole,
// //     isOwner,
// //     isAdmin,
// //     isOrg,

// //     getStoredUser: storage.getUser,
// //   };

// //   return (
// //     <AuthContext.Provider value={value}>
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // };

// // export const useAuth = () => {
// //   const ctx = useContext(AuthContext);
// //   if (ctx === null) {
// //     throw new Error('useAuth must be used inside <AuthProvider>.');
// //   }
// //   return ctx;
// // };

// // export default AuthContext;

// import { createContext, useContext, useState, useEffect, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { login as apiLogin, logout as apiLogout, refreshToken as apiRefreshToken } from '../api/auth'; // adjust if paths differ
// import { apiClient } from '../api/client'; // your API client

// const AuthContext = createContext(undefined);

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   // Initialise user from localStorage
//   useEffect(() => {
//     try {
//       const storedUser = localStorage.getItem('user');
//       if (storedUser) {
//         setUser(JSON.parse(storedUser));
//       }
//     } catch (e) {
//       console.error('Failed to parse stored user:', e);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const login = useCallback(async (username, password) => {
//     const response = await apiLogin(username, password);
//     const userData = response?.data?.user || response?.user;

//     if (!userData) throw new Error('Invalid login response');

//     // Store user and tokens
//     localStorage.setItem('user', JSON.stringify(userData));
//     localStorage.setItem('accessToken', response.data.access_token);
//     localStorage.setItem('refreshToken', response.data.refresh_token);

//     setUser(userData);
//     return userData;
//   }, []);

//   const logout = useCallback(async () => {
//     try {
//       await apiLogout();
//     } catch (e) {
//       // Silently continue even if logout fails
//     }
//     localStorage.removeItem('user');
//     localStorage.removeItem('accessToken');
//     localStorage.removeItem('refreshToken');
//     setUser(null);
//     navigate('/login');
//   }, [navigate]);

//   // Token refresh logic (unchanged)
//   const refreshTokenIfNeeded = useCallback(async () => {
//     const refreshToken = localStorage.getItem('refreshToken');
//     if (!refreshToken) return false;

//     try {
//       const res = await apiRefreshToken(refreshToken);
//       if (res?.data?.access_token) {
//         localStorage.setItem('accessToken', res.data.access_token);
//         localStorage.setItem('refreshToken', res.data.refresh_token);
//         return true;
//       }
//       return false;
//     } catch (e) {
//       // If refresh fails, force logout
//       logout();
//       return false;
//     }
//   }, [logout]);

//   const value = {
//     user,
//     loading,
//     login,
//     logout,
//     refreshToken: refreshTokenIfNeeded,
//     isAuthenticated: !!user,
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (!context) throw new Error('useAuth must be used within AuthProvider');
//   return context;
// }

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as apiLogin, logout as apiLogout, refreshToken as apiRefreshToken } from '../api/auth';
import { showToast } from '../api/client';   // ✅ for toast notifications

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Initialise user from localStorage
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (e) {
      console.error('Failed to parse stored user:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (username, password) => {
    const response = await apiLogin(username, password);
    const userData = response?.data?.user || response?.user;

    if (!userData) throw new Error('Invalid login response');

    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('accessToken', response.data.access_token);
    localStorage.setItem('refreshToken', response.data.refresh_token);

    setUser(userData);
    return userData;
  }, []);

  const logout = useCallback(async () => {
    try {
      await apiLogout();
    } catch (e) {
      // Continue even if backend logout fails
    }
    // Clear storage and state
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUser(null);

    // ✅ Show success toast
    showToast({
      type: 'success',
      title: 'Signed out',
      message: 'You have been signed out successfully.',
      duration: 4000,
    });

    // Redirect to login after a tiny delay so the toast is visible
    setTimeout(() => {
      navigate('/login');
    }, 500);
  }, [navigate]);

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