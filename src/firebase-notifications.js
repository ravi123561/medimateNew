import { getToken } from "firebase/messaging";
import { messaging } from "./firebase";

// yaha tumhe Firebase console se liya hua Web Push certificate key daalna hai
const vapidKey = "BP0gJ5...tumhara-VAPID-key...";

export const requestForToken = async () => {
  try {
    const currentToken = await getToken(messaging, { vapidKey });
    if (currentToken) {
      console.log("FCM Token:", currentToken);
      // Tum is token ko backend pe save kar sakte ho future notifications ke liye
      return currentToken;
    } else {
      console.log("No registration token available. Request permission to generate one.");
    }
  } catch (error) {
    console.error("An error occurred while retrieving token. ", error);
  }
};
