const CACHE_NAME = 'pagos-v1'; // versioned cache
const FILES_TO_CACHE = [
  '/index.html',
  '/manifest.json'
];

// Install: cache files individually to avoid addAll failures
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      Promise.all(
        FILES_TO_CACHE.map(file =>
          cache.add(file).catch(err => console.warn('Failed to cache:', file, err))
        )
      )
    )
  );
  self.skipWaiting();
});

// Activate: remove old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Fetch: respond with cache first, fallback to network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(resp => resp || fetch(event.request))
  );
});
