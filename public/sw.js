self.addEventListener('push', function (event) {
    console.log('[Service Worker] Push Received.');

    let data = { title: 'Nouvelle notification', body: 'Vous avez un nouveau message.' };
    
    if (event.data) {
        try {
            data = event.data.json();
        } catch (e) {
            data.body = event.data.text();
        }
    }

    const title = data.title;
    const options = {
        body: data.body,
        icon: data.icon || '/favicon.ico',
        badge: data.badge || '/favicon.ico',
        data: data.data // Données personnalisées pour l'événement "click"
    };

    event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', function(event) {
    console.log('[Service Worker] Notification click Received.');

    event.notification.close();

    // Redirection de l'utilisateur quand il clique sur la notification
    event.waitUntil(
        clients.openWindow('http://localhost:3000/dashboard/messages') // URL personnalisable en prod
    );
});
