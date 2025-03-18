'use client';

import { Shield } from 'lucide-react';

interface AadharVerificationProps {
  formData: any;
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
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const handleResendOTP = () => {
    alert('OTP resent successfully!');
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <Shield className="text-white w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Verify Your Aadhar</h2>
        <p className="text-gray-600 mt-2">Enter the OTP sent to your mobile</p>
      </div>

      <div className="mb-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
        <p className="text-sm text-gray-700">
          An OTP has been sent to the mobile number linked with your Aadhar:
          <br />
          <span className="font-medium">XXXXXXXX{formData.aadharNumber.slice(-4)}</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <label
            htmlFor="otp"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Enter OTP
          </label>
          <input
            type="text"
            id="otp"
            name="otp"
            value={formData.otp}
            onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
            placeholder="Enter 6-digit OTP"
            className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:border-purple-500 focus:ring-purple-500 transition-colors duration-200"
            pattern="\d{6}"
            maxLength={6}
            required
          />
        </div>

        <div className="text-right">
          <button
            type="button"
            onClick={handleResendOTP}
            className="text-sm text-purple-600 hover:text-purple-500 transition-colors duration-200"
          >
            Resend OTP
          </button>
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            Back
          </button>
          <button
            type="submit"
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105"
          >
            Verify & Continue
          </button>
        </div>
      </form>
    </div>
  );
}