import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

// Paste the same config values you used in firebase.js (no analytics)
const firebaseConfig = {
  apiKey: 'AIzaSyDvwP75hIcpvrQveamJ-b-Kk577W1cbB6w',
  authDomain: 'hokieplague.firebaseapp.com',
  projectId: 'hokieplague',
  storageBucket: 'hokieplague.firebasestorage.app',
  messagingSenderId: '642258531192',
  appId: '1:642258531192:web:6ae274961240928d8fce8d',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const ref = doc(db, 'games', 'test-game', 'players', 'test-player');

await setDoc(ref, { name: 'Test', team: 'survivor', lat: 37.2296, lng: -80.4139 });
console.log('Wrote document');

const snap = await getDoc(ref);
console.log('Read back:', snap.data());

process.exit(0); // Firestore keeps a connection open, so exit manually