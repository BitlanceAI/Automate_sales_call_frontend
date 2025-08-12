// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDlN5J2tlxo2rJ9WaHWtmK_HWNKCmPjGAE",
  authDomain: "automate-sales-call.firebaseapp.com",
  projectId: "automate-sales-call",
  storageBucket: "automate-sales-call.firebasestorage.app",
  messagingSenderId: "100854714204",
  appId: "1:100854714204:web:c11b7b16f05efe2e063b99",
  measurementId: "G-JFNVQ2FCTY"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const db1 = getFirestore(app);
export default app;
//