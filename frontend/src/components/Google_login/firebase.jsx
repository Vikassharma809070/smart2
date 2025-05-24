import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA1UJtmLMqdhhtQUp2Gce56HTLvYRM9ig0",
  authDomain: "login-d6b74.firebaseapp.com",
  projectId: "login-d6b74",
  storageBucket: "login-d6b74.firebasestorage.app",
  messagingSenderId: "80687399894",
  appId: "1:80687399894:web:1f3ef646f2f43908545a77",
  measurementId: "G-1VQJRYD1KM"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, signOut };
