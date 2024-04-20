import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "alzuela-f490f.firebaseapp.com",
  projectId: "alzuela-f490f",
  storageBucket: "alzuela-f490f.appspot.com",
  messagingSenderId: "422279099801",
  appId: "1:422279099801:web:669249a7aea290d9124f08"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);