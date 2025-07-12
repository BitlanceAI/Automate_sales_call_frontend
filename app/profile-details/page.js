import BackToTop from "../backToTop";
import ProfileDetailsPage from "./index";

export const metadata = {
  title: "Bitlance AI",
  description: "AI Powered Automation",
};

const ProfileDetailsLayout = () => {
  return (
    <>
      <ProfileDetailsPage />
      <BackToTop />
    </>
  );
};

export default ProfileDetailsLayout;
