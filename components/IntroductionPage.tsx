'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Activity, FileText, Shield, Zap, Smartphone, Heart, Wallet, Users, CheckCircle2, Laptop, HelpCircle, Database, Share2, CreditCard, Network, Hospital } from 'lucide-react';
import { useState } from 'react';

interface IntroductionPageProps {
  onNext: () => void;
}

export default function IntroductionPage({ onNext }: IntroductionPageProps) {
  const [activeSection, setActiveSection] = useState('overview');

  const stats = [
    { label: 'ABHA Cards Created', value: '76.38Cr+', icon: Activity },
    { label: 'Health Records Linked', value: '51.84Cr+', icon: FileText },
    { label: 'Verified Facilities', value: '3.84L+', icon: Shield },
    { label: 'Healthcare Professionals', value: '5.89L+', icon: Zap },
  ];

  const mainBenefits = [
    {
      title: 'Store with Confidence',
      description: `Say goodbye to the hassle of managing piles of physical documents. With ABHA, you can store all your health-related documents – from hospital records to laboratory's diagnostics and health insurance claims details – in one secure, digital personal health locker. Rest assured, your data remains confidential and accessible only to you.`,
         icon: Database,
      gradient: 'from-blue-500 to-cyan-500',
      image: '/storage.svg'
    },
    {
      title: 'Seamless Document Sharing',
      description: 'Need to share your health records with a healthcare provider or insurer? ABHA makes it easy! Simply provide your ABHA ID, and authorised parties can securely access your documents, saving you time and effort.',
      icon: Share2,
      gradient: 'from-purple-500 to-pink-500',
      image: '/share.svg'
    },
    {
      title: 'Cashless Claims Approval',
      description: 'Waiting for insurance claims approval can be tedious. By linking your insurance policy to your ABHA ID, you can expedite the process. Hospitals can access your policy details swiftly, accelerating cashless claims approval and ensuring smooth healthcare experiences.',
      icon: CreditCard,
      gradient: 'from-orange-500 to-red-500',
      image: '/claims.svg'
    },
    {
      title: 'Unified Health Interface (UHI)',
      description: `The UHI initiative is part of the government's plan to use technology to improve healthcare in India. It aims to solve problems like making healthcare easier to access, more affordable, and better quality. By bringing everything together on one platform, like ABHA, the UHI wants to fill in the gaps in the healthcare system and make sure patients are at the centre of their care.`,
     icon: Network,
      gradient: 'from-green-500 to-emerald-500',
      image: '/unified.svg'
    }
  ];

  const whoShouldCreate = [
    {
      title: 'The Early Bird Advantage',
      description: 'Are you already on the lookout for ABHA? Then you have the advantage of availing these services early on. This is because the authorities may soon make ABHA mandatory (just like your Aadhaar or PAN card). Imagine if you can just walk into a hospital with your ABHA card, give access to your healthcare professional, and avail medical treatment. All your medical history, your health insurance details, treatment plans visible to them with a few clicks. No need to carry a file or remember your medical history. As hassle-free as that!',
      icon: CheckCircle2,
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Embracing Digital Innovation',
      description: `Are you intrigued by India's digital health future and eager to explore the latest features from DocBot, a digital leader in the healthcare industry? Creating an ABHA ID is your ticket to experiencing cutting-edge digital healthcare solutions firsthand. This is particularly advantageous as major hospitals like AIIMS are already adopting ABHA as a mandatory requirement to avail healthcare.`,
      icon: Laptop,
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Preparing for Future Benefits',
      description: `Stay ahead of the curve by proactively creating your ABHA number. By doing so, you'll be well-prepared to reap the benefits that ABHA has to offer in the future, ensuring that you're not left behind in India's digital health revolution.`,
      icon: Heart,
      gradient: 'from-orange-500 to-red-500'
    },
    {
      title: 'Integrated Hospital Experience',
      description: `Is your hospital integrated with ABHA? By creating an ABHA ID, you can seamlessly receive your hospital documents through a Personal Health Record (PHR) app. It's a convenient way to stay organised and informed about your medical history and treatments.`,
      icon: Hospital,
      gradient: 'from-green-500 to-emerald-500'
    }
  ];

  const requirements = [
    {
      title: 'Aadhaar Card',
      description: 'Your 12-digit Aadhaar number for identity verification',
      icon: Shield,
    },
    {
      title: 'Mobile Number',
      description: 'A valid mobile number for OTP verification',
      icon: Smartphone,
    }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <>
            {/* Stats Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="relative group"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
                    <stat.icon className="w-8 h-8 mb-4 text-blue-400" />
                    <h3 className="text-3xl font-bold text-white mb-2">{stat.value}</h3>
                    <p className="text-white/60">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Main Benefits Section */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
                What are the 4 main benefits of creating your ABHA ID?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {mainBenefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    className="relative group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500"></div>
                    <div className="relative h-full bg-white/10 backdrop-blur-lg p-8 rounded-3xl border border-white/20">
                      <div className={`bg-gradient-to-r ${benefit.gradient} w-12 h-12 rounded-2xl flex items-center justify-center mb-6`}>
                        <benefit.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className={`text-2xl font-bold mb-4 bg-gradient-to-r ${benefit.gradient} text-transparent bg-clip-text`}>
                        {benefit.title}
                      </h3>
                      <p className="text-white/70 leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Who Should Create Section */}
            <div>
              <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
                Who should create an ABHA account?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {whoShouldCreate.map((item, index) => (
                  <motion.div
                    key={index}
                    className="relative group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500"></div>
                    <div className="relative h-full bg-white/10 backdrop-blur-lg p-8 rounded-3xl border border-white/20">
                      <div className={`bg-gradient-to-r ${item.gradient} w-12 h-12 rounded-2xl flex items-center justify-center mb-6`}>
                        <item.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className={`text-2xl font-bold mb-4 bg-gradient-to-r ${item.gradient} text-transparent bg-clip-text`}>
                        {item.title}
                      </h3>
                      <p className="text-white/70 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </>
        );

      case 'requirements':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
                Required Documents
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {requirements.map((req, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl p-3">
                      <req.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">{req.title}</h4>
                      <p className="text-white/70">{req.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
                Important Notes
              </h3>
              <ul className="space-y-4 text-white/70">
                <li className="flex items-center space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>The registration process is completely free of cost</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>Your mobile number doesn't need to be linked with Aadhaar</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>The entire process takes less than 5 minutes</span>
                </li>
              </ul>
            </div>
          </motion.div>
        );

      case 'benefits':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-12"
          >
            {/* Main Benefits Section */}
            <div>
              <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
                Core Benefits of ABHA
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {mainBenefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    className="relative group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500"></div>
                    <div className="relative h-full bg-white/10 backdrop-blur-lg p-8 rounded-3xl border border-white/20">
                      <div className={`bg-gradient-to-r ${benefit.gradient} w-12 h-12 rounded-2xl flex items-center justify-center mb-6`}>
                        <benefit.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className={`text-2xl font-bold mb-4 bg-gradient-to-r ${benefit.gradient} text-transparent bg-clip-text`}>
                        {benefit.title}
                      </h3>
                      <p className="text-white/70 leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Additional Benefits Section */}
            <div>
              <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
                Who Should Create an ABHA Account?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {whoShouldCreate.map((item, index) => (
                  <motion.div
                    key={index}
                    className="relative group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500"></div>
                    <div className="relative h-full bg-white/10 backdrop-blur-lg p-8 rounded-3xl border border-white/20">
                      <div className={`bg-gradient-to-r ${item.gradient} w-12 h-12 rounded-2xl flex items-center justify-center mb-6`}>
                        <item.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className={`text-2xl font-bold mb-4 bg-gradient-to-r ${item.gradient} text-transparent bg-clip-text`}>
                        {item.title}
                      </h3>
                      <p className="text-white/70 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center px-6 py-2 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 mb-6">
          <img
            src="https://media.licdn.com/dms/image/v2/D4D0BAQFzisxNGVY4Lw/company-logo_200_200/company-logo_200_200/0/1735566654386/docbotplus_logo?e=2147483647&v=beta&t=1o7lOa0gbZFhBBJQPjX7rP4B--K46zfF6EWIW8fk9gk"
            alt="DocBot Logo"
            className="w-6 h-6 mr-2 rounded-full"
          />
          <span className="text-white/90">Powered by DocBot</span>
        </div>
        
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text animate-gradient">
          Your Digital Health Identity
        </h1>
        
        <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
          ABHA (Ayushman Bharat Health Account) is India's revolutionary digital health initiative, 
          now made more accessible through DocBot's cutting-edge healthcare platform.
        </p>
      </motion.div>

      {/* Navigation Tabs */}
      <div className="flex justify-center mb-12">
        <div className="inline-flex rounded-full bg-white/10 backdrop-blur-lg p-1">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'requirements', label: 'Requirements' },
            { id: 'benefits', label: 'Benefits' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id)}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                activeSection === tab.id
                  ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content Section */}
      {renderContent()}

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="text-center mt-16"
      >
        <button
          onClick={onNext}
          className="group relative inline-flex items-center px-12 py-5 text-lg font-medium text-white bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full overflow-hidden transition-all duration-500 hover:scale-105"
        >
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"></div>
          <span className="relative flex items-center">
            Create Your ABHA Card
            <ArrowRight className="ml-3 w-6 h-6 transform group-hover:translate-x-2 transition-transform" />
          </span>
        </button>
        <p className="mt-6 text-white/60">
          Join millions of Indians in the digital healthcare revolution with DocBot
        </p>
      </motion.div>
    </div>
  );
}