// Guarda o app no aparelho para abrir rápido e funcionar sem internet.
// Ao publicar uma versão nova, aumente o número abaixo.
const CACHE = "mamadas-v8";
const SHELL = ["./", "index.html", "config.js", "manifest.webmanifest", "icons/icon-192.png", "icons/icon-512.png", "icons/apple-touch-icon.png"];

self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL))); self.skipWaiting(); });
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener("fetch", e => {
  const req = e.request; if (req.method !== "GET") return;
  const url = new URL(req.url);
  // Bibliotecas do Firebase, do PDF e fontes: usa a cópia guardada
  if (url.hostname === "www.gstatic.com" || url.hostname === "cdnjs.cloudflare.com" || url.hostname.endsWith("fonts.googleapis.com") || url.hostname === "fonts.gstatic.com") {
    e.respondWith(caches.match(req).then(r => r || fetch(req).then(res => { const cp = res.clone(); caches.open(CACHE).then(c => c.put(req, cp)); return res; })));
    return;
  }
  // Arquivos do próprio app: tenta a internet primeiro, usa a cópia se estiver sem conexão
  if (url.origin === location.origin) {
    e.respondWith(fetch(req).then(res => { const cp = res.clone(); caches.open(CACHE).then(c => c.put(req, cp)); return res; }).catch(() => caches.match(req).then(r => r || caches.match("index.html"))));
  }
});
