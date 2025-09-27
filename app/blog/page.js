import BackToTop from "../backToTop";
import BlogPage from "./index";

export const metadata = {
  title: "Blogs - Bitlance AI",
  description: "Blogs - Bitlance AI",
};

const BlogLayout = () => {
  return (
    <>
      <BlogPage />
      <BackToTop />
    </>
  );
};

export default BlogLayout;
