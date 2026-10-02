import React, { useState } from 'react';
import { 
  Sparkles, 
  Printer, 
  RotateCcw, 
  SlidersHorizontal, 
  Filter, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle,
  Download,
  Share2
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAccessibility } from '../../context/AccessibilityContext';
import { useBenefits } from '../../context/BenefitsContext';
import { SchemeCard } from './SchemeCard';
import { EligibilityStatus, NeedCategory } from '../../types/scheme';

export const PersonalisedResults: React.FC = () => {
  const { language, t } = useLanguage();
  const { matchResults, setActiveTab, userProfile } = useBenefits();
  const [activeStatusTab, setActiveStatusTab] = useState<'all' | EligibilityStatus>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const likelyCount = matchResults.filter(r => r.status === 'likely').length;
  const mayBeCount = matchResults.filter(r => r.status === 'may_be').length;
  const checkCount = matchResults.filter(r => r.status === 'check').length;

  const filteredResults = matchResults.filter(r => {
    const statusMatch = activeStatusTab === 'all' || r.status === activeStatusTab;
    const catMatch = selectedCategory === 'all' || r.scheme.category === selectedCategory;
    return statusMatch && catMatch;
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="py-10 md:py-16 bg-warm-50 dark:bg-stone-900 transition-colors min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Results Header */}
        <div className="bg-white dark:bg-stone-850 rounded-3xl border border-warm-300 dark:border-stone-800 p-6 sm:p-10 shadow-warm-lg mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                {language === 'hi' ? 'स्मार्ट मिलान परिणाम' : 'Personalised Benefit Report'}
              </span>
              <h1 className="text-2xl sm:text-4xl font-serif font-bold text-stone-900 dark:text-white">
                {t('resultsTitle')}
              </h1>
              <p className="text-sm text-stone-600 dark:text-stone-400">
                {t('resultsSubtitle')}
              </p>
            </div>

            {/* Print & Edit Controls */}
            <div className="flex items-center gap-3 flex-wrap no-print">
              <button
                onClick={handlePrint}
                className="px-4 py-2.5 rounded-xl border border-warm-300 dark:border-stone-700 bg-white dark:bg-stone-800 hover:bg-warm-100 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 text-xs sm:text-sm font-semibold transition-all shadow-warm-sm flex items-center gap-2"
                title="Print or Save PDF"
              >
                <Printer className="w-4 h-4 text-terracotta-600" />
                <span>{t('downloadSummary')}</span>
              </button>

              <button
                onClick={() => setActiveTab('finder')}
                className="px-4 py-2.5 rounded-xl bg-terracotta-600 hover:bg-terracotta-700 text-white text-xs sm:text-sm font-semibold transition-all shadow-warm-sm flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{language === 'hi' ? 'उत्तर बदलें' : 'Edit Answers'}</span>
              </button>
            </div>
          </div>

          {/* Quick Summary Strip */}
          <div className="mt-8 pt-6 border-t border-warm-200 dark:border-stone-800 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900">
              <span className="text-2xl font-serif font-bold text-emerald-800 dark:text-emerald-300 block">
                {likelyCount}
              </span>
              <span className="text-xs font-semibold text-emerald-900 dark:text-emerald-400">
                {language === 'hi' ? '🟢 अत्यधिक संभावित' : '🟢 Likely Eligible'}
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900">
              <span className="text-2xl font-serif font-bold text-amber-800 dark:text-amber-300 block">
                {mayBeCount}
              </span>
              <span className="text-xs font-semibold text-amber-900 dark:text-amber-400">
                {language === 'hi' ? '🟡 संभावित पात्र' : '🟡 May Be Eligible'}
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700">
              <span className="text-2xl font-serif font-bold text-stone-800 dark:text-stone-200 block">
                {checkCount}
              </span>
              <span className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                {language === 'hi' ? '⚪ जांच आवश्यक' : '⚪ Check Eligibility'}
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-warm-100 dark:bg-stone-800/80 border border-warm-200 dark:border-stone-700">
              <span className="text-2xl font-serif font-bold text-stone-900 dark:text-white block">
                {matchResults.length}
              </span>
              <span className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                {language === 'hi' ? 'कुल योजनाएं' : 'Total Evaluated'}
              </span>
            </div>
          </div>
        </div>

        {/* Filter Navigation Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 no-print">
          
          {/* Status Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {[
              { id: 'all', label: t('allSchemesTab'), count: matchResults.length },
              { id: 'likely', label: t('likelyEligibleTab'), count: likelyCount },
              { id: 'may_be', label: t('mayBeEligibleTab'), count: mayBeCount },
              { id: 'check', label: t('checkEligibilityTab'), count: checkCount },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveStatusTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap flex items-center gap-2 ${
                  activeStatusTab === tab.id
                    ? 'bg-stone-900 dark:bg-warm-100 text-white dark:text-stone-900 shadow-warm-md'
                    : 'bg-white dark:bg-stone-800 border border-warm-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-warm-100'
                }`}
                aria-pressed={activeStatusTab === tab.id}
              >
                <span>{tab.label}</span>
                <span className={`px-2 py-0.5 rounded-full text-[11px] ${
                  activeStatusTab === tab.id
                    ? 'bg-stone-800 dark:bg-warm-200 text-stone-200 dark:text-stone-900'
                    : 'bg-warm-100 dark:bg-stone-700 text-stone-700 dark:text-stone-300'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Category Dropdown Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-stone-500" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3.5 py-2.5 rounded-xl bg-white dark:bg-stone-800 border border-warm-300 dark:border-stone-700 text-xs sm:text-sm font-medium text-stone-800 dark:text-stone-200 shadow-warm-sm focus:outline-none focus:ring-2 focus:ring-terracotta-500"
            >
              <option value="all">{t('allCategories')}</option>
              <option value="financial">{language === 'hi' ? 'वित्तीय सहायता' : 'Financial'}</option>
              <option value="assistive">{language === 'hi' ? 'सहायक उपकरण' : 'Assistive Devices'}</option>
              <option value="healthcare">{language === 'hi' ? 'स्वास्थ्य' : 'Healthcare'}</option>
              <option value="education">{language === 'hi' ? 'शिक्षा' : 'Education'}</option>
              <option value="employment">{language === 'hi' ? 'रोजगार व ऋण' : 'Employment & Loans'}</option>
              <option value="transport">{language === 'hi' ? 'परिवहन व यात्रा' : 'Transport'}</option>
              <option value="rights">{language === 'hi' ? 'अधिकार व कोटा' : 'Legal Rights'}</option>
              <option value="housing">{language === 'hi' ? 'आवास' : 'Housing'}</option>
              <option value="rehabilitation">{language === 'hi' ? 'पुनर्वास' : 'Rehabilitation'}</option>
              <option value="care">{language === 'hi' ? 'देखभाल' : 'Care & Support'}</option>
            </select>
          </div>
        </div>

        {/* Results Grid */}
        {filteredResults.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResults.map(res => (
              <SchemeCard key={res.scheme.id} result={res} />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center bg-white dark:bg-stone-850 rounded-3xl border border-warm-300 dark:border-stone-800">
            <AlertCircle className="w-10 h-10 text-stone-400 mx-auto mb-3" />
            <h3 className="text-lg font-serif font-bold text-stone-900 dark:text-white mb-1">
              {t('noSchemesMatched')}
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mb-6">
              {language === 'hi' ? 'फ़िल्टर रीसेट करें या सभी योजनाएं ब्राउज़ करें' : 'Try resetting your status filter or browse all schemes'}
            </p>
            <button
              onClick={() => {
                setActiveStatusTab('all');
                setSelectedCategory('all');
              }}
              className="px-6 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white dark:bg-warm-100 dark:text-stone-900 font-semibold text-xs transition-colors"
            >
              {language === 'hi' ? 'फ़िल्टर हटाएं' : 'Reset Filters'}
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
