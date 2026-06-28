import { getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
apiKey: "AIzaSyDlvwzuZ2qY3MFj-3IakUb79ia1IhVK_SQ",
authDomain: "divemate-bdc9a.firebaseapp.com",
projectId: "divemate-bdc9a",
storageBucket: "divemate-bdc9a.firebasestorage.app",
messagingSenderId: "1069326128023",
appId: "1:1069326128023:web:9e970c0b207d97b2242ad2"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const db = getFirestore(app);