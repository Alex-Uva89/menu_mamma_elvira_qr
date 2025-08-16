/* global workbox */
workbox.setConfig({ debug: false });

// Cache statici (auto da generateSW)

// Cache Sanity API (network-first, fallback cache 1h)
workbox.routing.registerRoute(
  ({ url }) =>
    url.hostname.endsWith('.sanity.io') ||
    url.hostname.endsWith('.apicdn.sanity.io') ||
    url.hostname === 'cdn.sanity.io',
  new workbox.strategies.NetworkFirst({
    cacheName: 'sanity-api',
    networkTimeoutSeconds: 4,
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 80,
        maxAgeSeconds: 60 * 60 // 1h
      })
    ]
  }),
  'GET'
);

// Cache immagini (stale-while-revalidate)
workbox.routing.registerRoute(
  ({ request }) => request.destination === 'image',
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'images',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 120,
        maxAgeSeconds: 60 * 60 * 24 * 7 // 7 giorni
      })
    ]
  })
);
