import BackToTop from "../backToTop";
import PrivacyPolicyPage from "./index";

export const metadata = {
  title: "Bitlance AI",
  description: "AI Powered Automation",
};

const PrivacyPolicyLayout = () => {
  return (
    <>
      <PrivacyPolicyPage />
      <BackToTop />
    </>
  );
};

export default PrivacyPolicyLayout;
