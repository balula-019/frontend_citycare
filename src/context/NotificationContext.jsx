// // // // // // // // src/context/NotificationContext.jsx
// // // // // // // import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
// // // // // // // import { getNotifications, markNotificationRead, markAllNotificationsRead, deleteNotification } from '../api/items';

// // // // // // // const NotificationContext = createContext(undefined);

// // // // // // // export function NotificationProvider({ children }) {
// // // // // // //   const [notifications, setNotifications] = useState([]);
// // // // // // //   const [unreadCount, setUnreadCount] = useState(0);
// // // // // // //   const [totalCount, setTotalCount] = useState(0);
// // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // //   const [error, setError] = useState('');

// // // // // // //   const isMounted = useRef(true);
// // // // // // //   const intervalRef = useRef(null);

// // // // // // //   const fetchNotifications = useCallback(async () => {
// // // // // // //     try {
// // // // // // //       const res = await getNotifications();
// // // // // // //       const body = res?.data ?? res;
// // // // // // //       const payload = body?.data ?? body; // extract the real data envelope
// // // // // // //       const list = payload?.notifications ?? [];
// // // // // // //       if (isMounted.current) {
// // // // // // //         setNotifications(list);
// // // // // // //         setTotalCount(payload?.totalNotifications ?? list.length);
// // // // // // //         setUnreadCount(payload?.unreadNotifications ?? list.filter(n => !n.read).length);
// // // // // // //         setError('');
// // // // // // //       }
// // // // // // //     } catch (err) {
// // // // // // //       if (isMounted.current) {
// // // // // // //         setError(err.response?.data?.message || err.message || 'Failed to load notifications');
// // // // // // //       }
// // // // // // //     } finally {
// // // // // // //       if (isMounted.current) setLoading(false);
// // // // // // //     }
// // // // // // //   }, []);

// // // // // // //   // Initial fetch + polling every 30 seconds
// // // // // // //   useEffect(() => {
// // // // // // //     fetchNotifications();
// // // // // // //     intervalRef.current = setInterval(fetchNotifications, 30_000);
// // // // // // //     return () => {
// // // // // // //       isMounted.current = false;
// // // // // // //       clearInterval(intervalRef.current);
// // // // // // //     };
// // // // // // //   }, [fetchNotifications]);

