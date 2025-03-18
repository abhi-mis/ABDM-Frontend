'use client';

interface Step {
  id: number;
  name: string;
  description: string;
}

interface ProgressBarProps {
  steps: Step[];
  currentStep: number;
}

export default function ProgressBar({ steps, currentStep }: ProgressBarProps) {
  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4">
        <nav aria-label="Progress">
          <ol
            role="list"
            className="flex items-center justify-between md:space-x-8"
          >
            {steps.map((step, index) => (
              <li
                key={step.id}
                className={`relative ${
                  index !== steps.length - 1
                    ? 'flex-1 md:flex-auto'
                    : 'flex-initial'
                }`}
              >
                {index !== steps.length - 1 && (
                  <div
                    className="absolute left-[50%] top-[50%] h-0.5 w-full"
                    aria-hidden="true"
                  >
                    <div
                      className={`h-full ${
                        step.id <= currentStep
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600'
                          : 'bg-gray-200'
                      }`}
                    />
                  </div>
                )}
                <div className="relative flex flex-col items-center group">
                  <span className="h-9 flex items-center">
                    <span
                      className={`relative z-10 w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300 ${
                        step.id < currentStep
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                          : step.id === currentStep
                          ? 'border-2 border-purple-600 bg-white text-purple-600'
                          : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {step.id < currentStep ? (
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        step.id
                      )}
                    </span>
                  </span>
                  <span className="text-sm font-medium text-gray-900 mt-2">
                    {step.name}
                  </span>
                  <span className="text-xs text-gray-500">{step.description}</span>
                </div>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </div>
  );
}