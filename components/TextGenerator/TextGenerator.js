"use client";

import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "@/lib/firebase";
import { auth } from "@/lib/firebase"; // client-side auth

// ✅ API call to generate blog
async function generateBlog(data) {
  if (!auth.currentUser) throw new Error("User not logged in");
  const token = await auth.currentUser.getIdToken();

  const res = await fetch("/api/blog/generateBlog", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errData = await res.json();
    throw new Error(errData.error || "Failed to generate blog");
  }

  return res.json();
}

// ✅ API call to upload blog to WordPress
async function uploadToWordPress({ wpUrl, wpUser, wpPassword, title, content,imageUrl }) {
  const res = await fetch("/api/blog/uploadToWP", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ wpUrl, wpUser, wpPassword, title, content,imageUrl }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Failed to upload to WordPress");
  }

  return data;
}


export default function TextGenerator() {
  const [formData, setFormData] = useState({
    topic: "",
    keywords: "",
    language: "English",
    style: "Professional",
    length: "Medium (500-1000 words)",
    audience: "General Public",
    variants: 1,
    wpUrl: "",
    wpUser: "",
    wpPassword: "",
  });

  const [user, setUser] = useState(null);
  const [article, setArticle] = useState("");
  const [articles, setArticles] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [seoTitle, setSeoTitle] = useState("");


  useEffect(() => {
    const authInstance = getAuth(app);
    const unsubscribe = onAuthStateChanged(authInstance, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        try {
          const token = await currentUser.getIdToken();
          const res = await fetch("/api/blog/getArticles", {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (!res.ok) throw new Error("Failed to fetch articles");
          const data = await res.json();
          setArticles(data.sort((a, b) => b.createdAt - a.createdAt));
        } catch (err) {
          console.error(err);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please login first.");
      return;
    }

    try {
      const res = await generateBlog({
        ...formData,
        userId: user.uid,
      });

      setArticle(res.articleHTML);
      setSeoTitle(res.seoTitle || formData.topic);
      setImageUrl(res.imageUrl || "");
      setArticles((prev) => [
        { id: res.id, article: res.articleHTML, topic: formData.topic, seoTitle: res.seoTitle,imageUrl: res.imageUrl },
        ...prev,
      ]);
    } catch (err) {
      console.error("Error:", err);
      alert(`Failed to generate blog: ${err.message}`);
    }
  };

  const handleUploadToWordPress = async () => {
    if (!formData.wpUrl || !formData.wpUser || !formData.wpPassword) {
      alert("Please provide WordPress credentials.");
      return;
    }
    setUploading(true);
    try {
      const res = await uploadToWordPress({
        wpUrl: formData.wpUrl,
        wpUser: formData.wpUser,
        wpPassword: formData.wpPassword,
        title: seoTitle,
        content: article,
        imageUrl,
      });
      alert(`✅ Uploaded to WordPress: ${res.link}`);
    } catch (err) {
      console.error(err);
      alert(`❌ Upload failed: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-center mb-10 text-indigo-700">
        SEO Blog Generator
      </h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-black p-8 rounded-lg shadow-md space-y-6">
        {/* Topic */}
        <div>
          <label className="block font-semibold mb-1">Topic</label>
          <input
            type="text"
            name="topic"
            placeholder="Enter your article topic..."
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Keywords */}
        <div>
          <label className="block font-semibold mb-1">Keywords (Comma Separated)</label>
          <input
            type="text"
            name="keywords"
            placeholder="Add relevant keywords..."
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Language & Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-semibold mb-1">Language</label>
            <select name="language" value={formData.language} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg">
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
              <option>German</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-1">Style</label>
            <select name="style" value={formData.style} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg">
              <option>Professional</option>
              <option>Casual</option>
              <option>Technical</option>
              <option>Conversational</option>
            </select>
          </div>
        </div>

        {/* Length & Audience */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-semibold mb-1">Article Length</label>
            <select
              name="length"
              value={formData.length}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option>Short (300-500 words)</option>
              <option>Medium (500-1000 words)</option>
              <option>Long (1000-2000 words)</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1">Target Audience</label>
            <select
              name="audience"
              value={formData.audience}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option>General Public</option>
              <option>Professionals</option>
              <option>Students</option>
              <option>Developers</option>
            </select>
          </div>
        </div>

     
        {/* WordPress Integration */}
        <div className="mt-6 border-t pt-6">
          <h2 className="text-xl font-semibold mb-4 text-indigo-700">WordPress Integration</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block font-semibold mb-1">WordPress URL</label>
              <input type="text" name="wpUrl" value={formData.wpUrl} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block font-semibold mb-1">Username</label>
              <input type="text" name="wpUser" value={formData.wpUser} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block font-semibold mb-1">Password</label>
              <input type="password" name="wpPassword" value={formData.wpPassword} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" />
            </div>
          </div>
        </div>

        <button type="submit" className="mt-6 w-full bg-purple-900 hover:bg-indigo-700 text-black font-semibold px-6 py-3 rounded-lg">
          Generate Article
        </button>
      </form>


      {/* Generated Article */}
      {article && (
        <div className="mt-10 bg-indigo-50 p-6 rounded-lg shadow-md border-l-4 border-indigo-600">
          <h2 className="text-2xl font-bold mb-4 text-indigo-700">📝 Generated Article</h2>
          {seoTitle && (
  <div className="mt-4 p-3 bg-green-50 border rounded">
    <strong>SEO Optimized Title:</strong> {seoTitle}
  </div>
)}
          {imageUrl && <img src={imageUrl} alt="Blog" className="mb-4 w-full rounded-md" />}
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: article }} />
          <button
            onClick={handleUploadToWordPress}
            disabled={uploading}
            className="mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg"
          >
            {uploading ? "Uploading..." : "Upload to WordPress"}
          </button>
        </div>
      )}

      {/* Saved Articles */}
      {user && articles.length > 0 && (
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4 text-indigo-700">📚 My Saved Articles</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {articles.map((a) => (
              <div key={a.id} className="bg-white p-5 rounded-lg shadow border-l-4 border-indigo-500">
                <h3 className="font-semibold text-lg mb-3 text-indigo-600">{a.topic}</h3>
                {a.imageUrl && <img src={a.imageUrl} alt="Blog" className="mb-3 w-full rounded-md" />}
                <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: a.article }} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
