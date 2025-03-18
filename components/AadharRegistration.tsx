'use client';

import { CreditCard } from 'lucide-react';

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
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically make an API call to verify the Aadhar number
    onNext();
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <CreditCard className="text-white w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Enter Your Aadhar Details</h2>
        <p className="text-gray-600 mt-2">Please provide your 12-digit Aadhar number</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <label
            htmlFor="aadhar"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Aadhar Number
          </label>
          <input
            type="text"
            id="aadhar"
            name="aadhar"
            value={formData.aadharNumber}
            onChange={(e) =>
              setFormData({ ...formData, aadharNumber: e.target.value })
            }
            placeholder="Enter 12-digit Aadhar number"
            className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:border-purple-500 focus:ring-purple-500 transition-colors duration-200"
            pattern="\d{12}"
            maxLength={12}
            required
          />
          <p className="mt-2 text-sm text-gray-500">
            Your Aadhar number is required for verification
          </p>
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
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}