// public/firebase-messaging-sw.js
importScripts("https://www.gstatic.com/firebasejs/9.17.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.17.2/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "🔑_YAHAN_APNI_FIREBASE_API_KEY_DALO",
  authDomain: "medimate-xxxx.firebaseapp.com",
  projectId: "medimate-xxxx",
  storageBucket: "medimate-xxxx.appspot.com",
  messagingSenderId: "986807025188",
  appId: "🔑_YAHAN_APNA_APP_ID_DALO",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("📩 Background message:", payload);

  const notificationTitle = payload.notification?.title || "Medicine Reminder";
  const notificationOptions = {
    body: payload.notification?.body || "Please take your medicine",
    data: payload.data,
    actions: [
      { action: "taken", title: "✅ Taken" },
      { action: "missed", title: "❌ Missed" },
    ],
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  console.log("🔔 Notification clicked:", event.action);

  const API_URL = "http://localhost:5000"; // Later env se lo

  if (event.action === "taken" || event.action === "missed") {
    fetch(`${API_URL}/api/medicine-status`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        doseId: event.notification.data?.doseId,
        userId: event.notification.data?.userId,
        status: event.action,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log("✅ Status updated:", data))
      .catch((err) => console.error("❌ Error updating status:", err));
  }
});
