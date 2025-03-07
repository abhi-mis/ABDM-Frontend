"use client";
import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { getSession, sendOtp, verifyOtp } from "@/lib/api";
import { StepIndicator } from "./components/StepIndicator";
import { encryptAadhaar } from '@/lib/encryption';
import { Header } from './components/AadharVerification/Header';
import { DetailsStep } from './components/AadharVerification/DetailsStep';
import { OtpStep } from './components/AadharVerification/OtpStep';
import { CompleteStep } from './components/AadharVerification/CompleteStep';

const steps = [
  { title: "Enter Details", status: "current" as const },
  { title: "Verify OTP", status: "upcoming" as const },
  { title: "Complete", status: "upcoming" as const }
];

export default function App() {
  const [aadhaar, setAadhaar] = useState("");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("details");
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [txnId, setTxnId] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const initSession = async () => {
      try {
        setLoading(true);
        console.log('Initializing session...');
        const session = await getSession(
          process.env.NEXT_PUBLIC_CLIENT_ID || '',
          process.env.NEXT_PUBLIC_CLIENT_SECRET || ''
        );
        console.log('Session initialized:', session);
        setAccessToken(session.accessToken);
        toast({
          title: "Session Initialized",
          description: "Ready to proceed with verification",
        });
      } catch (error) {
        console.error('Session initialization error:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to initialize session. Please refresh the page.",
        });
      } finally {
        setLoading(false);
      }
    };

    initSession();
  }, []);

  const handleSendOtp = async () => {
    // Validate Aadhaar number
    if (!aadhaar || aadhaar.length !== 12 || isNaN(aadhaar)) {
      toast({
        variant: "destructive",
        title: "Invalid Aadhaar",
        description: "Please enter a valid 12-digit Aadhaar number",
      });
      return;
    }
  
    // Proceed with sending OTP
    try {
      setLoading(true);
      console.log('Sending OTP for Aadhaar:', aadhaar);
      
      // Encrypt Aadhaar number
      const encryptedAadhaar = encryptAadhaar(aadhaar);
      console.log('Encrypted Aadhaar:', encryptedAadhaar);
      
      // Send OTP
      const response = await sendOtp(encryptedAadhaar, accessToken);
      console.log('OTP sent successfully:', response);
      
      // Update state and show success message
      setTxnId(response.txnId);
      setStep("otp");
      setCurrentStep(2);
      toast({
        title: "OTP Sent",
        description: "Please check your registered mobile number",
      });
    } catch (error) {
      console.error('Send OTP error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send OTP. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      toast({
        variant: "destructive",
        title: "Invalid OTP",
        description: "Please enter a valid 6-digit OTP",
      });
      return;
    }

    try {
      setLoading(true);
      console.log('Verifying OTP:', { txnId, otp, mobile });
      await verifyOtp(txnId, otp, mobile, accessToken);
      console.log('OTP verified successfully');
      
      setStep("complete");
      setCurrentStep(3);
      toast({
        title: "Success",
        description: "OTP verification successful!",
      });
    } catch (error) {
      console.error('Verify OTP error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Invalid OTP. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = () => handleSendOtp();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <Header />
        
        <Card className="p-8 backdrop-blur-sm bg-white/90 shadow-xl rounded-xl border-t border-white/50">
          <StepIndicator steps={steps} currentStep={currentStep} />
          
          <div className="mt-8">
            {step === "details" && (
              <DetailsStep
                aadhaar={aadhaar}
                mobile={mobile}
                loading={loading}
                disabled={!accessToken}
                onAadhaarChange={setAadhaar}
                onMobileChange={setMobile}
                onSubmit={handleSendOtp}
              />
            )}

            {step === "otp" && (
              <OtpStep
                otp={otp}
                mobile={mobile}
                loading={loading}
                onOtpChange={setOtp}
                onSubmit={handleVerifyOtp}
                onResendOtp={handleResendOtp}
              />
            )}

            {step === "complete" && <CompleteStep />}
          </div>
        </Card>
      </div>
    </div>
  );
}