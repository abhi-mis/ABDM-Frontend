'use client';

import { useState } from 'react';
import { ArrowRight, Shield, Smartphone, UserCheck, Loader2, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { apiClient } from '../lib/axios';

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
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const handleGetStarted = async () => {
    try {
      setIsLoading(true);
      const { data } = await apiClient.get('/api/access-token');
      sessionStorage.setItem('token', data.access_token);
      setFormData({ ...formData, accessToken: data.access_token });
      onNext();
    } catch (error) {
      console.error('Error getting access token:', error);
      alert('Error initializing. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    {
      icon: Shield,
      title: "Military-Grade Security",
      description: "Your health data is protected with AES-256 encryption and blockchain technology",
      gradient: "from-cyan-500 to-blue-500",
      iconBg: "from-cyan-400 to-blue-600"
    },
    {
      icon: Smartphone,
      title: "Instant Verification",
      description: "Advanced biometric and OTP verification for maximum security and convenience",
      gradient: "from-purple-500 to-pink-500",
      iconBg: "from-purple-400 to-pink-600"
    },
    {
      icon: UserCheck,
      title: "Universal Health ID",
      description: "Access your complete medical history with a single digital identity across India",
      gradient: "from-green-500 to-emerald-500",
      iconBg: "from-green-400 to-emerald-600"
    }
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center px-6 py-2 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 mb-6">
          <Sparkles className="w-5 h-5 mr-2 text-yellow-400" />
          <span className="text-white/90">Welcome to the Future of Healthcare</span>
        </div>
        
        <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text animate-gradient">
          ABHA Card Creation Portal
        </h2>
        
        <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
          Experience the next generation of digital healthcare management. Create your Ayushman Bharat Health Account with enhanced security and seamless integration.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid md:grid-cols-3 gap-8 mb-16"
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
            className="group relative"
            onMouseEnter={() => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(null)}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500"></div>
            <div className={`relative h-full bg-white/10 backdrop-blur-lg p-8 rounded-3xl border border-white/20 transform transition-all duration-500 ${hoverIndex === index ? 'scale-105' : ''}`}>
              <div className={`bg-gradient-to-br ${feature.iconBg} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-8 transform transition-transform group-hover:scale-110 group-hover:rotate-3`}>
                <feature.icon className="text-white w-8 h-8" />
              </div>
              <h3 className={`text-2xl font-bold mb-4 text-center bg-gradient-to-r ${feature.gradient} text-transparent bg-clip-text`}>
                {feature.title}
              </h3>
              <p className="text-white/70 text-center leading-relaxed">
                {feature.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="text-center relative"
      >
        <div className="absolute inset-x-0 -top-40 h-40 bg-gradient-to-t from-transparent to-transparent"></div>
        <button
          onClick={handleGetStarted}
          disabled={isLoading}
          className="group relative inline-flex items-center px-12 py-5 text-lg font-medium text-white bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full overflow-hidden transition-all duration-500 hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"></div>
          <span className="relative flex items-center">
            {isLoading ? (
              <>
                <Loader2 className="animate-spin mr-3 w-6 h-6" />
                Initializing...
              </>
            ) : (
              <>
                Begin Your Journey
                <ArrowRight className="ml-3 w-6 h-6 transform group-hover:translate-x-2 transition-transform" />
              </>
            )}
          </span>
        </button>
        <p className="mt-6 text-white/60">
          Join millions of Indians in the digital healthcare revolution
        </p>
      </motion.div>
    </div>
  );
}