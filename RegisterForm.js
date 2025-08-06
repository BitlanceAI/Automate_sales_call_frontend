import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    age: "",
    password: "",
    confirmPassword: "",
    // gender: "", // optional
  });

  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!formData.username.trim()) {
      errors.username = "Username is required";
    }

    if (!formData.email || !emailRegex.test(formData.email)) {
      errors.email = "Valid email is required";
    }

    if (!formData.phone || !phoneRegex.test(formData.phone)) {
      errors.phone = "Valid 10-digit phone number is required";
    }

    const age = parseInt(formData.age, 10);
    if (!formData.age || isNaN(age) || age < 18) {
      errors.age = "You must be at least 18 years old";
    }

    if (!formData.password || formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }

    if (formData.confirmPassword !== formData.password) {
      errors.confirmPassword = "Passwords do not match";
    }

    // if (!formData.gender) {
    //   errors.gender = "Please select a gender";
    // }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Registration failed");
      }
    } catch (err) {
      alert("Server error. Please try again later.");
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-cyan-100 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-xl text-center">
          <h2 className="text-2xl font-bold text-green-600">Registration Successful!</h2>
          <p className="mt-2 text-gray-700">Welcome aboard, {formData.username}!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-cyan-100 py-8 px-4 flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-lg p-6 w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Register</h2>

        {["username", "email", "phone", "age", "password", "confirmPassword"].map((field) => (
          <div key={field} className="mb-4">
            <label className="block text-gray-700 mb-1 capitalize" htmlFor={field}>
              {field === "confirmPassword" ? "Confirm Password" : field}
            </label>
            <input
              type={field.includes("password") && !showPassword ? "password" : field === "age" ? "number" : "text"}
              id={field}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${
                formErrors[field] ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400`}
            />
            {formErrors[field] && <p className="text-red-500 text-sm mt-1">{formErrors[field]}</p>}
          </div>
        ))}

        {/* Optional gender field
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className={`w-full px-4 py-2 border ${
              formErrors.gender ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400`}
          >
            <option value="">Select Gender</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="other">Other</option>
          </select>
          {formErrors.gender && <p className="text-red-500 text-sm mt-1">{formErrors.gender}</p>}
        </div> */}

        <div className="mb-6">
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="text-blue-600 text-sm"
          >
            {showPassword ? "Hide Passwords" : "Show Passwords"}
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
