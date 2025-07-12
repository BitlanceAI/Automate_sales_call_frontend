import BackToTop from "../backToTop";
import ContactPage from "./index";

export const metadata = {
  title: "Bitlance AI",
  description: "AI Powered Automation",
};

const ContactLayout = () => {
  return (
    <>
      <ContactPage />
      <BackToTop />
    </>
  );
};

export default ContactLayout;
