import BackToTop from "../backToTop";
import SignupPage from "./index";

export const metadata = {
  title: "Bitlance AI",
  description: "AI Powered Automation",
};

const SignupLayout = () => {
  return (
    <>
      <SignupPage />
      <BackToTop />
    </>
  );
};

export default SignupLayout;
