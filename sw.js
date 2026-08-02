// Service Worker — Calculadora de Nómina (Cero Absoluto)
// Estrategia: cache-first para el "app shell" local, stale-while-revalidate
// para los recursos de CDN (React, Tailwind, Font Awesome, Google Fonts),
// para que la app siga abriendo sin conexión una vez visitada al menos una vez.

const CACHE_VERSION = 'nomina-v1';
const APP_SHELL = [
    './',
    './index.html',
    './manifest.json',
    './icons/icon-72.png',
    './icons/icon-96.png',
    './icons/icon-128.png',
    './icons/icon-144.png',
    './icons/icon-152.png',
    './icons/icon-192.png',
    './icons/icon-384.png',
    './icons/icon-512.png',
    './icons/icon-192-maskable.png',
    './icons/icon-512-maskable.png'
];

self.addEventListener('install', (event) => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_VERSION).then((cache) => cache.addAll(APP_SHELL)).catch(() => {})
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k)))
        ).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (event) => {
    const req = event.request;
    if (req.method !== 'GET') return;

    const url = new URL(req.url);
    const isSameOrigin = url.origin === self.location.origin;

    if (isSameOrigin) {
        // App shell propio: cache-first con actualización en segundo plano
        event.respondWith(
            caches.match(req).then((cached) => {
                const fetchPromise = fetch(req).then((res) => {
                    if (res && res.status === 200) {
                        const clone = res.clone();
                        caches.open(CACHE_VERSION).then((cache) => cache.put(req, clone));
                    }
                    return res;
                }).catch(() => cached);
                return cached || fetchPromise;
            })
        );
    } else {
        // Recursos externos (CDN): stale-while-revalidate
        event.respondWith(
            caches.open(CACHE_VERSION).then((cache) =>
                cache.match(req).then((cached) => {
                    const fetchPromise = fetch(req).then((res) => {
                        if (res && (res.status === 200 || res.type === 'opaque')) {
                            cache.put(req, res.clone());
                        }
                        return res;
                    }).catch(() => cached);
                    return cached || fetchPromise;
                })
            )
        );
    }
});
