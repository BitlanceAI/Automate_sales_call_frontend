import BackToTop from "../backToTop";
import HelpFaqPage from "./index";

export const metadata = {
  title: "Help || Bitlance AI",
  description: "AI Powered Automation",
};

const HelpFaqLayout = () => {
  return (
    <>
      <HelpFaqPage />
      <BackToTop />
    </>
  );
};

export default HelpFaqLayout;
