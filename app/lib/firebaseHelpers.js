// lib/firebaseHelpers.js
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/app/lib/firebaseClient";
import { auth } from "@/app/lib/firebaseClient";

/**
 * Save a history entry under the logged-in user's Firestore record
 * @param {Object} entry - Object containing { title, tool, result }
 */
export const saveUserHistory = async ({ title, tool, result }) => {
  const user = auth.currentUser;
  if (!user) {
    console.warn("No user is logged in");
    return;
  }

  try {
    const ref = collection(db, `users/${user.uid}/history`);
    await addDoc(ref, {
      title,
      tool,
      result,
      date: serverTimestamp(),
    });
  } catch (error) {
    console.error("Failed to save user history:", error);
  }
};