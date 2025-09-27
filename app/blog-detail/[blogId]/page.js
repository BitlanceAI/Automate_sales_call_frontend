import Head from "next/head";
import BackToTop from "@/app/backToTop";
import BlogDetailsPage from "../index";

// Fetch blog post by ID
async function getBlogPost(blogId) {
  try {
    const response = await fetch(
      `https://seo-automation-a90f2-default-rtdb.firebaseio.com/posts/${blogId}.json`,
      { next: { revalidate: 3600 } }
    );
    const data = await response.json();
    if (!data) return null;
    return { id: blogId, ...data };
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }
}

// ✅ Dynamic Metadata
export async function generateMetadata({ params }) {
  const blogId = params.blogId; // direct access
  const post = await getBlogPost(blogId);

  if (!post) {
    return {
      title: "Blog Post Not Found - Bitlance AI",
      description: "The requested blog post could not be found.",
    };
  }

  const plainTextContent = post.content.replace(/<[^>]*>/g, "").substring(0, 160);

  return {
    title: `${post.title} - Bitlance AI`,
    description: plainTextContent + "...",
    openGraph: {
      title: post.title,
      description: plainTextContent + "...",
      images: [post.image],
      type: "article",
      publishedTime: post.date,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: plainTextContent + "...",
      images: [post.image],
    },
  };
}

// ✅ Server Component for Blog Details
const BlogDetailsLayout = async ({ params }) => {
  const blogId = params.blogId;
  const post = await getBlogPost(blogId);

  if (!post) {
    return (
      <>
        <Head>
          <title>Blog Post Not Found - Bitlance AI</title>
          <meta name="description" content="The requested blog post could not be found." />
        </Head>
        <p>Blog not found</p>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{post.title} - Bitlance AI</title>
        <meta
          name="description"
          content={post.content.replace(/<[^>]*>/g, "").substring(0, 160) + "..."}
        />
      </Head>

      <BlogDetailsPage params={params} />
      <BackToTop />
    </>
  );
};

export default BlogDetailsLayout;
