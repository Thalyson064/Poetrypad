import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

const firebaseConfig = {
  projectId: "the-bards-quill-46bcn",
  appId: "1:911102008160:web:72734fea7e04a3f7db9c05",
  storageBucket: "the-bards-quill-46bcn.firebasestorage.app",
  apiKey: "AIzaSyCAaBEfK-G4MO_pTTriW3UxmaYCKfvxrYc",
  authDomain: "the-bards-quill-46bcn.firebaseapp.com",
  measurementId: "",
  messagingSenderId: "911102008160"
};

// Initialize Firebase for SSR
const getClientApp = (): FirebaseApp => {
    if (getApps().length) {
        return getApp();
    }
    return initializeApp(firebaseConfig);
}

const app: FirebaseApp = getClientApp();
const auth: Auth = getAuth(app);
const db: Firestore = getFirestore(app);

export { app, auth, db };