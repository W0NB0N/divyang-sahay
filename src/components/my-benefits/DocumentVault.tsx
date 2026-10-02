import React from 'react';
import { FileText, Check, ShieldCheck, Download, ExternalLink, HelpCircle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useBenefits } from '../../context/BenefitsContext';
import { COMMON_DOCUMENTS } from '../../data/schemes';

export const DocumentVault: React.FC = () => {
  const { language, t } = useLanguage();
  const { checkedDocsVault, toggleVaultDoc, savedSchemes } = useBenefits();

  const docList = Object.values(COMMON_DOCUMENTS);
  const checkedCount = docList.filter(d => checkedDocsVault.includes(d.id)).length;
  const readinessPercent = Math.round((checkedCount / docList.length) * 100);

  return (
    <div className="bg-white dark:bg-stone-850 rounded-3xl border border-warm-300 dark:border-stone-800 p-6 sm:p-8 shadow-warm-md mb-10">
      
      {/* Vault Header & Overall Readiness Score */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-warm-200 dark:border-stone-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-2 rounded-xl bg-terracotta-100 dark:bg-terracotta-950/60 text-terracotta-700 dark:text-terracotta-400">
              <FileText className="w-5 h-5" />
            </span>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-white">
              {t('documentVaultTitle')}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
            {t('documentVaultSubtitle')}
          </p>
        </div>

        {/* Readiness Meter */}
        <div className="p-4 rounded-2xl bg-warm-50 dark:bg-stone-800/80 border border-warm-200 dark:border-stone-700 flex items-center gap-4 min-w-[220px]">
          <div className="w-12 h-12 rounded-full border-4 border-emerald-500 flex items-center justify-center font-serif font-bold text-sm text-emerald-800 dark:text-emerald-300">
            {readinessPercent}%
          </div>
          <div>
            <span className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider block">
              {language === 'hi' ? 'दस्तावेज तैयारी' : 'Doc Readiness'}
            </span>
            <span className="text-sm font-bold text-stone-900 dark:text-white">
              {checkedCount} / {docList.length} {language === 'hi' ? 'तैयार' : 'Ready'}
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Checkbox Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-6">
        {docList.map(doc => {
          const isChecked = checkedDocsVault.includes(doc.id);
          return (
            <button
              key={doc.id}
              type="button"
              onClick={() => toggleVaultDoc(doc.id)}
              className={`p-4 rounded-2xl border text-left flex items-start justify-between transition-all ${
                isChecked
                  ? 'border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/30 text-stone-900 dark:text-white ring-1 ring-emerald-500/20 shadow-warm-sm'
                  : 'border-warm-200 dark:border-stone-700 bg-warm-50/60 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-warm-100 dark:hover:bg-stone-750'
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 ${
                    isChecked
                      ? 'bg-emerald-600 border-emerald-600 text-white'
                      : 'border-stone-400 dark:border-stone-500'
                  }`}
                >
                  {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
                <div>
                  <span className="text-sm font-bold block leading-snug">
                    {language === 'hi' ? doc.nameHi : doc.name}
                  </span>
                  <span className="text-xs text-stone-500 dark:text-stone-400 block mt-0.5 leading-relaxed">
                    {language === 'hi' ? doc.descriptionHi : doc.description}
                  </span>
                  {doc.howToGet && (
                    <span className="text-[11px] text-terracotta-700 dark:text-terracotta-400 font-medium block mt-1">
                      💡 {language === 'hi' ? doc.howToGetHi : doc.howToGet}
                    </span>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

    </div>
  );
};
