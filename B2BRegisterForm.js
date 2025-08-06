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
    businessType: '',
    numberOfEmployees: '',
    gstNumber: '',
    companyAddress: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const industries = ['Information Technology', 'Retail & E-commerce', 'Manufacturing', 'Finance & Banking', 'Other'];
  const businessTypes = ['Private Limited', 'LLP', 'Partnership', 'Proprietorship'];
  const employeeRanges = ['1-10', '11-50', '51-200', '201-1000', '1000+'];

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => /^[+]?[\d\s\-\(\)]{10,}$/.test(phone);
  const validateGST = (gst) => /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(gst);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required';
    if (!formData.businessEmail.trim()) newErrors.businessEmail = 'Email is required';
    else if (!validateEmail(formData.businessEmail)) newErrors.businessEmail = 'Invalid email format';
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
    else if (!validatePhone(formData.phoneNumber)) newErrors.phoneNumber = 'Invalid phone format';
    if (!formData.gstNumber.trim()) newErrors.gstNumber = 'GST number is required';
    else if (!validateGST(formData.gstNumber)) newErrors.gstNumber = 'Invalid GST format';
    if (!formData.companyWebsite.trim()) newErrors.companyWebsite = 'Website required';
    if (!formData.companyAddress.trim()) newErrors.companyAddress = 'Address required';
    if (!formData.industry) newErrors.industry = 'Select an industry';
    if (!formData.businessType) newErrors.businessType = 'Select business type';
    if (!formData.numberOfEmployees) newErrors.numberOfEmployees = 'Select employee range';
    if (!formData.password) newErrors.password = 'Password required';
    else if (formData.password.length < 8) newErrors.password = 'Min 8 characters';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm password';
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.acceptTerms) newErrors.acceptTerms = 'Accept terms to continue';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      alert('✅ Registration Successful!');
      setIsSubmitting(false);
      setFormData({
        companyName: '',
        businessEmail: '',
        phoneNumber: '',
        companyWebsite: '',
        industry: '',
        businessType: '',
        numberOfEmployees: '',
        gstNumber: '',
        companyAddress: '',
        password: '',
        confirmPassword: '',
        acceptTerms: false,
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col lg:flex-row items-center justify-center px-4">
      {/* Left Branding Panel */}
      <div className="hidden lg:flex flex-col items-center justify-center w-1/2 h-full bg-gradient-to-br from-indigo-800 to-purple-700 text-white p-10 rounded-lg shadow-xl">
        <h1 className="text-4xl font-bold mb-6 text-center">Join the Bitlance B2B Network</h1>
        <p className="text-center max-w-md">
          Streamline operations, collaborate with verified partners, and grow your business with our smart platform.
        </p>
      </div>

      {/* Right Form Panel */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-md space-y-6 lg:ml-8"
      >
        <h2 className="text-2xl font-bold text-center text-indigo-700">B2B Company Registration</h2>

        {/* Company Name */}
        <div>
          <label className="block font-medium">Company Name</label>
          <input
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="e.g. Bitlance Technologies"
          />
          {errors.companyName && <p className="text-red-500 text-sm">{errors.companyName}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block font-medium">Business Email</label>
          <input
            name="businessEmail"
            type="email"
            value={formData.businessEmail}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="example@company.com"
          />
          {errors.businessEmail && <p className="text-red-500 text-sm">{errors.businessEmail}</p>}
        </div>

        {/* Password */}
        <div>
          <label className="block font-medium">Password</label>
          <div className="relative">
            <input
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              className="w-full border p-2 rounded pr-10"
              placeholder="Enter password"
            />
            <button
              type="button"
              className="absolute top-2 right-2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block font-medium">Confirm Password</label>
          <input
            name="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Re-enter password"
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
        </div>

        {/* Phone */}
        <div>
          <label className="block font-medium">Phone Number</label>
          <input
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="+91-XXXXXXXXXX"
          />
          {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
        </div>

        {/* Website */}
        <div>
          <label className="block font-medium">Company Website</label>
          <input
            name="companyWebsite"
            value={formData.companyWebsite}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="https://yourcompany.com"
          />
          {errors.companyWebsite && <p className="text-red-500 text-sm">{errors.companyWebsite}</p>}
        </div>

        {/* Industry */}
        <div>
          <label className="block font-medium">Industry</label>
          <select
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="">Select Industry</option>
            {industries.map((ind) => (
              <option key={ind} value={ind}>{ind}</option>
            ))}
          </select>
          {errors.industry && <p className="text-red-500 text-sm">{errors.industry}</p>}
        </div>

        {/* Business Type */}
        <div>
          <label className="block font-medium">Business Type</label>
          <select
            name="businessType"
            value={formData.businessType}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="">Select Business Type</option>
            {businessTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          {errors.businessType && <p className="text-red-500 text-sm">{errors.businessType}</p>}
        </div>

        {/* Number of Employees */}
        <div>
          <label className="block font-medium">Number of Employees</label>
          <select
            name="numberOfEmployees"
            value={formData.numberOfEmployees}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="">Select Count</option>
            {employeeRanges.map((range) => (
              <option key={range} value={range}>{range}</option>
            ))}
          </select>
          {errors.numberOfEmployees && <p className="text-red-500 text-sm">{errors.numberOfEmployees}</p>}
        </div>

        {/* GST Number */}
        <div>
          <label className="block font-medium">GST Number</label>
          <input
            name="gstNumber"
            value={formData.gstNumber}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="22AAAAA0000A1Z5"
          />
          {errors.gstNumber && <p className="text-red-500 text-sm">{errors.gstNumber}</p>}
        </div>

        {/* Address */}
        <div>
          <label className="block font-medium">Company Address</label>
          <input
            name="companyAddress"
            value={formData.companyAddress}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="123 Business Street, City, State"
          />
          {errors.companyAddress && <p className="text-red-500 text-sm">{errors.companyAddress}</p>}
        </div>

        {/* Terms */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="acceptTerms"
            checked={formData.acceptTerms}
            onChange={handleChange}
          />
          <label>I accept the terms and conditions</label>
        </div>
        {errors.acceptTerms && <p className="text-red-500 text-sm">{errors.acceptTerms}</p>}

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white p-3 rounded hover:bg-indigo-700 transition"
        >
          {isSubmitting ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default B2BRegisterForm;
