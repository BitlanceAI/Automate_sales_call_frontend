"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/Context";
import { doc, setDoc, serverTimestamp, collection, addDoc } from "firebase/firestore";
import { db, auth } from "@/app/lib/firebaseClient";

import PopupMobileMenu from "@/components/Header/PopUpMobileMenu";
import BackToTop from "@/app/backToTop";
import LeftDashboardSidebar from "@/components/Header/LeftDashboardSidebar";
import HeaderDashboard from "@/components/Header/HeaderDashboard";
import RightDashboardSidebar from "@/components/Header/RightDashboardSidebar";
import Modal from "@/components/Common/Modal";
import StaticbarDashboard from "@/components/Common/StaticBarDashboard";
import SignIn from "@/components/SignIn/SignIn";
import SignUp from "@/components/SignUp/SignUp";

import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

const AutomateSalesCallPage = () => {
  const [step, setStep] = useState("loading");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [status, setStatus] = useState("");
  const [callHistory, setCallHistory] = useState([]);

  const router = useRouter();
  const { isLoggedIn, user } = useAppContext();

  // ✅ Log page visit into Firestore history collection
  useEffect(() => {
    const logVisit = async () => {
      const user = auth.currentUser;
      if (!user) return;

      await addDoc(collection(db, "history"), {
        uid: user.uid,
        page: "Automate Sales Call",
        timestamp: serverTimestamp(),
      });

      await setDoc(
        doc(db, "users", user.uid),
        {
          lastVisited: "Automate Sales Call",
          lastVisitedAt: serverTimestamp(),
        },
        { merge: true }
      );
    };

    if (isLoggedIn) {
      logVisit();
    }
  }, [isLoggedIn]);

  // ✅ Step control: login/signup/tool
  useEffect(() => {
    const hasSignedUp = localStorage.getItem("hasSignedUp") === "true";
    const history = JSON.parse(localStorage.getItem("callHistory")) || [];
    setCallHistory(history);

    if (!isLoggedIn) {
      localStorage.setItem("intendedPath", "/automate-sales-call");
      setStep(hasSignedUp ? "signin" : "signup");
    } else {
      setStep("tool");
    }
  }, [isLoggedIn]);

  const goToSignIn = () => setStep("signin");
  const goToTool = () => setStep("tool");

  const handleCall = async () => {
    if (!phoneNumber) return setStatus("❌ Please enter a valid phone number.");
    setStatus("📞 Calling " + phoneNumber + "...");

    try {
      const res = await fetch("/api/call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to: phoneNumber }),
      });

      const data = await res.json();
      if (res.ok) {
        setStatus("✅ Call initiated successfully.");
        const updatedHistory = [
          { number: phoneNumber, time: new Date().toLocaleString() },
          ...callHistory.slice(0, 4),
        ];
        setCallHistory(updatedHistory);
        localStorage.setItem("callHistory", JSON.stringify(updatedHistory));
      } else {
        throw new Error(data.error || "Call failed");
      }
    } catch (err) {
      setStatus("❌ Call failed. Make sure the number is verified in Twilio.");
    }
  };

  return (
    <main className="page-wrapper rbt-dashboard-page">
      <div className="rbt-panel-wrapper">
        <LeftDashboardSidebar />
        <HeaderDashboard display="" />
        <RightDashboardSidebar />
        <Modal />
        <PopupMobileMenu />

        <div className="rbt-main-content">
          <div className="rbt-daynamic-page-content">
            <div className="rbt-dashboard-content">
              <div className="content-page">
                <div className="chat-box-section">
                  {step === "loading" ? (
                    <p className="text-white text-center">Loading...</p>
                  ) : step === "signup" ? (
                    <SignUp onSignUp={goToSignIn} />
                  ) : step === "signin" ? (
                    <SignIn onSignIn={goToTool} />
                  ) : (
                    <>
                      <div className="max-w-md mx-auto mt-10 p-6 rounded-2xl shadow-lg bg-background border border-border">
                        <div className="mb-6 text-center">
                          <h2 className="text-2xl font-bold text-foreground">📞 Automate Sales Call</h2>
                          <p className="text-muted-foreground text-sm mt-1">
                            Enter a verified phone number to trigger an AI-powered sales call.
                          </p>
                        </div>

                        <div className="mb-4">
                          <label className="block mb-2 text-sm font-medium text-foreground">
                            <i className="fa fa-phone mr-2" /> Phone Number
                          </label>
                          <PhoneInput
                            defaultCountry="IN"
                            placeholder="Enter phone number"
                            className="w-full rounded-lg border border-border bg-input text-foreground p-3"
                            value={phoneNumber}
                            onChange={setPhoneNumber}
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            Only numbers verified in Twilio Trial can be used. E.g., +919876543210
                          </p>
                        </div>

                        <div className="mt-4 w-full text-center">
                          <button
                            className="btn-default inline-flex items-center gap-2 px-6"
                            onClick={handleCall}
                          >
                            <i className="fa fa-play" /> Call Now
                          </button>
                        </div>

                        {status && (
                          <div
                            className={`mt-4 p-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                              status.startsWith("✅")
                                ? "bg-green-100 text-green-800 dark:bg-green-800/20"
                                : "bg-red-100 text-red-800 dark:bg-red-800/20"
                            }`}
                          >
                            {status}
                          </div>
                        )}

                        {callHistory.length > 0 && (
                          <div className="mt-6">
                            <h4 className="text-sm font-semibold text-foreground mb-2">Recent Calls</h4>
                            <ul className="text-sm text-muted-foreground list-disc list-inside">
                              {callHistory.map((entry, idx) => (
                                <li key={idx}>
                                  {entry.number}
                                  <span className="text-xs text-gray-500 ml-2">{entry.time}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      <div className="mt-8 max-w-md mx-auto text-center text-muted-foreground text-sm">
                        <p>
                          ⚠️ <strong>Important:</strong> You can only call numbers that are verified in your Twilio
                          trial account. To remove this limitation, consider upgrading your Twilio plan.
                        </p>
                      </div>

                      <StaticbarDashboard />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <BackToTop />
      </div>
    </main>
  );
};

export default AutomateSalesCallPage;