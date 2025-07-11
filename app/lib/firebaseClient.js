// app/lib/firebaseClient.js
import app from "./firebase";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const db = getFirestore(app);
export { auth, googleProvider, db };




