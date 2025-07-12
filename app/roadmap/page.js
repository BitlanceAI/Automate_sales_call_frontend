import BackToTop from "../backToTop";
import RoadmapPage from "./index";

export const metadata = {
  title: "Bitlance AI",
  description: "AI Powered Automation",
};
const RoadmapLayout = () => {
  return (
    <>
      <RoadmapPage />
      <BackToTop />
    </>
  );
};

export default RoadmapLayout;
