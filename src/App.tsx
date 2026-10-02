import React from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { AccessibilityProvider } from './context/AccessibilityContext';
import { BenefitsProvider, useBenefits } from './context/BenefitsContext';
import { EmergencyBar } from './components/layout/EmergencyBar';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { AccessibilityDrawer } from './components/layout/AccessibilityDrawer';
import { SchemeDetailModal } from './components/schemes/SchemeDetailModal';
import { Hero } from './components/home/Hero';
import { HowItWorks } from './components/home/HowItWorks';
import { CategoryGrid } from './components/home/CategoryGrid';
import { FeaturedSchemes } from './components/home/FeaturedSchemes';
import { EligibilityFinder } from './components/finder/EligibilityFinder';
import { PersonalisedResults } from './components/results/PersonalisedResults';
import { BrowseSchemes } from './components/schemes/BrowseSchemes';
import { MyBenefitsPage } from './components/my-benefits/MyBenefitsPage';
import { HelpCenter } from './components/help/HelpCenter';
import { ContactsPage } from './components/help/ContactsPage';

const MainContent: React.FC = () => {
  const { activeTab } = useBenefits();

  return (
    <main id="main-content" tabIndex={-1} className="focus:outline-none flex-1">
      {activeTab === 'home' && (
        <>
          <Hero />
          <HowItWorks />
          <CategoryGrid />
          <FeaturedSchemes />
        </>
      )}

      {activeTab === 'finder' && <EligibilityFinder />}
      {activeTab === 'results' && <PersonalisedResults />}
      {activeTab === 'schemes' && <BrowseSchemes />}
      {activeTab === 'my-benefits' && <MyBenefitsPage />}
      {activeTab === 'help' && <HelpCenter />}
      {activeTab === 'contacts' && <ContactsPage />}
    </main>
  );
};

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AccessibilityProvider>
        <BenefitsProvider>
          <div className="min-h-screen flex flex-col bg-warm-50 text-stone-900 dark:bg-stone-900 dark:text-stone-100 transition-colors">
            {/* Top 24x7 Emergency Alert Helpline Ticker */}
            <EmergencyBar />

            {/* Main Editorial Header */}
            <Navbar />

            {/* Dynamic Active Tab View */}
            <MainContent />

            {/* In-depth Scheme Details Modal */}
            <SchemeDetailModal />

            {/* Accessibility Settings Drawer */}
            <AccessibilityDrawer />

            {/* Global Accessible Footer */}
            <Footer />
          </div>
        </BenefitsProvider>
      </AccessibilityProvider>
    </LanguageProvider>
  );
};

export default App;
