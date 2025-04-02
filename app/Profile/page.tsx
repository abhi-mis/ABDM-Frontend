"use client";
import React, { useState, useEffect } from 'react';
import { Shield, Loader2, CheckCircle2, AlertCircle, User, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import {
  getAccessToken,
  sendAadharOTP,
  verifyAadharOTP,
  getProfile,
  getQrCode,
  getJustProfile,
  apiClient
} from '../../lib/axios';

interface ProfileData {
  ABHANumber: string;
  preferredAbhaAddress: string;
  mobile: string;
  name: string;
  gender: string;
  yearOfBirth: string;
  dayOfBirth: string;
  monthOfBirth: string;
  status: string;
  stateName: string;
  districtName: string;
  pincode: string;
  address: string;
  profilePhoto: string;
  kycPhoto: string;
  kycVerified: boolean;
  verificationStatus: string;
  verificationType: string;
  createdDate: string;
}

type Step = 'aadhar' | 'otp' | 'profile';

export default function ProfileView() {
  const [step, setStep] = useState<Step>('aadhar');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    aadharNumber: '',
    otp: '',
    mobile: ''
  });
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [abhaCard, setAbhaCard] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('basic');
  const [aadharParts, setAadharParts] = useState(['', '', '']);
  const [timer, setTimer] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [resendAttempts, setResendAttempts] = useState(0);

  useEffect(() => {
    const initializeToken = async () => {
      try {
        await getAccessToken();
      } catch (error) {
        toast.error('Failed to initialize session');
      }
    };

    initializeToken();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isResendDisabled && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            setIsResendDisabled(false);
            return 60;
          }
          return prevTimer - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isResendDisabled, timer]);

  const handleAadharChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newParts = [...aadharParts];
    newParts[index] = value;
    setAadharParts(newParts);

    if (value.length === 4 && index < 2) {
      const nextInput = document.getElementById(`aadhar-${index + 1}`);
      nextInput?.focus();
    }

    setFormData({
      ...formData,
      aadharNumber: newParts.join('')
    });
  };

  const handleAadharSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const accessToken = sessionStorage.getItem('token');
      if (!accessToken) throw new Error('No access token found');

      await sendAadharOTP(formData.aadharNumber, accessToken);
      setStep('otp');
      toast.success('OTP sent successfully!');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to send OTP';
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const accessToken = sessionStorage.getItem('token');
      if (!accessToken) throw new Error('No access token found');

      await verifyAadharOTP(
        formData.aadharNumber,
        formData.otp,
        formData.mobile,
        accessToken
      );

      // Fetch profile data after successful verification
      const [profile, qrResponse, justProfile] = await Promise.all([
        getProfile(),
        getQrCode(),
        getJustProfile()
      ]);

      // Handle profile photos
      if (profile.profilePhoto && !profile.profilePhoto.startsWith('data:image')) {
        profile.profilePhoto = `data:image/jpeg;base64,${profile.profilePhoto}`;
      }
      if (profile.kycPhoto && !profile.kycPhoto.startsWith('data:image')) {
        profile.kycPhoto = `data:image/jpeg;base64,${profile.kycPhoto}`;
      }

      // Handle QR code
      if (qrResponse && qrResponse.qrCode) {
        setQrCode(`data:image/png;base64,${qrResponse.qrCode}`);
      }

      // Handle ABHA Card
      if (justProfile.image) {
        setAbhaCard(`data:image/png;base64,${justProfile.image}`);
      }

      setProfileData(profile);
      setStep('profile');
      toast.success('Verification successful!');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Verification failed';
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (resendAttempts >= 2) {
      toast.error('Maximum resend attempts reached');
      return;
    }

    if (isResendDisabled) {
      toast.error(`Please wait ${timer} seconds`);
      return;
    }

    setIsLoading(true);
    try {
      const accessToken = sessionStorage.getItem('token');
      if (!accessToken) throw new Error('No access token found');

      await sendAadharOTP(formData.aadharNumber, accessToken);
      setResendAttempts(prev => prev + 1);
      setIsResendDisabled(true);
      setTimer(60);
      toast.success('OTP resent successfully!');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to resend OTP';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadQrCode = () => {
    if (qrCode) {
      const link = document.createElement('a');
      link.href = qrCode;
      link.download = 'ABHA-QR.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleDownloadAbhaCard = () => {
    if (abhaCard) {
      const link = document.createElement('a');
      link.href = abhaCard;
      link.download = 'ABHA-Card.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (step === 'aadhar') {
    return (
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="relative inline-block">
            <div className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6 transform transition-transform hover:scale-110 hover:rotate-3">
              <Shield className="text-white w-12 h-12" />
            </div>
          </div>

          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
            Enter Your Aadhar Details
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Please provide your 12-digit Aadhar number for verification
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleAadharSubmit}
          className="space-y-8"
        >
          <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <label className="block text-white/90 text-lg font-medium mb-4">
              Aadhar Number
            </label>
            <div className="flex gap-4 items-center">
              {aadharParts.map((part, index) => (
                <input
                  key={index}
                  type="text"
                  id={`aadhar-${index}`}
                  value={part}
                  onChange={(e) => handleAadharChange(index, e.target.value)}
                  maxLength={4}
                  placeholder="0000"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:border-purple-500 focus:ring-purple-500 transition-all duration-300 text-center text-lg"
                  disabled={isLoading}
                />
              ))}
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center text-red-400 bg-red-500/10 p-3 rounded-lg"
            >
              <AlertCircle className="w-5 h-5 mr-2" />
              {error}
            </motion.div>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading || formData.aadharNumber.length !== 12}
            className="w-full relative group px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white disabled:opacity-50 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>
            <span className="relative flex items-center justify-center">
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-5 w-5" />
                  Sending OTP...
                </>
              ) : (
                'Continue'
              )}
            </span>
          </motion.button>
        </motion.form>
      </div>
    );
  }

  if (step === 'otp') {
    return (
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="relative inline-block">
            <div className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6 transform transition-transform hover:scale-110 hover:rotate-3">
              <Shield className="text-white w-12 h-12" />
            </div>
          </div>

          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
            Verify Your Identity
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Enter the OTP sent to your registered mobile number
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleOtpSubmit}
          className="space-y-8"
        >
          <div className="space-y-6 bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <div className="relative">
              <label className="block text-white/90 text-sm font-medium mb-2">
                Mobile Number for ABHA Updates
              </label>
              <input
                type="tel"
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                placeholder="Enter your 10-digit mobile number"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:border-purple-500 focus:ring-purple-500 transition-all duration-300"
                pattern="\d{10}"
                maxLength={10}
                required
                disabled={isLoading}
              />
            </div>

            <div className="relative">
              <label className="block text-white/90 text-sm font-medium mb-2">
                Enter OTP
              </label>
              <input
                type="text"
                value={formData.otp}
                onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                placeholder="Enter 6-digit OTP"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:border-purple-500 focus:ring-purple-500 transition-all duration-300"
                pattern="\d{6}"
                maxLength={6}
                required
                disabled={isLoading}
              />
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center text-red-400 bg-red-500/10 p-3 rounded-lg"
            >
              <AlertCircle className="w-5 h-5 mr-2" />
              {error}
            </motion.div>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
            className="w-full relative group px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white disabled:opacity-50 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>
            <span className="relative flex items-center justify-center">
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-5 w-5" />
                  Verifying...
                </>
              ) : (
                'Verify & Continue'
              )}
            </span>
          </motion.button>

          <div className="mt-4 text-center space-y-4">
            {isResendDisabled && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-lg font-semibold text-white/90"
              >
                Resend available in: {timer}s
              </motion.div>
            )}
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleResendOtp}
              className={`px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white transition-all duration-300 ${isResendDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isLoading || isResendDisabled || resendAttempts >= 2}
            >
              {resendAttempts >= 2 ? 'Maximum attempts reached' : 'Resend OTP'}
            </motion.button>
            
            <p className="text-sm text-white/70">
              {resendAttempts >= 2 
                ? 'You have used all available resend attempts.' 
                : `${2 - resendAttempts} resend attempts remaining`}
            </p>
          </div>
        </motion.form>
      </div>
    );
  }

  if (step === 'profile' && profileData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8">
            {/* Profile Header */}
            <div className="flex items-center space-x-6 mb-8">
              <div className="relative w-24 h-24 rounded-full overflow-hidden bg-white/10">
                {profileData.profilePhoto ? (
                  <img 
                    src={profileData.profilePhoto}
                    alt={profileData.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-full h-full p-4 text-white/60" />
                )}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">{profileData.name}</h1>
                <p className="text-white/80">ABHA Number: {profileData.ABHANumber}</p>
                <p className="text-white/60">{profileData.preferredAbhaAddress}</p>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex space-x-4 mb-8">
              <button
                onClick={() => setActiveTab('basic')}
                className={`px-6 py-2 rounded-full transition-all ${
                  activeTab === 'basic' 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-white/10 text-white/60 hover:bg-white/20'
                }`}
              >
                Basic Info
              </button>
              <button
                onClick={() => setActiveTab('address')}
                className={`px-6 py-2 rounded-full transition-all ${
                  activeTab === 'address' 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-white/10 text-white/60 hover:bg-white/20'
                }`}
              >
                Address
              </button>
              <button
                onClick={() => setActiveTab('kyc')}
                className={`px-6 py-2 rounded-full transition-all ${
                  activeTab === 'kyc' 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-white/10 text-white/60 hover:bg-white/20'
                }`}
              >
                KYC Details
              </button>
              <button
                onClick={() => setActiveTab('abha')}
                className={`px-6 py-2 rounded-full transition-all ${
                  activeTab === 'abha' 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-white/10 text-white/60 hover:bg-white/20'
                }`}
              >
                ABHA Card
              </button>
            </div>

            {/* Content Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {activeTab === 'basic' && (
                <>
                  <div className="space-y-4">
                    <InfoItem label="Full Name" value={profileData.name} />
                    <InfoItem label="Gender" value={profileData.gender === 'F' ? 'Female' : profileData.gender === 'M' ? 'Male' : 'Other'} />
                    <InfoItem label="Date of Birth" 
                      value={`${profileData.dayOfBirth}/${profileData.monthOfBirth}/${profileData.yearOfBirth}`} 
                    />
                    <InfoItem label="Mobile" value={profileData.mobile} />
                  </div>
                  <div className="flex flex-col items-center justify-center bg-white/5 rounded-2xl p-6">
                    {qrCode && (
                      <>
                        <img 
                          src={qrCode} 
                          alt="Profile QR Code" 
                          className="w-48 h-48 mb-4 bg-white p-2 rounded-lg"
                        />
                        <button
                          onClick={handleDownloadQrCode}
                          className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 transition-colors rounded-lg text-white mt-4"
                        >
                          <Download className="w-5 h-5" />
                          Download QR Code
                        </button>
                      </>
                    )}
                  </div>
                </>
              )}

              {activeTab === 'address' && (
                <div className="col-span-2 space-y-4">
                  <InfoItem label="Address" value={profileData.address} />
                  <InfoItem label="State" value={profileData.stateName} />
                  <InfoItem label="District" value={profileData.districtName} />
                  <InfoItem label="Pincode" value={profileData.pincode} />
                </div>
              )}

              {activeTab === 'kyc' && (
                <div className="col-span-2 space-y-4">
                  <InfoItem 
                    label="KYC Status" 
                    value={profileData.kycVerified ? 'Verified' : 'Not Verified'} 
                    verified={profileData.kycVerified}
                  />
                  <InfoItem label="Verification Type" value={profileData.verificationType} />
                  <InfoItem label="Verification Status" value={profileData.verificationStatus} />
                  <InfoItem label="Created Date" value={profileData.createdDate} />
                  {profileData.kycPhoto && (
                    <div className="bg-white/5 rounded-xl p-4">
                      <p className="text-white/60 text-sm mb-4">KYC Photo</p>
                      <img 
                        src={profileData.kycPhoto} 
                        alt="KYC Photo"
                        className="max-w-sm rounded-lg"
                      />
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'abha' && (
                <div className="col-span-2 space-y-6">
                  <div className="flex justify-end">
                    <button
                      onClick={handleDownloadAbhaCard}
                      className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 transition-colors rounded-lg text-white"
                    >
                      <Download className="w-5 h-5" />
                      Download ABHA Card
                    </button>
                  </div>
                  {abhaCard && (
                    <div className="bg-white/5 rounded-xl p-4">
                      <img 
                        src={abhaCard} 
                        alt="ABHA Card"
                        className="w-full rounded-lg shadow-lg"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

const InfoItem: React.FC<{
  label: string;
  value: string;
  verified?: boolean;
}> = ({ label, value, verified }) => (
  <div className="bg-white/5 rounded-xl p-4">
    <p className="text-white/60 text-sm mb-1">{label}</p>
    <div className="flex items-center">
      <p className="text-white text-lg">{value}</p>
      {verified !== undefined && (
        <span className={`ml-2 text-sm ${verified ? 'text-green-400' : 'text-red-400'}`}>
          {verified ? '✓ Verified' : '✗ Not Verified'}
        </span>
      )}
    </div>
  </div>
);