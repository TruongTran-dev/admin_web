// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDGD4HfInR7ybpXD7sYguYP-5j-U2vDQ80",
  authDomain: "chatapp-97dbc.firebaseapp.com",
  projectId: "chatapp-97dbc",
  storageBucket: "chatapp-97dbc.appspot.com",
  messagingSenderId: "103251286025",
  appId: "1:103251286025:web:03d480e7b5bdae42f840d8",
  measurementId: "G-471HG0X2MQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);
const analytics = getAnalytics(app);
