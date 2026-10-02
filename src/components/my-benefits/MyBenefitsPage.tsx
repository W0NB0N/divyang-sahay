import React from 'react';
import { 
  Bookmark, 
  Trash2, 
  CheckCircle2, 
  ExternalLink, 
  Sparkles, 
  ArrowRight, 
  FileText, 
  Layers, 
  Check,
  Edit3
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useBenefits } from '../../context/BenefitsContext';
import { SCHEMES_DATA } from '../../data/schemes';
import { DocumentVault } from './DocumentVault';
import { SavedSchemeItem } from '../../types/scheme';

export const MyBenefitsPage: React.FC = () => {
  const { language, t } = useLanguage();
  const { 
    savedSchemes, 
    removeSavedScheme, 
    updateSchemeStage, 
    updateSchemeNotes, 
    toggleSavedSchemeDoc, 
    openSchemeModal, 
    setActiveTab, 
    checkedDocsVault 
  } = useBenefits();

  const stages: { id: SavedSchemeItem['applicationStage']; label: string; num: number }[] = [
    { id: 'checked', label: t('stageChecked'), num: 1 },
    { id: 'documents_ready', label: t('stageDocsReady'), num: 2 },
    { id: 'applied', label: t('stageApplied'), num: 3 },
    { id: 'received', label: t('stageReceived'), num: 4 },
  ];

  return (
    <div className="py-10 md:py-16 bg-warm-50 dark:bg-stone-900 transition-colors min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-10 text-center max-w-3xl mx-auto space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sage-100 dark:bg-emerald-950/60 text-sage-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <Bookmark className="w-3.5 h-3.5" />
            {t('savedSchemesCount')} ({savedSchemes.length})
          </span>
          <h1 className="text-2xl sm:text-4xl font-serif font-bold text-stone-900 dark:text-white">
            {t('myBenefitsTitle')}
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400">
            {t('myBenefitsSubtitle')}
          </p>
        </div>

        {/* Master Document Checklist Vault */}
        <DocumentVault />

        {/* Saved Schemes List */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-white">
              {language === 'hi' ? 'सहेजी गई सरकारी योजनाएं' : 'Saved Schemes & Tracker'}
            </h2>
            <button
              onClick={() => setActiveTab('schemes')}
              className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-terracotta-700 dark:text-terracotta-400 hover:underline"
            >
              <span>{language === 'hi' ? '+ और योजनाएं जोड़ें' : '+ Add More Schemes'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {savedSchemes.length > 0 ? (
            <div className="space-y-6">
              {savedSchemes.map(item => {
                const scheme = SCHEMES_DATA.find(s => s.id === item.schemeId);
                if (!scheme) return null;

                const currentStageIdx = stages.findIndex(st => st.id === item.applicationStage);

                return (
                  <div
                    key={item.schemeId}
                    className="bg-white dark:bg-stone-850 rounded-3xl border border-warm-300 dark:border-stone-800 p-6 sm:p-8 shadow-warm-md hover:shadow-warm-lg transition-all"
                  >
                    {/* Top Row: Scheme Info & Delete */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-warm-200 dark:border-stone-800">
                      <div>
                        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                          <span className="px-2.5 py-0.5 rounded-lg bg-terracotta-100 dark:bg-terracotta-950/60 text-terracotta-800 dark:text-terracotta-300 text-xs font-bold uppercase tracking-wider">
                            {scheme.code}
                          </span>
                          <span className="text-xs text-stone-500 dark:text-stone-400">
                            {scheme.ministry}
                          </span>
                        </div>
                        <h3 className="text-lg sm:text-2xl font-serif font-bold text-stone-900 dark:text-white">
                          {language === 'hi' ? scheme.nameHi : scheme.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 mt-1">
                          {language === 'hi' ? scheme.taglineHi : scheme.tagline}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => openSchemeModal(scheme)}
                          className="px-4 py-2 rounded-xl bg-warm-100 dark:bg-stone-800 hover:bg-warm-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 text-xs font-semibold transition-colors"
                        >
                          {t('btnViewDetails')}
                        </button>
                        <button
                          onClick={() => removeSavedScheme(item.schemeId)}
                          className="p-2 rounded-xl text-stone-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                          title="Remove from saved"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* 4-Stage Application Progress Tracker */}
                    <div className="py-6 border-b border-warm-200 dark:border-stone-800">
                      <label className="text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 block mb-3 font-serif">
                        {t('applicationProgress')}
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {stages.map((st, sIdx) => {
                          const isDone = sIdx <= currentStageIdx;
                          const isCurrent = sIdx === currentStageIdx;
                          return (
                            <button
                              key={st.id}
                              onClick={() => updateSchemeStage(item.schemeId, st.id)}
                              className={`p-3 rounded-2xl border text-left flex items-center gap-2.5 transition-all ${
                                isCurrent
                                  ? 'border-terracotta-600 bg-terracotta-50 dark:bg-terracotta-950/60 text-terracotta-900 dark:text-terracotta-200 ring-2 ring-terracotta-500/20 shadow-warm-sm font-bold'
                                  : isDone
                                  ? 'border-emerald-300 bg-emerald-50/70 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-300 font-semibold'
                                  : 'border-warm-200 dark:border-stone-700 bg-warm-50/50 dark:bg-stone-800 text-stone-400 dark:text-stone-500 hover:bg-warm-100'
                              }`}
                            >
                              <div
                                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                                  isDone
                                    ? 'bg-emerald-600 text-white'
                                    : 'border border-stone-400 text-stone-500'
                                }`}
                              >
                                {isDone ? <Check className="w-3 h-3 stroke-[3]" /> : st.num}
                              </div>
                              <span className="text-xs leading-tight">{st.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Document Checklist for this scheme */}
                    <div className="py-6 border-b border-warm-200 dark:border-stone-800">
                      <span className="text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 block mb-3 font-serif">
                        {language === 'hi' ? 'इस योजना हेतु आवश्यक दस्तावेज' : 'Documents Checklist for this Scheme'}
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                        {scheme.documents.map(doc => {
                          const isChecked = item.checkedDocuments.includes(doc.id) || checkedDocsVault.includes(doc.id);
                          return (
                            <button
                              key={doc.id}
                              type="button"
                              onClick={() => toggleSavedSchemeDoc(item.schemeId, doc.id)}
                              className={`p-3 rounded-xl border text-left flex items-center justify-between text-xs transition-all ${
                                isChecked
                                  ? 'border-emerald-300 bg-emerald-50/60 dark:bg-emerald-950/20 text-stone-900 dark:text-white font-medium'
                                  : 'border-warm-200 dark:border-stone-700 bg-warm-50/40 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-warm-100'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <div
                                  className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                                    isChecked
                                      ? 'bg-emerald-600 border-emerald-600 text-white'
                                      : 'border-stone-400 dark:border-stone-600'
                                  }`}
                                >
                                  {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                                </div>
                                <span className="truncate">{language === 'hi' ? doc.nameHi : doc.name}</span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Personal Notes & Action Link */}
                    <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="w-full sm:max-w-md">
                        <div className="flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400 mb-1 font-medium">
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>{language === 'hi' ? 'व्यक्तिगत नोट्स / प्रगति' : 'Personal Notes / Reminders'}</span>
                        </div>
                        <input
                          type="text"
                          value={item.notes}
                          onChange={(e) => updateSchemeNotes(item.schemeId, e.target.value)}
                          placeholder={language === 'hi' ? 'उदा. फॉर्म जमा किया 15 मार्च, सत्यापन शेष...' : 'e.g., Submitted form at Tehsil, verification pending...'}
                          className="w-full px-3.5 py-2 rounded-xl bg-warm-50 dark:bg-stone-800 border border-warm-200 dark:border-stone-700 text-xs text-stone-800 dark:text-stone-200 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                        />
                      </div>

                      <a
                        href={scheme.officialPortalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-terracotta-600 hover:bg-terracotta-700 text-white font-semibold text-xs transition-all shadow-warm-sm flex items-center justify-center gap-2 shrink-0"
                      >
                        <span>{language === 'hi' ? 'आधिकारिक पोर्टल खोलें' : 'Open Official Portal'}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>

                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-12 text-center bg-white dark:bg-stone-850 rounded-3xl border border-warm-300 dark:border-stone-800">
              <Bookmark className="w-12 h-12 text-stone-400 mx-auto mb-3" />
              <h3 className="text-lg font-serif font-bold text-stone-900 dark:text-white mb-1">
                {t('noSavedSchemesYet')}
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mb-6 max-w-md mx-auto">
                {language === 'hi'
                  ? 'पात्रता खोजक का उपयोग करके अपनी पात्र योजनाओं को खोजें और उन्हें यहां सहेजें।'
                  : 'Take the simple questionnaire to match relevant schemes and save them here to track your application.'}
              </p>
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => setActiveTab('finder')}
                  className="px-6 py-3 rounded-2xl bg-terracotta-600 hover:bg-terracotta-700 text-white font-semibold text-xs sm:text-sm transition-all shadow-warm-sm flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{t('btnFindMyBenefits')}</span>
                </button>
                <button
                  onClick={() => setActiveTab('schemes')}
                  className="px-6 py-3 rounded-2xl border border-warm-300 dark:border-stone-700 bg-white dark:bg-stone-800 hover:bg-warm-100 text-stone-800 dark:text-stone-200 font-semibold text-xs sm:text-sm transition-all"
                >
                  {t('btnBrowseAllSchemes')}
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
