import BackToTop from "../backToTop";
import SessionsPage from "./index";

export const metadata = {
  title: "Bitlance AI",
  description: "AI Powered Automation",
};

const SessionsLayout = () => {
  return (
    <>
      <SessionsPage />
      <BackToTop />
    </>
  );
};

export default SessionsLayout;
