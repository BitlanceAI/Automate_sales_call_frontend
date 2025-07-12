import BackToTop from "../backToTop";
import EmailGeneratorPage from "./index";

export const metadata = {
  title: "Bitlance AI",
  description: "AI Powered Automation",
};

const EmailGeneratorLayout = () => {
  return (
    <>
      <EmailGeneratorPage />
      <BackToTop />
    </>
  );
};

export default EmailGeneratorLayout;
