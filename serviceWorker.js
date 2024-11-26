
self.addEventListener('fetch', (event) => {
    console.log('Service Worker: Fetching', event.request.url);
});
