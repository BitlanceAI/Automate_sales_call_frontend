import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const B2BRegister = () => {
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
  const validatePhone = (phone) => /^[+]?\d{10,}$/.test(phone);
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 py-12">
      <form onSubmit={handleSubmit} className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-xl space-y-6">
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">Join the Bitlance B2B Network</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" name="companyName" placeholder="Company Name" value={formData.companyName} onChange={handleChange} className="border rounded px-4 py-2" />
          <input type="email" name="businessEmail" placeholder="Email Address" value={formData.businessEmail} onChange={handleChange} className="border rounded px-4 py-2" />
          <input type="text" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} className="border rounded px-4 py-2" />
          <input type="text" name="companyWebsite" placeholder="Company Website" value={formData.companyWebsite} onChange={handleChange} className="border rounded px-4 py-2" />
          <select name="industry" value={formData.industry} onChange={handleChange} className="border rounded px-4 py-2">
            <option value="">Select Industry</option>
            {industries.map((industry) => (
              <option key={industry} value={industry}>{industry}</option>
            ))}
          </select>
          <select name="businessType" value={formData.businessType} onChange={handleChange} className="border rounded px-4 py-2">
            <option value="">Business Type</option>
            {businessTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <select name="numberOfEmployees" value={formData.numberOfEmployees} onChange={handleChange} className="border rounded px-4 py-2">
            <option value="">Number of Employees</option>
            {employeeRanges.map((range) => (
              <option key={range} value={range}>{range}</option>
            ))}
          </select>
          <input type="text" name="gstNumber" placeholder="GST Number" value={formData.gstNumber} onChange={handleChange} className="border rounded px-4 py-2" />
        </div>

        <textarea name="companyAddress" placeholder="Company Address" value={formData.companyAddress} onChange={handleChange} className="w-full border rounded px-4 py-2" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <input type={showPassword ? 'text' : 'password'} name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full border rounded px-4 py-2" />
            <span className="absolute top-3 right-4 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>
          <div className="relative">
            <input type={showConfirmPassword ? 'text' : 'password'} name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} className="w-full border rounded px-4 py-2" />
            <span className="absolute top-3 right-4 cursor-pointer" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>
        </div>

        <div className="flex items-center">
          <input type="checkbox" name="acceptTerms" checked={formData.acceptTerms} onChange={handleChange} className="mr-2" />
          <label htmlFor="acceptTerms">I agree to the <a href="#" className="text-purple-600 underline">Terms and Conditions</a></label>
        </div>

        <button type="submit" className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition">
          {isSubmitting ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default B2BRegister;
