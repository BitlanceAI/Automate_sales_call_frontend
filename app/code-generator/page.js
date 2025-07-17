"use client";

import { useEffect } from "react";
import { addDoc, collection, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/app/lib/firebaseClient";
import { useAppContext } from "@/context/Context";
import BackToTop from "../backToTop";
import CodeGeneratorPage from "./index";

const CodeGeneratorLayout = () => {
  const { isLoggedIn } = useAppContext();

  useEffect(() => {
    const logVisit = async () => {
      const user = auth.currentUser;
      if (!user) return;

      await addDoc(collection(db, "history"), {
        uid: user.uid,
        page: "Automate Sales Call",
        timestamp: serverTimestamp(),
      });

      await setDoc(
        doc(db, "users", user.uid),
        {
          lastVisited: "Automate Sales Call",
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
      <CodeGeneratorPage />
      <BackToTop />
    </>
  );
};

export default CodeGeneratorLayout;
