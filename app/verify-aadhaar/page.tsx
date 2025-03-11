"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { OtpInput } from "@/app/components/otp-input";
import { ProgressSteps } from "@/app/components/progress-steps";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function VerifyAadhaar() {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(30);

  const steps = [
    { title: "Consent Collection", status: "complete" as const },
    { title: "Aadhaar Authentication", status: "current" as const },
    { title: "Communication Details", status: "upcoming" as const },
    { title: "ABHA Address Creation", status: "upcoming" as const },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/verify-mobile");
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto">
        <ProgressSteps currentStep={1} steps={steps} />
        
        <div className="max-w-xl mx-auto mt-12">
          <Card className="glass-card">
            <CardHeader className="text-center space-y-4 pb-8">
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Confirm OTP
              </CardTitle>
              <CardDescription className="text-lg text-gray-600">
                OTP sent to Aadhaar registered mobile number ending with ******8789
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="space-y-6">
                  <OtpInput value={otp} onChange={setOtp} />
                  
                  <div className="flex items-center justify-between text-base">
                    <button
                      type="button"
                      className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
                      onClick={() => setTimer(30)}
                    >
                      Resend OTP
                    </button>
                    <span className="text-gray-600 font-medium">
                      {String(Math.floor(timer / 60)).padStart(2, "0")}:
                      {String(timer % 60).padStart(2, "0")} remaining
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="relative">
                    <div className="flex items-center border-2 rounded-xl p-3 bg-white/80 shadow-lg focus-within:border-blue-500 transition-all duration-200">
                      <span className="text-gray-600 px-3 font-medium">+91</span>
                      <input
                        type="text"
                        className="flex-1 bg-transparent border-none focus:outline-none text-lg"
                        placeholder="Enter mobile number"
                      />
                      <div className="text-green-500 px-3">✓</div>
                    </div>
                    <p className="text-sm text-gray-600 mt-2 ml-1">
                      This mobile number will be used for all the communications related to ABHA.
                    </p>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button type="submit" size="lg" className="text-lg px-8 py-6 rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 transition-all duration-200">
                    Next
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}