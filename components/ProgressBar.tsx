import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

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
    <div className="py-8">
      <nav aria-label="Progress">
        <ol role="list" className="flex items-center justify-between">
          {steps.map((step, stepIdx) => (
            <li
              key={step.id}
              className="relative flex flex-col items-center"
            >
              <motion.div
                className="relative flex flex-col items-center group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: stepIdx * 0.1 }}
              >
                <motion.div
                  className="h-20 flex items-center"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: stepIdx * 0.1 }}
                >
                  <motion.div
                    className={`relative z-10 w-20 h-20 flex items-center justify-center rounded-full ${
                      step.id < currentStep
                        ? 'bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg shadow-purple-500/30'
                        : step.id === currentStep
                        ? 'bg-white/10 backdrop-blur-lg border-2 border-purple-400 shadow-lg shadow-purple-500/20'
                        : 'bg-white/5 backdrop-blur-lg'
                    } transition-all duration-500`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {step.id < currentStep ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 10 }}
                      >
                        <CheckCircle className="w-10 h-10 text-white" />
                      </motion.div>
                    ) : (
                      <span className={`text-3xl font-bold ${
                        step.id === currentStep ? 'text-purple-400' : 'text-white/40'
                      }`}>
                        {step.id}
                      </span>
                    )}
                  </motion.div>
                </motion.div>

                <motion.div
                  className="mt-6 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: stepIdx * 0.1 + 0.2 }}
                >
                  <motion.span
                    className={`text-xl font-bold ${
                      step.id <= currentStep 
                        ? 'bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text'
                        : 'text-white/40'
                    }`}
                    whileHover={{ scale: 1.05 }}
                  >
                    {step.name}
                  </motion.span>
                  <span className={`mt-1 block text-sm ${
                    step.id <= currentStep ? 'text-white/70' : 'text-white/30'
                  }`}>
                    {step.description}
                  </span>
                </motion.div>
              </motion.div>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}