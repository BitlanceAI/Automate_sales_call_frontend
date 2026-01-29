"use client";
import React, { useState } from 'react';
import { Eye, EyeOff, Building2, Mail, Phone, Globe, Users, FileText, MapPin, Lock } from 'lucide-react';

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

  const industries = [
    { value: '', label: 'Select Industry' },
    { value: 'IT', label: 'Information Technology' },
    { value: 'Retail', label: 'Retail & E-commerce' },
    { value: 'Manufacturing', label: 'Manufacturing' },
    { value: 'Finance', label: 'Finance & Banking' },
    { value: 'Other', label: 'Other' },
  ];

  const businessTypes = [
    { value: '', label: 'Select Business Type' },
    { value: 'Private Limited', label: 'Private Limited Company' },
    { value: 'LLP', label: 'Limited Liability Partnership' },
    { value: 'Partnership', label: 'Partnership Firm' },
    { value: 'Proprietorship', label: 'Sole Proprietorship' },
  ];

  const employeeRanges = [
    { value: '', label: 'Select Employee Count' },
    { value: '1-10', label: '1-10 employees' },
    { value: '11-50', label: '11-50 employees' },
    { value: '51-200', label: '51-200 employees' },
    { value: '201-1000', label: '201-1000 employees' },
    { value: '1000+', label: '1000+ employees' },
  ];

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => /^[+]?[\d\s\-\(\)]{10,}$/.test(phone);
  const validateGST = (gst) => /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(gst);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required';
    if (!formData.businessEmail.trim()) newErrors.businessEmail = 'Business email is required';
    else if (!validateEmail(formData.businessEmail)) newErrors.businessEmail = 'Please enter a valid email address';
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
    else if (!validatePhone(formData.phoneNumber)) newErrors.phoneNumber = 'Please enter a valid phone number';
    if (!formData.industry) newErrors.industry = 'Please select an industry';
    if (!formData.businessType) newErrors.businessType = 'Please select a business type';
    if (!formData.numberOfEmployees) newErrors.numberOfEmployees = 'Please select number of employees';
    if (!formData.gstNumber.trim()) newErrors.gstNumber = 'GST number is required';
    else if (!validateGST(formData.gstNumber)) newErrors.gstNumber = 'Please enter a valid GST number';
    if (!formData.companyAddress.trim()) newErrors.companyAddress = 'Company address is required';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters long';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.acceptTerms) newErrors.acceptTerms = 'You must accept the terms and conditions';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      alert('Registration successful! Welcome to our B2B platform.');
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
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      {/* Replace this with your full JSX form structure as already written */}
      {/* Your JSX from earlier fits directly here */}
      {/* Including all fields, labels, icons, and the submit button */}
    </div>
  );
};

export default B2BRegisterForm;
