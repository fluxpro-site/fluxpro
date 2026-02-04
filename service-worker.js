const CACHE_NAME = 'jm-ultra-v2'; // Incremento de versão força atualização
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './pedro1.png',
  './pedro2.png',
  './icon-192.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting(); // Força o SW novo a assumir imediatamente
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          return caches.delete(key); // Limpa cache antigo
        }
      }));
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => {
      return res || fetch(e.request).catch(() => {
        // Fallback opcional se falhar rede e cache (ex: página offline customizada)
        // return caches.match('./offline.html');
      });
    })
  );
});