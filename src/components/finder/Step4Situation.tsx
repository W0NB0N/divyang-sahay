import React from 'react';
import { 
  GraduationCap, 
  Briefcase, 
  Search, 
  Store, 
  Users, 
  HeartHandshake, 
  Home, 
  Sparkles,
  Check
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useBenefits } from '../../context/BenefitsContext';
import { EmploymentStatus } from '../../types/scheme';

export const Step4Situation: React.FC = () => {
  const { language, t } = useLanguage();
  const { userProfile, updateProfile } = useBenefits();

  const situations: { id: EmploymentStatus; icon: React.ReactNode; label: string; descEn: string; descHi: string }[] = [
    {
      id: 'student',
      icon: <GraduationCap className="w-5 h-5 text-blue-600" />,
      label: t('situationStudent'),
      descEn: 'Unlocks scholarships, fee waivers & assistive laptops',
      descHi: 'छात्रवृत्ति, फीस प्रतिपूर्ति एवं सुगम्य लैपटॉप हेतु',
    },
    {
      id: 'employed',
      icon: <Briefcase className="w-5 h-5 text-emerald-600" />,
      label: t('situationEmployed'),
      descEn: 'Unlocks Sec 80U income tax deductions & workplace aids',
      descHi: 'धारा 80U आयकर छूट एवं कार्यस्थल सुगमता हेतु',
    },
    {
      id: 'unemployed',
      icon: <Search className="w-5 h-5 text-amber-600" />,
      label: t('situationUnemployed'),
      descEn: 'Unlocks 4% government job quotas, skill training & stipends',
      descHi: '4% सरकारी नौकरी आरक्षण, वजीफे व कौशल विकास हेतु',
    },
    {
      id: 'self_employed',
      icon: <Store className="w-5 h-5 text-purple-600" />,
      label: t('situationSelfEmployed'),
      descEn: 'Unlocks NHFDC 4%-8% low-interest business & shop loans',
      descHi: 'सस्ती ब्याज दर (4%-8%) पर दुकान व व्यवसाय ऋण हेतु',
    },
    {
      id: 'dependent',
      icon: <HeartHandshake className="w-5 h-5 text-rose-600" />,
      label: t('situationDependent'),
      descEn: 'Unlocks monthly pensions, respite homes & Sec 80DD caregiver relief',
      descHi: 'मासिक पेंशन, समर्थ राहत गृह व धारा 80DD परिजन छूट हेतु',
    },
    {
      id: 'retired',
      icon: <Users className="w-5 h-5 text-stone-600" />,
      label: t('situationRetired'),
      descEn: 'Unlocks senior disability assistance & travel discounts',
      descHi: 'वरिष्ठ दिव्यांग सहायता एवं यात्रा रियायतों हेतु',
    },
    {
      id: 'homemaker',
      icon: <Home className="w-5 h-5 text-cyan-600" />,
      label: t('situationHomemaker'),
      descEn: 'Unlocks state welfare pensions & accessible assistive aids',
      descHi: 'राज्य कल्याण पेंशन एवं सहायक उपकरणों हेतु',
    },
    {
      id: 'other',
      icon: <Sparkles className="w-5 h-5 text-stone-500" />,
      label: t('situationOther'),
      descEn: 'General benefits across all citizen categories',
      descHi: 'सभी सामान्य नागरिक योजनाओं के लिए',
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Step Heading */}
      <div className="border-b border-warm-200 dark:border-stone-800 pb-4">
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-white">
          {t('step4SituationTitle')}
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-1">
          {t('step4SituationDesc')}
        </p>
      </div>

      {/* Situations Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {situations.map(sit => {
          const isSelected = userProfile.employmentStatus === sit.id;
          return (
            <button
              key={sit.id}
              type="button"
              onClick={() => updateProfile({ employmentStatus: sit.id })}
              className={`p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${
                isSelected
                  ? 'border-terracotta-600 bg-terracotta-50/80 dark:bg-terracotta-950/60 text-terracotta-900 dark:text-terracotta-200 ring-2 ring-terracotta-500/20 shadow-warm-sm font-semibold'
                  : 'border-warm-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-warm-100 dark:hover:bg-stone-700'
              }`}
              aria-pressed={isSelected}
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-warm-100 dark:bg-stone-900">
                  {sit.icon}
                </div>
                <div>
                  <span className="text-sm font-bold block mb-0.5">{sit.label}</span>
                  <span className="text-xs text-stone-500 dark:text-stone-400">
                    {language === 'hi' ? sit.descHi : sit.descEn}
                  </span>
                </div>
              </div>

              <div
                className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ml-2 ${
                  isSelected
                    ? 'bg-terracotta-600 border-terracotta-600 text-white'
                    : 'border-stone-300 dark:border-stone-600'
                }`}
              >
                {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
            </button>
          );
        })}
      </div>

    </div>
  );
};
