"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

interface FirebaseContextType {
  app: FirebaseApp | null;
  db: Firestore | null;
}

const FirebaseContext = createContext<FirebaseContextType>({ app: null, db: null });

export const FirebaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [firebase, setFirebase] = useState<FirebaseContextType>({ app: null, db: null });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
      const db = getFirestore(app);
      setFirebase({ app, db });
    }
  }, []);

  return (
    <FirebaseContext.Provider value={firebase}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
};
