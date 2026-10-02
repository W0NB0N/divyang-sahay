import React from 'react';
import { Heart, ExternalLink, ShieldCheck, PhoneCall, Mail, Sparkles, BookOpen } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useBenefits } from '../../context/BenefitsContext';

export const Footer: React.FC = () => {
  const { language, t } = useLanguage();
  const { setActiveTab } = useBenefits();

  return (
    <footer className="bg-warm-100 dark:bg-stone-950 text-stone-700 dark:text-stone-300 border-t border-warm-300 dark:border-stone-800 transition-colors pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Col 1: Brand & Purpose */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-terracotta-600 text-white flex items-center justify-center shadow-warm-sm">
                <Heart className="w-5 h-5 fill-white stroke-none" />
              </div>
              <span className="text-xl font-serif font-bold text-stone-900 dark:text-white">
                {t('siteTitle')}
              </span>
            </div>
            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              {language === 'hi'
                ? 'दिव्यांगजनों और उनके परिवारों को उनके कानूनी अधिकारों, सरकारी योजनाओं, छात्रवृत्तियों और वित्तीय सहायता की खोज में मदद करने वाला सरल मार्गदर्शक मंच।'
                : 'A compassionate, accessible discovery platform helping Persons with Disabilities (PwDs) in India unlock government schemes, assistive aids, and legal rights.'}
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-warm-200/80 dark:bg-stone-900 text-xs font-medium text-stone-800 dark:text-stone-200">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>{language === 'hi' ? 'RPwD अधिनियम 2016 के अनुरूप' : 'RPwD Act 2016 Compliant'}</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900 dark:text-white font-serif">
              {language === 'hi' ? 'त्वरित लिंक' : 'Quick Navigation'}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => setActiveTab('finder')}
                  className="hover:text-terracotta-700 dark:hover:text-terracotta-400 transition-colors inline-flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-terracotta-600" />
                  <span>{t('btnFindMyBenefits')}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('schemes')}
                  className="hover:text-terracotta-700 dark:hover:text-terracotta-400 transition-colors"
                >
                  {t('navBrowseSchemes')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('my-benefits')}
                  className="hover:text-terracotta-700 dark:hover:text-terracotta-400 transition-colors"
                >
                  {t('navMyBenefits')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('help')}
                  className="hover:text-terracotta-700 dark:hover:text-terracotta-400 transition-colors"
                >
                  {t('navHelp')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('contacts')}
                  className="hover:text-terracotta-700 dark:hover:text-terracotta-400 transition-colors"
                >
                  {t('navContacts')}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Official Government Portals */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900 dark:text-white font-serif">
              {language === 'hi' ? 'आधिकारिक सरकारी पोर्टल' : 'Official Govt Portals'}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="https://www.swavlambancard.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-terracotta-700 dark:hover:text-terracotta-400 transition-colors inline-flex items-center gap-1.5"
                >
                  <span>UDID Portal (Swavlamban)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://disabilityaffairs.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-terracotta-700 dark:hover:text-terracotta-400 transition-colors inline-flex items-center gap-1.5"
                >
                  <span>DEPwD (Divyangjan Affairs)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.alimco.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-terracotta-700 dark:hover:text-terracotta-400 transition-colors inline-flex items-center gap-1.5"
                >
                  <span>ALIMCO (Assistive Aids)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://thenationaltrust.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-terracotta-700 dark:hover:text-terracotta-400 transition-colors inline-flex items-center gap-1.5"
                >
                  <span>The National Trust</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://scholarships.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-terracotta-700 dark:hover:text-terracotta-400 transition-colors inline-flex items-center gap-1.5"
                >
                  <span>National Scholarship Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Helplines */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900 dark:text-white font-serif">
              {language === 'hi' ? 'आपातकालीन सहायता' : 'Emergency Assistance'}
            </h3>
            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-warm-200/80 dark:bg-stone-900 border border-warm-300 dark:border-stone-800">
                <span className="font-bold text-stone-900 dark:text-white block mb-0.5">
                  National Disability Helpline
                </span>
                <a href="tel:1800112001" className="text-terracotta-700 dark:text-terracotta-400 font-bold text-sm">
                  1800-11-2001 (Toll Free)
                </a>
              </div>
              <div className="p-3 rounded-xl bg-warm-200/80 dark:bg-stone-900 border border-warm-300 dark:border-stone-800">
                <span className="font-bold text-stone-900 dark:text-white block mb-0.5">
                  KIRAN Mental Health 24x7
                </span>
                <a href="tel:18005990019" className="text-terracotta-700 dark:text-terracotta-400 font-bold text-sm">
                  1800-599-0019 (Toll Free)
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer and Copyright */}
        <div className="pt-8 border-t border-warm-300 dark:border-stone-800 text-xs text-stone-500 dark:text-stone-400 space-y-3">
          <p className="leading-relaxed text-stone-600 dark:text-stone-400">
            <strong>{language === 'hi' ? 'अस्वीकरण (Disclaimer):' : 'Disclaimer:'}</strong>{' '}
            {language === 'hi'
              ? 'दिव्यांगसहाय एक नागरिक-सुविधा सूचना एवं पात्रता खोज पोर्टल है। यह कोई आधिकारिक सरकारी संस्था नहीं है। योजनाओं के नियम, आवेदन प्रक्रिया एवं अनुदान राशि संबंधित मंत्रालयों एवं राज्य सरकारों के अंतिम निर्णय के अधीन हैं।'
              : 'DivyangSahay is an independent civic information platform designed to simplify policy discovery for Persons with Disabilities. We do not process government disbursements directly. All scheme rules and grants are subject to gazette notifications of respective government authorities.'}
          </p>
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <p>
              © {new Date().getFullYear()} DivyangSahay. Built for inclusive access & welfare discovery.
            </p>
            <div className="flex items-center gap-4">
              <span>WCAG 2.1 AA Compliant</span>
              <span>•</span>
              <span>English & हिन्दी</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
