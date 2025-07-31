import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const BusinessForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    company: '',
    industry: '',
    businessType: '',
    employeeCount: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const industries = ['Technology', 'Healthcare', 'Finance', 'Education', 'Retail'];
  const businessTypes = ['B2B', 'B2C', 'Non-Profit', 'Government'];
  const employeeCounts = ['1-10', '11-50', '51-200', '201-500', '500+'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.includes('@')) errors.email = 'Valid email required';
    if (formData.password.length < 6) errors.password = 'Password must be at least 6 characters';
    if (!formData.phone.match(/^\d{10}$/)) errors.phone = 'Phone must be 10 digits';
    if (!formData.company.trim()) errors.company = 'Company name is required';
    if (!formData.industry) errors.industry = 'Select an industry';
    if (!formData.businessType) errors.businessType = 'Select a business type';
    if (!formData.employeeCount) errors.employeeCount = 'Select employee range';
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      // Simulate async submission
      setTimeout(() => {
        console.log('Form Submitted:', formData);
        setSubmitted(true);
      }, 500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-cyan-100 py-8 px-4 flex justify-center items-start">
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl w-full bg-white p-8 rounded-lg shadow-lg space-y-6 text-gray-900"
      >
        <h2 className="text-2xl font-bold text-center text-purple-700">Business Registration Form</h2>

        {submitted && (
          <div className="bg-green-100 text-green-700 p-3 rounded text-center">
            🎉 Registration Successful!
          </div>
        )}

        {/* Name */}
        <div>
          <label className="block font-semibold">Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
            placeholder="Enter your name"
          />
          {formErrors.name && <p className="text-red-500 text-sm">{formErrors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block font-semibold">Email</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
            placeholder="example@domain.com"
          />
          {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
        </div>

        {/* Password */}
        <div>
          <label className="block font-semibold">Password</label>
          <div className="relative">
            <input
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1 pr-10"
              placeholder="Enter password"
            />
            <button
              type="button"
              className="absolute right-2 top-3 text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {formErrors.password && <p className="text-red-500 text-sm">{formErrors.password}</p>}
        </div>

        {/* Phone */}
        <div>
          <label className="block font-semibold">Phone</label>
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
            placeholder="10-digit number"
          />
          {formErrors.phone && <p className="text-red-500 text-sm">{formErrors.phone}</p>}
        </div>

        {/* Company */}
        <div>
          <label className="block font-semibold">Company</label>
          <input
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
            placeholder="Your company name"
          />
          {formErrors.company && <p className="text-red-500 text-sm">{formErrors.company}</p>}
        </div>

        {/* Industry */}
        <div>
          <label className="block font-semibold">Industry</label>
          <select
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
          >
            <option value="">Select</option>
            {industries.map((ind) => (
              <option key={ind} value={ind}>
                {ind}
              </option>
            ))}
          </select>
          {formErrors.industry && <p className="text-red-500 text-sm">{formErrors.industry}</p>}
        </div>

        {/* Business Type */}
        <div>
          <label className="block font-semibold">Business Type</label>
          <select
            name="businessType"
            value={formData.businessType}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
          >
            <option value="">Select</option>
            {businessTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {formErrors.businessType && <p className="text-red-500 text-sm">{formErrors.businessType}</p>}
        </div>

        {/* Employee Count */}
        <div>
          <label className="block font-semibold">Number of Employees</label>
          <select
            name="employeeCount"
            value={formData.employeeCount}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
          >
            <option value="">Select</option>
            {employeeCounts.map((count) => (
              <option key={count} value={count}>
                {count}
              </option>
            ))}
          </select>
          {formErrors.employeeCount && (
            <p className="text-red-500 text-sm">{formErrors.employeeCount}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 text-white p-2 rounded hover:bg-purple-700 transition"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default BusinessForm;


// export default B2BRegisterForm;
//this is a teststststsst
