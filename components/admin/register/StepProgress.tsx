import React from 'react';
import { Check, Info, Store, LayoutGrid } from 'lucide-react';

interface StepProgressProps {
  currentStep: number;
  totalSteps: number;
}

const StepProgress: React.FC<StepProgressProps> = ({ currentStep, totalSteps }) => {
  const steps = [
    { name: 'Informações', icon: Info },
    { name: 'Meu negócio', icon: LayoutGrid },
    { name: 'Estabelecimentos', icon: Store },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex justify-between">
        {steps.map((step, index) => {
          const stepNum = index + 1;
          const isActive = stepNum === currentStep;
          const isCompleted = stepNum < currentStep;

          return (
            <React.Fragment key={stepNum}>
              {index > 0 && (
                <div className="flex-1 flex items-center">
                  <div className={`h-px w-full ${isCompleted ? 'bg-black' : 'bg-gray-300'}`}></div>
                </div>
              )}

              <div className="flex flex-col items-center">
                <div
                  className={`flex items-center justify-center w-12 h-12 rounded-full ${
                    isActive
                      ? 'bg-black text-white'
                      : isCompleted
                        ? 'bg-black text-white'
                        : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {isCompleted ? <Check className="w-6 h-6" /> : <step.icon className="w-6 h-6" />}
                </div>
                <span
                  className={`mt-2 text-sm font-medium ${
                    isActive || isCompleted ? 'text-black' : 'text-gray-500'
                  }`}
                >
                  {step.name}
                </span>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default StepProgress;
