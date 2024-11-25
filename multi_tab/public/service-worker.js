self.addEventListener('install', event => {
  console.log(`Service Worker installing. ${event}`);
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  console.log(`Service Worker activating. ${event}`);
});

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'BROADCAST') {
    self.clients.matchAll({ includeUncontrolled: true, type: 'window' }).then(clients => {
      clients.forEach(client => {
        client.postMessage(event.data.message);
      });
    });
  }
});