// // // // // // //   const markOneRead = async (id) => {
// // // // // // //     try {
// // // // // // //       await markNotificationRead(id);
// // // // // // //       setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
// // // // // // //       setUnreadCount(prev => Math.max(0, prev - 1));
// // // // // // //     } catch (err) {
// // // // // // //       setError(err.response?.data?.message || 'Could not mark as read');
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const markAllRead = async () => {
// // // // // // //     try {
// // // // // // //       await markAllNotificationsRead();
// // // // // // //       setNotifications(prev => prev.map(n => ({ ...n, read: true })));
// // // // // // //       setUnreadCount(0);
// // // // // // //     } catch (err) {
// // // // // // //       setError(err.response?.data?.message || 'Could not mark all as read');
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const removeNotification = async (id) => {
// // // // // // //     try {
// // // // // // //       await deleteNotification(id);
// // // // // // //       const removed = notifications.find(n => n.id === id);
// // // // // // //       setNotifications(prev => prev.filter(n => n.id !== id));
// // // // // // //       if (removed && !removed.read) setUnreadCount(prev => Math.max(0, prev - 1));
// // // // // // //       setTotalCount(prev => prev - 1);
// // // // // // //     } catch (err) {
// // // // // // //       setError(err.response?.data?.message || 'Could not delete notification');
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const value = {
// // // // // // //     notifications,
// // // // // // //     unreadCount,
// // // // // // //     totalCount,
// // // // // // //     loading,
// // // // // // //     error,
// // // // // // //     refresh: fetchNotifications,
// // // // // // //     markOneRead,
// // // // // // //     markAllRead,
// // // // // // //     removeNotification,
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <NotificationContext.Provider value={value}>
// // // // // // //       {children}
// // // // // // //     </NotificationContext.Provider>
// // // // // // //   );
// // // // // // // }

// // // // // // // export function useNotifications() {
// // // // // // //   const context = useContext(NotificationContext);
// // // // // // //   if (!context) {
// // // // // // //     throw new Error('useNotifications must be used within a NotificationProvider');
// // // // // // //   }
// // // // // // //   return context;
// // // // // // // }

// // // // // // import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
// // // // // // import { getNotifications, markNotificationRead, markAllNotificationsRead, deleteNotification } from '../api/items';

// // // // // // const NotificationContext = createContext(undefined);

// // // // // // export function NotificationProvider({ children }) {
// // // // // //   const [notifications, setNotifications] = useState([]);
// // // // // //   const [unreadCount, setUnreadCount] = useState(0);
// // // // // //   const [totalCount, setTotalCount] = useState(0);
// // // // // //   const [loading, setLoading] = useState(true);
// // // // // //   const [error, setError] = useState('');

// // // // // //   const isMounted = useRef(true);
// // // // // //   const intervalRef = useRef(null);

// // // // // //   const fetchNotifications = useCallback(async () => {
// // // // // //     try {
// // // // // //       const res = await getNotifications();
// // // // // //       console.log('🔔 Raw notifications response:', res);   // ✅ DEBUG

// // // // // //       // The API response is wrapped as:
// // // // // //       // { timestamp, statusCode, message, data: { totalNotifications, unreadNotifications, notifications } }
// // // // // //       const wrapper = res?.data ?? res;                 // get inner data
// // // // // //       const payload = wrapper?.data ?? wrapper;         // sometimes double-wrapped, fallback to wrapper
// // // // // //       const list = payload?.notifications ?? [];

// // // // // //       console.log('🔔 Extracted notifications:', list);   // ✅ DEBUG

// // // // // //       if (isMounted.current) {
// // // // // //         setNotifications(list);
// // // // // //         setTotalCount(payload?.totalNotifications ?? list.length);
// // // // // //         setUnreadCount(payload?.unreadNotifications ?? list.filter(n => !n.read).length);
// // // // // //         setError('');
// // // // // //       }
// // // // // //     } catch (err) {
// // // // // //       console.error('🔔 Failed to fetch notifications:', err);
// // // // // //       if (isMounted.current) {
// // // // // //         setError(err.response?.data?.message || err.message || 'Failed to load notifications');
// // // // // //       }
// // // // // //     } finally {
// // // // // //       if (isMounted.current) setLoading(false);
// // // // // //     }
// // // // // //   }, []);

// // // // // //   useEffect(() => {
// // // // // //     fetchNotifications();
// // // // // //     intervalRef.current = setInterval(fetchNotifications, 30_000);
// // // // // //     return () => {
// // // // // //       isMounted.current = false;
// // // // // //       clearInterval(intervalRef.current);
// // // // // //     };
// // // // // //   }, [fetchNotifications]);

// // // // // //   const markOneRead = async (id) => {
// // // // // //     try {
// // // // // //       await markNotificationRead(id);
// // // // // //       setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
// // // // // //       setUnreadCount(prev => Math.max(0, prev - 1));
// // // // // //     } catch (err) {
// // // // // //       setError(err.response?.data?.message || 'Could not mark as read');
// // // // // //     }
// // // // // //   };

// // // // // //   const markAllRead = async () => {
// // // // // //     try {
// // // // // //       await markAllNotificationsRead();
// // // // // //       setNotifications(prev => prev.map(n => ({ ...n, read: true })));
// // // // // //       setUnreadCount(0);
// // // // // //     } catch (err) {
// // // // // //       setError(err.response?.data?.message || 'Could not mark all as read');
// // // // // //     }
// // // // // //   };

// // // // // //   const removeNotification = async (id) => {
// // // // // //     try {
// // // // // //       await deleteNotification(id);
// // // // // //       const removed = notifications.find(n => n.id === id);
// // // // // //       setNotifications(prev => prev.filter(n => n.id !== id));
// // // // // //       if (removed && !removed.read) setUnreadCount(prev => Math.max(0, prev - 1));
// // // // // //       setTotalCount(prev => prev - 1);
// // // // // //     } catch (err) {
// // // // // //       setError(err.response?.data?.message || 'Could not delete notification');
// // // // // //     }
// // // // // //   };

// // // // // //   const value = {
// // // // // //     notifications,
// // // // // //     unreadCount,
// // // // // //     totalCount,
// // // // // //     loading,
// // // // // //     error,
// // // // // //     refresh: fetchNotifications,
// // // // // //     markOneRead,
// // // // // //     markAllRead,
// // // // // //     removeNotification,
// // // // // //   };

// // // // // //   return (
// // // // // //     <NotificationContext.Provider value={value}>
// // // // // //       {children}
// // // // // //     </NotificationContext.Provider>
// // // // // //   );
// // // // // // }

// // // // // // export function useNotifications() {
// // // // // //   const context = useContext(NotificationContext);
// // // // // //   if (!context) {
// // // // // //     throw new Error('useNotifications must be used within a NotificationProvider');
// // // // // //   }
// // // // // //   return context;
// // // // // // }

// // // // // import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
// // // // // import { getNotifications, markNotificationRead, markAllNotificationsRead, deleteNotification } from '../api/items';

// // // // // const NotificationContext = createContext(undefined);

// // // // // // 🔊 Web Audio API beep – works across all modern browsers
// // // // // let audioCtx = null;
// // // // // function playNotificationSound() {
// // // // //   try {
// // // // //     if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
// // // // //     const osc = audioCtx.createOscillator();
// // // // //     const gain = audioCtx.createGain();
// // // // //     osc.connect(gain);
// // // // //     gain.connect(audioCtx.destination);
// // // // //     osc.type = 'sine';
// // // // //     osc.frequency.setValueAtTime(800, audioCtx.currentTime);
// // // // //     gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
// // // // //     osc.start();
// // // // //     osc.stop(audioCtx.currentTime + 0.15);
// // // // //   } catch (_) { /* user hasn’t interacted yet – no sound */ }
// // // // // }

// // // // // export function NotificationProvider({ children }) {
// // // // //   const [notifications, setNotifications] = useState([]);
// // // // //   const [unreadCount, setUnreadCount] = useState(0);
// // // // //   const [totalCount, setTotalCount] = useState(0);
// // // // //   const [loading, setLoading] = useState(true);
// // // // //   const [error, setError] = useState('');

// // // // //   const isMounted = useRef(true);
// // // // //   const intervalRef = useRef(null);
// // // // //   const prevUnreadRef = useRef(0);

// // // // //   const fetchNotifications = useCallback(async () => {
// // // // //     try {
// // // // //       const res = await getNotifications();
// // // // //       const body = res?.data ?? res;
// // // // //       const payload = body?.data ?? body;          // unwrap GenericRestResponse
// // // // //       const list = payload?.notifications ?? [];
// // // // //       const newTotal = payload?.totalNotifications ?? list.length;
// // // // //       const newUnread = payload?.unreadNotifications ?? list.filter(n => !n.read).length;

// // // // //       if (isMounted.current) {
// // // // //         setNotifications(list);
// // // // //         setTotalCount(newTotal);
// // // // //         setUnreadCount(newUnread);
// // // // //         setError('');

// // // // //         if (newUnread > prevUnreadRef.current) playNotificationSound();
// // // // //         prevUnreadRef.current = newUnread;
// // // // //       }
// // // // //     } catch (err) {
// // // // //       if (isMounted.current) {
// // // // //         setError(err.response?.data?.message || err.message || 'Failed to load notifications');
// // // // //       }
// // // // //     } finally {
// // // // //       if (isMounted.current) setLoading(false);
// // // // //     }
// // // // //   }, []);

// // // // //   useEffect(() => {
// // // // //     fetchNotifications();
// // // // //     intervalRef.current = setInterval(fetchNotifications, 30_000); // 30 seconds
// // // // //     return () => {
// // // // //       isMounted.current = false;
// // // // //       clearInterval(intervalRef.current);
// // // // //     };
// // // // //   }, [fetchNotifications]);

// // // // //   const markOneRead = async (id) => {
// // // // //     try {
// // // // //       await markNotificationRead(id);
// // // // //       setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
// // // // //       setUnreadCount(prev => Math.max(0, prev - 1));
// // // // //     } catch (err) {
// // // // //       setError(err.response?.data?.message || 'Could not mark as read');
// // // // //     }
// // // // //   };

// // // // //   const markAllRead = async () => {
// // // // //     try {
// // // // //       await markAllNotificationsRead();
// // // // //       setNotifications(prev => prev.map(n => ({ ...n, read: true })));
// // // // //       setUnreadCount(0);
// // // // //     } catch (err) {
// // // // //       setError(err.response?.data?.message || 'Could not mark all as read');
// // // // //     }
// // // // //   };

// // // // //   const removeNotification = async (id) => {
// // // // //     try {
// // // // //       await deleteNotification(id);
// // // // //       const removed = notifications.find(n => n.id === id);
// // // // //       setNotifications(prev => prev.filter(n => n.id !== id));
// // // // //       if (removed && !removed.read) setUnreadCount(prev => Math.max(0, prev - 1));
// // // // //       setTotalCount(prev => prev - 1);
// // // // //     } catch (err) {
// // // // //       setError(err.response?.data?.message || 'Could not delete notification');
// // // // //     }
// // // // //   };

// // // // //   const value = {
// // // // //     notifications,
// // // // //     unreadCount,
// // // // //     totalCount,
// // // // //     loading,
// // // // //     error,
// // // // //     refresh: fetchNotifications,
// // // // //     markOneRead,
// // // // //     markAllRead,
// // // // //     removeNotification,
// // // // //   };

// // // // //   return (
// // // // //     <NotificationContext.Provider value={value}>
// // // // //       {children}
// // // // //     </NotificationContext.Provider>
// // // // //   );
// // // // // }

// // // // // export function useNotifications() {
// // // // //   const context = useContext(NotificationContext);
// // // // //   if (!context) throw new Error('useNotifications must be used within a NotificationProvider');
// // // // //   return context;
// // // // // }

// // // // import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
// // // // import { getNotifications, markNotificationRead, markAllNotificationsRead, deleteNotification } from '../api/items';

// // // // const NotificationContext = createContext(undefined);

// // // // // 🔊 Web Audio API beep – works across all modern browsers
// // // // let audioCtx = null;
// // // // function playNotificationSound() {
// // // //   try {
// // // //     if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
// // // //     const osc = audioCtx.createOscillator();
// // // //     const gain = audioCtx.createGain();
// // // //     osc.connect(gain);
// // // //     gain.connect(audioCtx.destination);
// // // //     osc.type = 'sine';
// // // //     osc.frequency.setValueAtTime(800, audioCtx.currentTime);
// // // //     gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
// // // //     osc.start();
// // // //     osc.stop(audioCtx.currentTime + 0.15);
// // // //   } catch (_) { /* user hasn’t interacted yet – no sound */ }
// // // // }

// // // // export function NotificationProvider({ children }) {
// // // //   const [notifications, setNotifications] = useState([]);
// // // //   const [unreadCount, setUnreadCount] = useState(0);
// // // //   const [totalCount, setTotalCount] = useState(0);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [error, setError] = useState('');

// // // //   const isMounted = useRef(true);
// // // //   const intervalRef = useRef(null);
// // // //   const prevUnreadRef = useRef(0);

// // // //   const fetchNotifications = useCallback(async () => {
// // // //     try {
// // // //       const res = await getNotifications();
// // // //       const body = res?.data ?? res;
// // // //       const payload = body?.data ?? body;          // unwrap GenericRestResponse
// // // //       const list = payload?.notifications ?? [];
// // // //       const newTotal = payload?.totalNotifications ?? list.length;
// // // //       const newUnread = payload?.unreadNotifications ?? list.filter(n => !n.read).length;

// // // //       if (isMounted.current) {
// // // //         setNotifications(list);
// // // //         setTotalCount(newTotal);
// // // //         setUnreadCount(newUnread);
// // // //         setError('');

// // // //         if (newUnread > prevUnreadRef.current) playNotificationSound();
// // // //         prevUnreadRef.current = newUnread;
// // // //       }
// // // //     } catch (err) {
// // // //       if (isMounted.current) {
// // // //         setError(err.response?.data?.message || err.message || 'Failed to load notifications');
// // // //       }
// // // //     } finally {
// // // //       if (isMounted.current) setLoading(false);
// // // //     }
// // // //   }, []);

// // // //   useEffect(() => {
// // // //     fetchNotifications();
// // // //     intervalRef.current = setInterval(fetchNotifications, 30_000); // 30 seconds
// // // //     return () => {
// // // //       isMounted.current = false;
// // // //       clearInterval(intervalRef.current);
// // // //     };
// // // //   }, [fetchNotifications]);

// // // //   const markOneRead = async (id) => {
// // // //     try {
// // // //       await markNotificationRead(id);
// // // //       setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
// // // //       setUnreadCount(prev => Math.max(0, prev - 1));
// // // //     } catch (err) {
// // // //       setError(err.response?.data?.message || 'Could not mark as read');
// // // //     }
// // // //   };

// // // //   const markAllRead = async () => {
// // // //     try {
// // // //       await markAllNotificationsRead();
// // // //       setNotifications(prev => prev.map(n => ({ ...n, read: true })));
// // // //       setUnreadCount(0);
// // // //     } catch (err) {
// // // //       setError(err.response?.data?.message || 'Could not mark all as read');
// // // //     }
// // // //   };

// // // //   const removeNotification = async (id) => {
// // // //     try {
// // // //       await deleteNotification(id);
// // // //       const removed = notifications.find(n => n.id === id);
// // // //       setNotifications(prev => prev.filter(n => n.id !== id));
// // // //       if (removed && !removed.read) setUnreadCount(prev => Math.max(0, prev - 1));
// // // //       setTotalCount(prev => prev - 1);
// // // //     } catch (err) {
// // // //       setError(err.response?.data?.message || 'Could not delete notification');
// // // //     }
// // // //   };

// // // //   const value = {
// // // //     notifications,
// // // //     unreadCount,
// // // //     totalCount,
// // // //     loading,
// // // //     error,
// // // //     refresh: fetchNotifications,
// // // //     markOneRead,
// // // //     markAllRead,
// // // //     removeNotification,
// // // //   };

// // // //   return (
// // // //     <NotificationContext.Provider value={value}>
// // // //       {children}
// // // //     </NotificationContext.Provider>
// // // //   );
// // // // }

// // // // export function useNotifications() {
// // // //   const context = useContext(NotificationContext);
// // // //   if (!context) throw new Error('useNotifications must be used within a NotificationProvider');
// // // //   return context;
// // // // }

// // // import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
// // // import { getNotifications, markNotificationRead, markAllNotificationsRead, deleteNotification } from '../api/items';
// // // import { useAuth } from './AuthContext';     // ✅ to check authentication state

// // // const NotificationContext = createContext(undefined);

// // // // 🔊 Simple audio beep (no library needed)
// // // let audioCtx = null;
// // // function playNotificationSound() {
// // //   try {
// // //     if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
// // //     const osc = audioCtx.createOscillator();
// // //     const gain = audioCtx.createGain();
// // //     osc.connect(gain);
// // //     gain.connect(audioCtx.destination);
// // //     osc.type = 'sine';
// // //     osc.frequency.setValueAtTime(800, audioCtx.currentTime);
// // //     gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
// // //     osc.start();
// // //     osc.stop(audioCtx.currentTime + 0.15);
// // //   } catch (_) { /* user hasn’t interacted yet */ }
// // // }

// // // export function NotificationProvider({ children }) {
// // //   const { isAuthenticated } = useAuth();             // ✅ read auth state
// // //   const [notifications, setNotifications] = useState([]);
// // //   const [unreadCount, setUnreadCount] = useState(0);
// // //   const [totalCount, setTotalCount] = useState(0);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState('');

// // //   const isMounted = useRef(true);
// // //   const intervalRef = useRef(null);
// // //   const prevUnreadRef = useRef(0);

// // //   const fetchNotifications = useCallback(async () => {
// // //     if (!isAuthenticated) return;                    // ✅ don’t fetch if not logged in
// // //     try {
// // //       const res = await getNotifications();
// // //       const body = res?.data ?? res;
// // //       const payload = body?.data ?? body;
// // //       const list = payload?.notifications ?? [];
// // //       const newTotal = payload?.totalNotifications ?? list.length;
// // //       const newUnread = payload?.unreadNotifications ?? list.filter(n => !n.read).length;

// // //       if (isMounted.current) {
// // //         setNotifications(list);
// // //         setTotalCount(newTotal);
// // //         setUnreadCount(newUnread);
// // //         setError('');

// // //         if (newUnread > prevUnreadRef.current) playNotificationSound();
// // //         prevUnreadRef.current = newUnread;
// // //       }
// // //     } catch (err) {
// // //       if (isMounted.current) {
// // //         setError(err.response?.data?.message || err.message || 'Failed to load notifications');
// // //       }
// // //     } finally {
// // //       if (isMounted.current) setLoading(false);
// // //     }
// // //   }, [isAuthenticated]);                             // ✅ dependency on auth

// // //   // Start / stop polling based on authentication
// // //   useEffect(() => {
// // //     if (!isAuthenticated) {
// // //       // Clear everything when user logs out
// // //       setNotifications([]);
// // //       setUnreadCount(0);
// // //       setTotalCount(0);
// // //       setLoading(true);
// // //       prevUnreadRef.current = 0;
// // //       return;
// // //     }

// // //     fetchNotifications();
// // //     intervalRef.current = setInterval(fetchNotifications, 30_000);  // every 30s

// // //     return () => {
// // //       isMounted.current = false;
// // //       clearInterval(intervalRef.current);
// // //     };
// // //   }, [isAuthenticated, fetchNotifications]);

// // //   const markOneRead = async (id) => {
// // //     try {
// // //       await markNotificationRead(id);
// // //       setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
// // //       setUnreadCount(prev => Math.max(0, prev - 1));
// // //     } catch (err) {
// // //       setError(err.response?.data?.message || 'Could not mark as read');
// // //     }
// // //   };

// // //   const markAllRead = async () => {
// // //     try {
// // //       await markAllNotificationsRead();
// // //       setNotifications(prev => prev.map(n => ({ ...n, read: true })));
// // //       setUnreadCount(0);
// // //     } catch (err) {
// // //       setError(err.response?.data?.message || 'Could not mark all as read');
// // //     }
// // //   };

// // //   const removeNotification = async (id) => {
// // //     try {
// // //       await deleteNotification(id);
// // //       const removed = notifications.find(n => n.id === id);
// // //       setNotifications(prev => prev.filter(n => n.id !== id));
// // //       if (removed && !removed.read) setUnreadCount(prev => Math.max(0, prev - 1));
// // //       setTotalCount(prev => prev - 1);
// // //     } catch (err) {
// // //       setError(err.response?.data?.message || 'Could not delete notification');
// // //     }
// // //   };

// // //   const value = {
// // //     notifications,
// // //     unreadCount,
// // //     totalCount,
// // //     loading,
// // //     error,
// // //     refresh: fetchNotifications,
// // //     markOneRead,
// // //     markAllRead,
// // //     removeNotification,
// // //   };

// // //   return (
// // //     <NotificationContext.Provider value={value}>
// // //       {children}
// // //     </NotificationContext.Provider>
// // //   );
// // // }

// // // export function useNotifications() {
// // //   const context = useContext(NotificationContext);
// // //   if (!context) throw new Error('useNotifications must be used within a NotificationProvider');
// // //   return context;
// // // }

// // import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
// // import { getNotifications, markNotificationRead, markAllNotificationsRead, deleteNotification } from '../api/items';
// // import { useAuth } from './AuthContext';
// // import { showToast } from '../api/client';   // ✅ visual toast

// // const NotificationContext = createContext(undefined);

// // // 🔊 Audio beep
// // let audioCtx = null;
// // function playNotificationSound() {
// //   try {
// //     if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
// //     const osc = audioCtx.createOscillator();
// //     const gain = audioCtx.createGain();
// //     osc.connect(gain);
// //     gain.connect(audioCtx.destination);
// //     osc.type = 'sine';
// //     osc.frequency.setValueAtTime(800, audioCtx.currentTime);
// //     gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
// //     osc.start();
// //     osc.stop(audioCtx.currentTime + 0.15);
// //   } catch (_) {}
// // }

// // export function NotificationProvider({ children }) {
// //   const { isAuthenticated } = useAuth();
// //   const [notifications, setNotifications] = useState([]);
// //   const [unreadCount, setUnreadCount] = useState(0);
// //   const [totalCount, setTotalCount] = useState(0);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState('');

// //   const isMounted = useRef(true);
// //   const intervalRef = useRef(null);
// //   const prevUnreadRef = useRef(0);
// //   const lastToastIdRef = useRef(null);

// //   const fetchNotifications = useCallback(async () => {
// //     if (!isAuthenticated) return;
// //     try {
// //       const res = await getNotifications();
// //       console.log('🔔 Raw response:', res);   // keep for debugging, remove later

// //       // Try several unwrapping strategies
// //       let payload = res?.data?.data ?? res?.data ?? res;
// //       // Sometimes the whole object is the payload itself (no outer 'data')
// //       if (!payload?.notifications && Array.isArray(payload?.notifications)) {
// //         // already correct
// //       } else if (!payload?.notifications && res?.data?.notifications) {
// //         payload = res.data;
// //       }

// //       const list = payload?.notifications ?? [];
// //       const newTotal = payload?.totalNotifications ?? list.length;
// //       const newUnread = payload?.unreadNotifications ?? list.filter(n => !n.read).length;

// //       if (isMounted.current) {
// //         setNotifications(list);
// //         setTotalCount(newTotal);
// //         setUnreadCount(newUnread);
// //         setError('');

// //         if (newUnread > prevUnreadRef.current) {
// //           playNotificationSound();
// //           if (list.length > 0) {
// //             const newest = list[0];
// //             if (newest.id !== lastToastIdRef.current) {
// //               lastToastIdRef.current = newest.id;
// //               showToast({
// //                 type: 'info',
// //                 title: newest.title || 'New notification',
// //                 message: newest.message || '',
// //                 duration: 5000,
// //               });
// //             }
// //           }
// //         }
// //         prevUnreadRef.current = newUnread;
// //       }
// //     } catch (err) {
// //       if (isMounted.current) {
// //         setError(err.response?.data?.message || err.message || 'Failed to load notifications');
// //       }
// //     } finally {
// //       if (isMounted.current) setLoading(false);
// //     }
// //   }, [isAuthenticated]);

// //   useEffect(() => {
// //     if (!isAuthenticated) {
// //       setNotifications([]);
// //       setUnreadCount(0);
// //       setTotalCount(0);
// //       setLoading(true);
// //       prevUnreadRef.current = 0;
// //       lastToastIdRef.current = null;
// //       return;
// //     }

// //     fetchNotifications();
// //     intervalRef.current = setInterval(fetchNotifications, 30_000);
// //     return () => {
// //       isMounted.current = false;
// //       clearInterval(intervalRef.current);
// //     };
// //   }, [isAuthenticated, fetchNotifications]);

// //   const markOneRead = async (id) => {
// //     try {
// //       await markNotificationRead(id);
// //       setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
// //       setUnreadCount(prev => Math.max(0, prev - 1));
// //     } catch (err) {
// //       setError(err.response?.data?.message || 'Could not mark as read');
// //     }
// //   };

// //   const markAllRead = async () => {
// //     try {
// //       await markAllNotificationsRead();
// //       setNotifications(prev => prev.map(n => ({ ...n, read: true })));
// //       setUnreadCount(0);
// //     } catch (err) {
// //       setError(err.response?.data?.message || 'Could not mark all as read');
// //     }
// //   };

// //   const removeNotification = async (id) => {
// //     try {
// //       await deleteNotification(id);
// //       const removed = notifications.find(n => n.id === id);
// //       setNotifications(prev => prev.filter(n => n.id !== id));
// //       if (removed && !removed.read) setUnreadCount(prev => Math.max(0, prev - 1));
// //       setTotalCount(prev => prev - 1);
// //     } catch (err) {
// //       setError(err.response?.data?.message || 'Could not delete notification');
// //     }
// //   };

// //   const value = {
// //     notifications,
// //     unreadCount,
// //     totalCount,
// //     loading,
// //     error,
// //     refresh: fetchNotifications,
// //     markOneRead,
// //     markAllRead,
// //     removeNotification,
// //   };

// //   return (
// //     <NotificationContext.Provider value={value}>
// //       {children}
// //     </NotificationContext.Provider>
// //   );
// // }

// // export function useNotifications() {
// //   const context = useContext(NotificationContext);
// //   if (!context) throw new Error('useNotifications must be used within a NotificationProvider');
// //   return context;
// // }

// import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
// import { getNotifications, markNotificationRead, markAllNotificationsRead, deleteNotification } from '../api/items';
// import { useAuth } from './AuthContext';
// import { showToast } from '../api/client';   // ✅ visual toast

// const NotificationContext = createContext(undefined);

// // 🔊 Audio beep
// let audioCtx = null;
// function playNotificationSound() {
//   try {
//     if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
//     const osc = audioCtx.createOscillator();
//     const gain = audioCtx.createGain();
//     osc.connect(gain);
//     gain.connect(audioCtx.destination);
//     osc.type = 'sine';
//     osc.frequency.setValueAtTime(800, audioCtx.currentTime);
//     gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
//     osc.start();
//     osc.stop(audioCtx.currentTime + 0.15);
//   } catch (_) {}
// }

// export function NotificationProvider({ children }) {
//   const { isAuthenticated } = useAuth();
//   const [notifications, setNotifications] = useState([]);
//   const [unreadCount, setUnreadCount] = useState(0);
//   const [totalCount, setTotalCount] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   const isMounted = useRef(true);
//   const intervalRef = useRef(null);
//   const prevUnreadRef = useRef(0);
//   const lastToastIdRef = useRef(null);

//   const fetchNotifications = useCallback(async () => {
//     if (!isAuthenticated) return;
//     try {
//       const res = await getNotifications();
//       console.log('🔔 Raw response:', res);   // keep for debugging, remove later

//       // Try several unwrapping strategies
//       let payload = res?.data?.data ?? res?.data ?? res;
//       // Sometimes the whole object is the payload itself (no outer 'data')
//       if (!payload?.notifications && Array.isArray(payload?.notifications)) {
//         // already correct
//       } else if (!payload?.notifications && res?.data?.notifications) {
//         payload = res.data;
//       }

//       const list = payload?.notifications ?? [];
//       const newTotal = payload?.totalNotifications ?? list.length;
//       const newUnread = payload?.unreadNotifications ?? list.filter(n => !n.read).length;

//       if (isMounted.current) {
//         setNotifications(list);
//         setTotalCount(newTotal);
//         setUnreadCount(newUnread);
//         setError('');

//         if (newUnread > prevUnreadRef.current) {
//           playNotificationSound();
//           if (list.length > 0) {
//             const newest = list[0];
//             if (newest.id !== lastToastIdRef.current) {
//               lastToastIdRef.current = newest.id;
//               showToast({
//                 type: 'info',
//                 title: newest.title || 'New notification',
//                 message: newest.message || '',
//                 duration: 5000,
//               });
//             }
//           }
//         }
//         prevUnreadRef.current = newUnread;
//       }
//     } catch (err) {
//       if (isMounted.current) {
//         setError(err.response?.data?.message || err.message || 'Failed to load notifications');
//       }
//     } finally {
//       if (isMounted.current) setLoading(false);
//     }
//   }, [isAuthenticated]);

//   useEffect(() => {
//     if (!isAuthenticated) {
//       setNotifications([]);
//       setUnreadCount(0);
//       setTotalCount(0);
//       setLoading(true);
//       prevUnreadRef.current = 0;
//       lastToastIdRef.current = null;
//       return;
//     }

//     fetchNotifications();
//     intervalRef.current = setInterval(fetchNotifications, 30_000);
//     return () => {
//       isMounted.current = false;
//       clearInterval(intervalRef.current);
//     };
//   }, [isAuthenticated, fetchNotifications]);

//   const markOneRead = async (id) => {
//     try {
//       await markNotificationRead(id);
//       setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
//       setUnreadCount(prev => Math.max(0, prev - 1));
//     } catch (err) {
//       setError(err.response?.data?.message || 'Could not mark as read');
//     }
//   };

//   const markAllRead = async () => {
//     try {
//       await markAllNotificationsRead();
//       setNotifications(prev => prev.map(n => ({ ...n, read: true })));
//       setUnreadCount(0);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Could not mark all as read');
//     }
//   };

//   const removeNotification = async (id) => {
//     try {
//       await deleteNotification(id);
//       const removed = notifications.find(n => n.id === id);
//       setNotifications(prev => prev.filter(n => n.id !== id));
//       if (removed && !removed.read) setUnreadCount(prev => Math.max(0, prev - 1));
//       setTotalCount(prev => prev - 1);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Could not delete notification');
//     }
//   };

//   const value = {
//     notifications,
//     unreadCount,
//     totalCount,
//     loading,
//     error,
//     refresh: fetchNotifications,
//     markOneRead,
//     markAllRead,
//     removeNotification,
//   };

//   return (
//     <NotificationContext.Provider value={value}>
//       {children}
//     </NotificationContext.Provider>
//   );
// }

// export function useNotifications() {
//   const context = useContext(NotificationContext);
//   if (!context) throw new Error('useNotifications must be used within a NotificationProvider');
//   return context;
// }

import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { getNotifications, markNotificationRead, markAllNotificationsRead, deleteNotification } from '../api/items';
import { useAuth } from './AuthContext';
import { showToast } from '../api/client';

const NotificationContext = createContext(undefined);

// 🔊 Audio beep – will only play after first user gesture
let audioCtx = null;
function playNotificationSound() {
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    // Resume if suspended (Chrome autoplay policy)
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.15);
  } catch (_) {}
}

export function NotificationProvider({ children }) {
  const { isAuthenticated } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount,   setUnreadCount]   = useState(0);
  const [totalCount,    setTotalCount]    = useState(0);
  const [loading,       setLoading]       = useState(true);
  const [error,         setError]         = useState('');

  const isMounted       = useRef(true);
  const intervalRef     = useRef(null);
  const prevUnreadRef   = useRef(0);
  const lastToastIdRef  = useRef(null);

  const fetchNotifications = useCallback(async () => {
    if (!isAuthenticated) return;
    try {
      const res   = await getNotifications();
      const body  = res?.data ?? res;
      // Unwrap: backend wraps in GenericRestResponseNotificationListResponse
      const payload = body?.data ?? body;
      const list = payload?.notifications ?? [];
      const newTotal = payload?.totalNotifications ?? list.length;
      const newUnread = payload?.unreadNotifications ?? list.filter(n => !n.read).length;

      if (isMounted.current) {
        setNotifications(list);
        setTotalCount(newTotal);
        setUnreadCount(newUnread);
        setError('');

        // Sound & toast
        if (newUnread > prevUnreadRef.current) {
          playNotificationSound();
          if (list.length > 0) {
            const newest = list[0];
            if (newest.id !== lastToastIdRef.current) {
              lastToastIdRef.current = newest.id;
              showToast({
                type: 'info',
                title: newest.title || 'New notification',
                message: newest.message || '',
                duration: 5000,
              });
            }
          }
        }
        prevUnreadRef.current = newUnread;
      }
    } catch (err) {
      if (isMounted.current) {
        setError(err.response?.data?.message || err.message || 'Failed to load notifications');
      }
    } finally {
      if (isMounted.current) setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) {
      setNotifications([]);
      setUnreadCount(0);
      setTotalCount(0);
      setLoading(true);
      prevUnreadRef.current = 0;
      lastToastIdRef.current = null;
      return;
    }

    fetchNotifications();
    intervalRef.current = setInterval(fetchNotifications, 30_000);
    return () => {
      isMounted.current = false;
      clearInterval(intervalRef.current);
    };
  }, [isAuthenticated, fetchNotifications]);

  const markOneRead = async (id) => {
    try {
      await markNotificationRead(id);
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (err) {
      setError(err.response?.data?.message || 'Could not mark as read');
    }
  };

  const markAllRead = async () => {
    try {
      await markAllNotificationsRead();
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      setUnreadCount(0);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not mark all as read');
    }
  };

  const removeNotification = async (id) => {
    try {
      await deleteNotification(id);
      const removed = notifications.find(n => n.id === id);
      setNotifications(prev => prev.filter(n => n.id !== id));
      if (removed && !removed.read) setUnreadCount(prev => Math.max(0, prev - 1));
      setTotalCount(prev => prev - 1);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not delete notification');
    }
  };

  const value = {
    notifications,
    unreadCount,
    totalCount,
    loading,
    error,
    refresh: fetchNotifications,
    markOneRead,
    markAllRead,
    removeNotification,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) throw new Error('useNotifications must be used within a NotificationProvider');
  return context;
}