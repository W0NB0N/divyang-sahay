import React from 'react';
import { 
  Check, 
  AlertCircle, 
  HelpCircle, 
  Bookmark, 
  ArrowRight, 
  FileText, 
  Volume2, 
  VolumeX, 
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAccessibility } from '../../context/AccessibilityContext';
import { useBenefits } from '../../context/BenefitsContext';
import { SchemeMatchResult, EligibilityStatus } from '../../types/scheme';

interface SchemeCardProps {
  result: SchemeMatchResult;
}

export const SchemeCard: React.FC<SchemeCardProps> = ({ result }) => {
  const { scheme, status, score, matchReasons, missingOrCheckReasons } = result;
  const { language, t } = useLanguage();
  const { isSpeaking, currentSpeakingId, speakText, stopSpeaking } = useAccessibility();
  const { openSchemeModal, isSchemeSaved, saveScheme, removeSavedScheme } = useBenefits();

  const isSaved = isSchemeSaved(scheme.id);
  const isCurrentlySpeaking = isSpeaking && currentSpeakingId === scheme.id;

  const handleToggleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSaved) {
      removeSavedScheme(scheme.id);
    } else {
      saveScheme(scheme.id);
    }
  };

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isCurrentlySpeaking) {
      stopSpeaking();
    } else {
      const textToRead = language === 'hi'
        ? `${scheme.nameHi}. ${scheme.descriptionHi}. लाभ: ${scheme.benefitsHi.slice(0, 2).join('. ')}`
        : `${scheme.name}. ${scheme.description}. Key Benefits: ${scheme.benefits.slice(0, 2).join('. ')}`;
      speakText(textToRead, scheme.id, language);
    }
  };

  const getStatusBadge = (st: EligibilityStatus) => {
    switch (st) {
      case 'likely':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900 dark:bg-emerald-950/80 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-800">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            {language === 'hi' ? '🟢 अत्यधिक संभावित पात्र' : '🟢 Likely Eligible'}
          </span>
        );
      case 'may_be':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 dark:bg-amber-950/80 dark:text-amber-200 border border-amber-300 dark:border-amber-800">
            <span className="w-2 h-2 rounded-full bg-amber-600" />
            {language === 'hi' ? '🟡 संभावित पात्र' : '🟡 May Be Eligible'}
          </span>
        );
      case 'check':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-stone-100 text-stone-800 dark:bg-stone-800 dark:text-stone-300 border border-stone-300 dark:border-stone-700">
            <span className="w-2 h-2 rounded-full bg-stone-400" />
            {language === 'hi' ? '⚪ पात्रता जांचें' : '⚪ Check Eligibility'}
          </span>
        );
    }
  };

  return (
    <div
      onClick={() => openSchemeModal(scheme)}
      className="bg-white dark:bg-stone-850 rounded-3xl border border-warm-300 dark:border-stone-800 p-6 sm:p-7 shadow-warm-md hover:shadow-warm-xl transition-all duration-200 hover:-translate-y-0.5 cursor-pointer group flex flex-col justify-between"
    >
      <div>
        {/* Card Header: Badges, Level & Save Button */}
        <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            {getStatusBadge(status)}
            <span className="px-2.5 py-0.5 rounded-lg bg-warm-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-bold uppercase tracking-wider">
              {scheme.level === 'central' ? (language === 'hi' ? 'केंद्र सरकार' : 'Central') : (language === 'hi' ? 'राज्य सरकार' : 'State')}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Audio TTS Button */}
            <button
              onClick={handleSpeak}
              className={`p-2 rounded-xl transition-colors ${
                isCurrentlySpeaking
                  ? 'bg-amber-400 text-stone-950 font-bold'
                  : 'text-stone-500 hover:text-stone-900 dark:hover:text-white hover:bg-warm-100 dark:hover:bg-stone-800'
              }`}
              title="Read scheme summary aloud"
              aria-label={isCurrentlySpeaking ? 'Stop reading' : 'Read scheme aloud'}
            >
              {isCurrentlySpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* Save Button */}
            <button
              onClick={handleToggleSave}
              className={`p-2 rounded-xl border transition-all ${
                isSaved
                  ? 'bg-terracotta-600 border-terracotta-600 text-white shadow-warm-sm'
                  : 'border-warm-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:bg-warm-100 dark:hover:bg-stone-800'
              }`}
              title={isSaved ? t('btnSaved') : t('btnSaveScheme')}
              aria-label={isSaved ? t('btnSaved') : t('btnSaveScheme')}
            >
              <Bookmark className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scheme Name & Ministry */}
        <h3 className="text-lg sm:text-xl font-serif font-bold text-stone-900 dark:text-white group-hover:text-terracotta-700 dark:group-hover:text-terracotta-400 transition-colors mb-1.5 leading-snug">
          {language === 'hi' ? scheme.nameHi : scheme.name}
        </h3>
        <p className="text-xs text-stone-500 dark:text-stone-400 mb-3">
          {language === 'hi' ? scheme.ministryHi : scheme.ministry}
        </p>

        {/* Tagline / Brief Benefit */}
        <p className="text-sm text-stone-600 dark:text-stone-300 mb-4 leading-relaxed font-medium">
          {language === 'hi' ? scheme.taglineHi : scheme.tagline}
        </p>

        {/* Financial Amount Highlight Badge if present */}
        {scheme.financialBenefitAmount && (
          <div className="mb-5 p-3.5 rounded-2xl bg-warm-50 dark:bg-stone-800/80 border border-warm-200 dark:border-stone-700/80">
            <span className="text-[11px] font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider block mb-0.5">
              {language === 'hi' ? 'उपलब्ध लाभ व अनुदान' : 'Available Benefit / Grant'}
            </span>
            <span className="text-sm font-bold text-terracotta-800 dark:text-terracotta-300">
              {language === 'hi' ? scheme.financialBenefitAmountHi : scheme.financialBenefitAmount}
            </span>
          </div>
        )}

        {/* "Why it matches you" Checklist */}
        <div className="mb-5 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-800 dark:text-stone-200 block font-serif">
            {t('whyMatchesTitle')}
          </span>
          <div className="space-y-1.5 text-xs">
            {matchReasons.slice(0, 3).map((r, idx) => (
              <div key={idx} className="flex items-start gap-2 text-stone-700 dark:text-stone-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>{language === 'hi' ? r.textHi : r.text}</span>
              </div>
            ))}

            {missingOrCheckReasons.slice(0, 2).map((r, idx) => (
              <div key={idx} className="flex items-start gap-2 text-stone-500 dark:text-stone-400">
                <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                <span>{language === 'hi' ? r.textHi : r.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* "Documents You May Need" Preview */}
        <div className="mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-800 dark:text-stone-200 block mb-2 font-serif">
            {t('documentsNeededTitle')}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {scheme.documents.slice(0, 4).map(doc => (
              <span
                key={doc.id}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-warm-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-[11px] font-medium"
              >
                <FileText className="w-3 h-3 text-terracotta-600" />
                <span>{language === 'hi' ? doc.nameHi : doc.name}</span>
              </span>
            ))}
            {scheme.documents.length > 4 && (
              <span className="px-2 py-1 rounded-lg bg-warm-200 dark:bg-stone-700 text-stone-600 dark:text-stone-300 text-[11px] font-semibold">
                +{scheme.documents.length - 4} more
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="pt-4 border-t border-warm-200 dark:border-stone-800 flex items-center justify-between">
        <button
          onClick={() => openSchemeModal(scheme)}
          className="text-sm font-bold text-terracotta-700 dark:text-terracotta-400 inline-flex items-center gap-1.5 group-hover:underline"
        >
          <span>{t('btnViewDetails')}</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>

        <span className="text-xs font-medium text-stone-400">
          {scheme.applicationMode === 'online' ? 'Online Apply' : 'Camp / Offline'}
        </span>
      </div>
    </div>
  );
};
