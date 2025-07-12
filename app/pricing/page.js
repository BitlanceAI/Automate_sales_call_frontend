import BackToTop from "../backToTop";
import PricingPage from "./index";

export const metadata = {
  title: "Bitlance AI",
  description: "AI Powered Automation",
};

const PricingLayout = () => {
  return (
    <>
      <PricingPage />
      <BackToTop />
    </>
  );
};

export default PricingLayout;
