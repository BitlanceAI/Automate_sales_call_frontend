"use client";

import { useEffect } from "react";
import { auth, db } from "@/lib/firebase"; // here `db` should be Realtime DB
import { ref, push, set, serverTimestamp } from "firebase/database";
import { useAppContext } from "@/context/Context";
import TextGeneratorInner from "./index";

const TextGeneratorPage = () => {
  const { isLoggedIn } = useAppContext();

  useEffect(() => {
    const logVisit = async () => {
      const user = auth.currentUser;
      if (!user) return;

      // Add entry in Realtime DB history
      await push(ref(db, `history/${user.uid}`), {
        page: "SEO Automation",
        timestamp: Date.now(),
      });

      // Update user last visited info
      await set(ref(db, `users/${user.uid}/lastVisit`), {
        page: "SEO Automation",
        lastVisitedAt: Date.now(),
      });
    };

    if (isLoggedIn) {
      logVisit();
    }
  }, [isLoggedIn]);

  return <TextGeneratorInner />;
};

export default TextGeneratorPage;
