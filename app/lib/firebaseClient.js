// app/lib/firebaseClient.js
import app from "./firebase";
import { getAuth, GoogleAuthProvider,FacebookAuthProvider  } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const db = getFirestore(app);
const facebookProvider = new FacebookAuthProvider(); 
export { auth, googleProvider, db ,facebookProvider};




