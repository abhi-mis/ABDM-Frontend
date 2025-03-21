'use client';

import React from 'react';
import { motion } from 'framer-motion';
import nhaLogo from './images/NHA.png';
import ayushmanLogo from './images/ABh.png';

export default function Footer() {
  const govLogos = [
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg",
      alt: "Government of India",
      width: 80
    },
    {
      src: "./images/NHA.png",
      alt: "National Health Authority",
      width: 120
    },
    {
      src: "./images/ABh.png",
      alt: "Ayushman Bharat",
      width: 110
    }
  ];

  return (
    <footer className="relative border-t border-white/10 backdrop-blur-xl bg-[#1a1b2e]/95">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-stretch gap-8 mb-12">
          {/* Official Partners Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-full md:w-1/3 flex flex-col items-center text-center"
          >
            <h3 className="text-xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-transparent bg-clip-text mb-6">
              Official Partners
            </h3>
            <ul className="space-y-3 flex-grow">
              <li className="text-white/70">Ministry of Health</li>
              <li className="text-white/70">National Health Authority</li>
              <li className="text-white/70">Digital India Initiative</li>
              <li className="text-white/70">State Health Departments</li>
            </ul>
          </motion.div>

          {/* Vertical Divider */}
          <div className="hidden md:block w-px self-stretch bg-gradient-to-b from-indigo-500/20 via-purple-500/20 to-pink-500/20"></div>

          {/* About ABHA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full md:w-1/3 flex flex-col items-center text-center"
          >
            <h3 className="text-xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-transparent bg-clip-text mb-6">
              About ABHA
            </h3>
            <p className="text-white/70 leading-relaxed flex-grow">
              Ayushman Bharat Health Account (ABHA) is your unified digital health identity, seamlessly connecting your healthcare journey across India. Experience the future of healthcare management with secure, portable, and accessible health records.
            </p>
          </motion.div>

          {/* Vertical Divider */}
          <div className="hidden md:block w-px self-stretch bg-gradient-to-b from-indigo-500/20 via-purple-500/20 to-pink-500/20"></div>

          {/* Contact Us Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full md:w-1/3 flex flex-col items-center text-center"
          >
            <h3 className="text-xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-transparent bg-clip-text mb-6">
              Contact Us
            </h3>
            <ul className="space-y-3 flex-grow">
              <li className="text-white/70">
                <strong className="text-white/90">Email:</strong> support@abha.gov.in
              </li>
              <li className="text-white/70">
                <strong className="text-white/90">Toll Free:</strong> 1800-XXX-XXXX
              </li>
              <li className="text-white/70">
                <strong className="text-white/90">Hours:</strong> 24x7 Support
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="pt-8 border-t border-white/10"
        >
          <div className="flex flex-wrap justify-center items-center gap-8 mb-8">
            {govLogos.map((logo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative bg-white/5 backdrop-blur-xl rounded-xl p-4 hover:bg-white/10 transition-colors group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <img
                  src={logo.src}
                  alt={logo.alt}
                  style={{ width: logo.width + 'px', height: '48px' }}
                  className="h-12 w-auto object-contain relative z-10"
                />
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-white/60">
              © {new Date().getFullYear()} ABHA Card Creation. All rights reserved.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}