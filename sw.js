const cacheName = "cache version 01";
const urlsToCache = [
	"/",
	"/index.html",
	"/restaurant.html",
	"/css/styles.css",
	"/data/restaurants.json",
	"/js/",
	"/js/dbhelper.js",
	"/js/main.js",
	"/js/restaurant_info.js",
	"/js/register.js",
	"/img/1.jpg",
	"/img/2.jpg",
	"/img/3.jpg",
	"/img/4.jpg",
	"/img/5.jpg",
	"/img/6.jpg",
	"/img/7.jpg",
	"/img/8.jpg",
	"/img/9.jpg",
	"/img/10.jpg"
];


self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open(cacheName).then((cache) => {
				console.log("Opened cache");
				return cache.addAll(urlsToCache);
			})
		);
});


//version 3
self.addEventListener('fetch', (event) => {
	console.log("Fetched");
	event.respondWith(
		caches.match(event.request).then((response) => {
			if (response) return response;
			return fetch(event.request);
		})
	);
});

//version 2
/*self.addEventListener('fetch', (event) => {
	console.log("Succeed to fetch")
	event.respondWith(fromCache(event.request))
	}
);

function fromCache(request) {
	return caches.open(cacheName).then((cache) =>
		cache.match(request)
			.then((matching) => matching || Promise.reject('no-match'))
		);
}*/


//version 1
/*self.addEventListener('fetch', (event) => {
	event.respondWith(
		caches.match(event.request)
			.then((response) => {
				if (response) {
					return response;
				}

				let fetchRequest = event.request.clone();

				return fetch(fetchRequest).then(
					(response) => {
						if (!response || response.status !== 200 || response.type !== 'basic') {
							return response;
						}

						let responseToCache = response.clone();

						caches.open(cacheName)
							.then((cache) => {
								cache.put(event.request, responseToCache);
							});

						return response;
					}
				);
			})
		);
});*/