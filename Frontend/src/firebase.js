// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDxuj9kuQ5dOCz4FTGTFvNGwqtYAcp2Wvs",
  authDomain: "social-net-sim-violence-ai.firebaseapp.com",
  projectId: "social-net-sim-violence-ai",
  storageBucket: "social-net-sim-violence-ai.firebasestorage.app",
  messagingSenderId: "872024438720",
  appId: "1:872024438720:web:5d4ccc6ab385005ad7ba25",
  measurementId: "G-TJR9HM1CWP"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);

// npm install -g firebase-tools