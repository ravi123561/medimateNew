// src/firebase.js
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "🔑_YAHAN_APNI_FIREBASE_API_KEY_DALO",
  authDomain: "medimate-xxxx.firebaseapp.com",
  projectId: "medimate-xxxx",
  storageBucket: "medimate-xxxx.appspot.com",
  messagingSenderId: "986807025188", // Console se lo
  appId: "🔑_YAHAN_APNA_APP_ID_DALO",
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// Request token for notifications
export const requestForToken = async () => {
  try {
    const token = await getToken(messaging, {
      vapidKey:
        "BP0gJ5JrVfDfgbJk-Lkku0Sm2eszMkXynq9mfabarE0fYIVHBfqVbQTTjFPmsHICpmUh4FjsoapoquaglINA", // 👈 Aapka VAPID Key
    });
    if (token) {
      console.log("✅ Current token:", token);
    } else {
      console.log("⚠️ No registration token available.");
    }
  } catch (err) {
    console.error("❌ Token generation error:", err);
  }
};

// Foreground notification listener
export const onMessageListener = () =>
  new Promise((resolve, reject) => {
    try {
      onMessage(messaging, (payload) => {
        resolve(payload);
      });
    } catch (err) {
      reject(err);
    }
  });
