import React from 'react';
import { Check } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  onStepClick: (step: number) => void;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, totalSteps, onStepClick }) => {
  const { language } = useLanguage();

  const stepLabels = [
    { en: 'Basic Info', hi: 'बुनियादी जानकारी' },
    { en: 'Disability', hi: 'दिव्यांगता विवरण' },
    { en: 'Financial', hi: 'वित्तीय स्थिति' },
    { en: 'Situation', hi: 'वर्तमान स्थिति' },
    { en: 'Needs', hi: 'आवश्यकताएं' },
  ];

  return (
    <div className="w-full py-4 mb-8">
      {/* Mobile Step Bar */}
      <div className="block sm:hidden">
        <div className="flex items-center justify-between text-xs font-bold text-stone-700 dark:text-stone-300 mb-2">
          <span>
            {language === 'hi' ? `चरण ${currentStep} / ${totalSteps}` : `Step ${currentStep} of ${totalSteps}`}
          </span>
          <span className="text-terracotta-700 dark:text-terracotta-400 font-serif">
            {language === 'hi' ? stepLabels[currentStep - 1]?.hi : stepLabels[currentStep - 1]?.en}
          </span>
        </div>
        <div className="w-full h-2 bg-warm-200 dark:bg-stone-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-terracotta-600 transition-all duration-300 rounded-full"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Desktop Step Stepper */}
      <div className="hidden sm:flex items-center justify-between relative">
        {/* Background Connecting Line */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-warm-200 dark:bg-stone-800 -z-0" />
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-terracotta-600 transition-all duration-300 -z-0"
          style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
        />

        {Array.from({ length: totalSteps }, (_, i) => i + 1).map(stepNum => {
          const isCompleted = stepNum < currentStep;
          const isCurrent = stepNum === currentStep;

          return (
            <button
              key={stepNum}
              onClick={() => onStepClick(stepNum)}
              className="flex flex-col items-center group relative z-10 focus:outline-none"
              aria-current={isCurrent ? 'step' : undefined}
            >
              <div
                className={`w-10 h-10 rounded-2xl flex items-center justify-center font-serif text-sm font-bold transition-all shadow-warm-sm ${
                  isCompleted
                    ? 'bg-terracotta-600 text-white shadow-warm-md'
                    : isCurrent
                    ? 'bg-white dark:bg-stone-900 border-2 border-terracotta-600 text-terracotta-700 dark:text-terracotta-400 ring-4 ring-terracotta-500/20 scale-110 font-bold'
                    : 'bg-warm-100 dark:bg-stone-800 border border-warm-300 dark:border-stone-700 text-stone-500 group-hover:bg-warm-200'
                }`}
              >
                {isCompleted ? <Check className="w-5 h-5 stroke-[2.5]" /> : stepNum}
              </div>
              <span
                className={`text-xs mt-2 font-medium text-center transition-colors max-w-[90px] ${
                  isCurrent
                    ? 'text-terracotta-800 dark:text-terracotta-300 font-bold'
                    : isCompleted
                    ? 'text-stone-700 dark:text-stone-300'
                    : 'text-stone-400 dark:text-stone-500'
                }`}
              >
                {language === 'hi' ? stepLabels[stepNum - 1]?.hi : stepLabels[stepNum - 1]?.en}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
