import { initializeApp } from "firebase/app";
import { getAuth, } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import firebaseConfig from "../config/connection.config";
import { getStorage } from "firebase/storage";


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app)

const firebase = {
    auth: auth,
    firestore: db,
    storage: storage,
};

export default firebase;
