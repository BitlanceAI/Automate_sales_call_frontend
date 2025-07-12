"use client";

import React, { useEffect } from "react";
import BackToTop from "../backToTop";
import VedioGeneratorPage from "./index";

import { auth, db } from "@/app/lib/firebaseClient";
import { useAppContext } from "@/context/Context";
import { setDoc, doc, addDoc, collection, serverTimestamp, deleteDoc, query, where, getDocs } from "firebase/firestore";



const VedioGeneratorLayout = () => {
  const { isLoggedIn } = useAppContext();

  useEffect(() => {
    const logVisit = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const q = query(
        collection(db, "history"),
        where("uid", "==", user.uid),
        where("page", "==", "Video Generator")
      );
      const snapshot = await getDocs(q);
      snapshot.forEach((docSnap) => deleteDoc(docSnap.ref)); // Remove old visits

      // Add new entry
      await addDoc(collection(db, "history"), {
        uid: user.uid,
        page: "Video Generator",
        timestamp: serverTimestamp(),
      });

      // Update user's last visited page
      await setDoc(
        doc(db, "users", user.uid),
        {
          lastVisited: "Video Generator",
          lastVisitedAt: serverTimestamp(),
        },
        { merge: true }
      );
    };

    if (isLoggedIn) logVisit();
  }, [isLoggedIn]);

  return (
    <>
      <VedioGeneratorPage />
      <BackToTop />
    </>
  );
};

export default VedioGeneratorLayout;