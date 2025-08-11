// Service Worker for franciscosantelices.cl
// Performance optimization and offline capabilities

const CACHE_NAME = 'franciscosantelices-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/portfolio.html',
  '/bio.html', 
  '/design.html',
  '/assets/og-image.jpg',
  '/assets/logo.png',
  '/loading.css',
  '/styles.css',
  '/assets/css/lets-create.css',
  '/assets/css/youtube-layout.css'
];

// Install SW
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
});

// Fetch with cache-first strategy for assets
self.addEventListener('fetch', (event) => {
  if (event.request.destination === 'image' || 
      event.request.destination === 'style' ||
      event.request.destination === 'script') {
    event.respondWith(
      caches.match(event.request)
        .then((response) => {
          return response || fetch(event.request);
        })
    );
  }
});

// Clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName \!== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
EOF < /dev/null