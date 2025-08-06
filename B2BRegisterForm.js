'use client';

import React, { useState } from 'react';
import {
  Eye,
  EyeOff,
  Building2,
  Mail,
  Phone,
  Globe,
  Users,
  FileText,
  MapPin,
  Lock,
} from 'lucide-react';

const B2BRegisterForm = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    businessEmail: '',
    phoneNumber: '',
    companyWebsite: '',
    industry: '',
    noOfEmployees: '',
    businessDescription: '',
    address: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Add your API call here
    alert("✅ Registered successfully!");
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: "url('/d6b08a4d-37c2-4ef3-bcc8-6b89b7734517.jpg')",
      }}
    >
      <form
        className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-xl space-y-4"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          B2B Registration
        </h2>

        {[
          { label: 'Company Name', name: 'companyName', icon: <Building2 /> },
          { label: 'Business Email', name: 'businessEmail', icon: <Mail /> },
          { label: 'Phone Number', name: 'phoneNumber', icon: <Phone /> },
          { label: 'Company Website', name: 'companyWebsite', icon: <Globe /> },
          { label: 'Industry', name: 'industry', icon: <Users /> },
          { label: 'No. of Employees', name: 'noOfEmployees', icon: <Users /> },
          { label: 'Business Description', name: 'businessDescription', icon: <FileText /> },
          { label: 'Address', name: 'address', icon: <MapPin /> },
        ].map(({ label, name, icon }) => (
          <div key={name} className="flex items-center border-b border-gray-300 py-2">
            <span className="mr-2 text-gray-600">{icon}</span>
            <input
              type="text"
              name={name}
              placeholder={label}
              className="w-full px-2 py-1 outline-none bg-transparent"
              value={formData[name]}
              onChange={handleChange}
              required
            />
          </div>
        ))}

        <div className="flex items-center border-b border-gray-300 py-2">
          <span className="mr-2 text-gray-600"><Lock /></span>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            className="w-full px-2 py-1 outline-none bg-transparent"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="ml-2 text-gray-600"
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default B2BRegisterForm;
