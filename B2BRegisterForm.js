"use client";

import { useState } from "react";
import { db1 } from "./lib/firebase";
import { collection, addDoc, query, where, getDocs, serverTimestamp } from "firebase/firestore";
import bcrypt from "bcryptjs";
import toast,{ Toaster } from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";
import { useAppContext } from "@/context/Context";

export default function B2BRegistrationForm() {
  const { isLightTheme, toggleTheme } = useAppContext();

  const [formData, setFormData] = useState({
    companyName: "",
    businessEmail: "",
    phone: "",
    companyWebsite: "",
    industry: "",
    employees: "",
    description: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      toast.error("Valid 10-digit phone number is required.");
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const q = query(
        collection(db1, "b2b_registrations"),
        where("businessEmail", "==", formData.businessEmail)
      );
      const existing = await getDocs(q);
      if (!existing.empty) {
        toast.error("You have already booked a call with us.");
        setLoading(false);
        return;
      }

      const hashedPassword = await bcrypt.hash(formData.password, 10);
      await addDoc(collection(db1, "b2b_registrations"), {
        ...formData,
        password: hashedPassword,
        createdAt: serverTimestamp(),
      });

      try {
        await fetch("https://biltance.app.n8n.cloud/webhook/b2bregister", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            companyName: formData.companyName,
            businessEmail: formData.businessEmail,
            phone: formData.phone,
            companyWebsite: formData.companyWebsite,
            industry: formData.industry,
            employees: formData.employees,
            description: formData.description,
            address: formData.address,
          }),
        });
      } catch (err) {
        console.log("n8n webhook failed, skipping...", err.message);
      }

      try {
        const formattedPhone = formData.phone.startsWith("+91")
          ? formData.phone
          : `+91${formData.phone}`;

        await fetch(
          "https://automate-sales-call-deploy-production.up.railway.app/outbound-call",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ phoneNumber: formattedPhone }),
          }
        );
        console.log("Twilio call triggered to:", formattedPhone);
      } catch (err) {
        console.log("Twilio call failed:", err.message);
      }

      toast.success("Registration successful! We’ll contact you soon.");
      setFormData({
        companyName: "",
        businessEmail: "",
        phone: "",
        companyWebsite: "",
        industry: "",
        employees: "",
        description: "",
        address: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Try again.");
    }

    setLoading(false);
  };

  return (
    <main className="page-wrapper">
      <style>{`
        :root {
          --page-bg: #111111;
          --form-bg: linear-gradient(145deg, #6a0dad, #000);
          --form-shadow: rgba(106, 13, 173, 0.5);
          --text-color: #ffffff;
          --accent-color: #b84dff;
          --accent-hover: #8a2be2;
          --input-bg: #1a1a1a;
        }

       

        .sign-up-box {
          background: var(--form-bg);
          color: var(--text-color);
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 0 15px var(--form-shadow);
          max-width: 500px;
          width: 100%;
        }

        .sign-up-box h2 {
          color: var(--accent-color);
          text-align: center;
          margin-bottom: 20px;
        }

        .sign-up-box input {
          width: 100%;
          padding: 10px;
          margin: 8px 0;
          border-radius: 8px;
          border: none;
          background: var(--input-bg);
          color: var(--text-color);
          outline: none;
        }

        .sign-up-box input:focus {
          border: 2px solid var(--accent-color);
          box-shadow: 0 0 10px var(--accent-color);
        }

        .sign-up-box button {
          width: 100%;
          padding: 12px;
          background: var(--accent-color);
          color: var(--text-color);
          border: none;
          border-radius: 8px;
          font-size: 16px;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .sign-up-box button:hover {
          background: var(--accent-hover);
        }
      `}</style>

      <div className="signup-area">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="sign-up-box mx-auto">
              <div className="signup-box-top">
                <h2>B2B Registration</h2>
              </div>
              <Toaster position="top-center" reverseOrder={false} />
              <div className="signup-box-bottom">
                <div className="signup-box-content">
                  {error && <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>}

                  <form onSubmit={handleSubmit}>
                    {[
                      { name: "companyName", label: "Company Name" },
                      { name: "businessEmail", label: "Business Email", type: "email" },
                      { name: "phone", label: "Phone Number" },
                      { name: "companyWebsite", label: "Company Website" },
                      { name: "industry", label: "Industry" },
                      { name: "employees", label: "No. of Employees" },
                      { name: "description", label: "Business Description" },
                      { name: "address", label: "Address" },
                      { name: "password", label: "Password", type: "password" },
                      { name: "confirmPassword", label: "Confirm Password", type: "password" },
                    ].map((field) => (
                      <div key={field.name} className="input-section mb-4">
                        <input
                          type={field.type || "text"}
                          name={field.name}
                          placeholder={field.label}
                          value={formData[field.name]}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    ))}

                    <div className="flex justify-center">
                      <button type="submit" disabled={loading}>
                        {loading ? "Registering..." : "Register"}
                      </button>
                    </div>
                  </form>
                </div>
                <br />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
