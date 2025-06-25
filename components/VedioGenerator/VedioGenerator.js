"use client";

import React, { useEffect } from "react";
import Head from "next/head";

const VideoGenerator = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "module";
    script.innerHTML = `
      import { createChat } from 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js';
      createChat({
        webhookUrl: 'https://biltance.app.n8n.cloud/webhook/c838d877-1088-45f5-adad-5617b308b35d/chat',
        container: document.getElementById('n8n-chat')
      });
    `;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css"
        />
      </Head>

      <div
        style={{
          maxWidth: 900,
          margin: "2rem auto",
          borderRadius: 8,
          display: "flex",
          flexDirection: "column",
          height: "80vh",
          backgroundColor: "#1f2937", // dark slate gray background
          boxShadow: "0 4px 12px rgba(0,0,0,0.7)",
          border: "1px solid #374151", // slightly lighter border
          color: "#d1d5db", // light gray text
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }}
      >
        {/* Header */}
        <header
          style={{
            padding: "1rem 1.5rem",
            borderBottom: "1px solid #374151",
            backgroundColor: "#111827", // very dark background
            fontWeight: 600,
            fontSize: "1.25rem",
            color: "#f9fafb", // almost white text
          }}
        >
          Chatbot Automation
        </header>

        {/* Chat widget container */}
        <main
          id="n8n-chat"
          style={{
            flexGrow: 1,
            overflowY: "auto",
            padding: "1rem",
            backgroundColor: "#111827", // match header bg for consistency
            borderRadius: "0 0 8px 8px",
          }}
        />
      </div>
    </>
  );
};

export default VideoGenerator;