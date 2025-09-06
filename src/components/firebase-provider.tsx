"use client";

import { createContext, useContext, ReactNode } from "react";
import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getDatabase, Database } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
};

let app: FirebaseApp;
let db: Database | null = null;

try {
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApps()[0];
  }
  db = getDatabase(app);
} catch (error) {
  console.error("Failed to initialize Firebase", error);
}

// Create a context for the Firebase db instance
const FirebaseContext = createContext<{ db: Database | null }>({ db: null });

export function useFirebase() {
  return useContext(FirebaseContext);
}

export function FirebaseProvider({ children }: { children: ReactNode }) {
  return (
    <FirebaseContext.Provider value={{ db }}>{children}</FirebaseContext.Provider>
  );
}
