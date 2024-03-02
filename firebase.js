// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA99wmHOkYnNammGEJGclky5C2Rwhmi2EQ",
  authDomain: "elie-lifts.firebaseapp.com",
  projectId: "elie-lifts",
  storageBucket: "elie-lifts.appspot.com",
  messagingSenderId: "518244683406",
  appId: "1:518244683406:web:bfeb3f2f59abba6ec043df",
  measurementId: "G-EFJ9LE13WK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export {db}