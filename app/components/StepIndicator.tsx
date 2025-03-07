"use client";

import { Check, CircleDot } from "lucide-react";

interface StepIndicatorProps {
  currentStep: number;
  steps: Array<{
    title: string;
    status: "completed" | "current" | "upcoming";
  }>;
}

export function StepIndicator({ currentStep, steps }: StepIndicatorProps) {
  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <div className="relative">
        <div className="absolute top-5 w-full h-1 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="absolute h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-500 ease-in-out"
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          />
        </div>
        <div className="relative flex justify-between">
          {steps.map((step, index) => (
            <div key={step.title} className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 relative bg-white transition-all duration-300
                  ${
                    step.status === "completed"
                      ? "border-indigo-600 bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg"
                      : step.status === "current"
                      ? "border-blue-500 text-blue-500 shadow-md"
                      : "border-gray-300 text-gray-300"
                  }`}
              >
                {step.status === "completed" ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <CircleDot className="w-5 h-5" />
                )}
              </div>
              <span
                className={`mt-3 text-sm font-medium transition-colors duration-300
                  ${
                    step.status === "completed"
                      ? "text-indigo-600"
                      : step.status === "current"
                      ? "text-blue-600"
                      : "text-gray-500"
                  }`}
              >
                {step.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}