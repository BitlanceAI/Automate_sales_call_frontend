import BackToTop from "../backToTop";
import CodeGeneratorPage from "./index";

export const metadata = {
  title: "Bitlance AI",
  description: "AI Powered Automation",
};
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
const CodeGeneratorLayout = () => {
  return (
    <>
      <CodeGeneratorPage />
      <BackToTop />
    </>
  );
};

export default CodeGeneratorLayout;
