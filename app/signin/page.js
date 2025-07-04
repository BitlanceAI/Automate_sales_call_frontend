import BackToTop from "../backToTop";
import SigninPage from "./index";

export const metadata = {
  title: "Sign In - || AiWave - AI SaaS Website NEXTJS15 UI Kit",
  description: "AiWave - AI SaaS Website NEXTJS15 UI Kit",
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
