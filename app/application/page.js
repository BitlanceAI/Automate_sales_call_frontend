import BackToTop from "../backToTop";
import ApplicationsPage from "./index";

export const metadata = {
  title: "Bitlance AI",
  description: "AI Powered Automation",
};

const ApplicationsLayout = () => {
  return (
    <>
      <ApplicationsPage />
      <BackToTop />
    </>
  );
};

export default ApplicationsLayout;
