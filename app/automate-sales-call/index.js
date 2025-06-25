"use client";

import { useState } from "react";

const AutomateSalesCallTool = () => {
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const startCall = async () => {
    setIsLoading(true);
    setStatus("📞 Initiating call...");
    try {
      const res = await fetch("/api/start-call", {
        method: "POST",
      });
      const data = await res.json();
      if (res.ok) {
        setStatus(`✅ Call started: ${data.sid || "Check Twilio logs"}`);
      } else {
        setStatus(`❌ Call failed: ${data.error}`);
      }
    } catch (err) {
      console.error(err);
      setStatus("❌ An unexpected error occurred.");
    }
    setIsLoading(false);
  };

  return (
    <div className="rbt-card variation-01 p-8 max-w-2xl mx-auto mt-10 bg-white dark:bg-black border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg">
      <div className="rbt-card-body text-center">
        <h4 className="rbt-card-title text-2xl font-semibold mb-4">
          Automate Sales Call
        </h4>

        <p className="text-base text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
          Start an outbound call using our AI-powered sales agent. The call includes live GPT conversation and text-to-speech responses, powered by Twilio.
        </p>

        <button
          onClick={startCall}
          disabled={isLoading}
          className="btn btn-primary px-6 py-2 text-white rounded-md"
        >
          {isLoading ? "Calling..." : "Start Outbound Call"}
        </button>

        <div className="mt-6 text-sm text-gray-600 dark:text-gray-400 min-h-[24px]">
          {status && <p>{status}</p>}
        </div>

        <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-4 text-xs text-gray-400">
          * Only verified numbers (via Twilio trial) will receive calls. Contact admin to verify a number.
        </div>
      </div>
    </div>
  );
};

export default AutomateSalesCallTool;