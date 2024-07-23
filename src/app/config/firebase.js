// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDUWHtQsQ1J9TkFf3Tq0evEuDgaaQcB9lk",
  authDomain: "assessment-12491.firebaseapp.com",
  projectId: "assessment-12491",
  storageBucket: "assessment-12491.appspot.com",
  messagingSenderId: "185092237538",
  appId: "1:185092237538:web:3672103e04eb3eecead6bb",
  measurementId: "G-N70RD6L8TS"
};


// Initialize Firebase
export const firebase = initializeApp(firebaseConfig);
export const db = getFirestore(firebase)
export const storage = getStorage(firebase);
