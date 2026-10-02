import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowLeft, 
  ArrowRight, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  CheckCircle2, 
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAccessibility } from '../../context/AccessibilityContext';
import { useBenefits } from '../../context/BenefitsContext';
import { StepIndicator } from './StepIndicator';
import { Step1Basic } from './Step1Basic';
import { Step2Disability } from './Step2Disability';
import { Step3Financial } from './Step3Financial';
import { Step4Situation } from './Step4Situation';
import { Step5Needs } from './Step5Needs';

export const EligibilityFinder: React.FC = () => {
  const { language, t } = useLanguage();
  const { isSpeaking, speakText, stopSpeaking } = useAccessibility();
  const { userProfile, resetProfile, runEligibilityCheck } = useBenefits();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const totalSteps = 5;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      runEligibilityCheck();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleReadStep = () => {
    if (isSpeaking) {
      stopSpeaking();
      return;
    }

    let text = '';
    if (currentStep === 1) {
      text = language === 'hi'
        ? 'चरण 1: बुनियादी जानकारी। कृपया अपनी आयु, लिंग, राज्य और क्षेत्र चुनें।'
        : 'Step 1: Basic Information. Please provide your age, gender, state, district, and area type.';
    } else if (currentStep === 2) {
      text = language === 'hi'
        ? 'चरण 2: दिव्यांगता का विवरण। अपनी दिव्यांगता का प्रकार, प्रतिशत और यूडीआईडी कार्ड की स्थिति बताएं।'
        : 'Step 2: Disability Details. Choose your disability type, certified percentage, and UDID card status.';
    } else if (currentStep === 3) {
      text = language === 'hi'
        ? 'चरण 3: वित्तीय स्थिति। अपने परिवार की वार्षिक आय और बीपीएल स्थिति चुनें।'
        : 'Step 3: Financial Details. Select your annual family income bracket and BPL ration card status.';
    } else if (currentStep === 4) {
      text = language === 'hi'
        ? 'चरण 4: वर्तमान स्थिति। बताएं कि आप विद्यार्थी हैं, नौकरीपेशा हैं, स्वरोजगार में हैं या आश्रित हैं।'
        : 'Step 4: Current Situation. Are you a student, employed, self-employed, or dependent on family?';
    } else if (currentStep === 5) {
      text = language === 'hi'
        ? 'चरण 5: आवश्यकताएं। उन सभी सरकारी सहायताओं को चुनें जिनकी आपको जरूरत है।'
        : 'Step 5: What do you need? Select all areas of assistance you are looking for.';
    }

    speakText(text, `step-${currentStep}`, language);
  };

  return (
    <div className="py-10 md:py-16 bg-warm-50 dark:bg-stone-900 transition-colors min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Title & Read Aloud */}
        <div className="text-center mb-8 space-y-2">
          <div className="flex items-center justify-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-terracotta-100 dark:bg-terracotta-950/60 text-terracotta-800 dark:text-terracotta-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              {t('finderTitle')}
            </span>

            <button
              onClick={handleReadStep}
              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors ${
                isSpeaking
                  ? 'bg-amber-400 text-stone-950 font-bold animate-pulse'
                  : 'bg-warm-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-warm-300'
              }`}
              title="Read Question Aloud"
            >
              {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              <span>{isSpeaking ? t('btnStopAudio') : t('btnReadAloud')}</span>
            </button>
          </div>

          <h1 className="text-2xl sm:text-4xl font-serif font-bold text-stone-900 dark:text-white">
            {language === 'hi' ? 'पात्रता खोजक प्रश्नावली' : 'Discover Benefits Matched to You'}
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 max-w-xl mx-auto">
            {t('finderSubtitle')}
          </p>
        </div>

        {/* Questionnaire Form Box */}
        <div className="bg-white dark:bg-stone-850 rounded-3xl border border-warm-300 dark:border-stone-800 p-6 sm:p-10 shadow-warm-lg transition-colors relative">
          
          {/* Top Step Progress Bar */}
          <StepIndicator
            currentStep={currentStep}
            totalSteps={totalSteps}
            onStepClick={(step) => setCurrentStep(step)}
          />

          {/* Render Active Step Form */}
          <div className="py-2">
            {currentStep === 1 && <Step1Basic />}
            {currentStep === 2 && <Step2Disability />}
            {currentStep === 3 && <Step3Financial />}
            {currentStep === 4 && <Step4Situation />}
            {currentStep === 5 && <Step5Needs />}
          </div>

          {/* Navigation Action Buttons */}
          <div className="mt-10 pt-6 border-t border-warm-200 dark:border-stone-800 flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
            
            {/* Reset / Previous Button */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl border border-warm-300 dark:border-stone-700 hover:bg-warm-100 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 font-semibold text-sm transition-all flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>{t('back')}</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={resetProfile}
                  className="w-full sm:w-auto px-4 py-3 rounded-2xl text-xs font-semibold text-stone-500 hover:text-stone-900 dark:hover:text-stone-300 hover:bg-warm-100 dark:hover:bg-stone-800 transition-colors flex items-center justify-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{t('resetForm')}</span>
                </button>
              )}
            </div>

            {/* Next / Submit Button */}
            <div className="w-full sm:w-auto">
              <button
                type="button"
                onClick={handleNext}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-terracotta-600 hover:bg-terracotta-700 text-white font-semibold text-base shadow-warm-md hover:shadow-warm-lg transition-all flex items-center justify-center gap-3 group"
              >
                <span>{currentStep === totalSteps ? t('seeResults') : t('next')}</span>
                {currentStep === totalSteps ? (
                  <Sparkles className="w-5 h-5 text-amber-200 group-hover:rotate-12 transition-transform" />
                ) : (
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                )}
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
