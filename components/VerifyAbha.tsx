import React, { useState, useEffect } from 'react';
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
  });

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
        key: state.key
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
        className="relative w-full max-w-lg bg-[#1a1b2e] rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Verify ABHA Card</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-white/70 hover:text-white" />
            </button>
          </div>

          {state.error && (
            <div className="mb-4 p-3 bg-red-500/10 text-red-400 rounded-lg text-sm border border-red-500/20">
              {state.error}
            </div>
          )}

          {state.step === 'initial' ? (
            <div className="space-y-4">
              <div className="flex gap-4">
                <button
                  onClick={() => setState(prev => ({ ...prev, verificationMethod: 'abha-number' }))}
                  className={`flex-1 p-3 rounded-lg border-2 transition-colors ${
                    state.verificationMethod === 'abha-number'
                      ? 'border-purple-500 bg-purple-500/10 text-purple-400'
                      : 'border-white/10 hover:border-white/20 text-white/70 hover:text-white'
                  }`}
                >
                  ABHA Number
                </button>
                <button
                  onClick={() => setState(prev => ({ ...prev, verificationMethod: 'mobile' }))}
                  className={`flex-1 p-3 rounded-lg border-2 transition-colors ${
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
                  className="space-y-4"
                >
                  <input
                    type="text"
                    value={state.key}
                    onChange={(e) => setState(prev => ({ ...prev, key: e.target.value }))}
                    placeholder={state.verificationMethod === 'abha-number' ? "Enter ABHA Number" : "Enter Mobile Number"}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                  />
                  <motion.button
                    onClick={() => handleSendOTP(state.verificationMethod!)}
                    disabled={state.loading || !state.key}
                    className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium rounded-lg shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-shadow disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {state.loading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
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
              className="space-y-4"
            >
              <input
                type="text"
                value={state.otp}
                onChange={(e) => setState(prev => ({ ...prev, otp: e.target.value }))}
                placeholder="Enter OTP"
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                maxLength={6}
              />
              <motion.button
                onClick={handleVerifyOTP}
                disabled={state.loading || state.otp.length !== 6}
                className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium rounded-lg shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-shadow disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {state.loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  'Verify OTP'
                )}
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="flex flex-col items-center justify-center p-4 bg-green-500/10 rounded-lg">
                <CheckCircle className="w-16 h-16 text-green-500" />
                <h3 className="text-lg font-bold text-white">Your ABHA Card is Verified!</h3>
                {state.verificationData && (
                  <div className="mt-4 text-center">
                    <img 
                      src={`data:image/jpeg;base64,${state.verificationData.profilePhoto}`} 
                      alt="Profile" 
                      className="w-48 h-auto rounded-lg block mx-auto"
                    />
                    <p className="text-white mt-2">Name: {state.verificationData.name}</p>
                    <p className="text-white">ABHA Number: {state.verificationData.ABHANumber}</p>
                    <p className="text-white">Preferred Address: {state.verificationData.preferredAbhaAddress}</p>
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