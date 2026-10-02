import React from 'react';
import { Sparkles, ArrowRight, Bookmark, Check, ExternalLink, ShieldCheck, Volume2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAccessibility } from '../../context/AccessibilityContext';
import { useBenefits } from '../../context/BenefitsContext';
import { SCHEMES_DATA } from '../../data/schemes';
import { Scheme } from '../../types/scheme';

export const FeaturedSchemes: React.FC = () => {
  const { language, t } = useLanguage();
  const { speakText } = useAccessibility();
  const { openSchemeModal, isSchemeSaved, saveScheme, removeSavedScheme, setActiveTab } = useBenefits();

  const featuredList = SCHEMES_DATA.filter(s => s.popular).slice(0, 3);

  const handleToggleSave = (e: React.MouseEvent, schemeId: string) => {
    e.stopPropagation();
    if (isSchemeSaved(schemeId)) {
      removeSavedScheme(schemeId);
    } else {
      saveScheme(schemeId);
    }
  };

  return (
    <section className="py-16 md:py-24 bg-warm-50 dark:bg-stone-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-terracotta-600 dark:text-terracotta-400 block mb-2 font-serif">
              {language === 'hi' ? 'प्रमुख कल्याणकारी पहल' : 'Flagship Schemes'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-stone-900 dark:text-white">
              {language === 'hi' ? 'सर्वाधिक लोकप्रिय राष्ट्रीय योजनाएं' : 'Most Popular National Benefits'}
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('schemes')}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-terracotta-700 dark:text-terracotta-400 hover:underline"
          >
            <span>{t('btnBrowseAllSchemes')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Featured Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredList.map(scheme => {
            const isSaved = isSchemeSaved(scheme.id);
            return (
              <div
                key={scheme.id}
                onClick={() => openSchemeModal(scheme)}
                className="bg-white dark:bg-stone-850 rounded-3xl border border-warm-200 dark:border-stone-800 p-6 shadow-warm-md hover:shadow-warm-xl transition-all hover:-translate-y-1 flex flex-col justify-between cursor-pointer group relative"
              >
                <div>
                  {/* Top Badges & Save button */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-warm-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 uppercase tracking-wider">
                      {scheme.code}
                    </span>
                    <button
                      onClick={(e) => handleToggleSave(e, scheme.id)}
                      className={`p-2 rounded-xl border transition-all ${
                        isSaved
                          ? 'bg-terracotta-500 border-terracotta-500 text-white'
                          : 'border-warm-200 dark:border-stone-700 text-stone-500 hover:text-stone-900 dark:hover:text-white hover:bg-warm-100 dark:hover:bg-stone-800'
                      }`}
                      title={isSaved ? 'Saved in My Benefits' : 'Save Scheme'}
                      aria-label={isSaved ? 'Saved in My Benefits' : 'Save Scheme'}
                    >
                      <Bookmark className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-lg font-serif font-bold text-stone-900 dark:text-white group-hover:text-terracotta-700 dark:group-hover:text-terracotta-400 transition-colors mb-2 leading-snug">
                    {language === 'hi' ? scheme.nameHi : scheme.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mb-4 line-clamp-2 leading-relaxed">
                    {language === 'hi' ? scheme.taglineHi : scheme.tagline}
                  </p>

                  {/* Key Financial/Benefit Amount */}
                  {scheme.financialBenefitAmount && (
                    <div className="mb-4 p-3 rounded-2xl bg-warm-50 dark:bg-stone-800/60 border border-warm-200 dark:border-stone-700">
                      <span className="text-[11px] font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider block mb-0.5">
                        {language === 'hi' ? 'प्रमुख लाभ / अनुदान' : 'Key Benefit / Assistance'}
                      </span>
                      <span className="text-sm font-bold text-terracotta-800 dark:text-terracotta-300">
                        {language === 'hi' ? scheme.financialBenefitAmountHi : scheme.financialBenefitAmount}
                      </span>
                    </div>
                  )}

                  {/* Criteria Tags */}
                  <div className="space-y-1.5 mb-6 text-xs text-stone-600 dark:text-stone-300">
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>
                        {language === 'hi'
                          ? `न्यूनतम ${scheme.minDisabilityPercentage || 40}% दिव्यांगता`
                          : `Min ${scheme.minDisabilityPercentage || 40}% Disability Certificate`}
                      </span>
                    </div>
                    {scheme.maxAnnualIncome && (
                      <div className="flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>
                          {language === 'hi'
                            ? `पारिवारिक आय ₹${(scheme.maxAnnualIncome / 100000).toFixed(1)} लाख तक`
                            : `Family Income up to ₹${(scheme.maxAnnualIncome / 100000).toFixed(1)} Lakh`}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="pt-4 border-t border-warm-200 dark:border-stone-800 flex items-center justify-between text-xs font-semibold">
                  <span className="text-terracotta-700 dark:text-terracotta-400 inline-flex items-center gap-1 group-hover:underline">
                    {t('btnViewDetails')}
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const desc = language === 'hi' ? `${scheme.nameHi}. ${scheme.descriptionHi}` : `${scheme.name}. ${scheme.description}`;
                      speakText(desc, scheme.id, language);
                    }}
                    className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 dark:hover:text-white hover:bg-warm-100 dark:hover:bg-stone-800 transition-colors"
                    title="Read Aloud"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
