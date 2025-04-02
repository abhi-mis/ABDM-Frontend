"use client";
import React, { useState } from 'react';
import { Menu, X, Stethoscope, Bot, Home, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import VerifyAbha from './VerifyAbha';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);

  const menuItems = [
    { name: 'Home', icon: Home, href: '/' },
    { name: 'Profile', icon: User, href: '/Profile' },
    { name: 'Talk to Ira', icon: Bot, href: '/Assistant' },
  ];

  const handleVerifyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowVerifyModal(true);
    setIsMenuOpen(false);
  };

  const closeModal = () => {
    setShowVerifyModal(false);
  };

  return (
    <>
      <header className="!bg-[#1a1b2e]/95 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="relative w-10 h-10 overflow-hidden rounded-xl transform transition-transform hover:scale-105">
                <a href="/" className="relative w-10 h-10 overflow-hidden rounded-xl transform transition-transform hover:scale-105">
                  <img
                    src="https://media.licdn.com/dms/image/v2/D4D0BAQFzisxNGVY4Lw/company-logo_200_200/company-logo_200_200/0/1735566654386/docbotplus_logo?e=2147483647&v=beta&t=1o7lOa0gbZFhBBJQPjX7rP4B--K46zfF6EWIW8fk9gk"
                    alt="DocBot Logo"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/30 to-purple-600/30 mix-blend-overlay" />
                </a>
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/30 to-purple-600/30 mix-blend-overlay" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center space-x-2">
                  <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
                    DocBot
                  </span>
                  <Bot className="w-5 h-5 text-indigo-400" />
                </div>
                <span className="text-xs text-white/60">Your Health, Our mission</span>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-6">
              <div className="flex items-center space-x-4 mr-4">
                {menuItems.map((item) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    className="flex items-center space-x-1 text-white/70 hover:text-white transition-colors cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <item.icon className="w-4 h-4" />
                    <span className="text-sm">{item.name}</span>
                  </motion.a>
                ))}
              </div>
              <motion.button
                onClick={handleVerifyClick}
                className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full text-white font-medium shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-shadow"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Stethoscope className="w-4 h-4" />
                <span>Verify Health Card</span>
              </motion.button>
            </div>

            <button
              className="md:hidden relative group"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="absolute inset-0 bg-white/5 rounded-lg blur-lg transform group-hover:scale-110 transition-transform" />
              <div className="relative p-2 text-white/90 hover:text-white transition-colors">
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </div>
            </button>
          </div>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="md:hidden mt-4 bg-[#1a1b2e]/90 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden"
              >
                {menuItems.map((item) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    className="flex items-center space-x-3 px-6 py-4 text-white/80 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                    whileTap={{ scale: 0.98 }}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </motion.a>
                ))}

                <motion.button
                  onClick={handleVerifyClick}
                  className="w-full flex items-center space-x-3 px-6 py-4 text-white/80 hover:text-white hover:bg-white/5 transition-colors"
                  whileTap={{ scale: 0.98 }}
                >
                  <Stethoscope className="w-5 h-5" />
                  <span>Verify Health Card</span>
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>

      <AnimatePresence>
        {showVerifyModal && <VerifyAbha onClose={closeModal} isOpen={showVerifyModal} />}
      </AnimatePresence>
    </>
  );
}