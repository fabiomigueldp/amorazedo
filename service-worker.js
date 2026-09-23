const SCOPE = new URL(self.registration.scope);
const PREFIX = `amor-azedo-2-pwa:${SCOPE.pathname}:`;
const CACHE = PREFIX + '75f18a440925f496';
const SHELL = ['index.html', 'app.css', 'app.js', 'manifest.json', 'offline-catalog.json',
  'icons/apple-touch-icon.png', 'icons/icon-192x192.png'];
self.addEventListener('install', event => {
  // No skipWaiting: an open game must keep its engine and assets from one release.
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(SHELL)));
});
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    for (const key of await caches.keys()) {
      if (key.startsWith(PREFIX) && key !== CACHE) await caches.delete(key);
    }
    await self.clients.claim();
  })());
});
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (event.request.method !== 'GET' || url.origin !== SCOPE.origin || !url.pathname.startsWith(SCOPE.pathname)) return;
  if (url.pathname === SCOPE.pathname) url.pathname += 'index.html';
  if (url.search === '?cached') {
    url.search = '?uncached';
    event.respondWith(caches.open(CACHE).then(async cache => (await cache.match(url.href)) || new Response('', { status: 404 })));
    return;
  }
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const cached = await cache.match(url.href);
    const range = event.request.headers.get('range');
    if (cached && range) {
      const match = /^bytes=(\d+)-(\d*)$/.exec(range);
      if (match) {
        const data = await cached.arrayBuffer();
        const start = Number(match[1]), end = Math.min(Number(match[2] || data.byteLength - 1), data.byteLength - 1);
        if (start > end) return new Response('', { status: 416, headers: { 'Content-Range': `bytes */${data.byteLength}` } });
        const headers = new Headers(cached.headers);
        headers.set('Content-Range', `bytes ${start}-${end}/${data.byteLength}`);
        headers.set('Content-Length', String(end - start + 1));
        headers.set('Accept-Ranges', 'bytes');
        return new Response(data.slice(start, end + 1), { status: 206, headers });
      }
    }
    if (cached && !range) return cached;
    const response = await fetch(event.request);
    if (response.ok && response.status === 200 && !range) {
      // Quota failures must never prevent playing online.
      try { await cache.put(url.href, response.clone()); } catch (error) { console.warn('Cache indisponível', error); }
    }
    return response;
  })());
});
