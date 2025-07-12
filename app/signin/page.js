import BackToTop from "../backToTop";
import SigninPage from "./index";

export const metadata = {
  title: "Bitlance AI",
  description: "AI Powered Automation",
};

const SigninLayout = () => {
  return (
    <>
      <SigninPage />
      <BackToTop />
    </>
  );
};

export default SigninLayout;
