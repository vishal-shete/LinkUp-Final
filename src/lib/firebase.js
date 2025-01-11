// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "linkup-9c745.firebaseapp.com",
  projectId: "linkup-9c745",
  storageBucket: "linkup-9c745.firebasestorage.app",
  messagingSenderId: "556245811241",
  appId: "1:556245811241:web:9eb4977ee2a80d18fe9c38"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth = getAuth()
export const db = getFirestore()
export const storage = getStorage()