import BackToTop from "../backToTop";
import ReleaseNotesPage from "./index";

export const metadata = {
  title: "Bitlance AI",
  description: "AI Powered Automation",
};

const ReleaseNotesLayout = () => {
  return (
    <>
      <ReleaseNotesPage />
      <BackToTop />
    </>
  );
};

export default ReleaseNotesLayout;
