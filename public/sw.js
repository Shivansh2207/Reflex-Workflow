const CACHE_VERSION = "reflex-shell-v1";
const TASK_CACHE = "reflex-recent-tasks-v1";
const APP_SHELL = ["/", "/login", "/offline", "/manifest.webmanifest", "/icons/icon.svg", "/logo/reflex-logo.png"];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_VERSION).then((cache) => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => ![CACHE_VERSION, TASK_CACHE].includes(key)).map((key) => caches.delete(key)))));
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET" || !event.request.url.startsWith(self.location.origin)) return;
  const url = new URL(event.request.url);
  if (url.pathname.startsWith("/_next/static") || url.pathname.startsWith("/icons/") || url.pathname.startsWith("/logo/")) {
    event.respondWith(caches.match(event.request).then((cached) => cached || fetch(event.request).then((response) => { const copy = response.clone(); caches.open(CACHE_VERSION).then((cache) => cache.put(event.request, copy)); return response; })));
    return;
  }
  if (url.pathname.startsWith("/tasks/")) {
    event.respondWith(fetch(event.request).then((response) => { const copy = response.clone(); caches.open(TASK_CACHE).then((cache) => cache.put(event.request, copy)); return response; }).catch(() => caches.match(event.request).then((cached) => cached || caches.match("/offline"))));
    return;
  }
  event.respondWith(fetch(event.request).catch(() => caches.match(event.request).then((cached) => cached || caches.match("/offline"))));
});
