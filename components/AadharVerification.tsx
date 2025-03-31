"use client";  
import { Shield, Loader2, CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { apiClient } from '../lib/axios';
import { AxiosError } from 'axios';

interface ErrorResponse {
  message?: string;
}

interface AadharVerificationProps {
  formData: {
    aadharNumber: string;
    otp: string;
    mobile: string;
  };
  setFormData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function AadharVerification({
  formData,
  setFormData,
  onNext,
  onBack,
}: AadharVerificationProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [hoverInput, setHoverInput] = useState<string | null>(null);
  const [otpSent, setOtpSent] = useState(false);
  const [resendAttempts, setResendAttempts] = useState(0);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [timer, setTimer] = useState(60);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const txnId = sessionStorage.getItem('txnId');
      const accessToken = sessionStorage.getItem('token');

      if (!txnId) {
        throw new Error('Missing required session data');
      }

      const response = await apiClient.post('/api/verify-otp', {
        txnId,
        mobile: formData.mobile,
        otp: formData.otp,
        accessToken,
      });

      const data = response.data;

      if (data.tokens) {
        sessionStorage.setItem('X_Token', data.tokens.token);
      }

      if (data.ABHAProfile) {
        sessionStorage.setItem('ABHAProfile', JSON.stringify(data.ABHAProfile));
      }

      setSuccess(true);
      toast.success('Verification successful!', {
        duration: 4000,
        position: 'top-center',
        icon: '✨'
      });

      setTimeout(() => {
        onNext();
      }, 1500);
    } catch (err) {
      const axiosError = err as AxiosError<ErrorResponse>;
      const errorMessage = axiosError.response?.data?.message || axiosError.message || 'Something went wrong';
      setError(errorMessage);
      toast.error(errorMessage, {
        duration: 4000,
        position: 'top-center'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (resendAttempts >= 2) {
      toast.error('Maximum resend attempts reached (2 times).');
      return;
    }

    if (isResendDisabled) {
      toast.error(`Please wait ${timer} seconds before requesting a new OTP.`);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const accessToken = sessionStorage.getItem('token');
      const response = await apiClient.post('/api/send-otp', {
        aadhar: formData.aadharNumber,
        accessToken
      });

      const data = response.data;

      if (data.txnId) {
        sessionStorage.setItem('txnId', data.txnId);
      }

      setOtpSent(true);
      setResendAttempts(prev => prev + 1);
      setIsResendDisabled(true);
      setTimer(60);
      toast.success(data.message || 'OTP resent successfully!', {
        duration: 4000,
        position: 'top-center',
        icon: '📱'
      });
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      const errorMessage = axiosError.response?.data?.message || axiosError.message || 'Failed to resend OTP';
      setError(errorMessage);
      toast.error(errorMessage, {
        duration: 4000,
        position: 'top-center'
      });
    } finally {
      setIsLoading(false);
    }
  };

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

        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
          Verify Your Identity
        </h2>
        <p className="text-xl text-white/80 max-w-2xl mx-auto">
          Complete the verification process to continue
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-8 p-6 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl border border-white/10 backdrop-blur-lg"
      >
        <div className="flex items-center justify-center text-white/80">
          <CheckCircle2 className="w-5 h-5 mr-2 text-green-400" />
          <p>OTP sent to your registered mobile number</p>
        </div>
      </motion.div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        onSubmit={handleSubmit}
        className="space-y-8"
      >
        <div className="space-y-6 bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
          <div
            className="relative"
            onMouseEnter={() => setHoverInput('mobile')}
            onMouseLeave={() => setHoverInput(null)}
          >
            <div className={`absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl transition-opacity duration-300 blur-xl ${hoverInput === 'mobile' ? 'opacity-100' : 'opacity-0'}`}></div>
            <div className="relative">
              <label className="block text-white/90 text-sm font-medium mb-2">
                Mobile Number for ABHA Updates
              </label>
              <input
                type="tel"
                value={formData.mobile}
                onChange={(e) => {
                  setError(null);
                  setFormData({ ...formData, mobile: e.target.value });
                }}
                placeholder="Enter your 10-digit mobile number"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:border-purple-500 focus:ring-purple-500 transition-all duration-300"
                pattern="\d{10}"
                maxLength={10}
                required
                disabled={isLoading || success}
              />
            </div>
          </div>

          <div
            className="relative"
            onMouseEnter={() => setHoverInput('otp')}
            onMouseLeave={() => setHoverInput(null)}
          >
            <div className={`absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl transition-opacity duration-300 blur-xl ${hoverInput === 'otp' ? 'opacity-100' : 'opacity-0'}`}></div>
            <div className="relative">
              <label className="block text-white/90 text-sm font-medium mb-2">
                Enter OTP
              </label>
              <input
                type="text"
                value={formData.otp}
                onChange={(e) => {
                  setError(null);
                  setFormData({ ...formData, otp: e.target.value });
                }}
                placeholder="Enter 6-digit OTP"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:border-purple-500 focus:ring-purple-500 transition-all duration-300"
                pattern="\d{6}"
                maxLength={6}
                required
                disabled={isLoading || success}
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
        </div>

        <div className="flex justify-between items-center">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={onBack}
            className="group flex items-center px-6 py-3 rounded-xl bg-white/10 text-white/90 hover:bg-white/20 transition-all duration-300 disabled:opacity-50"
            disabled={isLoading || success}
          >
            <ArrowLeft className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" />
            Back
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading || success}
            className="relative group px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white disabled:opacity-50 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>
            <span className="relative flex items-center">
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-5 w-5" />
                  Verifying...
                </>
              ) : success ? (
                <>
                  <CheckCircle2 className="mr-2 h-5 w-5" />
                  Verified!
                </>
              ) : (
                'Verify & Continue'
              )}
            </span>
          </motion.button>
        </div>
      </motion.form>

      {/* Resend OTP Section with Timer */}
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
            : `${2 - resendAttempts} resend attempts remaining. Please wait for the timer to complete between attempts.`}
        </p>
      </div>
    </div>
  );
}