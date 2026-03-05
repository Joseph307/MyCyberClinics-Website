import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB7a7DVInI9UagpSZhL20Mdnt9-BJrtNYY",
  authDomain: "my-cyber-clinics.firebaseapp.com",
  databaseURL: "https://my-cyber-clinics-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "my-cyber-clinics",
  storageBucket: "my-cyber-clinics.firebasestorage.app",
  messagingSenderId: "358394266978",
  appId: "1:358394266978:web:8d44666b63db316f5e583b",
  measurementId: "G-F5SCJ0XS8Z",
};

export const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);

export async function initializeFirebaseAnalytics() {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const analyticsSupported = await isSupported();
    if (!analyticsSupported) {
      return null;
    }
    return getAnalytics(firebaseApp);
  } catch {
    return null; 
  }
}
