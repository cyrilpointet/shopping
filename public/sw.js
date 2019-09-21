self.addEventListener('install', e => {
    e.waitUntil(
        caches.open('pwa').then(cache => {
        console.log('test');
        return cache.addAll([
            '/',
            '/sw.js',
            '/index.html',
            '/favicon.ico',
            '/app.js',
        ])
            .then(() => self.skipWaiting());
    })
)
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
        return response || fetch(event.request);
    })
);
});
