/*
  City Care service worker.

  Its only job is notifications. The browser keeps it around after the tab is
  closed, wakes it when the push service delivers a message, and lets it show a
  notification and open the right page when the crew taps it.
*/

self.addEventListener('install', () => {
  // Take over straight away instead of waiting for every old tab to close.
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('push', (event) => {
  let payload;

  try {
    payload = event.data ? event.data.json() : {};
  } catch {
    // A push with no readable body still deserves to be shown.
    payload = {};
  }

  const title = payload.title || 'City Care';
  const body = payload.body || 'A new urban problem report needs your attention.';

  event.waitUntil(
    self.registration.showNotification(title, {
      body,
      icon: '/pata-logo-v2.png',
      badge: '/pata-logo-v2.png',
      // Reports collapse onto one notification rather than stacking up.
      tag: payload.reportId ? `report-${payload.reportId}` : 'city-care',
      renotify: true,
      data: { url: payload.url || '/org/map' },
    }),
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const target = (event.notification.data && event.notification.data.url) || '/org/map';

  event.waitUntil(
    (async () => {
      const windows = await self.clients.matchAll({
        type: 'window',
        includeUncontrolled: true,
      });

      // Reuse a City Care tab if one is already open rather than piling up tabs.
      for (const client of windows) {
        if (new URL(client.url).origin === self.location.origin) {
          await client.focus();

          if ('navigate' in client) {
            await client.navigate(target);
          }

          return;
        }
      }

      await self.clients.openWindow(target);
    })(),
  );
});
