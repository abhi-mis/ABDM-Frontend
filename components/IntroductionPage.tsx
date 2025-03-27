import React from 'react';
import { motion } from 'framer-motion';
import { Activity, FileText, Shield, Zap, Database, Share2, CreditCard, Network, CheckCircle2, Laptop, Guitar as Hospital, Heart, Clock, Users, BookOpen, Award, TrendingUp, ArrowRight } from 'lucide-react';

interface AppProps {
  onNext: () => void;
}

function App({ onNext }: AppProps) {
  const stats = [
    { label: 'ABHA Cards Created', value: '76.38Cr+', icon: Activity },
    { label: 'Health Records Linked', value: '51.84Cr+', icon: FileText },
    { label: 'Verified Facilities', value: '3.84L+', icon: Shield },
    { label: 'Healthcare Professionals', value: '5.89L+', icon: Zap },
  ];

  const mainBenefits = [
    {
      title: 'Digital Health Locker',
      description: 'Store all your medical records, prescriptions, and test reports securely in one place. Access them anytime, anywhere with military-grade encryption.',
      icon: Database,
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Seamless Document Sharing',
      description: 'Need to share your health records with a healthcare provider or insurer? ABHA makes it easy! Simply provide your ABHA ID, and authorised parties can securely access your documents, saving you time and effort.',
      icon: Share2,
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Cashless Claims Approval',
      description: 'Waiting for insurance claims approval can be tedious. By linking your insurance policy to your ABHA ID, you can expedite the process. Hospitals can access your policy details swiftly, accelerating cashless claims approval.',
      icon: CreditCard,
      gradient: 'from-orange-500 to-red-500',
    },
    {
      title: 'Unified Health Interface',
      description: 'The UHI initiative brings everything together on one platform. Access healthcare services, manage records, and coordinate with providers seamlessly.',
      icon: Network,
      gradient: 'from-green-500 to-emerald-500',
    }
  ];

  const whoShouldCreate = [
    {
      title: 'The Early Bird Advantage',
      description: 'Get ahead by creating your ABHA ID now. Soon it may become mandatory like Aadhaar. Walk into any hospital and access your complete medical history instantly.',
      icon: Clock,
      gradient: 'from-blue-400 to-indigo-500'
    },
    {
      title: 'Digital Innovation Users',
      description: `If you're excited about India's digital health future, ABHA is your gateway. Major hospitals like AIIMS are already making it mandatory.`,
       icon: Laptop,
      gradient: 'from-purple-400 to-pink-500'
    },
    {
      title: 'Future-Ready Citizens',
      description: `Stay prepared for upcoming healthcare innovations. ABHA will be central to India's digital health ecosystem.`,
      icon: Award,
      gradient: 'from-green-400 to-emerald-500'
    }
  ];

  const latestUpdates = [
    {
      title: 'Senior Citizens Coverage',
      description: 'AB PM-JAY now covers all citizens above 70 years, regardless of income. Access up to ₹5 lakh coverage for your healthcare needs.',
      icon: Users,
      date: 'March 2024'
    },
    {
      title: 'Enhanced Security',
      description: 'Implementation of advanced blockchain technology for data protection. Your health records are now more secure than ever.',
      icon: Shield,
      date: 'February 2024'
    },
    {
      title: 'Digital Health Mission',
      description: 'Complete integration with National Digital Health Mission for comprehensive healthcare management.',
      icon: Heart,
      date: 'January 2024'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 py-20">
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
            Create ABHA Card Online
          </h1>
          
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            ABHA Card: Steps to Create, Retrieve & Download Ayushman Bharat Health Account. ABHA ID enables you to easily store health data in your sharable Ayushman Bharat Health Account.
          </p>

          <motion.button
            onClick={onNext}
            className="mt-8 group relative inline-flex items-center px-12 py-5 text-lg font-medium text-white bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full overflow-hidden transition-all duration-500 hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"></div>
            <span className="relative flex items-center">
              Create Your ABHA Card Now
              <ArrowRight className="ml-3 w-6 h-6 transform group-hover:translate-x-2 transition-transform" />
            </span>
          </motion.button>
        </motion.div>

        {/* Stats Grid */}
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

        {/* Main Benefits */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
            What are the main benefits of creating your ABHA ID?
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

        {/* Who Should Create */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
            Who should create an ABHA account?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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

        {/* Latest Updates */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
            Latest Updates
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestUpdates.map((update, index) => (
              <motion.div
                key={index}
                className="relative group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500"></div>
                <div className="relative bg-white/10 backdrop-blur-lg p-6 rounded-3xl border border-white/20">
                  <div className="flex items-center justify-between mb-4">
                    <update.icon className="w-6 h-6 text-blue-400" />
                    <span className="text-sm text-white/60">{update.date}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white">{update.title}</h3>
                  <p className="text-white/70">{update.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <button
            onClick={onNext}
            className="group relative inline-flex items-center px-12 py-5 text-lg font-medium text-white bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full overflow-hidden transition-all duration-500 hover:scale-105"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"></div>
            <span className="relative flex items-center">
              Create Your ABHA Card Now
              <ArrowRight className="ml-3 w-6 h-6 transform group-hover:translate-x-2 transition-transform" />
            </span>
          </button>
          <p className="mt-6 text-white/60">
            Join millions of Indians in the digital healthcare revolution
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default App;