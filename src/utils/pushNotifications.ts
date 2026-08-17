import axios from 'axios';

// Utilitaire pour convertir la clé VAPID base64 en un UInt8Array requis par le navigateur
function urlBase64ToUint8Array(base64String: string) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

export async function subscribeToWebPush(userId: number, API_URL: string, token: string) {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator) || !('PushManager' in window)) {
        return;
    }

    try {
        // Enregistre le service worker
        const registration = await navigator.serviceWorker.register('/sw.js');
        
        // Attendre que le SW soit prêt
        await navigator.serviceWorker.ready;

        // Récupérer la souscription existante
        let subscription = await registration.pushManager.getSubscription();

        // Si une souscription existe déjà, on la vérifie ou on la renvoie
        if (subscription) {
            console.log('Souscription existante trouvée.');
        } else {
            // Demander l'autorisation à l'utilisateur
            const permission = await Notification.requestPermission();
            if (permission !== 'granted') return;

            // Récupérer la clé publique VAPID
            const vapidResponse = await axios.get(`${API_URL}/auth/vapid-public-key`);
            const publicVapidKey = vapidResponse.data.publicKey;

            // Souscrire
            subscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
            });
        }

        // Envoyer/Mettre à jour au serveur
        await axios.post(`${API_URL}/auth/web-push-subscription`, {
            userId: userId,
            subscription: subscription
        }, {
            headers: { Authorization: `Bearer ${token}` }
        });

    } catch (error: any) {
        if (error.name === 'AbortError') {
            console.warn('[WEB PUSH] L\'opération a été annulée ou a échoué silencieusement.');
        } else {
            console.error('[WEB PUSH] Erreur critique:', error);
        }
    }
}
