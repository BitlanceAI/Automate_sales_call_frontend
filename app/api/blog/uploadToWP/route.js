import { NextResponse } from "next/server";
import fetch from "node-fetch";

export async function POST(req) {
  try {
    const { wpUrl, wpUser, wpPassword, title, content, imageUrl } = await req.json();

    const authHeader = "Basic " + Buffer.from(`${wpUser}:${wpPassword}`).toString("base64");

    let featuredMediaId = null;

    // Step 1: Upload image if provided
    if (imageUrl) {
      const imgRes = await fetch(imageUrl);
      const imgBuffer = await imgRes.arrayBuffer();

      const uploadRes = await fetch(`${wpUrl}/wp-json/wp/v2/media`, {
        method: "POST",
        headers: {
          "Authorization": authHeader,
          "Content-Disposition": `attachment; filename="blog-image.jpg"`,
          "Content-Type": "image/jpeg", // adjust if PNG
        },
        body: Buffer.from(imgBuffer),
      });

      if (!uploadRes.ok) {
        const err = await uploadRes.text();
        console.error("Image upload failed:", err);
      } else {
        const imgData = await uploadRes.json();
        featuredMediaId = imgData.id;
      }
    }

    // ✅ Step 2: Create post
    const postRes = await fetch(`${wpUrl}/wp-json/wp/v2/posts`, {
      method: "POST",
      headers: {
        "Authorization": authHeader,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        content,
        status: "publish",
        featured_media: featuredMediaId || undefined,
      }),
    });

    if (!postRes.ok) {
      const err = await postRes.text();
      throw new Error(err);
    }

    const postData = await postRes.json();
    return NextResponse.json({ link: postData.link }, { status: 200 });

  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
