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

// アクティブ化：古いキャッシュを掃除する
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // 現在の CACHE_NAME 以外は削除する
          if (cacheName !== CACHE_NAME) {
            console.log('古いキャッシュを削除しました:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
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
