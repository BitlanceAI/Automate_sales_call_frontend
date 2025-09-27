"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import Categories from "../Blog/BlogItems/Categories";
import BlogPost from "../Blog/BlogItems/BlogPost";
import Archives from "../Blog/BlogItems/Archives";
import BlogTags from "../Blog/BlogItems/BlogTags";

const SingleBlog = ({ getBlog }) => {
  const router = useRouter();
  const [blogPost, setBlogPost] = useState(null);
  const [categories, setCategories] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarLoading, setSidebarLoading] = useState(true);
  
  console.log('getBlog object:', getBlog);
  
  const postSlug = getBlog?.blogId || getBlog?.slug;
  console.log('Looking for post with slug/id:', postSlug);

  // Firebase base URL - using your provided URL
  const FIREBASE_URL = 'https://seo-automation-a90f2-default-rtdb.firebaseio.com';

  // Helper function to safely extract array data from string - NEVER uses JSON.parse
  const extractArrayFromString = (str, fieldName = '') => {
    if (!str) return [];
    
    console.log(`Processing ${fieldName}:`, str);
    
    // If it's already an array, return it
    if (Array.isArray(str)) {
      return str;
    }
    
    // Convert to string if not already
    const stringValue = String(str);
    
    // Remove the outer quotes if they exist
    let cleaned = stringValue.replace(/^"(.*)"$/, '$1');
    
    // Extract content between square brackets using regex
    const bracketMatch = cleaned.match(/\[(.*)\]/);
    if (bracketMatch) {
      const content = bracketMatch[1];
      console.log(`Found bracketed content in ${fieldName}:`, content);
      
      // Split by comma and clean each item
      const items = content.split(',').map(item => {
        // Remove all types of quotes and trim
        return item.trim().replace(/^["']|["']$/g, '');
      }).filter(item => item.length > 0);
      
      console.log(`Extracted ${fieldName} items:`, items);
      return items;
    }
    
    // If no brackets, treat as single item
    console.log(`Using single item for ${fieldName}:`, cleaned);
    return [cleaned];
  };

  // Fetch blog post
  const fetchBlogPost = async (slug) => {
    try {
      setLoading(true);
      const response = await fetch(`${FIREBASE_URL}/posts.json`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch blog post');
      }
      
      const posts = await response.json();
      
      console.log('Received posts:', posts);
      console.log('Looking for slug:', slug);
      
      if (posts) {
        Object.entries(posts).forEach(([key, post]) => {
          console.log('Available slug:', post.slug, 'Key:', key);
        });
      }
      
      const foundPost = Object.entries(posts || {}).find(([key, post]) => 
        post.slug === slug || key === slug
      );
      
      if (foundPost) {
        const [postId, postData] = foundPost;
        console.log('Found post:', postData);
        setBlogPost({ id: postId, ...postData });
      } else {
        const availableSlugs = Object.values(posts || {}).map(post => post.slug);
        setError(`Blog post not found. Looking for: "${slug}". Available slugs: ${availableSlugs.join(', ')}`);
      }
    } catch (err) {
      setError(err.message);
      console.error('Error fetching blog post:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories from posts
  const fetchCategories = async () => {
    try {
      const response = await fetch(`${FIREBASE_URL}/posts.json`);
      if (response.ok) {
        const postsData = await response.json();
        if (postsData) {
          const categoriesMap = new Map();
          
          // Extract all categories from posts
          Object.values(postsData).forEach(post => {
            const postCategories = extractArrayFromString(post.categories, 'categories');
            
            postCategories.forEach(category => {
              if (category && category.trim()) {
                const cleanCategory = category.trim();
                if (categoriesMap.has(cleanCategory)) {
                  categoriesMap.set(cleanCategory, categoriesMap.get(cleanCategory) + 1);
                } else {
                  categoriesMap.set(cleanCategory, 1);
                }
              }
            });
          });
          
          // Convert to array format expected by Categories component
          const categoriesArray = Array.from(categoriesMap.entries()).map(([name, count], index) => ({
            id: index,
            name: name,
            slug: name.toLowerCase().replace(/\s+/g, '-'),
            count: count
          }));
          
          console.log('Final categories array:', categoriesArray);
          setCategories(categoriesArray);
        }
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  // Fetch recent posts from Firebase
  const fetchRecentPosts = async () => {
    try {
      const response = await fetch(`${FIREBASE_URL}/posts.json`);
      if (response.ok) {
        const postsData = await response.json();
        if (postsData) {
          const postsArray = Object.entries(postsData)
            .map(([id, post]) => ({ id, ...post }))
            .sort((a, b) => new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date))
            .slice(0, 5); // Get 5 most recent posts
          setRecentPosts(postsArray);
        }
      }
    } catch (err) {
      console.error('Error fetching recent posts:', err);
    }
  };

  // Fetch tags from posts
  const fetchTags = async () => {
    try {
      const response = await fetch(`${FIREBASE_URL}/posts.json`);
      if (response.ok) {
        const postsData = await response.json();
        if (postsData) {
          const tagsMap = new Map();
          
          // Extract all tags from posts
          Object.values(postsData).forEach(post => {
            const postTags = extractArrayFromString(post.tags, 'tags');
            
            postTags.forEach(tag => {
              if (tag && tag.trim()) {
                const cleanTag = tag.trim();
                if (tagsMap.has(cleanTag)) {
                  tagsMap.set(cleanTag, tagsMap.get(cleanTag) + 1);
                } else {
                  tagsMap.set(cleanTag, 1);
                }
              }
            });
          });
          
          // Convert to array format expected by BlogTags component
          const tagsArray = Array.from(tagsMap.entries()).map(([name, count], index) => ({
            id: index,
            name: name,
            slug: name.toLowerCase().replace(/\s+/g, '-'),
            count: count
          }));
          
          console.log('Final tags array:', tagsArray);
          setTags(tagsArray);
        }
      }
    } catch (err) {
      console.error('Error fetching tags:', err);
    }
  };

  // Fetch all sidebar data
  const fetchSidebarData = async () => {
    setSidebarLoading(true);
    try {
      await Promise.all([
        fetchCategories(),
        fetchRecentPosts(),
        fetchTags()
      ]);
    } catch (err) {
      console.error('Error fetching sidebar data:', err);
    } finally {
      setSidebarLoading(false);
    }
  };

  useEffect(() => {
    if (postSlug) {
      fetchBlogPost(postSlug);
      fetchSidebarData();
    }
  }, [postSlug]);

  useEffect(() => {
    if (!loading && !blogPost && !error) {
      router.push("/blog");
    }
  }, [blogPost, loading, error, router]);

  // Function to safely render HTML content
  const createMarkup = (htmlContent) => {
    return { __html: htmlContent };
  };

  // Function to extract publication date from content or use current date
  const getPublicationDate = () => {
    if (blogPost?.createdAt) {
      return new Date(blogPost.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
    if (blogPost?.date) {
      return new Date(blogPost.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
    return new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Get author name
  const getAuthorName = () => {
    return blogPost?.author || blogPost?.authorName || "Admin";
  };

  // Get post tags and categories - NO JSON.parse used here
  const getPostTags = () => {
    return extractArrayFromString(blogPost?.tags, 'post tags');
  };

  const getPostCategories = () => {
    return extractArrayFromString(blogPost?.categories, 'post categories');
  };

  // Handle comment form submission
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const comment = {
      name: formData.get('name'),
      email: formData.get('email'),
      website: formData.get('website'),
      message: formData.get('comment'),
      postId: blogPost.id,
      createdAt: new Date().toISOString()
    };

    try {
      const response = await fetch(`${FIREBASE_URL}/comments.json`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
      });

      if (response.ok) {
        alert('Comment submitted successfully!');
        e.target.reset();
      } else {
        alert('Failed to submit comment. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
      alert('Failed to submit comment. Please try again.');
    }
  };

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    const searchTerm = e.target.querySelector('input').value;
    if (searchTerm.trim()) {
      router.push(`/blog?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  if (loading) {
    return (
      <div className="rainbow-blog-section rainbow-section-gap-big bg-color-1">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="loading-spinner">
                <p>Loading...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rainbow-blog-section rainbow-section-gap-big bg-color-1">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="error-message">
                <h2>Error</h2>
                <p>{error}</p>
                <button 
                  className="btn-default"
                  onClick={() => router.push("/blog")}
                >
                  Return to Blog
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="rainbow-blog-section rainbow-section-gap-big bg-color-1">
        {blogPost && (
          <div className="container">
            <div className="row row--30">
              <div className="col-lg-8">
                <div className="rainbow-blog-details-area">
                  <div className="post-page-banner">
                    <div className="container">
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="content text-center">
                            {blogPost.image && (
                              <div className="thumbnail">
                                <Image
                                  className="w-100 radius"
                                  src={blogPost.image}
                                  width={790}
                                  height={445}
                                  alt={blogPost.title || "Blog Image"}
                                />
                              </div>
                            )}
                            <ul className="rainbow-meta-list">
                              <li>
                                <i className="feather-user me-2"></i>
                                <a href="#">{getAuthorName()}</a>
                              </li>
                              <li>
                                <i className="feather-calendar me-2"></i>
                                {getPublicationDate()}
                              </li>
                              {getPostCategories().length > 0 && (
                                <li>
                                  <i className="feather-tag me-2"></i>
                                  <span>{getPostCategories().join(', ')}</span>
                                </li>
                              )}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="blog-details-content pt--40 rainbow-section-gapBottom">
                    <div className="container">
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="content">
                            <h1 className="title">{blogPost.title}</h1>
                            
                            {blogPost.excerpt && (
                              <div className="excerpt mb-4">
                                <p className="lead">{blogPost.excerpt}</p>
                              </div>
                            )}
                            
                            {/* Render the Firebase content as HTML */}
                            <div 
                              dangerouslySetInnerHTML={createMarkup(blogPost.content)}
                            />

                            

                            <div className="rainbow-comment-form pt--60">
                              <div className="inner">
                                <div className="section-title">
                                  <span className="subtitle">
                                    Have a Comment?
                                  </span>
                                  <h2 className="title">Leave a Reply</h2>
                                </div>
                                <form className="mt--40" onSubmit={handleCommentSubmit}>
                                  <div className="row">
                                    <div className="col-lg-6 col-md-12 col-12">
                                      <div className="rnform-group">
                                        <input 
                                          type="text" 
                                          name="name"
                                          placeholder="Name" 
                                          required 
                                        />
                                      </div>
                                      <div className="rnform-group">
                                        <input
                                          type="email"
                                          name="email"
                                          placeholder="Email"
                                          required
                                        />
                                      </div>
                                      <div className="rnform-group">
                                        <input
                                          type="url"
                                          name="website"
                                          placeholder="Website (Optional)"
                                        />
                                      </div>
                                    </div>
                                    <div className="col-lg-6 col-md-12 col-12">
                                      <div className="rnform-group">
                                        <textarea 
                                          name="comment"
                                          placeholder="Comment"
                                          required
                                        ></textarea>
                                      </div>
                                    </div>
                                    <div className="col-lg-12">
                                      <div className="blog-btn">
                                        <button
                                          type="submit"
                                          className="btn-default"
                                        >
                                          <span>SEND MESSAGE</span>
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="col-lg-4 mt_md--40 mt_sm--40">
                <aside className="rainbow-sidebar">
                  <div className="rbt-single-widget widget_search mt--40">
                    <div className="inner">
                      <form className="blog-search" onSubmit={handleSearch}>
                        <input type="text" placeholder="Search ..." />
                        <button type="submit" className="search-button">
                          <i className="feather-search"></i>
                        </button>
                      </form>
                    </div>
                  </div>
                  
                  {sidebarLoading ? (
                    <div className="text-center mt--40">
                      <p>Loading sidebar...</p>
                    </div>
                  ) : (
                    <>
                      {categories.length > 0 && (
                        <div className="rbt-single-widget widget_categories mt--40">
                          <h3 className="title">Categories</h3>
                          <Categories category={categories} />
                        </div>
                      )}
                      
                      {recentPosts.length > 0 && (
                        <div className="rbt-single-widget widget_recent_entries mt--40">
                          <h3 className="title">Recent Posts</h3>
                          <BlogPost blogpost={recentPosts} />
                        </div>
                      )}
                      
                      {recentPosts.length > 0 && (
                        <div className="rbt-single-widget widget_archive mt--40">
                          <h3 className="title">Archives</h3>
                          <Archives blogarc={recentPosts} />
                        </div>
                      )}
                      
                      {tags.length > 0 && (
                        <div className="rbt-single-widget widget_tag_cloud mt--40">
                          <h3 className="title">Tags</h3>
                          <BlogTags tags={tags} />
                        </div>
                      )}
                    </>
                  )}
                </aside>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SingleBlog;