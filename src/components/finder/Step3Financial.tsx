import React from 'react';
import { IndianRupee, ShieldCheck, Check, Info } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useBenefits } from '../../context/BenefitsContext';

export const Step3Financial: React.FC = () => {
  const { language, t } = useLanguage();
  const { userProfile, updateProfile } = useBenefits();

  const incomeTiers = [
    {
      value: 100000,
      label: t('incomeBelow1L'),
      desc: language === 'hi' ? '100% निःशुल्क एडिप सहायक उपकरण व बीपीएल योजनाएं' : 'Eligible for 100% free ADIP aids & state pensions',
    },
    {
      value: 250000,
      label: t('income1to25L'),
      desc: language === 'hi' ? 'प्री/पोस्ट मैट्रिक छात्रवृत्ति व निरामया स्वास्थ्य बीमा' : 'Eligible for Pre/Post matric scholarships & Niramaya',
    },
    {
      value: 500000,
      label: t('income25to5L'),
      desc: language === 'hi' ? 'टॉप क्लास उच्च शिक्षा व स्वरोजगार ऋण योजनाएं' : 'Eligible for Top-Class university funding & loans',
    },
    {
      value: 1000000,
      label: t('incomeAbove5L'),
      desc: language === 'hi' ? 'रेलवे यात्रा छूट, धारा 80U टैक्स रिलीफ व 4% नौकरी कोटा' : 'Eligible for Railway passes, Sec 80U tax relief & 4% quota',
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Step Heading */}
      <div className="border-b border-warm-200 dark:border-stone-800 pb-4">
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-white">
          {t('step3FinancialTitle')}
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-1">
          {t('step3FinancialDesc')}
        </p>
      </div>

      {/* Income Tiers Selection */}
      <div>
        <label className="block text-sm font-bold text-stone-800 dark:text-stone-200 mb-3">
          {t('labelAnnualIncome')} <span className="text-terracotta-600">*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {incomeTiers.map((tier, idx) => {
            const isSelected = userProfile.annualIncome === tier.value;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => updateProfile({ annualIncome: tier.value })}
                className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                  isSelected
                    ? 'border-terracotta-600 bg-terracotta-50/80 dark:bg-terracotta-950/60 text-terracotta-900 dark:text-terracotta-200 ring-2 ring-terracotta-500/20 shadow-warm-sm font-semibold'
                    : 'border-warm-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-warm-100 dark:hover:bg-stone-700'
                }`}
                aria-pressed={isSelected}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <IndianRupee className="w-4 h-4 text-emerald-600" />
                    <span className="text-sm font-bold">{tier.label}</span>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                      isSelected
                        ? 'bg-terracotta-600 border-terracotta-600 text-white'
                        : 'border-stone-300 dark:border-stone-600'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </div>
                <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                  {tier.desc}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* BPL Status Card */}
      <div className="p-5 rounded-3xl bg-warm-100/60 dark:bg-stone-850 border border-warm-200 dark:border-stone-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-sm font-bold text-stone-900 dark:text-white block">
              {t('labelBPL')}
            </span>
            <span className="text-xs text-stone-500 dark:text-stone-400">
              {language === 'hi' ? 'राष्ट्रीय सामाजिक सहायता कार्यक्रम (NSAP) पेंशन व आवास हेतु' : 'Unlocks NSAP Disability Pensions & PMAY housing priority'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {[
              { val: true, label: t('yes') },
              { val: false, label: t('no') },
            ].map(item => (
              <button
                key={String(item.val)}
                type="button"
                onClick={() => updateProfile({ isBPL: item.val })}
                className={`px-5 py-2.5 rounded-xl border text-xs sm:text-sm font-bold transition-all ${
                  userProfile.isBPL === item.val
                    ? 'border-terracotta-600 bg-terracotta-600 text-white shadow-warm-sm'
                    : 'border-warm-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-warm-100'
                }`}
                aria-pressed={userProfile.isBPL === item.val}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};
