"use client";

import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Check,
  AlertCircle,
} from "lucide-react";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    gender: "",
    dateOfBirth: "",
    address: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePhone = (phone) =>
    /^[\+]?[1-9][\d]{0,15}$/.test(phone.replace(/[\s\-\(\)]/g, ""));

  const validatePassword = (password) =>
    password.length >= 8 &&
    /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password);

  const validateAge = (dob) => {
    const birth = new Date(dob);
    const today = new Date();
    return today.getFullYear() - birth.getFullYear() >= 18;
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    else if (formData.fullName.trim().length < 2)
      newErrors.fullName = "Full name must be at least 2 characters";

    if (!formData.email.trim()) newErrors.email = "Email address is required";
    else if (!validateEmail(formData.email))
      newErrors.email = "Enter a valid email";

    if (!formData.phoneNumber.trim())
      newErrors.phoneNumber = "Phone number is required";
    else if (!validatePhone(formData.phoneNumber))
      newErrors.phoneNumber = "Enter a valid phone number";

    if (!formData.gender) newErrors.gender = "Select your gender";

    if (!formData.dateOfBirth)
      newErrors.dateOfBirth = "Date of birth is required";
    else if (!validateAge(formData.dateOfBirth))
      newErrors.dateOfBirth = "Must be at least 18 years old";

    if (!formData.address.trim()) newErrors.address = "Address is required";
    else if (formData.address.trim().length < 10)
      newErrors.address = "Please provide a complete address";

    if (!formData.password)
      newErrors.password = "Password is required";
    else if (!validatePassword(formData.password))
      newErrors.password =
        "Must be 8+ characters with uppercase, lowercase & number";

    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Confirm your password";
    else if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    if (!formData.termsAccepted)
      newErrors.termsAccepted = "Accept the terms and conditions";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setIsSubmitted(true);
        setFormData({
          fullName: "",
          email: "",
          phoneNumber: "",
          gender: "",
          dateOfBirth: "",
          address: "",
          password: "",
          confirmPassword: "",
          termsAccepted: false,
        });
      } else {
        setErrors({ email: data.message || "Something went wrong" });
      }
    } catch (err) {
      setErrors({ email: "Server error. Try again later." });
    }
    setIsLoading(false);
  };

  const getPasswordStrength = (password) => {
    if (!password) return { strength: "", color: "" };
    if (password.length < 4) return { strength: "Weak", color: "text-red-500" };
    if (password.length < 8) return { strength: "Fair", color: "text-yellow-500" };
    if (validatePassword(password)) return { strength: "Strong", color: "text-green-600" };
    return { strength: "Fair", color: "text-yellow-500" };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-purple-50 p-4">
        <div className="bg-white rounded-xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-purple-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Registration Successful!
          </h2>
          <p className="text-gray-600">Your account has been created.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-purple-700 mb-6">
          Register for Workshop
        </h1>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div>
            <label className="block mb-1">Full Name</label>
            <input
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className="w-full border px-4 py-2 rounded"
            />
            {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full border px-4 py-2 rounded"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block mb-1">Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="w-full border px-4 py-2 rounded"
            />
            {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block mb-1">Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              className="w-full border px-4 py-2 rounded"
            />
            {errors.dateOfBirth && <p className="text-red-500 text-sm">{errors.dateOfBirth}</p>}
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label className="block mb-1">Address</label>
            <textarea
              name="address"
              rows={3}
              value={formData.address}
              onChange={handleInputChange}
              className="w-full border px-4 py-2 rounded"
            />
            {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
          </div>

          {/* Terms */}
          <div className="md:col-span-2 flex items-start gap-2">
            <input
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleInputChange}
            />
            <label>I agree to the terms and conditions</label>
          </div>
          {errors.termsAccepted && (
            <p className="text-red-500 text-sm">{errors.termsAccepted}</p>
          )}

          {/* Submit */}
          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded"
            >
              {isLoading ? "Submitting..." : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;