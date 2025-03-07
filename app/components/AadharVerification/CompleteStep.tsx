import React from 'react';
import { Heart } from "lucide-react";

export function CompleteStep() {
  return (
    <div className="text-center space-y-6">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 blur-xl rounded-full" />
        <Heart className="mx-auto h-16 w-16 text-green-500 relative" />
      </div>
      
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
          Verification Complete!
        </h2>
        <p className="text-gray-600">
          Your identity has been successfully verified. You can now proceed with your ABHA registration.
        </p>
      </div>
    </div>
  );
}