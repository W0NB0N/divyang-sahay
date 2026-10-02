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
  ArrowUpRight
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useBenefits } from '../../context/BenefitsContext';
import { SCHEMES_DATA } from '../../data/schemes';
import { NeedCategory } from '../../types/scheme';

export const CategoryGrid: React.FC = () => {
  const { language } = useLanguage();
  const { setActiveTab, setSelectedCategoryFilter } = useBenefits();

  const categories: { id: NeedCategory; icon: React.ReactNode; nameEn: string; nameHi: string; descEn: string; descHi: string; color: string }[] = [
    {
      id: 'financial',
      icon: <IndianRupee className="w-6 h-6 text-emerald-600" />,
      nameEn: 'Financial Assistance & Pensions',
      nameHi: 'वित्तीय सहायता एवं मासिक पेंशन',
      descEn: 'Monthly social security pensions, marriage grants & direct cash transfers',
      descHi: 'मासिक दिव्यांगता पेंशन, विवाह प्रोत्साहन अनुदान एवं प्रत्यक्ष नकद सहायता',
      color: 'bg-emerald-50/70 border-emerald-200 dark:bg-emerald-950/20 dark:border-emerald-900',
    },
    {
      id: 'assistive',
      icon: <Accessibility className="w-6 h-6 text-amber-600" />,
      nameEn: 'Assistive Devices & Appliances',
      nameHi: 'सहायक उपकरण व मोटराइज्ड ट्राइसाइकिल',
      descEn: 'Free motorized wheelchairs, smart canes, Braille displays & digital aids',
      descHi: 'निःशुल्क मोटराइज्ड ट्राइसाइकिल, स्मार्ट केन, डिजिटल ब्रेल एवं सहायक किट',
      color: 'bg-amber-50/70 border-amber-200 dark:bg-amber-950/20 dark:border-amber-900',
    },
    {
      id: 'healthcare',
      icon: <HeartPulse className="w-6 h-6 text-rose-600" />,
      nameEn: 'Healthcare & Insurance',
      nameHi: 'स्वास्थ्य बीमा व चिकित्सा उपचार',
      descEn: 'Niramaya ₹1L health cover, free cochlear implants & therapy packages',
      descHi: 'निरामया ₹1 लाख स्वास्थ्य बीमा, निःशुल्क कॉक्लियर इम्प्लांट सर्जरी एवं थेरेपी',
      color: 'bg-rose-50/70 border-rose-200 dark:bg-rose-950/20 dark:border-rose-900',
    },
    {
      id: 'education',
      icon: <GraduationCap className="w-6 h-6 text-blue-600" />,
      nameEn: 'Education & Scholarships',
      nameHi: 'शिक्षा, छात्रवृत्ति व फेलोशिप',
      descEn: 'Pre/Post-matric scholarships, Top-Class premier institute funding & Ph.D. fellowships',
      descHi: 'प्री/पोस्ट मैट्रिक छात्रवृत्ति, आईआईटी/आईआईएम टॉप क्लास एवं शोध फेलोशिप',
      color: 'bg-blue-50/70 border-blue-200 dark:bg-blue-950/20 dark:border-blue-900',
    },
    {
      id: 'employment',
      icon: <Briefcase className="w-6 h-6 text-emerald-700" />,
      nameEn: 'Employment & Concessional Loans',
      nameHi: 'रोजगार व सस्ती स्वरोजगार ऋण योजनाएं',
      descEn: 'NHFDC 4%-8% low-interest business loans & government skill training',
      descHi: 'एनएचएफडीसी 4%-8% कम ब्याज स्वरोजगार लोन व निःशुल्क कौशल विकास',
      color: 'bg-emerald-50/70 border-emerald-200 dark:bg-emerald-950/20 dark:border-emerald-900',
    },
    {
      id: 'transport',
      icon: <Train className="w-6 h-6 text-cyan-600" />,
      nameEn: 'Transport & Travel Concessions',
      nameHi: 'परिवहन व यात्रा रियायत (ट्रेन / बस / फ्लाइट)',
      descEn: '75% Railway concession, free roadways bus passes & 50% airfare discounts',
      descHi: '75% रेलवे रियायत, 100% रोडवेज बस पास व 50% घरेलू हवाई किराया छूट',
      color: 'bg-cyan-50/70 border-cyan-200 dark:bg-cyan-950/20 dark:border-cyan-900',
    },
    {
      id: 'rights',
      icon: <Scale className="w-6 h-6 text-purple-600" />,
      nameEn: 'Legal Rights & Quotas',
      nameHi: 'कानूनी अधिकार, 4% नौकरी कोटा व टैक्स छूट',
      descEn: '4% Government job reservation, 5% university quota, Sec 80U income tax relief',
      descHi: '4% सरकारी नौकरी आरक्षण, 5% कॉलेज आरक्षण एवं धारा 80U ₹1.25 लाख आयकर छूट',
      color: 'bg-purple-50/70 border-purple-200 dark:bg-purple-950/20 dark:border-purple-900',
    },
    {
      id: 'housing',
      icon: <Home className="w-6 h-6 text-amber-700" />,
      nameEn: 'Accessible Housing (PMAY)',
      nameHi: 'सुगम आवास (पीएमएवाई भूतल प्राथमिकता)',
      descEn: 'Mandatory ground floor allotment & financial grants for barrier-free pucca home',
      descHi: 'अनिवार्य ग्राउंड फ्लोर आवास आवंटन व पक्के मकान निर्माण हेतु सरकारी सब्सिडी',
      color: 'bg-amber-50/70 border-amber-200 dark:bg-amber-950/20 dark:border-amber-900',
    },
    {
      id: 'rehabilitation',
      icon: <Activity className="w-6 h-6 text-indigo-600" />,
      nameEn: 'Rehabilitation & Special Schools',
      nameHi: 'पुनर्वास, थेरेपी व विशेष विद्यालय (DDRS)',
      descEn: 'Free special education, early intervention for 0-6 yrs, speech & physiotherapy',
      descHi: 'निःशुल्क विशेष विद्यालय, 0-6 वर्ष के बच्चों हेतु अर्ली इंटरवेंशन व थेरेपी',
      color: 'bg-indigo-50/70 border-indigo-200 dark:bg-indigo-950/20 dark:border-indigo-900',
    },
    {
      id: 'care',
      icon: <Users className="w-6 h-6 text-rose-700" />,
      nameEn: 'Care, Respite & Group Homes',
      nameHi: 'देखभाल, राहत गृह व घरौंदा (National Trust)',
      descEn: 'Samarth respite homes, lifelong Gharaunda assisted living & guardianship',
      descHi: 'समर्थ राहत केंद्र, आजीवन घरौंदा ग्रुप होम एवं कानूनी अभिभावक सुरक्षा',
      color: 'bg-rose-50/70 border-rose-200 dark:bg-rose-950/20 dark:border-rose-900',
    },
  ];

  const handleCategoryClick = (catId: NeedCategory) => {
    setSelectedCategoryFilter(catId);
    setActiveTab('schemes');
  };

  return (
    <section className="py-16 md:py-24 bg-warm-100/50 dark:bg-stone-950 border-y border-warm-200 dark:border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-terracotta-600 dark:text-terracotta-400 block mb-2 font-serif">
              {language === 'hi' ? 'श्रेणी अनुसार खोजें' : 'Browse by Category'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-stone-900 dark:text-white">
              {language === 'hi' ? 'सभी 10 कल्याणकारी क्षेत्र' : 'Welfare Domains & Support Sectors'}
            </h2>
          </div>
          <button
            onClick={() => {
              setSelectedCategoryFilter('all');
              setActiveTab('schemes');
            }}
            className="inline-flex items-center gap-1 text-sm font-bold text-terracotta-700 dark:text-terracotta-400 hover:underline"
          >
            <span>{language === 'hi' ? 'सभी योजनाएं देखें' : 'View All Schemes'}</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Grid of Categories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
          {categories.map(cat => {
            const count = SCHEMES_DATA.filter(s => s.category === cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className={`p-5 rounded-2xl border text-left flex flex-col justify-between transition-all hover:scale-[1.02] shadow-warm-sm hover:shadow-warm-md group ${cat.color}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 rounded-xl bg-white dark:bg-stone-800 shadow-warm-sm group-hover:rotate-6 transition-transform">
                      {cat.icon}
                    </div>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-white/80 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                      {count} {language === 'hi' ? 'योजनाएं' : 'Schemes'}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-stone-900 dark:text-white font-serif mb-1.5 leading-snug">
                    {language === 'hi' ? cat.nameHi : cat.nameEn}
                  </h3>
                  <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-2 leading-relaxed">
                    {language === 'hi' ? cat.descHi : cat.descEn}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-200/60 dark:border-stone-800 flex items-center justify-between text-xs font-semibold text-terracotta-700 dark:text-terracotta-400">
                  <span>{language === 'hi' ? 'खोलें' : 'Explore'}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};
