import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, ArrowRight } from "lucide-react";

interface DetailsStepProps {
  aadhaar: string;
  mobile: string;
  loading: boolean;
  disabled: boolean;
  onAadhaarChange: (value: string) => void;
  onMobileChange: (value: string) => void;
  onSubmit: () => void;
}

export function DetailsStep({
  aadhaar,
  mobile,
  loading,
  disabled,
  onAadhaarChange,
  onMobileChange,
  onSubmit
}: DetailsStepProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="aadhaar" className="text-lg font-medium">Aadhaar Number</Label>
        <div className="relative">
          <Input
            id="aadhaar"
            value={aadhaar}
            onChange={(e) => onAadhaarChange(e.target.value.replace(/\D/g, ''))}
            placeholder="Enter 12-digit Aadhaar number"
            maxLength={12}
            type="text"
            pattern="\d*"
            className="pl-4 pr-12 py-6 text-lg shadow-sm bg-white/50 backdrop-blur-sm"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            {aadhaar.length}/12
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="mobile" className="text-lg font-medium">Mobile Number</Label>
        <div className="flex gap-3">
          <div className="w-20">
            <Input
              disabled
              value="+91"
              className="py-6 text-lg bg-gray-50 font-medium text-center"
            />
          </div>
          <div className="relative flex-1">
            <Input
              id="mobile"
              value={mobile}
              onChange={(e) => onMobileChange(e.target.value.replace(/\D/g, ''))}
              placeholder="Enter 10-digit mobile number"
              maxLength={10}
              type="text"
              pattern="\d*"
              className="pl-4 pr-12 py-6 text-lg shadow-sm bg-white/50 backdrop-blur-sm"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              {mobile.length}/10
            </div>
          </div>
        </div>
      </div>

      <Button
        className="w-full py-6 text-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl"
        onClick={onSubmit}
        disabled={disabled || loading}
      >
        {loading ? (
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
        ) : (
          <>
            Continue
            <ArrowRight className="ml-2 h-5 w-5" />
          </>
        )}
      </Button>
    </div>
  );
}