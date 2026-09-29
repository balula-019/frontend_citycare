import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import {
  getUnreadNotifications,
  markAllNotificationsRead,
  markNotificationRead,
} from '../api/notifications';
import { useAuth } from './AuthContext';
import { showToast } from '../api/client';
import {
  isPushSupported,
  registerPushNotifications,
  unregisterPushNotifications,
} from '../utils/push';

const NotificationContext = createContext(undefined);

const POLL_INTERVAL_MS = 30_000;

/* A short beep, only audible once the user has interacted with the page. */
let audioCtx = null;

function playNotificationSound() {
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
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
  } catch {
    /* Audio is a nicety; never let it break the app. */
  }
}

/*
  Browser notifications.

  Permission can only be requested from a user gesture in some browsers, so the
  request is attempted once and the result cached. When permission is denied the
  in-app toast still fires, so nothing is lost.
*/
const browserNotificationsSupported = () =>
  typeof window !== 'undefined' && 'Notification' in window;

const requestBrowserPermission = async () => {
  if (!browserNotificationsSupported()) return 'unsupported';
  if (Notification.permission !== 'default') return Notification.permission;

  try {
    return await Notification.requestPermission();
  } catch {
    return 'denied';
  }
};

const showBrowserNotification = ({ title, body, tag, onClick }) => {
  if (!browserNotificationsSupported() || Notification.permission !== 'granted') {
    return false;
  }

  try {
    const notification = new Notification(title, {
      body,
      tag,
      icon: '/pata-logo-v2.png',
    });

    notification.onclick = () => {
      window.focus();
      notification.close();
      onClick?.();
    };

    return true;
  } catch {
    return false;
  }
};

export function NotificationProvider({ children }) {
  const { isAuthenticated } = useAuth();

  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const mounted = useRef(true);
  const previousUnread = useRef(0);
  const announcedIds = useRef(new Set());
  const greeted = useRef(false);
  const wasAuthenticated = useRef(false);

  /*
    One summary call feeds the badge, the toast and the browser notification.
    `announce` is false for background polls that should stay quiet.
  */
  const load = useCallback(
    async ({ announce = true } = {}) => {
      try {
        const response = await getUnreadNotifications();
        const payload = response?.data ?? {};
        const unread = payload.notifications ?? [];

        if (!mounted.current) return;

        setNotifications(unread);
        setTotalCount(payload.totalNotifications ?? unread.length);
        setUnreadCount(payload.unreadNotifications ?? unread.length);
        setError('');

        const unreadTotal = payload.unreadNotifications ?? unread.length;
        const newest = unread[0];

        /* First successful load after signing in: say what was missed. */
        if (announce && !greeted.current) {
          greeted.current = true;

          if (unreadTotal > 0) {
            const permission = await requestBrowserPermission();

            if (permission === 'granted') {
              /* Just granted, so also start receiving with the tab closed. */
              void registerPushNotifications();

              showBrowserNotification({
                title:
                  unreadTotal === 1
                    ? 'You have 1 unread notification'
                    : `You have ${unreadTotal} unread notifications`,
                body: newest?.message || newest?.title || '',
                tag: 'city-care-unread-summary',
              });
            }

            showToast({
              type: 'info',
              title:
                unreadTotal === 1
                  ? '1 unread notification'
                  : `${unreadTotal} unread notifications`,
              message: newest?.message || '',
              duration: 6000,
            });
          }
        } else if (announce && unreadTotal > previousUnread.current && newest) {
          /* Something arrived while the tab was open. */
          if (!announcedIds.current.has(newest.id)) {
            announcedIds.current.add(newest.id);

            playNotificationSound();

            showBrowserNotification({
              title: newest.title || 'New notification',
              body: newest.message || '',
              tag: newest.id,
            });

            showToast({
              type: 'info',
              title: newest.title || 'New notification',
              message: newest.message || '',
              duration: 5000,
            });
          }
        }

        previousUnread.current = unreadTotal;
      } catch (requestError) {
        if (!mounted.current) return;

        setError(
          requestError?.message || 'Your notifications could not be loaded.',
        );
      } finally {
        if (mounted.current) setLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    mounted.current = true;

    if (!isAuthenticated) {
      previousUnread.current = 0;
      announcedIds.current = new Set();
      greeted.current = false;

      return () => {
        mounted.current = false;
      };
    }

    void (async () => {
      await load();
    })();

    const interval = setInterval(load, POLL_INTERVAL_MS);

    return () => {
      mounted.current = false;
      clearInterval(interval);
    };
  }, [isAuthenticated, load]);

  /*
    Push keeps working after the tab is closed, so the subscription follows the
    session: registered while signed in with permission already granted, removed
    on sign out so the next person on a shared machine is not told about this
    organisation's reports.
  */
  useEffect(() => {
    if (!isPushSupported()) return;

    if (isAuthenticated) {
      void registerPushNotifications();

      return;
    }

    /* Only a real sign out, not the first load of a public page. */
    if (wasAuthenticated.current) {
      void unregisterPushNotifications();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    wasAuthenticated.current = isAuthenticated;
  }, [isAuthenticated]);

  const markOneRead = async (notificationId) => {
    try {
      await markNotificationRead(notificationId);

      setNotifications((current) =>
        current.filter((notification) => notification.id !== notificationId),
      );
      setUnreadCount((current) => Math.max(0, current - 1));
      previousUnread.current = Math.max(0, previousUnread.current - 1);
    } catch (requestError) {
      setError(requestError?.message || 'That notification could not be marked as read.');
    }
  };

  const markAllRead = async () => {
    try {
      await markAllNotificationsRead();

      setNotifications([]);
      setUnreadCount(0);
      previousUnread.current = 0;
    } catch (requestError) {
      setError(requestError?.message || 'Your notifications could not be marked as read.');
    }
  };

  /*
    Signing out leaves the provider mounted, so what it reports is derived from
    the session rather than cleared in an effect.
  */
  const value = {
    /** The newest unread notifications; the inbox screen pages the full list. */
    notifications: isAuthenticated ? notifications : [],
    unreadCount: isAuthenticated ? unreadCount : 0,
    totalCount: isAuthenticated ? totalCount : 0,
    loading: isAuthenticated && loading,
    error: isAuthenticated ? error : '',
    refresh: () => load({ announce: false }),
    markOneRead,
    markAllRead,
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
