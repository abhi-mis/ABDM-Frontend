import { useState } from 'react';
import { CreditCard, Loader2, ArrowLeft, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { apiClient } from '../lib/axios';

interface AadharRegistrationProps {
  formData: any;
  setFormData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function AadharRegistration({
  formData,
  setFormData,
  onNext,
  onBack,
}: AadharRegistrationProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [hoverInput, setHoverInput] = useState(false);
  const [consent, setConsent] = useState(false);
  const [aadharParts, setAadharParts] = useState(['', '', '']);

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

    // Update form data with complete Aadhar number
    setFormData({
      ...formData,
      aadharNumber: newParts.join('')
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!consent) {
      toast.error('Please accept the consent statement to proceed');
      return;
    }
    
    try {
      setIsLoading(true);

      const response = await apiClient.post('/api/send-otp', {
        aadhar: formData.aadharNumber
      });

      const data = response.data;
      
      // Save txnId to session storage
      if (data.txnId) {
        sessionStorage.setItem('txnId', data.txnId);
      }

      // Show success toast with the message from the response
      toast.success(data.message || 'OTP sent successfully!', {
        duration: 4000,
        position: 'top-center',
        icon: '📱'
      });

      // Save all response data to formData
      setFormData({
        ...formData,
        ...data
      });

      onNext();
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to send OTP. Please try again.';
      toast.error(errorMessage, {
        duration: 4000,
        position: 'top-center'
      });
      console.error('Error sending OTP:', error);
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
        {/* <div className="inline-flex items-center px-6 py-2 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 mb-6">
          <Sparkles className="w-5 h-5 mr-2 text-yellow-400" />
          <span className="text-white/90">Secure Identity Verification</span>
        </div> */}
        
        <div className="relative inline-block">
          <div className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6 transform transition-transform hover:scale-110 hover:rotate-3">
            <CreditCard className="text-white w-12 h-12" />
          </div>
        </div>

        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
          Enter Your Aadhar Details
        </h2>
        <p className="text-xl text-white/80 max-w-2xl mx-auto">
          Please provide your 12-digit Aadhar number for secure verification
        </p>
      </motion.div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        onSubmit={handleSubmit}
        className="space-y-8"
      >
        <div
          className="relative"
          onMouseEnter={() => setHoverInput(true)}
          onMouseLeave={() => setHoverInput(false)}
        >
          <div className={`absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl transition-opacity duration-300 blur-xl ${hoverInput ? 'opacity-100' : 'opacity-0'}`}></div>
          <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <label
              htmlFor="aadhar-0"
              className="block text-white/90 text-lg font-medium mb-4"
            >
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
            <p className="mt-3 text-white/60">
              You will receive an OTP on the mobile number linked with this Aadhar
            </p>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
          <div className="prose prose-invert max-w-none">
            <h3 className="text-lg font-semibold mb-4">Consent Statement</h3>
            <div className="space-y-4 text-white/80">
              <p>
                I, hereby declare that I am voluntarily sharing my Aadhaar Number / Virtual ID issued by the Unique Identification Authority of India ("UIDAI"), and my demographic information for the purpose of creating an Ayushman Bharat Health Account number ("ABHA number") and Ayushman Bharat Health Account address ("ABHA Address").
              </p>
              <p>
                I authorize NHA to use my Aadhaar number / Virtual ID for performing Aadhaar based authentication with UIDAI as per the provisions of the Aadhaar (Targeted Delivery of Financial and other Subsidies, Benefits and Services) Act, 2016 for the aforesaid purpose. I understand that UIDAI will share my e-KYC details, or response of "Yes" with NHA upon successful authentication.
              </p>
              <p>
                I intend to create Ayushman Bharat Health Account Number and Ayushman Bharat Health Account address using document other than Aadhaar.
              </p>
            </div>
            <div className="mt-6">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-1 h-5 w-5 rounded border-white/20 bg-white/5 text-purple-500 focus:ring-purple-500 focus:ring-offset-0"
                />
                <span className="text-white/90 group-hover:text-white transition-colors">
                  I agree and would like to proceed to verification
                </span>
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={onBack}
            className="group flex items-center px-6 py-3 rounded-xl bg-white/10 text-white/90 hover:bg-white/20 transition-all duration-300 disabled:opacity-50"
            disabled={isLoading}
          >
            <ArrowLeft className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" />
            Back
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading || !consent}
            className="relative group px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white disabled:opacity-50 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>
            <span className="relative flex items-center">
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
        </div>
      </motion.form>
    </div>
  );
}