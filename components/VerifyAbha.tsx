import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Loader2, X } from 'lucide-react';

interface VerificationState {
  step: 'initial' | 'otp';
  verificationMethod: 'abha-number' | 'mobile' | null;
  key: string;
  otp: string;
  loading: boolean;
  error: string | null;
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
  });

  const handleSendOTP = async (method: 'abha-number' | 'mobile') => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      const accessToken = sessionStorage.getItem('token');
      const url = process.env.NEXT_PUBLIC_API_URL;
      if (!accessToken) {
        throw new Error('Access token not found');
      }

      const response = await axios.post( `${url}/verify/send-otp`, {
        loginHint: method,
        accessToken,
        key: state.key
      });

      if (response.data.txnId) {
        sessionStorage.setItem('txnId', response.data.txnId);
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
      const url = process.env.NEXT_PUBLIC_API_URL;

      if (!accessToken || !txnId) {
        throw new Error('Required credentials not found');
      }

      const response = await axios.post(`${url}/verify/verify-otp`, {
        txnId,
        otp: state.otp,
        accessToken
      });

      if (response.data.success) {
        // Handle successful verification
        setState(prev => ({ ...prev, loading: false }));
        onClose();
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to verify OTP'
      }));
    }
  };

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
          ) : (
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
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}