import React from 'react';
import { X, Eye, Type, Volume2, RotateCcw, Check, Sparkles } from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';
import { useLanguage } from '../../context/LanguageContext';
import { ContrastMode, TextSize } from '../../types/scheme';

export const AccessibilityDrawer: React.FC = () => {
  const {
    isDrawerOpen,
    setIsDrawerOpen,
    textSize,
    setTextSize,
    contrastMode,
    setContrastMode,
    dyslexiaFont,
    toggleDyslexiaFont,
    speechRate,
    setSpeechRate,
    speakText,
    isSpeaking,
    stopSpeaking,
  } = useAccessibility();

  const { language, t } = useLanguage();

  if (!isDrawerOpen) return null;

  const contrastOptions: { id: ContrastMode; label: string; labelHi: string; bg: string; text: string; border: string }[] = [
    {
      id: 'editorial',
      label: 'Editorial Warm (Default)',
      labelHi: 'वॉर्म एडिटोरियल (सामान्य)',
      bg: 'bg-[#FDFBF7]',
      text: 'text-[#292524]',
      border: 'border-[#DECDB5]',
    },
    {
      id: 'high-dark',
      label: 'High Contrast (Dark Gold)',
      labelHi: 'हाई कंट्रास्ट (गोल्डन डार्क)',
      bg: 'bg-black',
      text: 'text-yellow-300',
      border: 'border-yellow-400',
    },
    {
      id: 'high-light',
      label: 'High Contrast (Black / White)',
      labelHi: 'हाई कंट्रास्ट (श्वेत-श्याम लाइट)',
      bg: 'bg-white',
      text: 'text-black',
      border: 'border-black',
    },
    {
      id: 'sepia',
      label: 'Soft Sepia (Book Style)',
      labelHi: 'सॉफ्ट सेपिया (नेत्र-सौम्य)',
      bg: 'bg-[#F4ECD8]',
      text: 'text-[#2D2319]',
      border: 'border-[#D3C3A3]',
    },
  ];

  const textSizeOptions: { id: TextSize; label: string; preview: string }[] = [
    { id: 'normal', label: language === 'hi' ? 'सामान्य' : 'Normal', preview: 'A' },
    { id: 'large', label: language === 'hi' ? 'बड़ा' : 'Large', preview: 'A+' },
    { id: 'xlarge', label: language === 'hi' ? 'अति बड़ा' : 'Extra Large', preview: 'A++' },
  ];

  const handleTestVoice = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      const sample = language === 'hi'
        ? 'नमस्ते! यह दिव्यांगसहाय टेक्स्ट-टू-स्पीच वाक् परीक्षण है।'
        : 'Hello! This is a test of the DivyangSahay accessibility text-to-speech engine.';
      speakText(sample, 'tts-test', language);
    }
  };

  const handleResetAll = () => {
    setTextSize('normal');
    setContrastMode('editorial');
    if (dyslexiaFont) toggleDyslexiaFont();
    setSpeechRate(1.0);
    stopSpeaking();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-stone-900/60 backdrop-blur-sm transition-opacity"
      role="dialog"
      aria-modal="true"
      aria-labelledby="accessibility-drawer-title"
    >
      {/* Backdrop click to close */}
      <div className="flex-1" onClick={() => setIsDrawerOpen(false)} />

      <div className="w-full max-w-md bg-warm-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-2xl border-l border-warm-300 dark:border-stone-800 p-6 flex flex-col h-full overflow-y-auto animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-warm-200 dark:border-stone-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-terracotta-100 dark:bg-terracotta-900/40 text-terracotta-700 dark:text-terracotta-400">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <h2 id="accessibility-drawer-title" className="text-xl font-serif font-bold text-stone-900 dark:text-white">
                {t('accessibilityTitle')}
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                {language === 'hi' ? 'अपनी सुविधा अनुसार अनुकूलित करें' : 'Tailor your reading & viewing comfort'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsDrawerOpen(false)}
            className="p-2 rounded-lg hover:bg-warm-200 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300 transition-colors"
            aria-label="Close accessibility panel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-6 space-y-7 flex-1">
          {/* Text Size Section */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-semibold flex items-center gap-2 text-stone-800 dark:text-stone-200">
                <Type className="w-4 h-4 text-terracotta-600" />
                {t('textSizeLabel')}
              </label>
              <span className="text-xs font-medium px-2 py-0.5 rounded bg-warm-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 capitalize">
                {textSize}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {textSizeOptions.map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setTextSize(opt.id)}
                  className={`py-3 px-3 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${
                    textSize === opt.id
                      ? 'border-terracotta-600 bg-terracotta-50 text-terracotta-900 dark:bg-terracotta-950/60 dark:border-terracotta-400 dark:text-terracotta-200 shadow-warm-sm font-bold ring-2 ring-terracotta-500/20'
                      : 'border-warm-200 dark:border-stone-800 bg-white dark:bg-stone-850 hover:bg-warm-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300'
                  }`}
                  aria-pressed={textSize === opt.id}
                >
                  <span className={`font-bold ${opt.id === 'normal' ? 'text-base' : opt.id === 'large' ? 'text-lg' : 'text-xl'}`}>
                    {opt.preview}
                  </span>
                  <span className="text-xs">{opt.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Contrast Themes Section */}
          <div>
            <label className="text-sm font-semibold flex items-center gap-2 mb-3 text-stone-800 dark:text-stone-200">
              <Sparkles className="w-4 h-4 text-amber-600" />
              {t('contrastThemeLabel')}
            </label>
            <div className="space-y-2.5">
              {contrastOptions.map(theme => (
                <button
                  key={theme.id}
                  onClick={() => setContrastMode(theme.id)}
                  className={`w-full p-3.5 rounded-xl border text-left flex items-center justify-between transition-all ${theme.bg} ${theme.text} ${theme.border} ${
                    contrastMode === theme.id ? 'ring-2 ring-terracotta-600 shadow-warm-md font-semibold' : 'hover:opacity-90 opacity-80'
                  }`}
                  aria-pressed={contrastMode === theme.id}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border border-stone-400 flex items-center justify-center ${theme.bg}`}>
                      {contrastMode === theme.id && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                    <span className="text-sm font-medium">
                      {language === 'hi' ? theme.labelHi : theme.label}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Dyslexia Friendly Font Mode */}
          <div className="p-4 rounded-xl border border-warm-200 dark:border-stone-800 bg-white dark:bg-stone-850">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-stone-900 dark:text-white">
                  {t('dyslexiaFontLabel')}
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                  {language === 'hi' ? 'अक्षरों के बीच अंतर और स्पष्टता बढ़ाता है' : 'Increases letter spacing & legibility'}
                </p>
              </div>
              <button
                onClick={toggleDyslexiaFont}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                  dyslexiaFont ? 'bg-terracotta-600' : 'bg-stone-300 dark:bg-stone-700'
                }`}
                role="switch"
                aria-checked={dyslexiaFont}
                aria-label={t('dyslexiaFontLabel')}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    dyslexiaFont ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Read Aloud TTS Section */}
          <div className="p-4 rounded-xl border border-warm-200 dark:border-stone-800 bg-white dark:bg-stone-850 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold flex items-center gap-2 text-stone-900 dark:text-white">
                <Volume2 className="w-4 h-4 text-terracotta-600" />
                {t('ttsSpeechRate')}
              </label>
              <button
                onClick={handleTestVoice}
                className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-colors ${
                  isSpeaking
                    ? 'bg-amber-400 text-stone-950 font-bold'
                    : 'bg-warm-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 hover:bg-warm-200'
                }`}
              >
                {isSpeaking ? (language === 'hi' ? 'रोकें' : 'Stop') : (language === 'hi' ? 'परीक्षण ध्वनि' : 'Test Voice')}
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { rate: 0.8, label: t('speedSlow') },
                { rate: 1.0, label: t('speedNormal') },
                { rate: 1.2, label: t('speedFast') },
              ].map(opt => (
                <button
                  key={opt.rate}
                  onClick={() => setSpeechRate(opt.rate)}
                  className={`py-2 px-2 text-xs rounded-lg border text-center transition-all ${
                    speechRate === opt.rate
                      ? 'border-terracotta-600 bg-terracotta-50 dark:bg-terracotta-950/50 text-terracotta-900 dark:text-terracotta-300 font-bold'
                      : 'border-warm-200 dark:border-stone-800 hover:bg-warm-100 dark:hover:bg-stone-800'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-warm-200 dark:border-stone-800 flex items-center justify-between gap-3">
          <button
            onClick={handleResetAll}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-stone-600 dark:text-stone-400 hover:bg-warm-200 dark:hover:bg-stone-800 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{language === 'hi' ? 'रीसेट करें' : 'Reset Defaults'}</span>
          </button>
          <button
            onClick={() => setIsDrawerOpen(false)}
            className="px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white dark:bg-warm-100 dark:text-stone-900 font-medium text-sm transition-colors shadow-warm-sm"
          >
            {language === 'hi' ? 'लागू करें' : 'Save & Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
