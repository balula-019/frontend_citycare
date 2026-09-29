import { apiClient } from './client';

const BASE = '/v1/services/notifications';

/**
 * The inbox of the signed-in account, newest first.
 * GET /notifications
 *
 * An organisation account also receives the notifications addressed to the
 * organisation itself, not only to the user row.
 */
export const getNotificationsPage = ({
  unreadOnly = false,
  page = 1,
  size = 20,
} = {}) => {
  const query = new URLSearchParams();

  if (unreadOnly) query.append('unread-only', 'true');
  query.append('page', page);
  query.append('size', size);

  return apiClient(`${BASE}?${query.toString()}`);
};

/**
 * Counts plus the newest unread notifications — what the badge shows and what
 * the browser announces after login.
 * GET /notifications/unread
 */
export const getUnreadNotifications = () => apiClient(`${BASE}/unread`);

/**
 * PUT /notifications/{id}/read
 */
export const markNotificationRead = (notificationId) =>
  apiClient(`${BASE}/${notificationId}/read`, { method: 'PUT' });

/**
 * PUT /notifications/read-all
 */
export const markAllNotificationsRead = () =>
  apiClient(`${BASE}/read-all`, { method: 'PUT' });

/**
 * The VAPID public key this browser must subscribe with, and whether the
 * deployment has push configured at all.
 * GET /notifications/push/key
 */
export const getPushKey = () => apiClient(`${BASE}/push/key`);

/**
 * POST /notifications/push/subscribe
 */
export const subscribeToPush = (subscription) =>
  apiClient(`${BASE}/push/subscribe`, {
    method: 'POST',
    body: JSON.stringify(subscription),
  });

/**
 * DELETE /notifications/push/subscribe
 */
export const unsubscribeFromPush = (endpoint) =>
  apiClient(
    `${BASE}/push/subscribe?endpoint=${encodeURIComponent(endpoint)}`,
    { method: 'DELETE' },
  );
