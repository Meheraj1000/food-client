// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBa0Iagh_7eV2F4H_UPVW82ub2AanVF8Bs",
  authDomain: "assignment-11-82224.firebaseapp.com",
  projectId: "assignment-11-82224",
  storageBucket: "assignment-11-82224.firebasestorage.app",
  messagingSenderId: "996139561971",
  appId: "1:996139561971:web:cb6ab0a12d712e50d01886"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);