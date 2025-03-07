import React from 'react';
import { Shield } from "lucide-react";

export function Header() {
  return (
    <div className="text-center mb-12">
      <div className="relative inline-block">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 blur-xl rounded-full" />
        <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 p-4 shadow-xl">
          <Shield className="w-12 h-12 text-white" />
        </div>
      </div>
      
      <h2 className="mt-6 text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
        Create ABHA Number
      </h2>
      <p className="mt-3 text-lg text-gray-600">
        Your unified health ID for accessing healthcare services
      </p>
    </div>
  );
}