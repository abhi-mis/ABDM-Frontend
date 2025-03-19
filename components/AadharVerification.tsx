import { Shield, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { useState } from 'react';

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Get values from sessionStorage
      const txnId = sessionStorage.getItem('txnId');
      const accessToken = sessionStorage.getItem('token');

      if (!txnId || !accessToken) {
        throw new Error('Missing required session data');
      }

      const response = await fetch('http://localhost:5000/api/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          txnId,
          accessToken,
          mobile: formData.mobile,
          otp: formData.otp,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Verification failed');
      }

      // Save response data to sessionStorage
      Object.entries(data).forEach(([key, value]) => {
        sessionStorage.setItem(key, value as string);
      });

      setSuccess(true);
      setTimeout(() => {
        onNext();
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = () => {
    // Implement OTP resend logic here
    alert('OTP resent successfully!');
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="relative">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Shield className="text-white w-8 h-8" />
          </div>
          {success && (
            <div className="absolute -right-1 -top-1 bg-green-500 rounded-full p-1">
              <CheckCircle2 className="w-4 h-4 text-white" />
            </div>
          )}
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Verify Your Aadhar</h2>
        <p className="text-gray-600 mt-2">Enter the OTP sent to your mobile</p>
      </div>

      <div className="mb-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
        <p className="text-sm text-gray-700">
          An OTP has been sent to your mobile number:
          <br />
          <span className="font-medium">+91 {formData.mobile}</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="mobile"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Mobile Number for ABHA Updates
              </label>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={(e) => {
                  setError(null);
                  setFormData({ ...formData, mobile: e.target.value });
                }}
                placeholder="Enter your 10-digit mobile number"
                className={`block w-full rounded-lg border ${
                  error ? 'border-red-300' : 'border-gray-300'
                } px-4 py-3 text-gray-900 shadow-sm focus:border-purple-500 focus:ring-purple-500 transition-colors duration-200`}
                pattern="\d{10}"
                maxLength={10}
                required
                disabled={isLoading || success}
              />
            </div>

            <div>
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
                onChange={(e) => {
                  setError(null);
                  setFormData({ ...formData, otp: e.target.value });
                }}
                placeholder="Enter 6-digit OTP"
                className={`block w-full rounded-lg border ${
                  error ? 'border-red-300' : 'border-gray-300'
                } px-4 py-3 text-gray-900 shadow-sm focus:border-purple-500 focus:ring-purple-500 transition-colors duration-200`}
                pattern="\d{6}"
                maxLength={6}
                required
                disabled={isLoading || success}
              />
            </div>
          </div>
          
          {error && (
            <div className="mt-2 flex items-center text-sm text-red-600">
              <AlertCircle className="w-4 h-4 mr-1" />
              {error}
            </div>
          )}
        </div>

        <div className="text-right">
          <button
            type="button"
            onClick={handleResendOTP}
            className="text-sm text-purple-600 hover:text-purple-500 transition-colors duration-200 disabled:opacity-50"
            disabled={isLoading || success}
          >
            Resend OTP
          </button>
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 disabled:opacity-50"
            disabled={isLoading || success}
          >
            Back
          </button>
          <button
            type="submit"
            disabled={isLoading || success}
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none flex items-center"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                Verifying...
              </>
            ) : success ? (
              <>
                <CheckCircle2 className="-ml-1 mr-2 h-4 w-4" />
                Verified!
              </>
            ) : (
              'Verify & Continue'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}