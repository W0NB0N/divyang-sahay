import React, { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  ArrowRight, 
  Compass, 
  Volume2, 
  VolumeX, 
  CheckCircle2, 
  Shield, 
  Award,
  BookOpen
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAccessibility } from '../../context/AccessibilityContext';
import { useBenefits } from '../../context/BenefitsContext';

export const Hero: React.FC = () => {
  const { language, t } = useLanguage();
  const { isSpeaking, speakText, stopSpeaking } = useAccessibility();
  const { setActiveTab, setQuickSearchQuery } = useBenefits();
  const [searchInput, setSearchInput] = useState('');

  const quickPills = [
    { en: '♿ Wheelchair & Tricycle', hi: '♿ व्हीलचेयर व ट्राइसाइकिल', query: 'wheelchair' },
    { en: '🎓 Scholarships', hi: '🎓 छात्रवृत्ति', query: 'scholarship' },
    { en: '💰 Monthly Pension', hi: '💰 मासिक पेंशन', query: 'pension' },
    { en: '🦻 Hearing Aids', hi: '🦻 हियरिंग एड', query: 'hearing' },
    { en: '⚖️ 4% Job Quota', hi: '⚖️ 4% नौकरी आरक्षण', query: 'reservation' },
    { en: '🚆 Train Concession', hi: '🚆 ट्रेन रियायत', query: 'railway' },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setQuickSearchQuery(searchInput.trim());
      setActiveTab('schemes');
    }
  };

  const handlePillClick = (query: string) => {
    setQuickSearchQuery(query);
    setActiveTab('schemes');
  };

  const handleReadHero = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      const heroText = language === 'hi'
        ? 'सरकारी लाभ एवं योजनाएं खोजें जो आपके और आपके परिवार के लिए उपलब्ध हैं। कुछ सरल प्रश्नों के उत्तर दें और जानें कि आप किन वित्तीय सहायताओं, मासिक पेंशन, स्वास्थ्य बीमा, सहायक उपकरणों और छात्रवृत्तियों के पात्र हैं।'
        : 'Find Government Benefits Available to You and Your Family. Answer a few simple questions to discover financial assistance, monthly pensions, healthcare, assistive devices, education scholarships, and legal rights you are entitled to.';
      speakText(heroText, 'hero-text', language);
    }
  };

  return (
    <section className="relative overflow-hidden pt-10 pb-16 md:pt-16 md:pb-24 bg-gradient-to-b from-warm-100/70 via-warm-50 to-warm-50 dark:from-stone-900 dark:via-stone-900/60 dark:to-stone-900 border-b border-warm-200 dark:border-stone-800">
      
      {/* Editorial Decorative Background Elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-warm-200/50 dark:bg-stone-800/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-terracotta-100/40 dark:bg-terracotta-950/20 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          
          {/* Badge & TTS */}
          <div className="flex items-center justify-center gap-3">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-warm-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-xs font-semibold uppercase tracking-wider border border-warm-300 dark:border-stone-700 shadow-warm-sm">
              <Sparkles className="w-3.5 h-3.5 text-terracotta-600" />
              {t('heroBadge')}
            </span>

            <button
              onClick={handleReadHero}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all ${
                isSpeaking
                  ? 'bg-amber-400 text-stone-950 font-bold animate-pulse ring-2 ring-amber-500'
                  : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-warm-100 dark:hover:bg-stone-700 border border-warm-300 dark:border-stone-700'
              }`}
              title="Read Hero Section Aloud"
              aria-label={isSpeaking ? 'Stop reading' : 'Read section aloud'}
            >
              {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-terracotta-600" />}
              <span>{isSpeaking ? t('btnStopAudio') : t('btnReadAloud')}</span>
            </button>
          </div>

          {/* Large Editorial Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-stone-900 dark:text-white tracking-tight leading-[1.15]">
            <span>{t('heroTitle1')}</span>
            <span className="block text-terracotta-700 dark:text-terracotta-400 italic font-normal mt-1">
              {t('heroTitle2')}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 max-w-3xl mx-auto leading-relaxed font-normal">
            {t('heroDesc')}
          </p>

          {/* Main Action CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setActiveTab('finder')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-terracotta-600 hover:bg-terracotta-700 text-white font-semibold text-base sm:text-lg shadow-warm-lg hover:shadow-warm-xl transition-all flex items-center justify-center gap-3 group focus:ring-4 focus:ring-terracotta-500/30"
            >
              <Sparkles className="w-5 h-5 text-amber-200 group-hover:rotate-12 transition-transform" />
              <span>{t('btnFindMyBenefits')}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => setActiveTab('schemes')}
              className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white dark:bg-stone-800 hover:bg-warm-100 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-100 font-semibold text-base border border-warm-300 dark:border-stone-700 shadow-warm-sm hover:shadow-warm-md transition-all flex items-center justify-center gap-2.5"
            >
              <Compass className="w-5 h-5 text-amber-600" />
              <span>{t('btnBrowseAllSchemes')}</span>
            </button>
          </div>

          {/* Instant Search Bar */}
          <div className="pt-6 max-w-2xl mx-auto">
            <form onSubmit={handleSearchSubmit} className="relative">
              <div className="relative flex items-center">
                <Search className="w-5 h-5 text-stone-400 absolute left-4 pointer-events-none" />
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder={t('searchPlaceholder')}
                  className="w-full pl-12 pr-28 py-4 rounded-2xl bg-white dark:bg-stone-800 text-stone-900 dark:text-white border border-warm-300 dark:border-stone-700 placeholder-stone-400 shadow-warm-md focus:outline-none focus:ring-3 focus:ring-terracotta-500 text-sm sm:text-base"
                />
                <button
                  type="submit"
                  className="absolute right-2 px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white dark:bg-warm-100 dark:text-stone-900 font-semibold text-xs sm:text-sm transition-all"
                >
                  {language === 'hi' ? 'खोजें' : 'Search'}
                </button>
              </div>
            </form>

            {/* Quick Keyword Pills */}
            <div className="mt-3 flex items-center justify-center gap-2 flex-wrap text-xs text-stone-500 dark:text-stone-400">
              <span className="font-semibold text-stone-700 dark:text-stone-300">
                {language === 'hi' ? 'लोकप्रिय खोजें:' : 'Popular:'}
              </span>
              {quickPills.map((pill, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePillClick(pill.query)}
                  className="px-2.5 py-1 rounded-lg bg-warm-200/70 dark:bg-stone-800/80 hover:bg-warm-300 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 transition-colors"
                >
                  {language === 'hi' ? pill.hi : pill.en}
                </button>
              ))}
            </div>
          </div>

          {/* Trust Highlights */}
          <div className="pt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-warm-200/80 dark:border-stone-800/80">
            <div className="flex items-center justify-center gap-2 text-stone-700 dark:text-stone-300 text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{t('heroQuickStats1')}</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-stone-700 dark:text-stone-300 text-sm">
              <Shield className="w-4 h-4 text-terracotta-600" />
              <span>{t('heroQuickStats2')}</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-stone-700 dark:text-stone-300 text-sm">
              <Award className="w-4 h-4 text-amber-600" />
              <span>{t('heroQuickStats3')}</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
