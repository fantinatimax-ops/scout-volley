const CACHE_NAME = "volley-rotations-v2";

const FILES_TO_CACHE = [
    "./",
    "./index.html",

    "./roster.js",
    "./serveScout.js",
    "./ReceiveScout.js",
    "./vbRotations.js",

    "./manifest.json",

    "./vendor/snap.svg-min.js",

    "./icon-192.png",
    "./icon-512.png"
];


// INSTALL
self.addEventListener("install", (event) => {

    console.log("Service Worker installato");

    event.waitUntil(

        caches
            .open(CACHE_NAME)
            .then((cache) => {

                return cache.addAll(FILES_TO_CACHE);

            })

    );

    self.skipWaiting();

});


// ACTIVATE
self.addEventListener("activate", (event) => {

    console.log("Service Worker attivato");

    event.waitUntil(

        caches.keys().then((cacheNames) => {

            return Promise.all(

                cacheNames.map((cacheName) => {

                    if (cacheName !== CACHE_NAME) {

                        console.log(
                            "Elimino cache vecchia:",
                            cacheName
                        );

                        return caches.delete(cacheName);
                    }

                })

            );

        })

    );

    self.clients.claim();

});


// FETCH
self.addEventListener("fetch", (event) => {

    event.respondWith(

        caches.match(event.request)
            .then((cachedResponse) => {

                if (cachedResponse) {
                    return cachedResponse;
                }

                return fetch(event.request)
                    .then((networkResponse) => {

                        if (
                            !networkResponse ||
                            networkResponse.status !== 200 ||
                            networkResponse.type !== "basic"
                        ) {
                            return networkResponse;
                        }

                        const responseToCache =
                            networkResponse.clone();

                        caches.open(CACHE_NAME)
                            .then((cache) => {

                                cache.put(
                                    event.request,
                                    responseToCache
                                );

                            });

                        return networkResponse;

                    })
                    .catch(() => {

                        if (
                            event.request.destination ===
                            "document"
                        ) {
                            return caches.match(
                                "./index.html"
                            );
                        }

                    });

            })

    );

});
