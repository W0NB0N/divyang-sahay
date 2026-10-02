import React from 'react';
import { 
  X, 
  ExternalLink, 
  Bookmark, 
  Volume2, 
  VolumeX, 
  CheckCircle2, 
  FileText, 
  Sparkles, 
  MapPin, 
  PhoneCall, 
  Building2, 
  ShieldCheck, 
  Info, 
  ListOrdered, 
  Check, 
  Printer
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAccessibility } from '../../context/AccessibilityContext';
import { useBenefits } from '../../context/BenefitsContext';
import { Scheme } from '../../types/scheme';

export const SchemeDetailModal: React.FC = () => {
  const { language, t } = useLanguage();
  const { isSpeaking, currentSpeakingId, speakText, stopSpeaking } = useAccessibility();
  const { selectedScheme, closeSchemeModal, isSchemeSaved, saveScheme, removeSavedScheme, checkedDocsVault, toggleVaultDoc } = useBenefits();

  if (!selectedScheme) return null;

  const isSaved = isSchemeSaved(selectedScheme.id);
  const isCurrentlySpeaking = isSpeaking && currentSpeakingId === `detail-${selectedScheme.id}`;

  const handleToggleSave = () => {
    if (isSaved) {
      removeSavedScheme(selectedScheme.id);
    } else {
      saveScheme(selectedScheme.id);
    }
  };

  const handleReadAloud = () => {
    if (isCurrentlySpeaking) {
      stopSpeaking();
    } else {
      const text = language === 'hi'
        ? `${selectedScheme.nameHi}. यह क्या है: ${selectedScheme.descriptionHi}. मुख्य लाभ: ${selectedScheme.benefitsHi.join('. ')}. आवेदन प्रक्रिया: ${selectedScheme.applicationStepsHi.join('. ')}`
        : `${selectedScheme.name}. What is this scheme: ${selectedScheme.description}. Benefits: ${selectedScheme.benefits.join('. ')}. How to apply: ${selectedScheme.applicationSteps.join('. ')}`;
      speakText(text, `detail-${selectedScheme.id}`, language);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-900/70 backdrop-blur-sm overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="scheme-modal-title"
    >
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={closeSchemeModal} />

      {/* Modal Content Box */}
      <div className="relative w-full max-w-4xl bg-warm-50 dark:bg-stone-900 rounded-3xl border border-warm-300 dark:border-stone-800 shadow-2xl overflow-hidden flex flex-col max-h-[92vh] z-10 animate-slide-up">
        
        {/* Modal Top Sticky Header */}
        <div className="sticky top-0 z-20 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md px-6 py-4 border-b border-warm-200 dark:border-stone-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-lg bg-terracotta-100 dark:bg-terracotta-950/60 text-terracotta-800 dark:text-terracotta-300 text-xs font-bold uppercase tracking-wider">
              {selectedScheme.code}
            </span>
            <span className="px-2.5 py-0.5 rounded-lg bg-warm-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-semibold uppercase">
              {selectedScheme.level === 'central' ? (language === 'hi' ? 'केंद्र सरकार' : 'Central Scheme') : (language === 'hi' ? 'राज्य सरकार' : 'State Scheme')}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Audio Read */}
            <button
              onClick={handleReadAloud}
              className={`p-2 rounded-xl transition-colors ${
                isCurrentlySpeaking
                  ? 'bg-amber-400 text-stone-950 font-bold animate-pulse'
                  : 'text-stone-600 dark:text-stone-300 hover:bg-warm-100 dark:hover:bg-stone-800'
              }`}
              title="Read Scheme Details Aloud"
              aria-label={isCurrentlySpeaking ? 'Stop reading' : 'Read scheme aloud'}
            >
              {isCurrentlySpeaking ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>

            {/* Save Button */}
            <button
              onClick={handleToggleSave}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                isSaved
                  ? 'bg-terracotta-600 text-white shadow-warm-sm'
                  : 'border border-warm-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 hover:bg-warm-100'
              }`}
            >
              <Bookmark className="w-4 h-4" />
              <span>{isSaved ? t('btnSaved') : t('btnSaveScheme')}</span>
            </button>

            {/* Close Button */}
            <button
              onClick={closeSchemeModal}
              className="p-2 rounded-xl text-stone-500 hover:text-stone-900 dark:hover:text-white hover:bg-warm-100 dark:hover:bg-stone-800 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-8">
          
          {/* Title & Ministry Info */}
          <div>
            <h1 id="scheme-modal-title" className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-white mb-2 leading-tight">
              {language === 'hi' ? selectedScheme.nameHi : selectedScheme.name}
            </h1>
            <p className="text-sm font-medium text-terracotta-700 dark:text-terracotta-400 mb-1">
              {language === 'hi' ? selectedScheme.taglineHi : selectedScheme.tagline}
            </p>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              {language === 'hi' ? selectedScheme.ministryHi : selectedScheme.ministry}
            </p>
          </div>

          {/* Section 1: What is this scheme? */}
          <div className="p-6 rounded-3xl bg-white dark:bg-stone-850 border border-warm-200 dark:border-stone-800 space-y-2">
            <h2 className="text-base sm:text-lg font-serif font-bold text-stone-900 dark:text-white flex items-center gap-2">
              <Info className="w-5 h-5 text-terracotta-600" />
              <span>{language === 'hi' ? '1. यह योजना क्या है?' : '1. What is this scheme?'}</span>
            </h2>
            <p className="text-sm sm:text-base text-stone-700 dark:text-stone-300 leading-relaxed font-normal">
              {language === 'hi' ? selectedScheme.descriptionHi : selectedScheme.description}
            </p>
          </div>

          {/* Section 2: What do you get? (Benefits) */}
          <div className="p-6 rounded-3xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900 space-y-3">
            <h2 className="text-base sm:text-lg font-serif font-bold text-emerald-900 dark:text-emerald-300 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-600" />
              <span>{language === 'hi' ? '2. आपको क्या लाभ मिलता है?' : '2. What do you get? (Benefits)'}</span>
            </h2>

            {selectedScheme.financialBenefitAmount && (
              <div className="inline-block px-3.5 py-1.5 rounded-xl bg-white dark:bg-stone-900 border border-emerald-300 dark:border-emerald-800 text-sm font-bold text-emerald-800 dark:text-emerald-300 mb-2">
                {language === 'hi' ? selectedScheme.financialBenefitAmountHi : selectedScheme.financialBenefitAmount}
              </div>
            )}

            <ul className="space-y-2 text-sm sm:text-base text-stone-800 dark:text-stone-200">
              {(language === 'hi' ? selectedScheme.benefitsHi : selectedScheme.benefits).map((b, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 3: Who can apply? (Eligibility Criteria) */}
          <div className="p-6 rounded-3xl bg-white dark:bg-stone-850 border border-warm-200 dark:border-stone-800 space-y-3">
            <h2 className="text-base sm:text-lg font-serif font-bold text-stone-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-600" />
              <span>{language === 'hi' ? '3. कौन आवेदन कर सकता है?' : '3. Who can apply? (Eligibility)'}</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-stone-700 dark:text-stone-300">
              <div className="p-3 rounded-xl bg-warm-50 dark:bg-stone-800 border border-warm-200 dark:border-stone-700">
                <span className="text-xs text-stone-500 dark:text-stone-400 block mb-0.5">
                  {language === 'hi' ? 'दिव्यांगता प्रतिशत' : 'Disability Percentage'}
                </span>
                <span className="font-bold">
                  {selectedScheme.minDisabilityPercentage ? `Minimum ${selectedScheme.minDisabilityPercentage}%` : 'Benchmark 40%+'}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-warm-50 dark:bg-stone-800 border border-warm-200 dark:border-stone-700">
                <span className="text-xs text-stone-500 dark:text-stone-400 block mb-0.5">
                  {language === 'hi' ? 'वार्षिक पारिवारिक आय' : 'Annual Family Income Limit'}
                </span>
                <span className="font-bold">
                  {selectedScheme.maxAnnualIncome ? `Up to ₹${(selectedScheme.maxAnnualIncome / 100000).toFixed(1)} Lakh` : 'No Income Ceiling'}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-warm-50 dark:bg-stone-800 border border-warm-200 dark:border-stone-700">
                <span className="text-xs text-stone-500 dark:text-stone-400 block mb-0.5">
                  {language === 'hi' ? 'आयु सीमा' : 'Eligible Age Range'}
                </span>
                <span className="font-bold">
                  {selectedScheme.minAge ?? 0} to {selectedScheme.maxAge ?? 'No Upper Limit'} years
                </span>
              </div>

              <div className="p-3 rounded-xl bg-warm-50 dark:bg-stone-800 border border-warm-200 dark:border-stone-700">
                <span className="text-xs text-stone-500 dark:text-stone-400 block mb-0.5">
                  {language === 'hi' ? 'लागू दिव्यांगता श्रेणी' : 'Covered Disabilities'}
                </span>
                <span className="font-bold">
                  {selectedScheme.applicableDisabilities.includes('any') ? 'All 21 RPwD Disabilities' : `${selectedScheme.applicableDisabilities.length} Specific Types`}
                </span>
              </div>
            </div>
          </div>

          {/* Section 4: Documents Required (Interactive Checklist!) */}
          <div className="p-6 rounded-3xl bg-warm-100/50 dark:bg-stone-850 border border-warm-200 dark:border-stone-800 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-base sm:text-lg font-serif font-bold text-stone-900 dark:text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-terracotta-600" />
                <span>{language === 'hi' ? '4. आवश्यक दस्तावेज (चेकलिस्ट)' : '4. Documents Required (Interactive Checklist)'}</span>
              </h2>
              <span className="text-xs text-stone-500 dark:text-stone-400">
                {language === 'hi' ? 'अपने उपलब्ध दस्तावेजों पर टिक करें' : 'Tick documents you have'}
              </span>
            </div>

            <div className="space-y-2.5">
              {selectedScheme.documents.map(doc => {
                const isChecked = checkedDocsVault.includes(doc.id);
                return (
                  <button
                    key={doc.id}
                    type="button"
                    onClick={() => toggleVaultDoc(doc.id)}
                    className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all ${
                      isChecked
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-stone-900 dark:text-white'
                        : 'border-warm-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 ${
                          isChecked
                            ? 'bg-emerald-600 border-emerald-600 text-white'
                            : 'border-stone-400 dark:border-stone-600'
                        }`}
                      >
                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <div>
                        <span className="text-sm font-bold block">
                          {language === 'hi' ? doc.nameHi : doc.name}
                        </span>
                        <span className="text-xs text-stone-500 dark:text-stone-400">
                          {language === 'hi' ? doc.descriptionHi : doc.description}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 5: How to Apply (Step-by-Step) */}
          <div className="p-6 rounded-3xl bg-white dark:bg-stone-850 border border-warm-200 dark:border-stone-800 space-y-3">
            <h2 className="text-base sm:text-lg font-serif font-bold text-stone-900 dark:text-white flex items-center gap-2">
              <ListOrdered className="w-5 h-5 text-indigo-600" />
              <span>{language === 'hi' ? '5. आवेदन कैसे करें? (चरण-दर-चरण)' : '5. How to Apply (Step-by-Step Instructions)'}</span>
            </h2>
            <ol className="space-y-3 text-sm sm:text-base text-stone-700 dark:text-stone-300">
              {(language === 'hi' ? selectedScheme.applicationStepsHi : selectedScheme.applicationSteps).map((step, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Section 6 & 7: Where to Apply & Official Source */}
          <div className="p-6 rounded-3xl bg-warm-100/60 dark:bg-stone-850 border border-warm-200 dark:border-stone-800 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 block mb-1">
                  {language === 'hi' ? 'आवेदन का आधिकारिक स्थान / पोर्टल' : 'Official Application Portal / Office'}
                </span>
                <span className="text-sm font-bold text-stone-900 dark:text-white block">
                  {language === 'hi' ? selectedScheme.officialPortalNameHi : selectedScheme.officialPortalName}
                </span>
                {selectedScheme.helpline && (
                  <span className="text-xs text-terracotta-700 dark:text-terracotta-400 font-semibold block mt-1">
                    📞 {selectedScheme.helpline}
                  </span>
                )}
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 block mb-1">
                  {language === 'hi' ? 'आधिकारिक सरकारी स्रोत' : 'Official Authority Source'}
                </span>
                <span className="text-sm font-bold text-stone-900 dark:text-white block">
                  {language === 'hi' ? selectedScheme.officialSourceTextHi : selectedScheme.officialSourceText}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Bottom Sticky CTA Footer */}
        <div className="sticky bottom-0 z-20 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md px-6 py-4 border-t border-warm-200 dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={closeSchemeModal}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-warm-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 text-xs sm:text-sm font-semibold hover:bg-warm-100 dark:hover:bg-stone-800"
          >
            {language === 'hi' ? 'वापस जाएं' : 'Close'}
          </button>

          <a
            href={selectedScheme.officialPortalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-7 py-3 rounded-2xl bg-terracotta-600 hover:bg-terracotta-700 text-white font-semibold text-sm shadow-warm-md flex items-center justify-center gap-2 group transition-all"
          >
            <span>{language === 'hi' ? 'आधिकारिक पोर्टल पर जाएं / आवेदन करें' : 'Apply on Official Portal'}</span>
            <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

      </div>
    </div>
  );
};
