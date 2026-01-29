"use client";

import { useState } from "react";

export default function CallGptPage() {
  const [status, setStatus] = useState("Idle");

  const startCall = async () => {
    setStatus("Calling...");
    try {
      const res = await fetch("/api/start-call", { method: "POST" });
      const data = await res.json();
      if (res.ok) {
        setStatus("✅ Call initiated successfully");
      } else {
        setStatus(`❌ Call failed: ${data.error}`);
      }
    } catch (err) {
      console.error(err);
      setStatus("❌ Error starting call.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-10">
      <h1 className="text-2xl font-bold mb-4">📞 Call Lodha AI Agent</h1>
      <button
        onClick={startCall}
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Start Call
      </button>
      <p className="mt-6 text-sm text-gray-600">{status}</p>
    </div>
  );
}