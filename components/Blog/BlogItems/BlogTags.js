"use client";

import React from "react";

const BlogTags = ({ tags }) => {
  const extractArrayFromString = (str) => {
    if (!str) return [];
    if (Array.isArray(str)) return str;

    const stringValue = String(str);
    let cleaned = stringValue.replace(/^"(.*)"$/, "$1");
    const bracketMatch = cleaned.match(/\[(.*)\]/);

    if (bracketMatch) {
      return bracketMatch[1]
        .split(",")
        .map((item) => item.trim().replace(/^["']|["']$/g, ""))
        .filter((item) => item.length > 0);
    }

    return [cleaned];
  };

  // Handle both Firebase sidebar array-of-objects and post.tags string
  let parsedTags = [];
  if (Array.isArray(tags) && tags.length && tags[0]?.name) {
    parsedTags = tags.map((t) => t.name);
  } else {
    parsedTags = extractArrayFromString(tags);
  }

  return (
    <div className="inner">
      <div className="tagcloud">
        {parsedTags.map((tag, index) => (
          <a href="#" key={index}>
            {tag}
          </a>
        ))}
      </div>
    </div>
  );
};

export default BlogTags;