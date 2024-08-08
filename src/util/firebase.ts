import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBZ9H6NqHtlwTLESPpNGMIEnWGMYS6l9-Y",
  authDomain: "leedeverteuil.firebaseapp.com",
  projectId: "leedeverteuil",
  storageBucket: "leedeverteuil.appspot.com",
  messagingSenderId: "200356960188",
  appId: "1:200356960188:web:7b5d41ab2e56a268bafdb9",
  measurementId: "G-FREEV2H5DH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);