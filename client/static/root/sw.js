

let cacheName = 'dmp';
let filesToCache = [
  '/',
  '/page/album',
  '/static/style/style.css',
  '/static/dist/index.js',
  '/static/js/client.router.js'
];

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
  self.skipWaiting();
});

self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});