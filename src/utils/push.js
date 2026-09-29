import {
  getPushKey,
  subscribeToPush,
  unsubscribeFromPush,
} from '../api/notifications';

/*
  Registering this browser to be told about new reports while City Care is
  closed.

  Everything here fails quietly: push is a bonus on top of the in-page
  notifications, so a browser without it, a denied permission or a deployment
  with no VAPID key must never break the app.
*/

const SERVICE_WORKER_PATH = '/sw.js';

export const isPushSupported = () =>
  typeof window !== 'undefined' &&
  'serviceWorker' in navigator &&
  'PushManager' in window &&
  'Notification' in window;

/** The VAPID key travels as base64url but subscribe() wants raw bytes. */
const toUint8Array = (base64Url) => {
  const padded = base64Url.padEnd(
    base64Url.length + ((4 - (base64Url.length % 4)) % 4),
    '=',
  );

  const binary = window.atob(padded.replace(/-/g, '+').replace(/_/g, '/'));

  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
};

const toBase64Url = (buffer) =>
  window
    .btoa(String.fromCharCode(...new Uint8Array(buffer)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

/**
 * Subscribes this browser and hands the keys to the backend. Returns true only
 * when the backend accepted it.
 */
export const registerPushNotifications = async () => {
  if (!isPushSupported() || Notification.permission !== 'granted') return false;

  try {
    const key = (await getPushKey())?.data;

    /* Nothing to do when the deployment has no VAPID key configured. */
    if (!key?.enabled || !key?.publicKey) return false;

    const registration = await navigator.serviceWorker.register(
      SERVICE_WORKER_PATH,
    );

    await navigator.serviceWorker.ready;

    const existing = await registration.pushManager.getSubscription();

    /*
      A subscription made with a different VAPID key can never be decrypted by
      this backend, so it has to go before a new one is made.
    */
    if (existing) {
      const subscribedKey = existing.options?.applicationServerKey
        ? toBase64Url(existing.options.applicationServerKey)
        : null;

      if (subscribedKey && subscribedKey !== key.publicKey) {
        await existing.unsubscribe();
      }
    }

    const subscription =
      (await registration.pushManager.getSubscription()) ||
      (await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: toUint8Array(key.publicKey),
      }));

    await subscribeToPush({
      endpoint: subscription.endpoint,
      p256dhKey: toBase64Url(subscription.getKey('p256dh')),
      authKey: toBase64Url(subscription.getKey('auth')),
    });

    return true;
  } catch (error) {
    console.warn('Could not register for push notifications', error);

    return false;
  }
};

/**
 * Stops this browser being notified. Called on sign out so the next person on a
 * shared machine does not receive the previous account's reports.
 */
export const unregisterPushNotifications = async () => {
  if (!isPushSupported()) return;

  try {
    const registration = await navigator.serviceWorker.getRegistration(
      SERVICE_WORKER_PATH,
    );

    const subscription = await registration?.pushManager.getSubscription();

    if (!subscription) return;

    // Told first, while the token is still valid, then dropped locally.
    await unsubscribeFromPush(subscription.endpoint).catch(() => {});

    await subscription.unsubscribe();
  } catch (error) {
    console.warn('Could not unregister push notifications', error);
  }
};
