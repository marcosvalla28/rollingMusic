// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2ojDq1KJz3vdP2-WY4DpZYhVLOG2VYGU",
  authDomain: "loginapp-3f742.firebaseapp.com",
  projectId: "loginapp-3f742",
  storageBucket: "loginapp-3f742.firebasestorage.app",
  messagingSenderId: "52857614091",
  appId: "1:52857614091:web:4aa9bfcd04bcaf4ae17c0e",
  measurementId: "G-P2E3P6CCLM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const analytics = getAnalytics(app);

export {auth, googleProvider, analytics};