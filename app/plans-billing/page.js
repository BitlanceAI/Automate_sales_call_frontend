import BackToTop from "../backToTop";
import PlansBillingPage from "./index";

export const metadata = {
  title: "Bitlance AI",
  description: "AI Powered Automation",
};

const PlansBillingLayout = () => {
  return (
    <>
      <PlansBillingPage />
      <BackToTop />
    </>
  );
};

export default PlansBillingLayout;
