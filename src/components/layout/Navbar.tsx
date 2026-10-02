import React, { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  Bookmark, 
  Sliders, 
  Languages, 
  Menu, 
  X, 
  HelpCircle, 
  PhoneCall, 
  Layers, 
  CheckCircle2,
  Heart
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAccessibility } from '../../context/AccessibilityContext';
import { useBenefits, NavigationTab } from '../../context/BenefitsContext';

export const Navbar: React.FC = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const { toggleDrawer, textSize, contrastMode, dyslexiaFont } = useAccessibility();
  const { activeTab, setActiveTab, savedSchemes } = useBenefits();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const hasCustomAccessibility = textSize !== 'normal' || contrastMode !== 'editorial' || dyslexiaFont;

  const navItems: { id: NavigationTab; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: t('navHome'), icon: null },
    { id: 'finder', label: t('navFindBenefits'), icon: <Sparkles className="w-4 h-4 text-terracotta-600 animate-pulse" /> },
    { id: 'schemes', label: t('navBrowseSchemes'), icon: <Layers className="w-4 h-4 text-amber-600" /> },
    { 
      id: 'my-benefits', 
      label: t('navMyBenefits'), 
      icon: (
        <span className="relative">
          <Bookmark className="w-4 h-4 text-sage-600" />
          {savedSchemes.length > 0 && (
            <span className="absolute -top-1.5 -right-2 bg-terracotta-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
              {savedSchemes.length}
            </span>
          )}
        </span>
      ) 
    },
    { id: 'help', label: t('navHelp'), icon: <HelpCircle className="w-4 h-4 text-stone-500" /> },
    { id: 'contacts', label: t('navContacts'), icon: <PhoneCall className="w-4 h-4 text-emerald-600" /> },
  ];

  const handleNavClick = (tab: NavigationTab) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-warm-50/95 dark:bg-stone-900/95 backdrop-blur-md border-b border-warm-200 dark:border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Brand */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group focus:outline-none"
            aria-label="DivyangSahay Home"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-terracotta-500 to-terracotta-700 text-white flex items-center justify-center shadow-warm-md group-hover:scale-105 transition-transform">
              <Heart className="w-6 h-6 fill-white stroke-none" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-white tracking-tight">
                  {t('siteTitle')}
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded bg-warm-200 dark:bg-stone-800 text-warm-800 dark:text-warm-300">
                  PwD Portal
                </span>
              </div>
              <p className="text-xs text-stone-500 dark:text-stone-400 font-medium hidden sm:block">
                {t('siteTagline')}
              </p>
            </div>
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1.5" aria-label="Main Navigation">
            {navItems.map(item => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                    isActive
                      ? 'bg-warm-200/80 dark:bg-stone-800 text-stone-900 dark:text-white font-semibold shadow-warm-sm border border-warm-300/80 dark:border-stone-700'
                      : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-warm-100 dark:hover:bg-stone-850'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Tools (Language, Accessibility, Mobile Toggle) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold border border-warm-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 hover:bg-warm-100 dark:hover:bg-stone-700 transition-all shadow-warm-sm"
              aria-label={`Switch language to ${language === 'en' ? 'Hindi' : 'English'}`}
            >
              <Languages className="w-4 h-4 text-terracotta-600" />
              <span>{t('languageBtn')}</span>
            </button>

            {/* Accessibility Drawer Toggle Button */}
            <button
              onClick={toggleDrawer}
              className={`relative inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all shadow-warm-sm ${
                hasCustomAccessibility
                  ? 'border-terracotta-500 bg-terracotta-50 dark:bg-terracotta-950/60 text-terracotta-900 dark:text-terracotta-200 ring-2 ring-terracotta-500/20'
                  : 'border-warm-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 hover:bg-warm-100 dark:hover:bg-stone-700'
              }`}
              aria-label="Open accessibility adjustments panel"
            >
              <Sliders className="w-4 h-4 text-terracotta-600" />
              <span className="hidden sm:inline">{t('accessibilityBtn')}</span>
              {hasCustomAccessibility && (
                <span className="w-2 h-2 rounded-full bg-terracotta-600 animate-ping absolute -top-1 -right-1" />
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl border border-warm-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 bg-white dark:bg-stone-800"
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-warm-200 dark:border-stone-800 space-y-1">
            {navItems.map(item => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full px-4 py-3 rounded-xl text-left text-sm font-medium flex items-center justify-between transition-colors ${
                    isActive
                      ? 'bg-warm-200 dark:bg-stone-800 text-stone-900 dark:text-white font-bold'
                      : 'text-stone-700 dark:text-stone-300 hover:bg-warm-100 dark:hover:bg-stone-850'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  {isActive && <CheckCircle2 className="w-4 h-4 text-terracotta-600" />}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
};
