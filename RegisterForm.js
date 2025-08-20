"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { db1 } from "./lib/firebase";
import { collection, addDoc, serverTimestamp ,query, where,getDocs} from "firebase/firestore";
import bcrypt from "bcryptjs";
import Image from "next/image";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!formData.username.trim()) errors.username = "Username is required";
    if (!formData.email || !emailRegex.test(formData.email))
      errors.email = "Valid email is required";
    if (!formData.phone || !phoneRegex.test(formData.phone))
      errors.phone = "Valid 10-digit phone number is required";
    if (!formData.password || formData.password.length < 6)
      errors.password = "Password must be at least 6 characters long";
    if (formData.confirmPassword !== formData.password)
      errors.confirmPassword = "Passwords do not match";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validateForm()) return;

  setLoading(true);
  try {
    // Check for duplicates in Firestore
    const usersRef = collection(db1, "learnaiusers");
    
    // Query for existing email or phone
    const emailQuery = query(usersRef, where("email", "==", formData.email));
    const [emailSnapshot] = await Promise.all([
      getDocs(emailQuery)
    ]);

    if (!emailSnapshot.empty) {
      toast.error("Email is already registered!");
      setLoading(false);
      return;
    }

    const hashedPassword = await bcrypt.hash(formData.password, 10);

    await addDoc(usersRef, {
      ...formData,
      password: hashedPassword,
      createdAt: serverTimestamp(),
    });

    // n8n webhook integration
    try {
      await fetch("https://biltance.app.n8n.cloud/webhook/registerlearnai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          phone: formData.phone,
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
    toast.success(`Welcome aboard, ${formData.username}!`);
    setFormData({
      username: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    });
  } catch (err) {
    console.error(err);
    toast.error("Failed to register. Try again.");
  }
  setLoading(false);
};

  return (
    <div className="page-wrapper min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      
      <div className="sign-up-box mx-auto">
        <div className="flex justify-center mb-4">
          <Image src="/images/logo/logo.png" alt="Logo" width={100} height={100} />
        </div>
        <h2 className="text-2xl font-bold text-center mb-4 text-white">User Registration</h2>
        <Toaster position="top-center" reverseOrder={false} />
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          {[
            { name: "username", label: "Username" },
            { name: "email", label: "Email", type: "email" },
            { name: "phone", label: "Phone" },
            { name: "password", label: "Password", type: showPassword ? "text" : "password" },
            { name: "confirmPassword", label: "Confirm Password", type: showPassword ? "text" : "password" },
          ].map((field) => (
            <div key={field.name} className="relative">
              <input
                type={field.type || "text"}
                name={field.name}
                placeholder={field.label}
                value={formData[field.name]}
                onChange={handleChange}
                className={`input-field ${formErrors[field.name] ? "border-red-500" : ""}`}
                required
              />
              {formErrors[field.name] && (
                <p className="text-red-500 text-sm mt-1">{formErrors[field.name]}</p>
              )}
            </div>
          ))}

          

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>

      <style jsx>{`
        .sign-up-box {
          background: linear-gradient(145deg, #6a0dad, #000);
          color: #fff;
          padding: 30px;
          border-radius: 16px;
          width: 100%;
          max-width: 400px;
          box-shadow: 0 0 20px rgba(106, 13, 173, 0.6);
        }

        .input-field {
          width: 100%;
          padding: 12px;
          border-radius: 8px;
          border: 1px solid #6a0dad;
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
          outline: none;
          transition: all 0.3s ease;
          margin-bottom:16px;
        }

        .input-field::placeholder {
          color: #ddd;
        }

        .input-field:focus {
          border-color: #9b30ff;
          box-shadow: 0 0 8px rgba(155, 48, 255, 0.6);
        }

        .submit-btn {
          width: 100%;
          padding: 12px;
          border-radius: 8px;
          border: none;
          background: #9b30ff;
          color: #fff;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .submit-btn:hover {
          background: #b84dff;
          box-shadow: 0 0 10px rgba(184, 77, 255, 0.6);
        }

        .submit-btn:disabled {
          background: gray;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}
