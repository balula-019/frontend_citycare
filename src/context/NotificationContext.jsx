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