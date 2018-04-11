const staticAssets = [
    './',
    './app.js',
    './public/',
    './images',
    './fallback.json',
    './images/icons/icon-128x128.png'
];

self.addEventListener('install', async function () {
    const cache = await caches.open('news');
    cache.addAll(staticAssets);
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                if (response) {
                    return response;     // if valid response is found in cache return it
                } else {
                    return fetch(event.request)     //fetch from internet
                        .then(function (res) {
                            return caches.open('news')
                                .then(function (cache) {
                                    cache.put(event.request.url, res.clone());    //save the response for future
                                    return res;   // return the fetched data
                                })
                        })
                        .catch(function (err) {       // fallback mechanism
                            return caches.open('errors')
                                .then(function (cache) {
                                    return cache.match('./fallback.json');
                                });
                        });
                }
            })
    );
});  




