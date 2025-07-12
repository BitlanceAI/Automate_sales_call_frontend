import BackToTop from "./backToTop";
import HomePage from "./home/page";

export const metadata = {
  title: "Bitlance AI",
  description: "AI Powered Automation",
};

export default function Home() {
  return (
    <main>
      <HomePage />

      <BackToTop />
    </main>
  );
}
