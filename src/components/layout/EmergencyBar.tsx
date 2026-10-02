import React from 'react';
import { PhoneCall, ShieldAlert, Volume2, VolumeX, ExternalLink } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAccessibility } from '../../context/AccessibilityContext';

export const EmergencyBar: React.FC = () => {
  const { language } = useLanguage();
  const { isSpeaking, speakText, stopSpeaking } = useAccessibility();

  const handleTtsHeader = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      const text = language === 'hi'
        ? 'राष्ट्रीय दिव्यांग हेल्पलाइन 1800-11-2001, किरण मानसिक स्वास्थ्य 24 घंटे हेल्पलाइन 1800-599-0019'
        : 'National Disability Helpline 1800-11-2001, 24x7 Kiran Mental Health Helpline 1800-599-0019, UDID Official Portal swavlambancard.gov.in';
      speakText(text, 'emergency-bar', language);
    }
  };

  return (
    <div className="bg-stone-900 text-amber-100 text-xs sm:text-sm py-2 px-4 border-b border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-terracotta-700 text-white font-semibold text-[11px] uppercase tracking-wider">
            <ShieldAlert className="w-3.5 h-3.5" />
            {language === 'hi' ? '24x7 हेल्पलाइन' : '24x7 Helpline'}
          </span>
          <div className="flex items-center gap-3 text-stone-200">
            <a
              href="tel:1800112001"
              className="inline-flex items-center gap-1 hover:text-amber-300 transition-colors font-medium underline-offset-4 hover:underline"
              title="Call National Disability Helpline"
            >
              <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
              <span>1800-11-2001</span>
              <span className="hidden sm:inline text-stone-400">
                ({language === 'hi' ? 'राष्ट्रीय दिव्यांगता' : 'National Disability'})
              </span>
            </a>
            <span className="text-stone-600">|</span>
            <a
              href="tel:18005990019"
              className="inline-flex items-center gap-1 hover:text-amber-300 transition-colors font-medium underline-offset-4 hover:underline"
              title="Call KIRAN Mental Health Support"
            >
              <span>1800-599-0019</span>
              <span className="hidden md:inline text-stone-400">
                ({language === 'hi' ? 'किरण मानसिक सहायता' : 'Kiran Mental Health'})
              </span>
            </a>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://www.swavlambancard.gov.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-stone-300 hover:text-white transition-colors text-xs hover:underline"
          >
            <span>UDID Portal</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <button
            onClick={handleTtsHeader}
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs transition-all ${
              isSpeaking
                ? 'bg-amber-400 text-stone-950 font-bold animate-pulse'
                : 'bg-stone-800 text-stone-200 hover:bg-stone-700'
            }`}
            aria-label={isSpeaking ? 'Stop reading' : 'Read announcement aloud'}
          >
            {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isSpeaking ? 'Stop' : 'Read Page'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
