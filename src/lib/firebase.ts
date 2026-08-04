import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configurações padrão do projeto Firebase dmj-dc7d9 (utilizadas se as variáveis VITE_ não forem definidas na Vercel)
const DEFAULT_FIREBASE_CONFIG = {
  apiKey: "AIzaSyCzPArTFf3h_u3D5TLVtIQ16zBNtIb8y4A",
  authDomain: "dmj-dc7d9.firebaseapp.com",
  databaseURL: "https://dmj-dc7d9-default-rtdb.firebaseio.com",
  projectId: "dmj-dc7d9",
  storageBucket: "dmj-dc7d9.firebasestorage.app",
  messagingSenderId: "364388012911",
  appId: "1:364388012911:web:afd36c42ccc8c1df580e9a",
  measurementId: "G-MN5F704ZHJ",
  firestoreDatabaseId: "(default)"
};

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || DEFAULT_FIREBASE_CONFIG.apiKey,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || DEFAULT_FIREBASE_CONFIG.authDomain,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || DEFAULT_FIREBASE_CONFIG.projectId,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || DEFAULT_FIREBASE_CONFIG.storageBucket,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || DEFAULT_FIREBASE_CONFIG.messagingSenderId,
  appId: import.meta.env.VITE_FIREBASE_APP_ID || DEFAULT_FIREBASE_CONFIG.appId,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || DEFAULT_FIREBASE_CONFIG.measurementId
};

// Initialize Firebase App
export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore
const dbId = import.meta.env.VITE_FIREBASE_DATABASE_ID || DEFAULT_FIREBASE_CONFIG.firestoreDatabaseId;
export const db = dbId && dbId !== "(default)"
  ? getFirestore(app, dbId)
  : getFirestore(app);

// Initialize Firebase Auth
export const auth = getAuth(app);


