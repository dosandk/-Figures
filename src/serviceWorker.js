const cacheName = 'cache1';
const files = [
    '/',
    'https://fonts.googleapis.com/css?family=Gorditas:400,700',
    '/assets/styles.css',
    '/assets/bundle.js',
    '/assets/2fe50a9950b967b53bc895400b8bb581.png',
    '/assets/513b423513a6b6cf36f3afe0e5efaf26.png',
    '/assets/f3f456526fe94d00846f6f88c909574e.jpg',
    '/index.html'
];

self.addEventListener('install', event => {
    console.log('I am working service worker on installing phase');
    event.waitUntil(
        caches.open(cacheName)
        .then(cache => cache.addAll(files))
    )
})

self.addEventListener('activate', event => {
    console.log('I am working service worker on activating phase');
})

self.addEventListener('fetch', event => {
    event.respondWith(caches.match(event.request))
})
