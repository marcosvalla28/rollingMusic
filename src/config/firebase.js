// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDgs5wjGh1iwPYjukWMFRsa8TkQl5UTWQc",
  authDomain: "rollingmusic-9096e.firebaseapp.com",
  projectId: "rollingmusic-9096e",
  storageBucket: "rollingmusic-9096e.firebasestorage.app",
  messagingSenderId: "868032147725",
  appId: "1:868032147725:web:cca67277cab9486cbfc044",
  measurementId: "G-HE5XJ9LVET"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const analytics = getAnalytics(app);

export {auth, googleProvider, analytics};