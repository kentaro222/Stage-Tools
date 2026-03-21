const CACHE_NAME = 'stage-tools-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './ST-icon-192.png',
  './ST-icon-512.png'
];

// インストール時にキャッシュを保存
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

// リクエストされたときにキャッシュから返す（オフライン対応）
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // キャッシュがあればそれを返し、なければネットワークへリクエスト
        return response || fetch(event.request);
      })
  );
});
