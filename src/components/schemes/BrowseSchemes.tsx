import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  SlidersHorizontal, 
  Layers, 
  RotateCcw, 
  Bookmark, 
  ArrowRight, 
  ShieldCheck, 
  ExternalLink,
  Volume2,
  VolumeX,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAccessibility } from '../../context/AccessibilityContext';
import { useBenefits } from '../../context/BenefitsContext';
import { SCHEMES_DATA } from '../../data/schemes';
import { INDIAN_STATES } from '../../data/states';
import { NeedCategory, GovernmentLevel, DisabilityType } from '../../types/scheme';

export const BrowseSchemes: React.FC = () => {
  const { language, t } = useLanguage();
  const { isSpeaking, speakText } = useAccessibility();
  const { 
    openSchemeModal, 
    isSchemeSaved, 
    saveScheme, 
    removeSavedScheme, 
    quickSearchQuery, 
    setQuickSearchQuery, 
    selectedCategoryFilter, 
    setSelectedCategoryFilter 
  } = useBenefits();

  // Local Filter States
  const [levelFilter, setLevelFilter] = useState<'all' | GovernmentLevel>('all');
  const [disabilityFilter, setDisabilityFilter] = useState<string>('all');
  const [incomeLimitFilter, setIncomeLimitFilter] = useState<number | 'all'>('all');
  const [showFilterDrawer, setShowFilterDrawer] = useState<boolean>(false);

  // Filter and Search Logic
  const filteredSchemes = useMemo(() => {
    return SCHEMES_DATA.filter(scheme => {
      // 1. Search Query
      if (quickSearchQuery.trim()) {
        const q = quickSearchQuery.toLowerCase().trim();
        const matchesName = scheme.name.toLowerCase().includes(q) || scheme.nameHi.toLowerCase().includes(q);
        const matchesTagline = scheme.tagline.toLowerCase().includes(q) || scheme.taglineHi.toLowerCase().includes(q);
        const matchesCode = scheme.code.toLowerCase().includes(q);
        const matchesDesc = scheme.description.toLowerCase().includes(q) || scheme.descriptionHi.toLowerCase().includes(q);
        const matchesBenefits = scheme.benefits.some(b => b.toLowerCase().includes(q)) || scheme.benefitsHi.some(b => b.toLowerCase().includes(q));

        if (!matchesName && !matchesTagline && !matchesCode && !matchesDesc && !matchesBenefits) {
          return false;
        }
      }

      // 2. Category Filter
      if (selectedCategoryFilter !== 'all' && scheme.category !== selectedCategoryFilter) {
        return false;
      }

      // 3. Government Level Filter
      if (levelFilter !== 'all') {
        if (levelFilter === 'central' && scheme.level === 'state') return false;
        if (levelFilter === 'state' && scheme.level === 'central') return false;
      }

      // 4. Disability Filter
      if (disabilityFilter !== 'all') {
        const isApplicable = scheme.applicableDisabilities.includes('any') || scheme.applicableDisabilities.includes(disabilityFilter as DisabilityType);
        if (!isApplicable) return false;
      }

      // 5. Income Filter
      if (incomeLimitFilter !== 'all') {
        if (scheme.maxAnnualIncome && scheme.maxAnnualIncome < incomeLimitFilter) {
          return false;
        }
      }

      return true;
    });
  }, [quickSearchQuery, selectedCategoryFilter, levelFilter, disabilityFilter, incomeLimitFilter]);

  const handleResetFilters = () => {
    setQuickSearchQuery('');
    setSelectedCategoryFilter('all');
    setLevelFilter('all');
    setDisabilityFilter('all');
    setIncomeLimitFilter('all');
  };

  const handleToggleSave = (e: React.MouseEvent, schemeId: string) => {
    e.stopPropagation();
    if (isSchemeSaved(schemeId)) {
      removeSavedScheme(schemeId);
    } else {
      saveScheme(schemeId);
    }
  };

  return (
    <div className="py-10 md:py-16 bg-warm-50 dark:bg-stone-900 transition-colors min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-10 text-center max-w-3xl mx-auto space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            {language === 'hi' ? 'संपूर्ण डायरेक्टरी' : 'Complete Policy Catalogue'}
          </span>
          <h1 className="text-2xl sm:text-4xl font-serif font-bold text-stone-900 dark:text-white">
            {t('browseTitle')}
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400">
            {t('browseSubtitle')}
          </p>
        </div>

        {/* Live Search & Filter Bar */}
        <div className="bg-white dark:bg-stone-850 rounded-3xl border border-warm-300 dark:border-stone-800 p-6 shadow-warm-md mb-8">
          <div className="flex flex-col md:flex-row items-center gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={quickSearchQuery}
                onChange={(e) => setQuickSearchQuery(e.target.value)}
                placeholder={t('searchPlaceholder')}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-warm-50 dark:bg-stone-800 border border-warm-200 dark:border-stone-700 text-stone-900 dark:text-white placeholder-stone-400 focus:outline-none focus:ring-3 focus:ring-terracotta-500 text-sm"
              />
            </div>

            {/* Category Filter Select */}
            <div className="w-full md:w-auto">
              <select
                value={selectedCategoryFilter}
                onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                className="w-full md:w-56 px-4 py-3.5 rounded-2xl bg-warm-50 dark:bg-stone-800 border border-warm-200 dark:border-stone-700 text-stone-900 dark:text-white text-sm font-medium focus:outline-none focus:ring-3 focus:ring-terracotta-500"
              >
                <option value="all">{t('allCategories')}</option>
                <option value="financial">💰 {language === 'hi' ? 'वित्तीय सहायता' : 'Financial Support'}</option>
                <option value="assistive">♿ {language === 'hi' ? 'सहायक उपकरण' : 'Assistive Devices'}</option>
                <option value="healthcare">🏥 {language === 'hi' ? 'स्वास्थ्य सेवाएं' : 'Healthcare'}</option>
                <option value="education">🎓 {language === 'hi' ? 'शिक्षा व छात्रवृत्ति' : 'Education'}</option>
                <option value="employment">💼 {language === 'hi' ? 'रोजगार व ऋण' : 'Employment & Loans'}</option>
                <option value="transport">🚆 {language === 'hi' ? 'परिवहन व यात्रा' : 'Transport'}</option>
                <option value="rights">⚖️ {language === 'hi' ? 'कानूनी अधिकार' : 'Legal Rights'}</option>
                <option value="housing">🏠 {language === 'hi' ? 'आवास' : 'Housing'}</option>
                <option value="rehabilitation">🧑🦽 {language === 'hi' ? 'पुनर्वास' : 'Rehabilitation'}</option>
                <option value="care">👨👩👧 {language === 'hi' ? 'देखभाल' : 'Care & Support'}</option>
              </select>
            </div>

            {/* Level Filter Select */}
            <div className="w-full md:w-auto">
              <select
                value={levelFilter}
                onChange={(e) => setLevelFilter(e.target.value as any)}
                className="w-full md:w-48 px-4 py-3.5 rounded-2xl bg-warm-50 dark:bg-stone-800 border border-warm-200 dark:border-stone-700 text-stone-900 dark:text-white text-sm font-medium focus:outline-none focus:ring-3 focus:ring-terracotta-500"
              >
                <option value="all">{t('allLevels')}</option>
                <option value="central">{t('centralOnly')}</option>
                <option value="state">{t('stateOnly')}</option>
              </select>
            </div>

            {/* Reset Button */}
            {(quickSearchQuery || selectedCategoryFilter !== 'all' || levelFilter !== 'all' || disabilityFilter !== 'all' || incomeLimitFilter !== 'all') && (
              <button
                onClick={handleResetFilters}
                className="p-3.5 rounded-2xl border border-warm-300 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:bg-warm-100 dark:hover:bg-stone-800 transition-colors"
                title="Reset all filters"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            )}

          </div>

          {/* Quick Active Counts */}
          <div className="mt-4 pt-4 border-t border-warm-100 dark:border-stone-800 flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
            <span>
              {language === 'hi' ? `दिखाई जा रही योजनाएं: ${filteredSchemes.length}` : `Showing ${filteredSchemes.length} Schemes`}
            </span>
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
              <span>{language === 'hi' ? 'सत्यापित सरकारी नीतियां' : 'Verified Welfare Policies'}</span>
            </div>
          </div>
        </div>

        {/* Schemes Grid */}
        {filteredSchemes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSchemes.map(scheme => {
              const isSaved = isSchemeSaved(scheme.id);
              return (
                <div
                  key={scheme.id}
                  onClick={() => openSchemeModal(scheme)}
                  className="bg-white dark:bg-stone-850 rounded-3xl border border-warm-300 dark:border-stone-800 p-6 sm:p-7 shadow-warm-md hover:shadow-warm-xl transition-all duration-200 hover:-translate-y-0.5 cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    {/* Badges & Save */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-lg bg-warm-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-xs font-bold uppercase tracking-wider">
                          {scheme.code}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-lg bg-terracotta-50 dark:bg-terracotta-950/60 text-terracotta-800 dark:text-terracotta-300 text-xs font-semibold">
                          {scheme.level === 'central' ? (language === 'hi' ? 'केंद्र' : 'Central') : (language === 'hi' ? 'राज्य' : 'State')}
                        </span>
                      </div>

                      <button
                        onClick={(e) => handleToggleSave(e, scheme.id)}
                        className={`p-2 rounded-xl border transition-all ${
                          isSaved
                            ? 'bg-terracotta-600 border-terracotta-600 text-white shadow-warm-sm'
                            : 'border-warm-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:bg-warm-100 dark:hover:bg-stone-800'
                        }`}
                        title={isSaved ? t('btnSaved') : t('btnSaveScheme')}
                      >
                        <Bookmark className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Title & Ministry */}
                    <h3 className="text-lg sm:text-xl font-serif font-bold text-stone-900 dark:text-white group-hover:text-terracotta-700 dark:group-hover:text-terracotta-400 transition-colors mb-1.5 leading-snug">
                      {language === 'hi' ? scheme.nameHi : scheme.name}
                    </h3>
                    <p className="text-xs text-stone-500 dark:text-stone-400 mb-3">
                      {language === 'hi' ? scheme.ministryHi : scheme.ministry}
                    </p>

                    {/* Tagline */}
                    <p className="text-sm text-stone-600 dark:text-stone-300 mb-4 line-clamp-2 leading-relaxed">
                      {language === 'hi' ? scheme.taglineHi : scheme.tagline}
                    </p>

                    {/* Financial Amount */}
                    {scheme.financialBenefitAmount && (
                      <div className="mb-4 p-3 rounded-2xl bg-warm-50 dark:bg-stone-800/80 border border-warm-200 dark:border-stone-700/80">
                        <span className="text-[11px] font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider block mb-0.5">
                          {language === 'hi' ? 'वित्तीय लाभ' : 'Financial Benefit'}
                        </span>
                        <span className="text-sm font-bold text-terracotta-800 dark:text-terracotta-300">
                          {language === 'hi' ? scheme.financialBenefitAmountHi : scheme.financialBenefitAmount}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="pt-4 border-t border-warm-200 dark:border-stone-800 flex items-center justify-between">
                    <span className="text-sm font-bold text-terracotta-700 dark:text-terracotta-400 inline-flex items-center gap-1.5 group-hover:underline">
                      <span>{t('btnViewDetails')}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
        ) : (
          <div className="p-12 text-center bg-white dark:bg-stone-850 rounded-3xl border border-warm-300 dark:border-stone-800">
            <Search className="w-10 h-10 text-stone-400 mx-auto mb-3" />
            <h3 className="text-lg font-serif font-bold text-stone-900 dark:text-white mb-1">
              {language === 'hi' ? 'कोई योजना नहीं मिली' : 'No Schemes Found'}
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mb-6">
              {language === 'hi' ? 'कृपया अपनी खोज या फ़िल्टर बदलें' : 'Try adjusting your search keywords or clearing active filters'}
            </p>
            <button
              onClick={handleResetFilters}
              className="px-6 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white dark:bg-warm-100 dark:text-stone-900 font-semibold text-xs transition-colors"
            >
              {language === 'hi' ? 'सभी फ़िल्टर साफ़ करें' : 'Clear All Filters'}
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
