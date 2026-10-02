import React from 'react';
import { 
  Accessibility, 
  Eye, 
  Ear, 
  Brain, 
  Activity, 
  HelpCircle, 
  Check, 
  CreditCard, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useBenefits } from '../../context/BenefitsContext';
import { DisabilityType, BenchmarkStatus, UDIDStatus } from '../../types/scheme';

export const Step2Disability: React.FC = () => {
  const { language, t } = useLanguage();
  const { userProfile, updateProfile } = useBenefits();

  const disabilityOptions: { id: DisabilityType; icon: React.ReactNode; labelEn: string; labelHi: string }[] = [
    { id: 'locomotor', icon: <Accessibility className="w-5 h-5 text-terracotta-600" />, labelEn: 'Locomotor Disability / Orthopedic', labelHi: 'अस्थिबाधित / लोकोमोटर दिव्यांगता' },
    { id: 'visual_blindness', icon: <Eye className="w-5 h-5 text-blue-600" />, labelEn: 'Visual Impairment (Blindness)', labelHi: 'दृष्टिबाधित (पूर्ण दृष्टिहीनता)' },
    { id: 'visual_low_vision', icon: <Eye className="w-5 h-5 text-cyan-600" />, labelEn: 'Low Vision', labelHi: 'अल्प दृष्टि (Low Vision)' },
    { id: 'hearing_deaf', icon: <Ear className="w-5 h-5 text-amber-600" />, labelEn: 'Hearing Impairment (Deaf / Mute)', labelHi: 'श्रवण एवं वाक् बाधित (मूक-बधिर)' },
    { id: 'intellectual', icon: <Brain className="w-5 h-5 text-purple-600" />, labelEn: 'Intellectual Disability (Mental Retardation)', labelHi: 'बौद्धिक दिव्यांगता / मानसिक मंदता' },
    { id: 'autism', icon: <Sparkles className="w-5 h-5 text-rose-600" />, labelEn: 'Autism Spectrum Disorder', labelHi: 'ऑटिज्म स्पेक्ट्रम डिसऑर्डर' },
    { id: 'cerebral_palsy', icon: <Activity className="w-5 h-5 text-emerald-600" />, labelEn: 'Cerebral Palsy (CP)', labelHi: 'सेरेब्रल पाल्सी (प्रमस्तिष्क पक्षाघात)' },
    { id: 'multiple_disabilities', icon: <Accessibility className="w-5 h-5 text-indigo-600" />, labelEn: 'Multiple Disabilities', labelHi: 'बहु-दिव्यांगता (Multiple Disabilities)' },
    { id: 'acid_attack', icon: <ShieldCheck className="w-5 h-5 text-stone-600" />, labelEn: 'Acid Attack Victim / Dwarfism', labelHi: 'एसिड अटैक पीड़िता / बौनापन' },
    { id: 'any', icon: <Accessibility className="w-5 h-5 text-stone-700" />, labelEn: 'Other RPwD Specified Category', labelHi: 'अन्य 21 RPwD विनिर्दिष्ट दिव्यांगता' },
  ];

  const handleToggleDisability = (typeId: DisabilityType) => {
    const current = userProfile.disabilityTypes;
    if (typeId === 'any') {
      updateProfile({ disabilityTypes: ['any'] });
      return;
    }
    const filteredCurrent = current.filter(t => t !== 'any');
    const next = filteredCurrent.includes(typeId)
      ? filteredCurrent.filter(t => t !== typeId)
      : [...filteredCurrent, typeId];
    updateProfile({ disabilityTypes: next });
  };

  const handlePercentageChange = (percent: number) => {
    updateProfile({
      disabilityPercentage: percent,
      isBenchmark: percent >= 40 ? 'yes' : 'no',
    });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Step Heading */}
      <div className="border-b border-warm-200 dark:border-stone-800 pb-4">
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-white">
          {t('step2DisabilityTitle')}
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-1">
          {t('step2DisabilityDesc')}
        </p>
      </div>

      {/* Disability Types Selection */}
      <div>
        <label className="block text-sm font-bold text-stone-800 dark:text-stone-200 mb-3">
          {t('labelDisabilityType')} <span className="text-terracotta-600">*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {disabilityOptions.map(opt => {
            const isSelected = userProfile.disabilityTypes.includes(opt.id);
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleToggleDisability(opt.id)}
                className={`p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all ${
                  isSelected
                    ? 'border-terracotta-600 bg-terracotta-50/80 dark:bg-terracotta-950/60 text-terracotta-900 dark:text-terracotta-200 ring-2 ring-terracotta-500/20 shadow-warm-sm font-semibold'
                    : 'border-warm-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-warm-100 dark:hover:bg-stone-700'
                }`}
                aria-pressed={isSelected}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-warm-100 dark:bg-stone-900">
                    {opt.icon}
                  </div>
                  <span className="text-xs sm:text-sm">
                    {language === 'hi' ? opt.labelHi : opt.labelEn}
                  </span>
                </div>
                <div
                  className={`w-5 h-5 rounded-md border flex items-center justify-center ${
                    isSelected
                      ? 'bg-terracotta-600 border-terracotta-600 text-white'
                      : 'border-stone-300 dark:border-stone-600'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Disability Percentage Slider */}
      <div className="p-6 rounded-3xl bg-warm-100/60 dark:bg-stone-850 border border-warm-200 dark:border-stone-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <label htmlFor="disability-percent" className="text-sm font-bold text-stone-900 dark:text-white block">
              {t('labelDisabilityPercent')}
            </label>
            <span className="text-xs text-stone-500 dark:text-stone-400">
              {t('percentHint')}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-serif font-bold text-terracotta-700 dark:text-terracotta-400">
              {userProfile.disabilityPercentage !== null ? `${userProfile.disabilityPercentage}%` : 'Not set'}
            </span>
          </div>
        </div>

        <input
          id="disability-percent"
          type="range"
          min="0"
          max="100"
          step="5"
          value={userProfile.disabilityPercentage ?? 40}
          onChange={(e) => handlePercentageChange(parseInt(e.target.value, 10))}
          className="w-full accent-terracotta-600 h-2 bg-warm-300 dark:bg-stone-700 rounded-lg cursor-pointer"
        />

        {/* Benchmark 40% indicator guide */}
        <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 font-medium">
          <span>0%</span>
          <span className="font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            40% (Benchmark Threshold)
          </span>
          <span>80% (Severe)</span>
          <span>100%</span>
        </div>
      </div>

      {/* UDID Card Status */}
      <div>
        <label className="block text-sm font-bold text-stone-800 dark:text-stone-200 mb-2 flex items-center gap-2">
          <CreditCard className="w-4 h-4 text-terracotta-600" />
          {t('labelUDID')}
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { id: 'yes', label: t('udidYes'), desc: 'Swavlamban Card ready' },
            { id: 'applied', label: t('udidApplied'), desc: 'Enrollment number received' },
            { id: 'no', label: t('udidNo'), desc: 'Need guidance to apply' },
          ].map(u => (
            <button
              key={u.id}
              type="button"
              onClick={() => updateProfile({ udidStatus: u.id as UDIDStatus })}
              className={`p-4 rounded-2xl border text-left transition-all ${
                userProfile.udidStatus === u.id
                  ? 'border-terracotta-600 bg-terracotta-50 dark:bg-terracotta-950/60 text-terracotta-900 dark:text-terracotta-200 ring-2 ring-terracotta-500/20 shadow-warm-sm font-semibold'
                  : 'border-warm-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-warm-100 dark:hover:bg-stone-700'
              }`}
              aria-pressed={userProfile.udidStatus === u.id}
            >
              <span className="font-bold text-sm block mb-0.5">{u.label}</span>
              <span className="text-xs text-stone-500 dark:text-stone-400">{u.desc}</span>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};
