"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface ProgressStepsProps {
  currentStep: number;
  steps: {
    title: string;
    status: "complete" | "current" | "upcoming";
  }[];
}

export function ProgressSteps({ currentStep, steps }: ProgressStepsProps) {
  return (
    <div className="w-full max-w-5xl mx-auto mb-12">
      <div className="flex items-center justify-between px-4">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center">
            <div className="relative flex items-center">
              <div
                className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                  {
                    "bg-green-500 border-green-500 text-white shadow-lg shadow-green-500/30": step.status === "complete",
                    "bg-blue-500 border-blue-500 text-white shadow-lg shadow-blue-500/30": step.status === "current",
                    "bg-white/90 border-gray-300 text-gray-500": step.status === "upcoming",
                  }
                )}
              >
                {step.status === "complete" ? (
                  <Check className="w-6 h-6" />
                ) : (
                  <span className="text-lg font-semibold">{index + 1}</span>
                )}
              </div>
              <span
                className={cn("absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-base font-medium", {
                  "text-green-400": step.status === "complete",
                  "text-blue-300": step.status === "current",
                  "text-gray-400": step.status === "upcoming",
                })}
              >
                {step.title}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn("w-28 md:w-40 h-1 mx-2 rounded-full transition-all duration-300", {
                  "bg-green-500": step.status === "complete",
                  "bg-gray-300/50": step.status !== "complete",
                })}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}