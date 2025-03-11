"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Shield, Smartphone, UserCheck, UserPlus } from "lucide-react";
import { ProgressSteps } from "@/app/components/progress-steps";
import Link from "next/link";

export default function Home() {
  const steps = [
    { title: "Create ABHA", status: "current" as const },
    { title: "Aadhaar Authentication", status: "upcoming" as const },
    { title: "Communication Details", status: "upcoming" as const },
    { title: "ABHA Address Creation", status: "upcoming" as const },
    { title: "Download Card", status: "upcoming" as const },
  ];

  const features = [
    {
      icon: <UserPlus className="h-6 w-6" />,
      title: "Create ABHA",
      description: "Create your ABHA number using Aadhaar",
      href: "/create-abha",
    },
    {
      icon: <UserCheck className="h-6 w-6" />,
      title: "Verify Aadhaar",
      description: "Enter and verify your Aadhaar details",
      href: "/verify-aadhaar",
    },
    {
      icon: <Smartphone className="h-6 w-6" />,
      title: "Mobile Verification",
      description: "Verify OTP and link mobile number",
      href: "/verify-mobile",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "ABHA Address",
      description: "Create your unique ABHA address",
      href: "/abha-address",
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Download Card",
      description: "Download your ABHA card",
      href: "/download-card",
    },
  ];

  return (
    <main className="min-h-screen py-12 px-4">
      <div className="container mx-auto">
        <ProgressSteps currentStep={0} steps={steps} />

        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            Create Your ABHA Number
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Your unified health ID for accessing healthcare services across India.
            Complete the following steps to get your ABHA card.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Link href={feature.href} key={index} className="transform hover:scale-105 transition-all duration-300">
              <Card className="glass-card h-full border-0 overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-white/5 group-hover:opacity-100 opacity-0 transition-opacity duration-300" />
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/20">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-2xl">
                      Step {index + 1}: {feature.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-16">
          <Button
            asChild
            size="lg"
            className="text-lg px-12 py-8 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-xl shadow-blue-500/30 hover:shadow-blue-500/40 transition-all duration-300"
          >
            <Link href="/create-abha">
              Start Registration
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}