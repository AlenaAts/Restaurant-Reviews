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

// install service worker
self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open(cacheName).then((cache) => {
				console.log("Opened cache");
				return cache.addAll(urlsToCache);
			})
		);
});

// return request
self.addEventListener('fetch', (event) => {
	console.log("Fetched");
	event.respondWith(
		caches.match(event.request).then((response) => {
			if (response) return response;
			return fetch(event.request);
		})
	);
});
