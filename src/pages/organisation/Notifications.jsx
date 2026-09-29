import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  AlertTriangle,
  Bell,
  BellOff,
  BellRing,
  CheckCheck,
  Clock,
  Info,
  Loader2,
  MapPin,
  Navigation,
  RefreshCw,
} from 'lucide-react';
import {
  getNotificationsPage,
  markAllNotificationsRead,
  markNotificationRead,
} from '../../api/notifications';
import { isPushSupported, registerPushNotifications } from '../../utils/push';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';

const PAGE_SIZE = 20;

const TYPE_STYLES = {
  URBAN_PROBLEM_ASSIGNED: { icon: MapPin, className: 'bg-primary-soft text-primary' },
  SYSTEM_NOTIFICATION: { icon: Info, className: 'bg-info/15 text-info' },
};

const FALLBACK_STYLE = { icon: Bell, className: 'bg-surface text-muted' };

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  day: 'numeric',
  month: 'short',
  hour: '2-digit',
  minute: '2-digit',
});

const formatDate = (value) => {
  if (!value) return '';

  const parsed = new Date(value);

  return Number.isNaN(parsed.getTime()) ? '' : dateFormatter.format(parsed);
};

export default function Notifications() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { refresh: refreshBadge } = useNotifications();

  const [notifications, setNotifications] = useState([]);
  const [page, setPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({ totalPages: 1, totalElements: 0, last: true });
  const [unreadOnly, setUnreadOnly] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [reloadKey, setReloadKey] = useState(0);
  const [busyId, setBusyId] = useState(null);

  /*
    Browsers only allow the permission prompt from a real click, which is why
    this is a button here rather than something that happens on load.
  */
  const [pushPermission, setPushPermission] = useState(() =>
    isPushSupported() ? Notification.permission : 'unsupported',
  );
  const [enablingPush, setEnablingPush] = useState(false);

  const isOrganisation = user?.user_type === 'ORGANISATION';

  const enablePush = async () => {
    setEnablingPush(true);

    try {
      const permission = await Notification.requestPermission();

      setPushPermission(permission);

      if (permission === 'granted') await registerPushNotifications();
    } catch {
      setPushPermission('denied');
    } finally {
      setEnablingPush(false);
    }
  };

  useEffect(() => {
    let active = true;

    (async () => {
      try {
        const response = await getNotificationsPage({
          unreadOnly,
          page,
          size: PAGE_SIZE,
        });

        if (!active) return;

        const payload = response?.data || {};

        setNotifications(payload.content || []);
        setPageInfo({
          totalPages: payload.totalPages ?? 1,
          totalElements: payload.totalElements ?? 0,
          last: payload.last ?? true,
        });
        setError('');
      } catch (requestError) {
        if (!active) return;

        setNotifications([]);
        setError(
          requestError?.message ||
            t('cc.notifications.loadFailed', 'Your notifications could not be loaded.'),
        );
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, [unreadOnly, page, reloadKey, t]);

  const refresh = useCallback(() => {
    setLoading(true);
    setReloadKey((key) => key + 1);
  }, []);

  const toggleUnreadOnly = () => {
    setLoading(true);
    setPage(1);
    setUnreadOnly((current) => !current);
  };

  const goToPage = (next) => {
    setLoading(true);
    setPage(next);
  };

  /* Opening a notification is what marks it read — then go where it points. */
  const open = async (notification) => {
    setBusyId(notification.id);

    try {
      if (!notification.read) {
        await markNotificationRead(notification.id);

        setNotifications((current) =>
          current.map((item) =>
            item.id === notification.id ? { ...item, read: true } : item,
          ),
        );

        refreshBadge();
      }
    } catch {
      /* Reading it is not worth blocking the navigation for. */
    } finally {
      setBusyId(null);
    }

    if (!notification.urbanProblemReportId) return;

    navigate(
      isOrganisation
        ? '/org/map'
        : `/owner/reports/${notification.urbanProblemReportId}`,
    );
  };

  const markEverything = async () => {
    try {
      await markAllNotificationsRead();

      setNotifications((current) => current.map((item) => ({ ...item, read: true })));

      refreshBadge();
    } catch (requestError) {
      setError(
        requestError?.message ||
          t('cc.notifications.markAllFailed', 'They could not all be marked as read.'),
      );
    }
  };

  return (
    <div className="mx-auto max-w-3xl p-4 sm:p-6 lg:p-8">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-dark">
            {t('cc.notifications.title', 'Updates')}
          </h1>
          <p className="mt-1.5 text-sm text-muted">
            {isOrganisation
              ? t(
                  'cc.notifications.subtitleOrg',
                  'Residents reporting problems your organisation is responsible for.',
                )
              : t(
                  'cc.notifications.subtitleOwner',
                  'What happened to the problems you reported.',
                )}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleUnreadOnly}
            className={`flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-bold transition-colors ${
              unreadOnly
                ? 'border-primary bg-primary-tint text-primary'
                : 'border-border text-muted hover:bg-surface'
            }`}
          >
            <BellOff size={14} />
            {t('cc.notifications.unreadOnly', 'Unread only')}
          </button>

          <button
            onClick={markEverything}
            className="flex items-center gap-1.5 rounded-xl border border-border px-3 py-2 text-xs font-bold text-muted transition-colors hover:bg-surface hover:text-primary"
          >
            <CheckCheck size={14} />
            {t('cc.notifications.markAll', 'Mark all read')}
          </button>

          <button
            onClick={refresh}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-border text-muted transition-colors hover:bg-surface hover:text-primary"
            title={t('cc.notifications.refresh', 'Refresh')}
          >
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>
      </header>

      {pushPermission === 'default' && (
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-primary/25 bg-primary-tint px-4 py-3.5">
          <p className="flex items-start gap-2 text-sm text-primary-deep">
            <BellRing size={16} className="mt-0.5 shrink-0" />
            {t(
              'cc.notifications.pushPrompt',
              'Get told about new reports even when City Care is closed.',
            )}
          </p>

          <button
            onClick={enablePush}
            disabled={enablingPush}
            className="flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-primary-hover disabled:opacity-60"
          >
            {enablingPush && <Loader2 size={13} className="animate-spin" />}
            {t('cc.notifications.pushEnable', 'Turn on')}
          </button>
        </div>
      )}

      {pushPermission === 'denied' && (
        <p className="mt-6 flex items-start gap-2 rounded-xl bg-surface px-4 py-3 text-xs text-muted">
          <BellOff size={14} className="mt-0.5 shrink-0" />
          {t(
            'cc.notifications.pushBlocked',
            'Your browser is blocking notifications for this site. Allow them in the address bar to be told about new reports while City Care is closed.',
          )}
        </p>
      )}

      {error && (
        <p className="mt-6 flex items-start gap-2 rounded-xl bg-danger/10 px-4 py-3 text-sm text-danger">
          <AlertTriangle size={16} className="mt-0.5 shrink-0" />
          {error}
        </p>
      )}

      {loading && (
        <p className="mt-8 flex items-center gap-2 text-sm text-muted">
          <Loader2 size={15} className="animate-spin" />
          {t('cc.notifications.loading', 'Loading…')}
        </p>
      )}

      {!loading && !error && notifications.length === 0 && (
        <div className="mt-8 rounded-2xl border border-border bg-white px-6 py-14 text-center">
          <Bell size={28} className="mx-auto mb-3 text-border" />
          <p className="text-sm font-semibold text-dark">
            {unreadOnly
              ? t('cc.notifications.emptyUnread', 'Nothing unread')
              : t('cc.notifications.empty', 'No updates yet')}
          </p>
          <p className="mt-1 text-xs text-muted">
            {isOrganisation
              ? t(
                  'cc.notifications.emptyBodyOrg',
                  'You will be told here the moment a resident reports a problem you are responsible for.',
                )
              : t(
                  'cc.notifications.emptyBodyOwner',
                  'Updates on your reports will appear here.',
                )}
          </p>
        </div>
      )}

      {!loading && notifications.length > 0 && (
        <ul className="mt-6 space-y-2.5">
          {notifications.map((notification) => {
            const style = TYPE_STYLES[notification.type] || FALLBACK_STYLE;
            const Icon = style.icon;

            return (
              <li key={notification.id}>
                <button
                  onClick={() => open(notification)}
                  className={`flex w-full items-start gap-3 rounded-2xl border px-4 py-4 text-left transition-colors ${
                    notification.read
                      ? 'border-border bg-white hover:bg-surface'
                      : 'border-primary/25 bg-primary-tint hover:bg-primary-soft'
                  }`}
                >
                  <span
                    className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${style.className}`}
                  >
                    <Icon size={17} />
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2">
                      <span className="truncate text-sm font-bold text-dark">
                        {notification.title}
                      </span>
                      {!notification.read && (
                        <span className="h-2 w-2 shrink-0 rounded-full bg-primary" />
                      )}
                    </span>

                    <span className="mt-1 block text-xs leading-relaxed text-muted">
                      {notification.message}
                    </span>

                    <span className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-muted">
                      {notification.reportReference && (
                        <span className="font-mono">{notification.reportReference}</span>
                      )}
                      {formatDate(notification.createdDate) && (
                        <span className="flex items-center gap-1">
                          <Clock size={10} />
                          {formatDate(notification.createdDate)}
                        </span>
                      )}
                      {notification.urbanProblemReportId && (
                        <span className="flex items-center gap-1 font-bold text-primary">
                          <Navigation size={10} />
                          {isOrganisation
                            ? t('cc.notifications.openMap', 'Open on the map')
                            : t('cc.notifications.openReport', 'Open the report')}
                        </span>
                      )}
                    </span>
                  </span>

                  {busyId === notification.id && (
                    <Loader2 size={14} className="mt-1 shrink-0 animate-spin text-muted" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}

      {!loading && pageInfo.totalPages > 1 && (
        <nav className="mt-6 flex items-center justify-between gap-4">
          <button
            onClick={() => goToPage(page - 1)}
            disabled={page <= 1}
            className="rounded-xl border border-border px-4 py-2 text-xs font-bold text-dark transition-colors hover:bg-surface disabled:opacity-40"
          >
            {t('cc.notifications.previous', 'Previous')}
          </button>

          <span className="text-xs text-muted">
            {t('cc.notifications.pageOf', 'Page {{page}} of {{total}}', {
              page,
              total: pageInfo.totalPages,
            })}
          </span>

          <button
            onClick={() => goToPage(page + 1)}
            disabled={pageInfo.last}
            className="rounded-xl border border-border px-4 py-2 text-xs font-bold text-dark transition-colors hover:bg-surface disabled:opacity-40"
          >
            {t('cc.notifications.next', 'Next')}
          </button>
        </nav>
      )}
    </div>
  );
}
