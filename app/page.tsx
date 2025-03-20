'use client';

import { useState } from 'react';
import ProgressBar from '@/components/ProgressBar';
import WelcomePage from '@/components/WelcomePage';
import AadharRegistration from '@/components/AadharRegistration';
import AadharVerification from '@/components/AadharVerification';
import ProfileSection from '@/components/ProfileSection';
import { motion } from 'framer-motion';

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
    mobile: '',
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
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-3xl -top-48 -left-24 animate-pulse"></div>
        <div className="absolute w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-3xl top-96 right-12 animate-pulse delay-700"></div>
        <div className="absolute w-[600px] h-[600px] bg-pink-500/20 rounded-full blur-3xl -bottom-32 left-1/2 animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center px-6 py-2 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 mb-6">
            <span className="text-white/90">ABHA Card Registration Portal</span>
          </div>
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-gradient mb-4">
            Create Your ABHA Card
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Your gateway to unified digital health records
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <ProgressBar steps={steps} currentStep={currentStep} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl"></div>
            <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8">
              {renderStepContent()}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}