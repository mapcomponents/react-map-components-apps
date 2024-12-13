self.addEventListener('install', event => {
  console.log(`Service Worker installing. ${event}`);
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  console.log(`Service Worker activating. ${event}`);
  event.waitUntil(self.clients.claim());  // Macht den SW sofort aktiv
});


self.addEventListener('message', event => {
  if (event.data && event.data.type === 'BROADCAST') {
    self.clients.matchAll({ includeUncontrolled: true, type: 'window' }).then(clients => {
      clients.forEach(client => {
        console.log(client);
        client.postMessage(event.data.message);
      });
    });
  }
});
