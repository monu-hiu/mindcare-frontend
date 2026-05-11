// src/utils/pushNotifications.js
// Frontend push notification setup

// ⚠️ APNI PUBLIC KEY YAHAN DAALO
const VAPID_PUBLIC_KEY = "BN933kjAjeNMPxtl2Ky-IRs-1K9tGI-Yr07oyUBD8RTiggczSmvItDvuPEV5ySMwcQgMRsuPkz81TKsQo8WQ1qM";


// Convert VAPID key to Uint8Array
function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, "+")
    .replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// Register service worker
export const registerServiceWorker = async () => {
  if (!("serviceWorker" in navigator)) {
    console.log("Service Worker not supported");
    return null;
  }

  try {
    const registration = await navigator.serviceWorker.register(
      "/service-worker.js"
    );
    console.log("Service Worker registered!");
    return registration;
  } catch (err) {
    console.error("Service Worker registration failed:", err);
    return null;
  }
};

// Request permission + subscribe to push
export const subscribeToPush = async (token) => {
  try {
    // 1. Register service worker
    const registration = await registerServiceWorker();
    if (!registration) return false;

    // 2. Request notification permission
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      console.log("Notification permission denied");
      return false;
    }

    // 3. Subscribe to push
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
    });

    // 4. Send subscription to backend
    const res = await fetch(
      "https://mindcare-backend-v56a.onrender.com/api/push/subscribe",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ subscription }),
      }
    );

    const data = await res.json();
    if (data.success) {
      console.log("Push subscription saved!");
      return true;
    }
    return false;
  } catch (err) {
    console.error("Push subscription failed:", err);
    return false;
  }
};

// Send push notification via backend
export const sendPushNotification = async (token, title, body, url = "/dashboard") => {
  try {
    await fetch(
      "https://mindcare-backend-v56a.onrender.com/api/push/send",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, body, url }),
      }
    );
  } catch (err) {
    console.error("Push notification send failed:", err);
  }
};

// Check if already subscribed
export const checkPushSubscription = async () => {
  if (!("serviceWorker" in navigator)) return false;
  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();
    return !!subscription;
  } catch {
    return false;
  }
};