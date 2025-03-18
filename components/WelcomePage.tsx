'use client';

import { ArrowRight, Shield, Smartphone, UserCheck } from 'lucide-react';

interface WelcomePageProps {
  formData: any;
  setFormData: (data: any) => void;
  onNext: () => void;
}

export default function WelcomePage({
  formData,
  setFormData,
  onNext,
}: WelcomePageProps) {
  const handleGetStarted = async () => {
    try {
      // Here you would make an API call to get the access token
      // const response = await fetch('/api/auth', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      // });
      // const data = await response.json();
      // setFormData({ ...formData, accessToken: data.accessToken });
      onNext();
    } catch (error) {
      console.error('Error getting access token:', error);
      alert('Error initializing. Please try again.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Welcome to ABHA Card Creation
        </h2>
        <p className="text-lg text-gray-600">
          Create your Ayushman Bharat Health Account in just a few simple steps
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl text-center">
          <div className="bg-blue-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="text-white w-6 h-6" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Secure Process
          </h3>
          <p className="text-gray-600">
            Your data is protected with industry-standard encryption
          </p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl text-center">
          <div className="bg-purple-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
            <Smartphone className="text-white w-6 h-6" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Quick Verification
          </h3>
          <p className="text-gray-600">
            Simple OTP-based verification process
          </p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl text-center">
          <div className="bg-green-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
            <UserCheck className="text-white w-6 h-6" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Digital Health ID
          </h3>
          <p className="text-gray-600">
            Access your health records anywhere, anytime
          </p>
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={handleGetStarted}
          className="inline-flex items-center px-6 py-3 text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105"
        >
          Get Started
          <ArrowRight className="ml-2 w-5 h-5" />
        </button>
      </div>
    </div>
  );
}