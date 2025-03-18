'use client';

import { useState } from 'react';
import ProgressBar from '@/components/ProgressBar';
import WelcomePage from '@/components/WelcomePage';
import AadharRegistration from '@/components/AadharRegistration';
import AadharVerification from '@/components/AadharVerification';
import ProfileSection from '@/components/ProfileSection';

const steps = [
  {
    id: 1,
    name: 'Welcome',
    description: 'Get Started',
  },
  {
    id: 2,
    name: 'Aadhar Registration',
    description: 'Enter your Aadhar details',
  },
  {
    id: 3,
    name: 'Verification',
    description: 'Verify your Aadhar',
  },
  {
    id: 4,
    name: 'Profile',
    description: 'Complete your profile',
  },
];

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    accessToken: '',
    aadharNumber: '',
    otp: '',
    profile: {
      name: '',
      dob: '',
      gender: '',
      mobile: '',
      email: '',
    },
  });

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <WelcomePage
            formData={formData}
            setFormData={setFormData}
            onNext={handleNext}
          />
        );
      case 2:
        return (
          <AadharRegistration
            formData={formData}
            setFormData={setFormData}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 3:
        return (
          <AadharVerification
            formData={formData}
            setFormData={setFormData}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 4:
        return (
          <ProfileSection
            formData={formData}
            setFormData={setFormData}
            onBack={handleBack}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
            Create Your ABHA Card
          </h1>
          <p className="text-lg text-gray-600">
            Your gateway to unified digital health records
          </p>
        </div>

        <ProgressBar steps={steps} currentStep={currentStep} />

        <div className="mt-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 backdrop-blur-lg bg-opacity-90 border border-gray-100">
            {renderStepContent()}
          </div>
        </div>
      </div>
    </div>
  );
}