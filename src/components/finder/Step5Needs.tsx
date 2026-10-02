import React from 'react';
import { 
  IndianRupee, 
  HeartPulse, 
  Accessibility, 
  GraduationCap, 
  Briefcase, 
  Home, 
  Train, 
  Activity, 
  Scale, 
  Users,
  Check
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useBenefits } from '../../context/BenefitsContext';
import { NeedCategory } from '../../types/scheme';

export const Step5Needs: React.FC = () => {
  const { language, t } = useLanguage();
  const { userProfile, updateProfile } = useBenefits();

  const needOptions: { id: NeedCategory; emoji: string; icon: React.ReactNode; labelEn: string; labelHi: string; descEn: string; descHi: string }[] = [
    {
      id: 'financial',
      emoji: '💰',
      icon: <IndianRupee className="w-5 h-5 text-emerald-600" />,
      labelEn: 'Financial Assistance & Pension',
      labelHi: 'वित्तीय सहायता एवं मासिक पेंशन',
      descEn: 'Monthly pensions, marriage grants & emergency cash aid',
      descHi: 'मासिक दिव्यांग पेंशन, विवाह अनुदान एवं वित्तीय सहायता',
    },
    {
      id: 'assistive',
      emoji: '♿',
      icon: <Accessibility className="w-5 h-5 text-amber-600" />,
      labelEn: 'Assistive Devices & Mobility',
      labelHi: 'सहायक उपकरण व मोटराइज्ड ट्राइसाइकिल',
      descEn: 'Free wheelchairs, smart canes, motorized tricycles & hearing aids',
      descHi: 'निःशुल्क व्हीलचेयर, मोटराइज्ड स्कूटी, स्मार्ट केन व हियरिंग एड',
    },
    {
      id: 'healthcare',
      emoji: '🏥',
      icon: <HeartPulse className="w-5 h-5 text-rose-600" />,
      labelEn: 'Healthcare & Insurance',
      labelHi: 'स्वास्थ्य बीमा व निःशुल्क चिकित्सा',
      descEn: 'Niramaya ₹1L cover, cochlear implants & specialized therapy',
      descHi: 'निरामया ₹1 लाख स्वास्थ्य बीमा, कॉक्लियर इम्प्लांट व थेरेपी',
    },
    {
      id: 'education',
      emoji: '🎓',
      icon: <GraduationCap className="w-5 h-5 text-blue-600" />,
      labelEn: 'Education & Scholarships',
      labelHi: 'शिक्षा, छात्रवृत्ति व लैपटॉप',
      descEn: 'Pre/Post matric scholarships, IIT/IIM fees & doctoral fellowship',
      descHi: 'प्री/पोस्ट मैट्रिक छात्रवृत्ति, कॉलेज फीस प्रतिपूर्ति व लैपटॉप',
    },
    {
      id: 'employment',
      emoji: '💼',
      icon: <Briefcase className="w-5 h-5 text-emerald-700" />,
      labelEn: 'Employment & Business Loans',
      labelHi: 'रोजगार व सस्ती स्वरोजगार ऋण योजनाएं',
      descEn: 'NHFDC 4%-8% concessional startup loans & skill training',
      descHi: '4%-8% कम ब्याज दर पर व्यवसाय/दुकान लोन व कौशल विकास',
    },
    {
      id: 'transport',
      emoji: '🚆',
      icon: <Train className="w-5 h-5 text-cyan-600" />,
      labelEn: 'Travel & Transport Concessions',
      labelHi: 'ट्रेन, बस व हवाई यात्रा रियायत',
      descEn: '75% Railway discounts, free roadways bus passes & air concessions',
      descHi: '75% रेलवे रियायत, 100% रोडवेज बस पास व हवाई टिकट छूट',
    },
    {
      id: 'housing',
      emoji: '🏠',
      icon: <Home className="w-5 h-5 text-amber-700" />,
      labelEn: 'Accessible Housing (PMAY)',
      labelHi: 'सुगम आवास व भूतल प्राथमिकता',
      descEn: 'PMAY ₹2.5L pucca house subsidy & ground floor flat allotment',
      descHi: 'पीएमएवाई पक्का मकान अनुदान व ग्राउंड फ्लोर अनिवार्य आवंटन',
    },
    {
      id: 'rehabilitation',
      emoji: '🧑🦽',
      icon: <Activity className="w-5 h-5 text-indigo-600" />,
      labelEn: 'Rehabilitation & Special Schools',
      labelHi: 'पुनर्वास, विशेष स्कूल व थेरेपी (DDRS)',
      descEn: 'Free special education, early intervention for kids & therapy centers',
      descHi: 'निःशुल्क विशेष विद्यालय, अर्ली इंटरवेंशन व स्पीच थेरेपी केंद्र',
    },
    {
      id: 'rights',
      emoji: '⚖️',
      icon: <Scale className="w-5 h-5 text-purple-600" />,
      labelEn: 'Legal Rights, Job Quota & Tax Relief',
      labelHi: 'कानूनी अधिकार, 4% नौकरी कोटा व टैक्स छूट',
      descEn: '4% Government job reservation, 5% university quota & Sec 80U deduction',
      descHi: '4% सरकारी नौकरी आरक्षण, 5% कॉलेज कोटा व धारा 80U ₹1.25L टैक्स छूट',
    },
    {
      id: 'care',
      emoji: '👨👩👧',
      icon: <Users className="w-5 h-5 text-rose-700" />,
      labelEn: 'Care, Respite & Group Homes',
      labelHi: 'देखभाल, राहत गृह व घरौंदा (National Trust)',
      descEn: 'Samarth respite care, lifelong Gharaunda assisted living & guardians',
      descHi: 'समर्थ राहत केंद्र, आजीवन सुरक्षित घरौंदा ग्रुप होम व गार्जियनशिप',
    },
  ];

  const handleToggleNeed = (needId: NeedCategory) => {
    const current = userProfile.needs;
    const next = current.includes(needId)
      ? current.filter(n => n !== needId)
      : [...current, needId];
    updateProfile({ needs: next });
  };

  const handleSelectAll = () => {
    if (userProfile.needs.length === needOptions.length) {
      updateProfile({ needs: [] });
    } else {
      updateProfile({ needs: needOptions.map(n => n.id) });
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Step Heading & Select All Toggle */}
      <div className="border-b border-warm-200 dark:border-stone-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-white">
            {t('step5NeedsTitle')}
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-1">
            {t('step5NeedsDesc')}
          </p>
        </div>
        <button
          type="button"
          onClick={handleSelectAll}
          className="text-xs font-bold text-terracotta-700 dark:text-terracotta-400 hover:underline shrink-0"
        >
          {userProfile.needs.length === needOptions.length
            ? (language === 'hi' ? 'सभी हटाएं' : 'Deselect All')
            : (language === 'hi' ? 'सभी चुनें' : 'Select All 10')}
        </button>
      </div>

      {/* Needs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {needOptions.map(need => {
          const isSelected = userProfile.needs.includes(need.id);
          return (
            <button
              key={need.id}
              type="button"
              onClick={() => handleToggleNeed(need.id)}
              className={`p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${
                isSelected
                  ? 'border-terracotta-600 bg-terracotta-50/80 dark:bg-terracotta-950/60 text-terracotta-900 dark:text-terracotta-200 ring-2 ring-terracotta-500/20 shadow-warm-sm font-semibold'
                  : 'border-warm-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-warm-100 dark:hover:bg-stone-700'
              }`}
              aria-pressed={isSelected}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-warm-100 dark:bg-stone-900 flex items-center justify-center text-lg shrink-0">
                  <span>{need.emoji}</span>
                </div>
                <div>
                  <span className="text-sm font-bold block mb-0.5">
                    {language === 'hi' ? need.labelHi : need.labelEn}
                  </span>
                  <span className="text-xs text-stone-500 dark:text-stone-400 leading-tight">
                    {language === 'hi' ? need.descHi : need.descEn}
                  </span>
                </div>
              </div>

              <div
                className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 ml-2 ${
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
  );
};
