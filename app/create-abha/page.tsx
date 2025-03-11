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
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateAbha() {
  const router = useRouter();
  const [aadhaar, setAadhaar] = useState("");

  const steps = [
    { title: "Create ABHA", status: "current" as const },
    { title: "Aadhaar Authentication", status: "upcoming" as const },
    { title: "Communication Details", status: "upcoming" as const },
    { title: "ABHA Address Creation", status: "upcoming" as const },
    { title: "Download Card", status: "upcoming" as const },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/verify-aadhaar");
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto">
        <ProgressSteps currentStep={0} steps={steps} />
        
        <div className="max-w-xl mx-auto mt-12">
          <Card className="glass-card">
            <CardHeader className="text-center space-y-4 pb-8">
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Create ABHA Number
              </CardTitle>
              <CardDescription className="text-lg text-gray-600">
                Enter your Aadhaar number to begin the ABHA creation process
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="space-y-6">
                  <Label htmlFor="aadhaar" className="text-lg font-medium text-gray-700">
                    Aadhaar Number
                  </Label>
                  <Input
                    id="aadhaar"
                    placeholder="XXXX XXXX XXXX"
                    value={aadhaar}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      if (value.length <= 12) {
                        setAadhaar(value.replace(/(\d{4})(?=\d)/g, "$1 "));
                      }
                    }}
                    required
                    className="h-14 text-lg tracking-wide text-center border-2 bg-white/80 shadow-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all duration-200"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Please enter your 12-digit Aadhaar number
                  </p>
                </div>

                <div className="flex justify-end pt-4">
                  <Button 
                    type="submit" 
                    className="text-lg px-8 py-6 rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 transition-all duration-200"
                  >
                    Continue
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