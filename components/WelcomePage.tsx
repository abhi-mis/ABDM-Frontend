'use client';

import { useState } from 'react';
import { ArrowRight, Shield, Smartphone, UserCheck, Loader2 } from 'lucide-react';

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
  const [isLoading, setIsLoading] = useState(false);

  const handleGetStarted = async () => {
    try {
      setIsLoading(true);
      const url = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${url}/api/access-token`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
        }
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      
      // Save token to session storage
      sessionStorage.setItem('token', data.access_token);
      
      // Update form data with the token
      setFormData({ ...formData, accessToken: data.access_token });
      onNext();
    } catch (error) {
      console.error('Error getting access token:', error);
      alert('Error initializing. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-16">
        {/* <div className="inline-block p-2 px-4 bg-blue-100 rounded-full text-blue-700 text-sm font-medium mb-4">
          Welcome to ABHA
        </div> */}
        <h2 className="text-4xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 inline-block text-transparent bg-clip-text">
          ABHA Card Creation Portal
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Create your Ayushman Bharat Health Account securely and efficiently
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white p-8 rounded-2xl shadow-lg transform transition-all duration-300 hover:-translate-y-2">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-6">
            <Shield className="text-white w-7 h-7" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">
            Secure Process
          </h3>
          <p className="text-gray-600 text-center">
            Your health data is protected with state-of-the-art encryption and security measures
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg transform transition-all duration-300 hover:-translate-y-2">
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-6">
            <Smartphone className="text-white w-7 h-7" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">
            Quick Verification
          </h3>
          <p className="text-gray-600 text-center">
            Seamless OTP-based verification process for hassle-free registration
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg transform transition-all duration-300 hover:-translate-y-2">
          <div className="bg-gradient-to-br from-green-500 to-green-600 w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-6">
            <UserCheck className="text-white w-7 h-7" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">
            Digital Health ID
          </h3>
          <p className="text-gray-600 text-center">
            Access your complete health records digitally from anywhere, at any time
          </p>
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={handleGetStarted}
          disabled={isLoading}
          className="inline-flex items-center px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin mr-2 w-5 h-5" />
              Initializing...
            </>
          ) : (
            <>
              Get Started
              <ArrowRight className="ml-2 w-5 h-5" />
            </>
          )}
        </button>
        <p className="mt-4 text-sm text-gray-500">
          Your health, your control. Start your digital health journey today.
        </p>
      </div>
    </div>
  );
}