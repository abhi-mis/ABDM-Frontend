import React, { useState, useEffect, useRef, KeyboardEvent } from 'react';
import { motion } from 'framer-motion';
import { Loader2, X, CheckCircle } from 'lucide-react';
import { apiClient } from '../lib/axios';

interface VerificationState {
  step: 'initial' | 'otp' | 'verified';
  verificationMethod: 'abha-number' | 'mobile' | null;
  key: string;
  otp: string;
  loading: boolean;
  error: string | null;
  verificationData: any | null;
  abhaParts: string[];
}

interface VerifyAbhaProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VerifyAbha({ isOpen, onClose }: VerifyAbhaProps) {
  const [state, setState] = useState<VerificationState>({
    step: 'initial',
    verificationMethod: null,
    key: '',
    otp: '',
    loading: false,
    error: null,
    verificationData: null,
    abhaParts: ['', '', '', ''],
  });

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  useEffect(() => {
    if (isOpen) {
      fetchAccessToken();
    }
  }, [isOpen]);

  const fetchAccessToken = async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const { data } = await apiClient.get('/api/access-token');
      
      if (data.access_token) {
        sessionStorage.setItem('token', data.access_token);
        setState(prev => ({ ...prev, loading: false }));
      } else {
        throw new Error('Access token not received');
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch access token'
      }));
    }
  };

  const handleSendOTP = async (method: 'abha-number' | 'mobile') => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      const accessToken = sessionStorage.getItem('token');
      if (!accessToken) {
        await fetchAccessToken();
      }

      const { data } = await apiClient.post('/verify/send-otp', {
        loginHint: method,
        accessToken: sessionStorage.getItem('token'),
        key: state.abhaParts.join('-')
      });

      if (data.txnId) {
        sessionStorage.setItem('txnId', data.txnId);
        setState(prev => ({
          ...prev,
          step: 'otp',
          verificationMethod: method,
          loading: false
        }));
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to send OTP'
      }));
    }
  };

  const handleVerifyOTP = async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));

      const accessToken = sessionStorage.getItem('token');
      const txnId = sessionStorage.getItem('txnId');

      if (!accessToken) {
        await fetchAccessToken();
      }

      if (!txnId) {
        throw new Error('Transaction ID not found');
      }

      const { data } = await apiClient.post('/verify/verify-otp', {
        txnId,
        otp: state.otp,
        accessToken
      });

      if (data.authResult === "success") {
        const accountData = data.accounts[0];
        setState(prev => ({
          ...prev,
          loading: false,
          step: 'verified',
          verificationData: accountData
        }));
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to verify OTP'
      }));
    }
  };

  const handleABHAChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // Allow only digits

    const maxLength = index === 0 ? 2 : 4;
    if (value.length > maxLength) return;

    const newParts = [...state.abhaParts];
    newParts[index] = value;

    setState(prev => ({
      ...prev,
      abhaParts: newParts,
      key: newParts.join('-')
    }));

    // Auto-focus next input when current input is filled
    if (value.length === maxLength && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    const currentValue = state.abhaParts[index];
    
    if (e.key === 'Backspace' && !currentValue && index > 0) {
      // Move to previous input on backspace if current input is empty
      inputRefs[index - 1].current?.focus();
    } else if (e.key === 'ArrowLeft' && index > 0) {
      // Move to previous input on left arrow
      inputRefs[index - 1].current?.focus();
    } else if (e.key === 'ArrowRight' && index < 3) {
      // Move to next input on right arrow
      inputRefs[index + 1].current?.focus();
    }
  };

  const isABHAValid = () => {
    return state.abhaParts[0].length === 2 &&
           state.abhaParts[1].length === 4 &&
           state.abhaParts[2].length === 4 &&
           state.abhaParts[3].length === 4;
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative w-full max-w-3xl bg-[#1a1b2e] rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-white">Verify ABHA Card</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-white/70 hover:text-white" />
            </button>
          </div>

          {state.error && (
            <div className="mb-6 p-4 bg-red-500/10 text-red-400 rounded-lg text-sm border border-red-500/20">
              {state.error}
            </div>
          )}

          {state.step === 'initial' ? (
            <div className="space-y-6">
              <div className="flex gap-4">
                <button
                  onClick={() => setState(prev => ({ ...prev, verificationMethod: 'abha-number' }))}
                  className={`flex-1 p-4 rounded-lg border-2 transition-colors ${
                    state.verificationMethod === 'abha-number'
                      ? 'border-purple-500 bg-purple-500/10 text-purple-400'
                      : 'border-white/10 hover:border-white/20 text-white/70 hover:text-white'
                  }`}
                >
                  ABHA Number
                </button>
                <button
                  onClick={() => setState(prev => ({ ...prev, verificationMethod: 'mobile' }))}
                  className={`flex-1 p-4 rounded-lg border-2 transition-colors ${
                    state.verificationMethod === 'mobile'
                      ? 'border-purple-500 bg-purple-500/10 text-purple-400'
                      : 'border-white/10 hover:border-white/20 text-white/70 hover:text-white'
                  }`}
                >
                  Mobile
                </button>
              </div>

              {state.verificationMethod && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">
                      Enter your ABHA Number
                    </label>
                    <div className="flex gap-3 items-center">
                      {state.abhaParts.map((part, index) => (
                        <div key={index} className="relative flex-1">
                          <input
                            ref={inputRefs[index]}
                            type="text"
                            value={part}
                            onChange={(e) => handleABHAChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            maxLength={index === 0 ? 2 : 4}
                            placeholder={index === 0 ? "91" : "0000"}
                            className="w-full px-4 py-3 bg-white/5 border-2 border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 text-center text-lg tracking-wider"
                          />
                          {index < 3 && (
                            <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 text-white/30 text-lg">
                              -
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                    <p className="mt-2 text-sm text-white/50">
                      Format: XX-XXXX-XXXX-XXXX
                    </p>
                  </div>
                  
                  <motion.button
                    onClick={() => handleSendOTP(state.verificationMethod!)}
                    disabled={state.loading || !isABHAValid()}
                    className="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium rounded-lg shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-lg"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {state.loading ? (
                      <Loader2 className="w-6 h-6 animate-spin" />
                    ) : (
                      'Send OTP'
                    )}
                  </motion.button>
                </motion.div>
              )}
            </div>
          ) : state.step === 'otp' ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">
                  Enter the OTP sent to your registered mobile number
                </label>
                <input
                  type="text"
                  value={state.otp}
                  onChange={(e) => setState(prev => ({ ...prev, otp: e.target.value.replace(/\D/g, '') }))}
                  placeholder="Enter 6-digit OTP"
                  className="w-full px-4 py-3 bg-white/5 border-2 border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 text-center text-lg tracking-wider"
                  maxLength={6}
                />
              </div>
              
              <motion.button
                onClick={handleVerifyOTP}
                disabled={state.loading || state.otp.length !== 6}
                className="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium rounded-lg shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {state.loading ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  'Verify OTP'
                )}
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex flex-col items-center justify-center p-6 bg-green-500/10 rounded-lg">
                <CheckCircle className="w-20 h-20 text-green-500 mb-4" />
                <h3 className="text-2xl font-bold text-white mb-6">Your ABHA Card is Verified!</h3>
                {state.verificationData && (
                  <div className="w-full max-w-md text-center">
                    <img 
                      src={`data:image/jpeg;base64,${state.verificationData.profilePhoto}`} 
                      alt="Profile" 
                      className="w-48 h-auto rounded-lg mx-auto mb-4 shadow-lg"
                    />
                    <div className="space-y-2 text-lg">
                      <p className="text-white">
                        <span className="text-white/50">Name:</span> {state.verificationData.name}
                      </p>
                      <p className="text-white">
                        <span className="text-white/50">ABHA Number:</span> {state.verificationData.ABHANumber}
                      </p>
                      <p className="text-white">
                        <span className="text-white/50">Preferred Address:</span> {state.verificationData.preferredAbhaAddress}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}