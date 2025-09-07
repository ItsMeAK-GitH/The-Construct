import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDuf8fAnFOSTNpCp-YY8wPa9hXL_bnonKM",
  authDomain: "writenow-qp09o.firebaseapp.com",
  projectId: "writenow-qp09o",
  storageBucket: "writenow-qp09o.appspot.com",
  messagingSenderId: "709911042403",
  appId: "1:709911042403:web:9b5b4f1217a484dc67db56",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
