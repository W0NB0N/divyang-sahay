import React, { useState } from 'react';
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  ExternalLink, 
  FileText, 
  CreditCard, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  Volume2, 
  VolumeX,
  PhoneCall
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAccessibility } from '../../context/AccessibilityContext';
import { useBenefits } from '../../context/BenefitsContext';
import { FAQS_DATA } from '../../data/faqs';

export const HelpCenter: React.FC = () => {
  const { language, t } = useLanguage();
  const { isSpeaking, speakText, stopSpeaking } = useAccessibility();
  const { setActiveTab } = useBenefits();
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-udid-what');

  const toggleFaq = (id: string) => {
    setOpenFaqId(prev => (prev === id ? null : id));
  };

  const handleReadFaq = (e: React.MouseEvent, question: string, answer: string, id: string) => {
    e.stopPropagation();
    if (isSpeaking) {
      stopSpeaking();
    } else {
      speakText(`${question}. ${answer}`, id, language);
    }
  };

  return (
    <div className="py-10 md:py-16 bg-warm-50 dark:bg-stone-900 transition-colors min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12 space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            {language === 'hi' ? 'मार्गदर्शिका एवं अक्सर पूछे जाने वाले प्रश्न' : 'Guides & FAQs'}
          </span>
          <h1 className="text-2xl sm:text-4xl font-serif font-bold text-stone-900 dark:text-white">
            {t('helpTitle')}
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 max-w-xl mx-auto">
            {t('helpSubtitle')}
          </p>
        </div>

        {/* 4 Core Essential Guides (Featured Quick Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          
          {/* Card 1: UDID Card */}
          <div className="p-6 rounded-3xl bg-white dark:bg-stone-850 border border-warm-200 dark:border-stone-800 shadow-warm-sm hover:shadow-warm-md transition-all">
            <div className="w-10 h-10 rounded-2xl bg-terracotta-100 dark:bg-terracotta-950/50 text-terracotta-700 dark:text-terracotta-300 flex items-center justify-center mb-4">
              <CreditCard className="w-5 h-5" />
            </div>
            <h2 className="text-base font-serif font-bold text-stone-900 dark:text-white mb-2">
              {language === 'hi' ? 'यूडीआईडी (UDID) क्या है?' : 'What is a UDID Card?'}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed mb-4">
              {language === 'hi'
                ? 'यह केंद्र सरकार द्वारा जारी एकल विशिष्ट डिजिटल पहचान पत्र है, जो देशभर में सभी रियायतों और योजनाओं के लिए मान्य है।'
                : 'A single, nationwide smart identity card replacing paper disability certificates across all state borders and portals.'}
            </p>
            <a
              href="https://www.swavlambancard.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-terracotta-700 dark:text-terracotta-400 hover:underline"
            >
              <span>swavlambancard.gov.in</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Card 2: Disability Percentage */}
          <div className="p-6 rounded-3xl bg-white dark:bg-stone-850 border border-warm-200 dark:border-stone-800 shadow-warm-sm hover:shadow-warm-md transition-all">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h2 className="text-base font-serif font-bold text-stone-900 dark:text-white mb-2">
              {language === 'hi' ? 'दिव्यांगता प्रतिशत कैसे समझें?' : 'Understanding Disability Percentage'}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed mb-4">
              {language === 'hi'
                ? 'यह आपके प्रमाण पत्र या यूडीआईडी कार्ड पर लिखा होता है। 40% या अधिक होने पर अधिकांश सरकारी लाभ मिलते हैं।'
                : 'Written on your certificate or UDID card. 40%+ unlocks government job reservations, pensions, and free aids.'}
            </p>
            <button
              onClick={() => setActiveTab('finder')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-terracotta-700 dark:text-terracotta-400 hover:underline"
            >
              <span>{language === 'hi' ? 'पात्रता की जांच करें' : 'Check Your Eligibility'}</span>
            </button>
          </div>

          {/* Card 3: Benchmark Disability */}
          <div className="p-6 rounded-3xl bg-white dark:bg-stone-850 border border-warm-200 dark:border-stone-800 shadow-warm-sm hover:shadow-warm-md transition-all">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h2 className="text-base font-serif font-bold text-stone-900 dark:text-white mb-2">
              {language === 'hi' ? 'बेंचमार्क दिव्यांगता क्या है?' : 'What is Benchmark Disability?'}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed mb-4">
              {language === 'hi'
                ? 'RPwD अधिनियम 2016 के तहत 40% या उससे अधिक प्रमाणित दिव्यांगता को मानक (बेंचमार्क) माना जाता है।'
                : 'Under RPwD Act 2016, any certified specified disability of 40% or higher is a legal benchmark for quotas.'}
            </p>
            <button
              onClick={() => setActiveTab('schemes')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-terracotta-700 dark:text-terracotta-400 hover:underline"
            >
              <span>{language === 'hi' ? 'योजनाएं ब्राउज करें' : 'Browse Benchmark Schemes'}</span>
            </button>
          </div>

          {/* Card 4: How to get Certificate */}
          <div className="p-6 rounded-3xl bg-white dark:bg-stone-850 border border-warm-200 dark:border-stone-800 shadow-warm-sm hover:shadow-warm-md transition-all">
            <div className="w-10 h-10 rounded-2xl bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 flex items-center justify-center mb-4">
              <FileText className="w-5 h-5" />
            </div>
            <h2 className="text-base font-serif font-bold text-stone-900 dark:text-white mb-2">
              {language === 'hi' ? 'प्रमाण पत्र कैसे बनवाएं?' : 'How to get a Certificate?'}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed mb-4">
              {language === 'hi'
                ? 'swavlambancard.gov.in पर ऑनलाइन आवेदन करें, जिला अस्पताल सीएमओ में मेडिकल जांच कराएं।'
                : 'Apply on swavlambancard.gov.in, attend medical board evaluation at District Civil Hospital / CMO.'}
            </p>
            <a
              href="https://www.swavlambancard.gov.in/pwd/application"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-terracotta-700 dark:text-terracotta-400 hover:underline"
            >
              <span>{language === 'hi' ? 'ऑनलाइन आवेदन फॉर्म' : 'Online Apply Portal'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

        {/* Detailed FAQ Accordion */}
        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-white mb-6">
            {language === 'hi' ? 'विस्तृत प्रश्नोत्तरी (FAQs)' : 'Frequently Asked Questions'}
          </h2>

          {FAQS_DATA.map(faq => {
            const isOpen = openFaqId === faq.id;
            const qText = language === 'hi' ? faq.questionHi : faq.question;
            const aText = language === 'hi' ? faq.answerHi : faq.answer;

            return (
              <div
                key={faq.id}
                className="bg-white dark:bg-stone-850 rounded-2xl border border-warm-200 dark:border-stone-800 overflow-hidden shadow-warm-sm transition-all"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-serif font-bold text-stone-900 dark:text-white leading-snug">
                    {qText}
                  </span>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={(e) => handleReadFaq(e, qText, aText, faq.id)}
                      className="p-1.5 rounded-lg text-stone-400 hover:text-stone-900 dark:hover:text-white hover:bg-warm-100 dark:hover:bg-stone-800 transition-colors"
                      title="Read Answer Aloud"
                      aria-label="Read Answer Aloud"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    <div className="p-1 rounded-lg text-stone-500">
                      {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-warm-100 dark:border-stone-800 text-sm sm:text-base text-stone-700 dark:text-stone-300 leading-relaxed space-y-4">
                    <p className="whitespace-pre-line">{aText}</p>

                    {faq.actionUrl && (
                      <div className="pt-2">
                        <a
                          href={faq.actionUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-warm-100 dark:bg-stone-800 hover:bg-warm-200 text-xs font-bold text-terracotta-800 dark:text-terracotta-300 transition-colors"
                        >
                          <span>{language === 'hi' ? faq.actionLabelHi : faq.actionLabel}</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
