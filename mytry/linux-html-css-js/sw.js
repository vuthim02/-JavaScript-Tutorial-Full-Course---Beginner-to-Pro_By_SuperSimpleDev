/* Service worker: network-first for HTML, cache-first for assets, offline fallback */
const VERSION = "linux-lib-v1";
const CORE_ASSETS = [
    "/",
    "/index.html",
    "/assets/css/style.css",
    "/assets/images/icon.svg",
    "/assets/js/main.js",
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches
            .open(VERSION)
            .then((cache) => cache.addAll(CORE_ASSETS))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches
            .keys()
            .then((keys) =>
                Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k)))
            )
            .then(() => self.clients.claim())
    );
});

self.addEventListener("fetch", (event) => {
    const { request } = event;
    if (request.method !== "GET") return;
    const url = new URL(request.url);

    if (url.pathname.startsWith("/api/") || url.pathname.endsWith("/ws")) return;

    if (request.mode === "navigate") {
        event.respondWith(
            fetch(request)
                .then((res) => {
                    const copy = res.clone();
                    caches.open(VERSION).then((cache) => cache.put(request, copy));
                    return res;
                })
                .catch(() =>
                    caches.match(request).then((hit) => hit || caches.match("/index.html"))
                )
        );
        return;
    }

    event.respondWith(
        caches.match(request).then(
            (hit) =>
                hit ||
                fetch(request).then((res) => {
                    const copy = res.clone();
                    caches.open(VERSION).then((cache) => cache.put(request, copy));
                    return res;
                })
        )
    );
});