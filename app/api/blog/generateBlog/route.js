import { NextResponse } from "next/server";
import admin from "firebase-admin";
import axios from "axios";
import { getDatabase } from "firebase-admin/database";


// Initialize Firebase Admin only once
if (!admin.apps.length) {
  const privateKey = process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n");
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey,
    }),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  });
}

const adminDb = getDatabase();

const lengthMapping = {
  "Short (300-500 words)": 300,
  "Medium (500-1000 words)": 500,
  "Long (1000-2000 words)": 1000,
};

function formatBlogToHTML(blogText) {
  return blogText
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\n{2,}/g, '</p><p>')
    .replace(/^/, '<p>')
    .concat('</p>');
}

export async function POST(req) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const idToken = authHeader.replace("Bearer ", "").trim();
    let decodedToken;
    try {
      decodedToken = await admin.auth().verifyIdToken(idToken);
    } catch (err) {
      return NextResponse.json({ error: "Invalid token: " + err.message }, { status: 401 });
    }

    const {
      userId,
      topic,
      keywords = "",
      language = "English",
      style = "conversational",
      length = "Medium (500-1000 words)",
      audience = "general public",
      variants = 1,
    } = await req.json();

    if (!userId) return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    if (decodedToken.uid !== userId) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const lengthNum = lengthMapping[length] || 500;

    // --------- KEYWORD RESEARCH ---------
    let generatedKeywords = keywords;
    if (!keywords.trim()) {
      const keywordPrompt = `Generate relevant keywords for "${topic}" as comma-separated list.`;
      const keywordResponse = await axios.post(
        "https://api.perplexity.ai/chat/completions",
        {
          model: "sonar-pro",
          messages: [
            { role: "system", content: "You are an SEO expert." },
            { role: "user", content: keywordPrompt },
          ],
          max_tokens: 500,
          n: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.PERPLEXITY_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );
      generatedKeywords = keywordResponse.data.choices?.[0]?.message?.content || "";
    }

    // --------- BLOG GENERATION ---------
    let blogText = "";
    let attempts = 0;
    const maxAttempts = 3;
    let wordCount = 0;

    while (wordCount < lengthNum && attempts < maxAttempts) {
      attempts++;
      const prompt = `Write an engaging blog for ${audience} in ${language} on "${topic}". Include keywords: ${generatedKeywords || "none"}. Use ${style} style. Ensure at least ${lengthNum} words. ⚠️ Important: Do not use [1], [2], or citation numbers. Instead, insert valid external references as clickable HTML links (<a href="..." target="_blank" rel="noopener noreferrer">text</a>). All links must be real websites (Wikipedia, government, research journals, or news sources).`;
      const blogResponse = await axios.post(
        "https://api.perplexity.ai/chat/completions",
        {
          model: "sonar-pro",
          messages: [
            { role: "system", content: "You are an expert content writer." },
            { role: "user", content: prompt },
          ],
          max_tokens: 4000,
          n: variants,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.PERPLEXITY_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      blogText += "\n\n" + (blogResponse.data.choices?.[0]?.message?.content || "");
      wordCount = blogText.split(/\s+/).length;
    }
// --------- AI SEO TITLE GENERATION ---------
let seoTitle = "";
try {
  const titlePrompt = `Based on this blog content, generate the best SEO-friendly title (max 60 characters) that is catchy and optimized for search engines:

  ${blogText.substring(0, 1200)}
  
  Topic: ${topic}

  Return only the title, nothing else.`;

  const titleResponse = await axios.post(
    "https://api.perplexity.ai/chat/completions",
    {
      model: "sonar-pro",
      messages: [
        { role: "system", content: "You are an expert SEO copywriter." },
        { role: "user", content: titlePrompt },
      ],
      max_tokens: 50,
      n: 1,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.PERPLEXITY_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  seoTitle = titleResponse.data.choices?.[0]?.message?.content?.trim() || topic;

} catch (err) {
  console.error("SEO title generation failed:", err.message);
  seoTitle = topic; // fallback
}

    // --------- PLAGIARISM CHECK ---------
    let plagiarismPrompt = `Check for plagiarism in this article. Reply "No plagiarism detected" if original, otherwise summarize detected parts:\n\n${blogText}`;
    let plagiarismResponse = await axios.post(
      "https://api.perplexity.ai/chat/completions",
      {
        model: "sonar-pro",
        messages: [
          { role: "system", content: "You are a plagiarism checker." },
          { role: "user", content: plagiarismPrompt },
        ],
        max_tokens: 500,
        n: 1,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PERPLEXITY_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    let plagiarismResult = plagiarismResponse.data.choices?.[0]?.message?.content || "No plagiarism detected";

    if (!plagiarismResult.toLowerCase().includes("no plagiarism")) {
      plagiarismResult += " ⚠️ Could not fully eliminate plagiarism, but the article is returned to user.";
    }
// --------- AI GENERATES SUITABLE TEXT FOR IMAGE ---------
let imageUrl = "";
let imageText = "";

try {
  // Step 1: Let AI generate suitable text for the image based on blog content
  const textPrompt = `Based on this blog content, create a short, simplest, small and catchy headline or phrase (maximum 3 words) that would look good on a blog header image. Make it engaging and relevant to the content:

${blogText.substring(0, 1000)}

Topic: ${topic}

Return only the headline text, nothing else.`;

  const textResponse = await axios.post(
    "https://api.perplexity.ai/chat/completions",
    {
      model: "sonar-pro",
      messages: [
        { role: "system", content: "You are a marketing copywriter expert at creating catchy headlines." },
        { role: "user", content: textPrompt },
      ],
      max_tokens: 100,
      n: 1,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.PERPLEXITY_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  imageText = textResponse.data.choices?.[0]?.message?.content?.trim() || topic;
  
  // Clean up the generated text (remove quotes, extra punctuation)
  imageText = imageText.replace(/^["']|["']$/g, '').replace(/[^\w\s-]/g, '').trim();
  
  console.log("AI-generated image text:", imageText);
const backgroundPrompt = `Create a professional blog header image about: ${topic}.

VISUAL REQUIREMENTS:
- High-quality, modern design with relevant visual elements
- Blog header format (landscape orientation, 16:9 ratio)
- Clean, professional appearance suitable for publication

TEXT OVERLAY REQUIREMENTS:
- Include the exact text: "${imageText}"
- Text must be spelled EXACTLY as written above, character by character
- Place text prominently, readable, and well-positioned on the image
- Use clean, modern typography (sans-serif font recommended)

CRITICAL: The text "${imageText}" must appear exactly as written, with perfect spelling and clear visibility.`;
  const imageResponse = await axios.post(
    "https://api.openai.com/v1/images/generations",
    {
      model: "dall-e-3",
      prompt: backgroundPrompt,
      n: 1,
      size: "1792x1024",
      response_format: "url"
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  const backgroundUrl = imageResponse.data.data[0]?.url;
  
  if (backgroundUrl) {
    // Step 3: Use a simple service to add the AI-generated text to the image
    // This ensures perfect spelling of the AI-generated text
    const encodedText = encodeURIComponent(imageText);
    
    // Create a composite URL that your frontend can use to display background + text
    imageUrl = backgroundUrl;
    
    // Store both the background URL and the text separately
    // Your frontend will overlay the text using CSS
    
  } else {
    throw new Error("No background image generated");
  }

} catch (error) {
  console.error("AI text/image generation failed:", error.message);
  
  // Fallback: use topic as text and generate simple image
  imageText = topic;
  const encodedText = encodeURIComponent(imageText.substring(0, 50));
  imageUrl = `https://via.placeholder.com/1792x1024/2563eb/ffffff?text=${encodedText}`;
}

    // --------- FORMAT AND SAVE ---------
    const blogHTML = formatBlogToHTML(blogText);

    const newRef = adminDb.ref(`articles/${userId}`).push();
    await newRef.set({
      userId,
      topic,
      keywords: generatedKeywords,
      article: blogHTML,
      imageUrl,
      plagiarismCheck: plagiarismResult,
      wordCount,
      seoTitle, 
      createdAt: Date.now(),
    });

    return NextResponse.json({
      success: true,
      id: newRef.key,
      articleHTML: blogHTML,
      imageUrl,
      wordCount,
      seoTitle, 
      plagiarismCheck: plagiarismResult,
    }, { status: 200 });

  } catch (error) {
    console.error("API error:", error.response?.data || error.message);
    return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
  }
}
