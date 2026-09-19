// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDvwP75hIcpvrQveamJ-b-Kk577W1cbB6w",
  authDomain: "hokieplague.firebaseapp.com",
  projectId: "hokieplague",
  storageBucket: "hokieplague.firebasestorage.app",
  messagingSenderId: "642258531192",
  appId: "1:642258531192:web:6ae274961240928d8fce8d",
  measurementId: "G-RDXHD8L55Q",
  databaseURL: "https://hokieplague-default-rtdb.firebaseio.com/"
  
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);