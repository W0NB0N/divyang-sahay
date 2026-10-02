import React from 'react';
import { Sparkles, FileText, Cpu, CheckCircle2, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useBenefits } from '../../context/BenefitsContext';

export const HowItWorks: React.FC = () => {
  const { language, t } = useLanguage();
  const { setActiveTab } = useBenefits();

  const steps = [
    {
      num: '01',
      title: t('step1Title'),
      desc: t('step1Desc'),
      icon: <FileText className="w-6 h-6 text-terracotta-600" />,
      accent: 'border-terracotta-200 dark:border-terracotta-900 bg-terracotta-50/50 dark:bg-stone-850',
    },
    {
      num: '02',
      title: t('step2Title'),
      desc: t('step2Desc'),
      icon: <Cpu className="w-6 h-6 text-amber-600" />,
      accent: 'border-amber-200 dark:border-amber-900 bg-amber-50/50 dark:bg-stone-850',
    },
    {
      num: '03',
      title: t('step3Title'),
      desc: t('step3Desc'),
      icon: <CheckCircle2 className="w-6 h-6 text-emerald-600" />,
      accent: 'border-emerald-200 dark:border-emerald-900 bg-emerald-50/50 dark:bg-stone-850',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-warm-50 dark:bg-stone-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-terracotta-600 dark:text-terracotta-400 block mb-2 font-serif">
            {language === 'hi' ? 'सरल प्रक्रिया' : 'Simple 3-Step Process'}
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-stone-900 dark:text-white">
            {t('howItWorksTitle')}
          </h2>
          <p className="mt-3 text-stone-600 dark:text-stone-300 text-sm sm:text-base">
            {t('howItWorksSubtitle')}
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className={`p-8 rounded-3xl border shadow-warm-md hover:shadow-warm-lg transition-all relative flex flex-col justify-between ${step.accent}`}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-3xl font-serif font-bold text-stone-300 dark:text-stone-700">
                    {step.num}
                  </span>
                  <div className="p-3 rounded-2xl bg-white dark:bg-stone-800 shadow-warm-sm">
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-stone-900 dark:text-white font-serif mb-2.5">
                  {step.title}
                </h3>
                <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              {idx === 0 && (
                <div className="mt-6 pt-4 border-t border-warm-200 dark:border-stone-800">
                  <button
                    onClick={() => setActiveTab('finder')}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-terracotta-700 dark:text-terracotta-400 hover:underline"
                  >
                    <span>{language === 'hi' ? 'अभी शुरू करें' : 'Start Questionnaire'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
