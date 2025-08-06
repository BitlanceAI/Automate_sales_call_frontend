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
    industryType: '',
    numberOfEmployees: '',
    companyDescription: '',
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
    console.log('Form Submitted:', formData);
    // Add your form submission logic here (e.g. API call)
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">B2B Company Registration</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Company Name */}
        <div className="flex items-center border p-2 rounded">
          <Building2 className="mr-2" />
          <input
            type="text"
            name="companyName"
            placeholder="Company Name"
            className="w-full outline-none"
            value={formData.companyName}
            onChange={handleChange}
          />
        </div>

        {/* Business Email */}
        <div className="flex items-center border p-2 rounded">
          <Mail className="mr-2" />
          <input
            type="email"
            name="businessEmail"
            placeholder="Business Email"
            className="w-full outline-none"
            value={formData.businessEmail}
            onChange={handleChange}
          />
        </div>

        {/* Phone Number */}
        <div className="flex items-center border p-2 rounded">
          <Phone className="mr-2" />
          <input
            type="tel"
            name="phoneNumber"
            placeholder="Phone Number"
            className="w-full outline-none"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </div>

        {/* Company Website */}
        <div className="flex items-center border p-2 rounded">
          <Globe className="mr-2" />
          <input
            type="url"
            name="companyWebsite"
            placeholder="Company Website"
            className="w-full outline-none"
            value={formData.companyWebsite}
            onChange={handleChange}
          />
        </div>

        {/* Industry Type */}
        <div className="flex items-center border p-2 rounded">
          <Users className="mr-2" />
          <input
            type="text"
            name="industryType"
            placeholder="Industry Type"
            className="w-full outline-none"
            value={formData.industryType}
            onChange={handleChange}
          />
        </div>

        {/* Number of Employees */}
        <div className="flex items-center border p-2 rounded">
          <FileText className="mr-2" />
          <input
            type="number"
            name="numberOfEmployees"
            placeholder="Number of Employees"
            className="w-full outline-none"
            value={formData.numberOfEmployees}
            onChange={handleChange}
          />
        </div>

        {/* Company Description */}
        <div className="flex items-center border p-2 rounded">
          <FileText className="mr-2" />
          <textarea
            name="companyDescription"
            placeholder="Company Description"
            className="w-full outline-none"
            value={formData.companyDescription}
            onChange={handleChange}
          />
        </div>

        {/* Address */}
        <div className="flex items-center border p-2 rounded">
          <MapPin className="mr-2" />
          <input
            type="text"
            name="address"
            placeholder="Company Address"
            className="w-full outline-none"
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        {/* Password */}
        <div className="flex items-center border p-2 rounded">
          <Lock className="mr-2" />
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            className="w-full outline-none"
            value={formData.password}
            onChange={handleChange}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="ml-2"
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default B2BRegisterForm;
