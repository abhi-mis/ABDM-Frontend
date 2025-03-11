"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Download } from "lucide-react";
import { ProgressSteps } from "@/app/components/progress-steps";

export default function DownloadCard() {
  const steps = [
    { title: "Create ABHA", status: "complete" as const },
    { title: "Aadhaar Authentication", status: "complete" as const },
    { title: "Communication Details", status: "complete" as const },
    { title: "ABHA Address Creation", status: "complete" as const },
    { title: "Download Card", status: "current" as const },
  ];

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto">
        <ProgressSteps currentStep={4} steps={steps} />
        
        <div className="max-w-3xl mx-auto mt-12">
          <Card className="glass-card overflow-hidden">
            <CardHeader className="text-center space-y-4 pb-8 border-b border-gray-100">
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Download ABHA Card
              </CardTitle>
              <CardDescription className="text-lg text-gray-600">
                Your ABHA number has been created successfully. You can now download your ABHA card.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 shadow-lg mb-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-transparent rounded-bl-full" />
                
                <div className="flex justify-between items-start mb-6 relative">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-gray-900">John Doe</h3>
                    <p className="text-lg text-gray-600">ABHA: XXXX-XXXX-XXXX</p>
                    <div className="space-y-1">
                      <p className="text-gray-600">Gender: Male</p>
                      <p className="text-gray-600">DOB: 01/01/1990</p>
                    </div>
                  </div>
                  <img
                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=120&h=120&fit=crop"
                    alt="Profile"
                    className="w-32 h-32 rounded-2xl object-cover shadow-lg"
                  />
                </div>

                <div className="space-y-2 pt-6 border-t border-gray-100">
                  <p className="text-gray-600 text-lg">
                    <span className="font-medium">ABHA Address:</span> johndoe@abha
                  </p>
                  <p className="text-gray-600 text-lg">
                    <span className="font-medium">Mobile:</span> +91 XXXXX-XXXXX
                  </p>
                </div>
              </div>

              <div className="flex justify-center gap-6">
                <Button 
                  className="text-lg px-8 py-6 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 transition-all duration-300"
                >
                  <Download className="h-5 w-5 mr-2" />
                  Download PDF
                </Button>
                <Button 
                  variant="outline"
                  className="text-lg px-8 py-6 rounded-xl border-2 hover:bg-blue-50 shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
                >
                  <Download className="h-5 w-5 mr-2" />
                  Download Image
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}