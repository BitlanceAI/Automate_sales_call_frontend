import BackToTop from "../backToTop";
import AppearancePage from "./index";

export const metadata = {
  title: "Bitlance AI",
  description: "AI Powered Automation",
};

const AppearanceLayout = () => {
  return (
    <>
      <AppearancePage />
      <BackToTop />
    </>
  );
};

export default AppearanceLayout;
