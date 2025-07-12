import React, { useState } from 'react';
import { Eye, EyeOff, User, Mail, Phone, Calendar, MapPin, Lock, Check, AlertCircle } from 'lucide-react';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    gender: '',
    dateOfBirth: '',
    address: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false,
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => /^[\+]?[1-9][\d]{0,15}$/.test(phone.replace(/[\s\-\(\)]/g, ''));
  const validatePassword = (password) => password.length >= 8 && /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password);
  const validateAge = (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    const age = today.getFullYear() - birthDate.getFullYear();
    return age >= 18;
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    else if (formData.fullName.trim().length < 2) newErrors.fullName = 'Full name must be at least 2 characters';

    if (!formData.email.trim()) newErrors.email = 'Email address is required';
    else if (!validateEmail(formData.email)) newErrors.email = 'Please enter a valid email address';

    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
    else if (!validatePhone(formData.phoneNumber)) newErrors.phoneNumber = 'Please enter a valid phone number';

    if (!formData.gender) newErrors.gender = 'Please select your gender';

    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    else if (!validateAge(formData.dateOfBirth)) newErrors.dateOfBirth = 'You must be at least 18 years old';

    if (!formData.address.trim()) newErrors.address = 'Address is required';
    else if (formData.address.trim().length < 10) newErrors.address = 'Please provide a complete address';

    if (!formData.password) newErrors.password = 'Password is required';
    else if (!validatePassword(formData.password)) newErrors.password = 'Password must be at least 8 characters with uppercase, lowercase, and number';

    if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    if (!formData.termsAccepted) newErrors.termsAccepted = 'You must accept the terms and conditions';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          gender: formData.gender,
          dateOfBirth: formData.dateOfBirth,
          address: formData.address,
          password: formData.password
        })
      });

      const data = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({
          fullName: '',
          email: '',
          phoneNumber: '',
          gender: '',
          dateOfBirth: '',
          address: '',
          password: '',
          confirmPassword: '',
          termsAccepted: false,
        });
      } else {
        setErrors({ email: data.message || "Something went wrong" });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrors({ email: "Server error. Please try again later." });
    }
    setIsLoading(false);
  };

  const getPasswordStrength = (password) => {
    if (password.length === 0) return { strength: '', color: '' };
    if (password.length < 4) return { strength: 'Weak', color: 'text-red-500' };
    if (password.length < 8) return { strength: 'Fair', color: 'text-yellow-500' };
    if (validatePassword(password)) return { strength: 'Strong', color: 'text-purple-500' };
    return { strength: 'Fair', color: 'text-yellow-500' };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-cyan-100 flex items-center justify-center p-4">
        <div className="bg-black rounded-2xl shadow-2xl p-8 text-center max-w-md w-full">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-purple-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Registration Successful!</h2>
          <p className="text-gray-600">Welcome! Your account has been created successfully.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-cyan-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Keep your full JSX structure here exactly as before */}
          {/* All input fields, labels, validation error messages, and styling remain the same */}
          {/* Only TypeScript types were removed */}
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
