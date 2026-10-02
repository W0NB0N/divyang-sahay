import React, { useState } from 'react';
import { 
  PhoneCall, 
  Mail, 
  Clock, 
  ExternalLink, 
  ShieldAlert, 
  Building2, 
  MapPin, 
  Search, 
  CheckCircle2,
  Volume2
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAccessibility } from '../../context/AccessibilityContext';
import { IMPORTANT_CONTACTS } from '../../data/faqs';
import { INDIAN_STATES } from '../../data/states';

export const ContactsPage: React.FC = () => {
  const { language, t } = useLanguage();
  const { speakText } = useAccessibility();
  const [selectedStateCode, setSelectedStateCode] = useState<string>('DL');

  const selectedStateObj = INDIAN_STATES.find(s => s.code === selectedStateCode);

  return (
    <div className="py-10 md:py-16 bg-warm-50 dark:bg-stone-900 transition-colors min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <PhoneCall className="w-3.5 h-3.5" />
            {language === 'hi' ? 'आधिकारिक हेल्पलाइन एवं संपर्क' : 'Official Emergency Directory'}
          </span>
          <h1 className="text-2xl sm:text-4xl font-serif font-bold text-stone-900 dark:text-white">
            {t('emergencyHelplinesTitle')}
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400">
            {language === 'hi'
              ? 'राष्ट्रीय एवं राज्य स्तरीय दिव्यांगता सहायता केंद्र, हेल्पलाइन नंबर एवं शिकायत निवारण कार्यालय'
              : 'Direct national disability helplines, grievance redressal commissioners, and mental health hotlines'}
          </p>
        </div>

        {/* National Helplines Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {IMPORTANT_CONTACTS.map(contact => (
            <div
              key={contact.id}
              className="bg-white dark:bg-stone-850 rounded-3xl border border-warm-300 dark:border-stone-800 p-6 sm:p-7 shadow-warm-md hover:shadow-warm-lg transition-all flex flex-col justify-between"
            >
              <div>
                {/* Top Badge & Authority */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`px-2.5 py-0.5 rounded-lg text-xs font-bold uppercase tracking-wider ${
                    contact.badge === 'Emergency'
                      ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                      : 'bg-warm-100 text-stone-800 dark:bg-stone-800 dark:text-stone-200'
                  }`}>
                    {contact.badge}
                  </span>
                  {contact.portalUrl && (
                    <a
                      href={contact.portalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-stone-400 hover:text-stone-900 dark:hover:text-white"
                      title="Visit Portal"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>

                <h3 className="text-lg font-serif font-bold text-stone-900 dark:text-white mb-1 leading-snug">
                  {language === 'hi' ? contact.titleHi : contact.title}
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 mb-4">
                  {language === 'hi' ? contact.authorityHi : contact.authority}
                </p>

                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 mb-6 leading-relaxed">
                  {language === 'hi' ? contact.descriptionHi : contact.description}
                </p>

                {/* Timing & Email info */}
                <div className="space-y-2 mb-6 text-xs text-stone-500 dark:text-stone-400">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-terracotta-600 shrink-0" />
                    <span>{language === 'hi' ? contact.timingHi : contact.timing}</span>
                  </div>
                  {contact.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-terracotta-600 shrink-0" />
                      <a href={`mailto:${contact.email}`} className="hover:underline text-stone-700 dark:text-stone-300">
                        {contact.email}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Call Action Button */}
              <div className="pt-4 border-t border-warm-200 dark:border-stone-800">
                <a
                  href={`tel:${contact.phone.replace(/[^0-9]/g, '')}`}
                  className="w-full py-3 px-4 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white dark:bg-warm-100 dark:text-stone-900 font-bold text-sm shadow-warm-sm flex items-center justify-center gap-2 transition-all"
                >
                  <PhoneCall className="w-4 h-4 text-amber-400 dark:text-terracotta-600" />
                  <span>{contact.phone}</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* State Disability Commissioners Section */}
        <div className="bg-white dark:bg-stone-850 rounded-3xl border border-warm-300 dark:border-stone-800 p-6 sm:p-10 shadow-warm-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-warm-200 dark:border-stone-800">
            <div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-white mb-1">
                {language === 'hi' ? 'राज्य दिव्यांगजन आयुक्त निर्देशिका' : 'State Commissioner for Persons with Disabilities'}
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
                {language === 'hi'
                  ? 'राज्य स्तरीय सरकारी नीतियों के क्रियान्वयन एवं स्थानीय शिकायतों हेतु संपर्क'
                  : 'State-level statutory grievance authority under Section 79 of the RPwD Act 2016'}
              </p>
            </div>

            {/* State Selector */}
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-terracotta-600" />
              <select
                value={selectedStateCode}
                onChange={(e) => setSelectedStateCode(e.target.value)}
                className="px-4 py-2.5 rounded-xl bg-warm-50 dark:bg-stone-800 border border-warm-300 dark:border-stone-700 text-sm font-semibold text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-terracotta-500"
              >
                {INDIAN_STATES.map(st => (
                  <option key={st.code} value={st.code}>
                    {language === 'hi' ? st.nameHi : st.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Displayed State Info Card */}
          <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-terracotta-700 dark:text-terracotta-400 block font-serif">
                {language === 'hi' ? 'राज्य दिव्यांग कल्याण निदेशालय' : 'State Directorate for Disability Welfare'}
              </span>
              <h4 className="text-lg font-bold text-stone-900 dark:text-white">
                Office of State Commissioner for PwDs - {selectedStateObj ? (language === 'hi' ? selectedStateObj.nameHi : selectedStateObj.name) : ''}
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                {language === 'hi'
                  ? `यदि ${selectedStateObj?.nameHi} में आपके 4% नौकरी आरक्षण, मासिक पेंशन या बस पास में कोई बाधा आती है, तो आप सीधे राज्य आयुक्त कार्यालय में लिखित या ई-मेल द्वारा शिकायत दर्ज करा सकते हैं।`
                  : `If you face denial of 4% job reservation, pension delays, or barrier access issues in ${selectedStateObj?.name}, you can file a formal statutory petition with the State Commissioner.`}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-warm-50 dark:bg-stone-800/60 border border-warm-200 dark:border-stone-700 space-y-3">
              <span className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider block">
                {language === 'hi' ? 'शिकायत निवारण प्रक्रिया' : 'Grievance Redressal Process'}
              </span>
              <ul className="text-xs text-stone-700 dark:text-stone-300 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{language === 'hi' ? 'यूडीआईडी कार्ड और आधार कार्ड की प्रति साथ लगाएं' : 'Attach copy of UDID card & Aadhaar'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{language === 'hi' ? 'संबंधित विभाग का पत्राचार या अस्वीकृति पत्र संलग्न करें' : 'Attach rejection letter or application reference'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{language === 'hi' ? 'राज्य आयुक्त अर्ध-न्यायिक सम्मन जारी करने हेतु अधिकृत हैं' : 'Commissioner has powers of Civil Court to summon officials'}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
