const C = 'aces-v1';
const F = ['./', 'index.html', 'manifest.json', 'icon.svg'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(C).then(c => c.addAll(F)));
  self.skipWaiting();
});
self.addEventListener('activate', e => e.waitUntil(clients.claim()));
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET' || !e.request.url.startsWith(self.location.origin)) return;
  e.respondWith(
    fetch(e.request)
      .then(r => { const k = r.clone(); caches.open(C).then(c => c.put(e.request, k)); return r; })
      .catch(() => caches.match(e.request))
  );
});
