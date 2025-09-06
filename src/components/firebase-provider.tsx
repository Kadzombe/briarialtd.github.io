"use client";

import { createContext, useContext, ReactNode } from "react";
import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "briaria-ltd-474e6.firebaseapp.com",
  projectId: "briaria-ltd-474e6",
  storageBucket: "briaria-ltd-474e6.appspot.com",
  messagingSenderId: "168864761274",
  appId: "1:168864761274:web:e0a9d8d6d6b1d3b9c8b7e0"
};

let app: FirebaseApp;
let db: Firestore | null = null;

try {
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApps()[0];
  }
  db = getFirestore(app);
} catch (error) {
  console.error("Failed to initialize Firebase", error);
}

// Create a context for the Firebase db instance
const FirebaseContext = createContext<{ db: Firestore | null }>({ db: null });

export function useFirebase() {
  return useContext(FirebaseContext);
}

export function FirebaseProvider({ children }: { children: ReactNode }) {
  return (
    <FirebaseContext.Provider value={{ db }}>{children}</FirebaseContext.Provider>
  );
}
