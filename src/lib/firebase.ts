import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  "projectId": "briaria-ltd-pwng8",
  "appId": "1:697355277684:web:89ff33fca678b3ac634821",
  "storageBucket": "briaria-ltd-pwng8.firebasestorage.app",
  "apiKey": "AIzaSyA23KS8zfrkbgEpIzo0bfe4bSeEctHPjzw",
  "authDomain": "briaria-ltd-pwng8.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "697355277684"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { app, db };
