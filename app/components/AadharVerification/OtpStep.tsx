import React from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2, ArrowRight } from "lucide-react";
import { OtpInput } from "../OtpInput";

interface OtpStepProps {
  otp: string;
  mobile: string;
  loading: boolean;
  onOtpChange: (value: string) => void;
  onSubmit: () => void;
  onResendOtp: () => void;
}

export function OtpStep({
  otp,
  mobile,
  loading,
  onOtpChange,
  onSubmit,
  onResendOtp
}: OtpStepProps) {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-3">
        <h3 className="text-2xl font-semibold text-gray-800">Verify OTP</h3>
        <p className="text-lg text-gray-600">
          Enter the OTP sent to{" "}
          <span className="font-medium">+91 ****{mobile.slice(-4)}</span>
        </p>
      </div>

      <div className="space-y-6">
        <OtpInput value={otp} onChange={onOtpChange} />
        
        <div className="flex justify-between items-center text-base">
          <button 
            className="text-gray-600 hover:text-gray-800 transition-colors"
            onClick={onResendOtp}
            disabled={loading}
          >
            Didn't receive OTP?
          </button>
          <button 
            className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
            onClick={onResendOtp}
            disabled={loading}
          >
            Resend OTP
          </button>
        </div>
      </div>

      <Button
        className="w-full py-6 text-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl"
        onClick={onSubmit}
        disabled={loading}
      >
        {loading ? (
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
        ) : (
          <>
            Verify OTP
            <ArrowRight className="ml-2 h-5 w-5" />
          </>
        )}
      </Button>
    </div>
  );
}