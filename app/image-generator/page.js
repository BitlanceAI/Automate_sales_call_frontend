"use client"; // ✅ Add this at the very top

import { useEffect } from "react";
import BackToTop from "../backToTop";
import ImageGeneratorPage from "./index";
import { auth, db } from "@/app/lib/firebaseClient";
import { addDoc, collection, setDoc, doc, serverTimestamp } from "firebase/firestore";
import { useAppContext } from "@/context/Context";

const ImageGeneratorLayout = () => {
  const { isLoggedIn } = useAppContext(); // ✅ Get context inside component

  useEffect(() => {
    const logVisit = async () => {
      const user = auth.currentUser;
      if (!user) return;

      await addDoc(collection(db, "history"), {
        uid: user.uid,
        page: "SMM Automation", // ✅ Change page name per tool
        timestamp: serverTimestamp(),
      });

      await setDoc(
        doc(db, "users", user.uid),
        {
          lastVisited: "SMM Automation",
          lastVisitedAt: serverTimestamp(),
        },
        { merge: true }
      );
    };

    if (isLoggedIn) {
      logVisit();
    }
  }, [isLoggedIn]);

  return (
    <>
      <ImageGeneratorPage />
      <BackToTop />
    </>
  );
};

export default ImageGeneratorLayout;
