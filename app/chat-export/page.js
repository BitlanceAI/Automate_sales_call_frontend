import BackToTop from "../backToTop";
import ChatExportPage from "./index";

export const metadata = {
  title: "Bitlance AI",
  description: "AI Powered Automation",
};

const ChatExportLayout = () => {
  return (
    <>
      <ChatExportPage />
      <BackToTop />
    </>
  );
};

export default ChatExportLayout;
