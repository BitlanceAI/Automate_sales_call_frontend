import BackToTop from "../backToTop";
import ImageEditorPage from "./index";

export const metadata = {
  title: "Bitlance AI",
  description: "AI Powered Automation",
};

const ImageEditorLayout = () => {
  return (
    <>
      <ImageEditorPage />
      <BackToTop />
    </>
  );
};

export default ImageEditorLayout;
