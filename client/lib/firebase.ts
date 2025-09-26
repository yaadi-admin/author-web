import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDJ4XM7kzuANeGkiPItZcgKD1aEfmOvePA",
    authDomain: "suelyn-e82e4.firebaseapp.com",
    projectId: "suelyn-e82e4",
    storageBucket: "suelyn-e82e4.firebasestorage.app",
    messagingSenderId: "894877881089",
    appId: "1:894877881089:web:0eaf36d1d03789fedb4100",
    measurementId: "G-X6BWCCYL2C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const firebase = {
    auth: auth,
    firestore: db,
    storage: storage,
};

export default firebase;
