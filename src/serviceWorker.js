const cacheName = 'cache1';
const files = [
    '/',
    '/assets/styles.css',
    '/assets/bundle.js',
    '/assets/2fe50a9950b967b53bc895400b8bb581.png',
    '/assets/513b423513a6b6cf36f3afe0e5efaf26.png',
    '/assets/f3f456526fe94d00846f6f88c909574e.jpg',
    '/assets/71cf47ef3775ddcf318faecb3ab7bbd6.ico',
    '/index.html',
    'https://fonts.googleapis.com/css?family=Gorditas:400,700'
];

self.addEventListener('install', event => {
    self.skipWaiting();

    console.log('I am working service worker on installing phase');
    event.waitUntil(
        caches.open(cacheName)
        .then(cache => cache.addAll(files))
    )
})

self.addEventListener('activate', event => {
    console.log('I am working service worker on activating phase');
    self.clients.claim();
    const cacheWhiteList = [cacheName];
    event.waitUntil(
        caches.keys()
        .then(cacheNames => Promise.all(
            cacheNames.map(cacheName => {
                if (!cacheWhiteList.includes(cacheName)) return caches.delete(cacheName);
            })
        ))
    )   
})

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
        if (response) {
            console.log('Found ', event.request.url, ' in cache');
            return response;
        }
        console.log('Network request for ', event.request.url);

        return fetch(event.request)
            .then(response => {
                caches.open(cacheName)
                    .then(cache => {
                        cache.put(event.request.url, response);
                    })
                    .catch(err => console.error(err));

                return response.clone();
            })
        }).catch(err => console.error(err))
    )
})
