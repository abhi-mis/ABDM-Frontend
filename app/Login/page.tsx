"use client";
import React, { useState, useEffect } from 'react';
import { KeyRound, User, Loader2, Shield, CheckCircle2, AlertCircle } from 'lucide-react';
import { sendAadharOTP, verifyAadharOTP, getAccessToken } from '../../lib/axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const LoginForm: React.FC = () => {
  const [aadharParts, setAadharParts] = useState(['', '', '']);
  const [otp, setOtp] = useState('');
  const [mobile, setMobile] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [resendAttempts, setResendAttempts] = useState(0);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [timer, setTimer] = useState(60);
  const navigate = useNavigate();

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

    // Auto-focus next input
    if (value.length === 4 && index < 2) {
      const nextInput = document.getElementById(`aadhar-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
  
    try {
      // Join the Aadhar parts to form the complete Aadhar number
      const aadharNumber = aadharParts.join('');
      
      // Retrieve the access token
      const accessToken = await getAccessToken();
      console.log('Access Token:', accessToken);
      // Call the sendAadharOTP function with both Aadhar number and access token
      await sendAadharOTP(aadharNumber, accessToken);
      
      // Show OTP input field and start the timer for resend
      setShowOtpInput(true);
      setIsResendDisabled(true);
      setTimer(60);
      toast.success('OTP sent successfully!');
    } catch (error: any) {
      // Handle any errors that occur during the OTP sending process
      setError(error.response?.data?.message || 'Failed to send OTP');
      toast.error('Failed to send OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const aadharNumber = aadharParts.join('');
      const accessToken = await getAccessToken();
      await verifyAadharOTP(aadharNumber, otp, mobile, accessToken);
      setSuccess(true);
      toast.success('Login successful!');
      setTimeout(() => navigate('/'), 1500);
    } catch (error: any) {
      setError(error.response?.data?.message || 'Invalid OTP');
      toast.error('Invalid OTP. Please try again.');
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
      toast.error(`Please wait ${timer} seconds before requesting a new OTP`);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const aadharNumber = aadharParts.join('');
      const accessToken = await getAccessToken();
      await sendAadharOTP(aadharNumber, accessToken);
      setResendAttempts(prev => prev + 1);
      setIsResendDisabled(true);
      setTimer(60);
      toast.success('OTP resent successfully!');
    } catch (error: any) {
      setError(error.response?.data?.message || 'Failed to resend OTP');
      toast.error('Failed to resend OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8">
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <div className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6 transform transition-transform hover:scale-110 hover:rotate-3">
              {showOtpInput ? (
                <Shield className="text-white w-12 h-12" />
              ) : (
                <User className="text-white w-12 h-12" />
              )}
            </div>
            {success && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -right-2 -top-2 bg-green-500 rounded-full p-2"
              >
                <CheckCircle2 className="w-6 h-6 text-white" />
              </motion.div>
            )}
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Welcome to ABHA</h2>
          <p className="text-white/60">
            {showOtpInput ? 'Verify your identity' : 'Please verify your Aadhar to continue'}
          </p>
        </div>

        <form onSubmit={showOtpInput ? handleVerifyOTP : handleSendOTP} className="space-y-6">
          {!showOtpInput ? (
            <div className="space-y-2">
              <label className="text-white/80 text-sm" htmlFor="aadhar-0">
                Aadhar Number
              </label>
              <div className="flex gap-4">
                {aadharParts.map((part, index) => (
                  <input
                    key={index}
                    id={`aadhar-${index}`}
                    type="text"
                    value={part}
                    onChange={(e) => handleAadharChange(index, e.target.value)}
                    maxLength={4}
                    placeholder="0000"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-purple-500 transition-colors text-center"
                    required
                    disabled={isLoading}
                  />
                ))}
              </div>
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <label className="text-white/80 text-sm" htmlFor="mobile">
                  Mobile Number
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
                  <input
                    id="mobile"
                    type="tel"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-10 py-3 text-white placeholder-white/40 focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder="Enter your mobile number"
                    pattern="\d{10}"
                    maxLength={10}
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-white/80 text-sm" htmlFor="otp">
                  OTP
                </label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
                  <input
                    id="otp"
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-10 py-3 text-white placeholder-white/40 focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder="Enter OTP"
                    pattern="\d{6}"
                    maxLength={6}
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>
            </>
          )}

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

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-xl py-3 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>
            <span className="relative flex items-center justify-center">
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-5 w-5" />
                  {showOtpInput ? 'Verifying...' : 'Sending OTP...'}
                </>
              ) : (
                showOtpInput ? 'Verify OTP' : 'Send OTP'
              )}
            </span>
          </button>

          {showOtpInput && (
            <div className="text-center space-y-4">
              {isResendDisabled && (
                <p className="text-white/60">
                  Resend available in: {timer}s
                </p>
              )}
              
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={isLoading || isResendDisabled || resendAttempts >= 2}
                className="text-purple-400 hover:text-purple-300 transition-colors disabled:opacity-50"
              >
                {resendAttempts >= 2 ? 'Maximum attempts reached' : 'Resend OTP'}
              </button>
              
              <p className="text-sm text-white/60">
                {resendAttempts >= 2 
                  ? 'You have used all available resend attempts' 
                  : `${2 - resendAttempts} resend attempts remaining`}
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginForm;