"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProgressSteps } from "@/app/components/progress-steps";
import { OtpInput } from "@/app/components/otp-input";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function VerifyMobile() {
  const router = useRouter();
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);

  const steps = [
    { title: "Consent Collection", status: "complete" as const },
    { title: "Aadhaar Authentication", status: "complete" as const },
    { title: "Communication Details", status: "current" as const },
    { title: "ABHA Address Creation", status: "upcoming" as const },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!showOtp) {
      setShowOtp(true);
    } else {
      router.push("/abha-address");
    }
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto">
        <ProgressSteps currentStep={2} steps={steps} />
        
        <div className="max-w-xl mx-auto mt-12">
          <Card className="glass-card">
            <CardHeader className="text-center space-y-4 pb-8">
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Mobile Verification
              </CardTitle>
              <CardDescription className="text-lg text-gray-600">
                Enter your mobile number to receive updates about your ABHA number
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-3">
                  <Label htmlFor="mobile" className="text-lg font-medium text-gray-700">
                    Mobile Number
                  </Label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 font-medium text-lg">
                      +91
                    </span>
                    <Input
                      id="mobile"
                      placeholder="Enter 10-digit mobile number"
                      value={mobile}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "");
                        if (value.length <= 10) {
                          setMobile(value);
                        }
                      }}
                      required={!showOtp}
                      disabled={showOtp}
                      className="pl-16 h-14 text-lg border-2 bg-white/80 shadow-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all duration-200"
                    />
                  </div>
                </div>

                {showOtp && (
                  <div className="space-y-6 pt-4">
                    <Label className="text-lg font-medium text-gray-700">
                      Enter OTP
                    </Label>
                    <OtpInput value={otp} onChange={setOtp} />
                    <div className="flex justify-between text-base">
                      <button
                        type="button"
                        className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
                      >
                        Resend OTP
                      </button>
                      <span className="text-gray-600 font-medium">00:30 remaining</span>
                    </div>
                  </div>
                )}

                <Button 
                  type="submit" 
                  className="w-full h-14 text-lg rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 transition-all duration-200 mt-8"
                >
                  {showOtp ? "Verify OTP" : "Get OTP"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}