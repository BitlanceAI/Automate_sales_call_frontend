"use client";

import { useEffect } from "react";
import { auth, db } from "@/app/lib/firebaseClient";
import { addDoc, collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useAppContext } from "@/context/Context";
import TextGeneratorInner from "./index";

const TextGeneratorPage = () => {
  const { isLoggedIn } = useAppContext();

  useEffect(() => {
    const logVisit = async () => {
      const user = auth.currentUser;
      if (!user) return;

      await addDoc(collection(db, "history"), {
        uid: user.uid,
        page: "SEO Automation",
        timestamp: serverTimestamp(),
      });

      await setDoc(
        doc(db, "users", user.uid),
        {
          lastVisited: "SEO Automation",
          lastVisitedAt: serverTimestamp(),
        },
        { merge: true }
      );
    };

    if (isLoggedIn) {
      logVisit();
    }
  }, [isLoggedIn]);

  return <TextGeneratorInner />;
};

export default TextGeneratorPage;