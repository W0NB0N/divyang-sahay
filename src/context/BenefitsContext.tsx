import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, SchemeMatchResult, Scheme, SavedSchemeItem } from '../types/scheme';
import { SCHEMES_DATA } from '../data/schemes';
import { matchSchemes } from '../utils/matcher';
import confetti from 'canvas-confetti';

export type NavigationTab = 'home' | 'finder' | 'results' | 'schemes' | 'my-benefits' | 'help' | 'contacts';

interface BenefitsContextType {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  userProfile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;
  resetProfile: () => void;
  matchResults: SchemeMatchResult[];
  runEligibilityCheck: () => void;
  hasRunCheck: boolean;
  savedSchemes: SavedSchemeItem[];
  saveScheme: (schemeId: string) => void;
  removeSavedScheme: (schemeId: string) => void;
  isSchemeSaved: (schemeId: string) => boolean;
  updateSchemeStage: (schemeId: string, stage: SavedSchemeItem['applicationStage']) => void;
  updateSchemeNotes: (schemeId: string, notes: string) => void;
  toggleSavedSchemeDoc: (schemeId: string, docId: string) => void;
  selectedScheme: Scheme | null;
  openSchemeModal: (scheme: Scheme) => void;
  closeSchemeModal: () => void;
  checkedDocsVault: string[];
  toggleVaultDoc: (docId: string) => void;
  quickSearchQuery: string;
  setQuickSearchQuery: (query: string) => void;
  selectedCategoryFilter: string;
  setSelectedCategoryFilter: (cat: string) => void;
}

const DEFAULT_PROFILE: UserProfile = {
  age: null,
  gender: '',
  state: 'DL',
  district: '',
  areaType: '',
  disabilityTypes: [],
  disabilityPercentage: null,
  isBenchmark: 'dont_know',
  udidStatus: 'no',
  annualIncome: null,
  isBPL: null,
  hasRationCard: false,
  employmentStatus: '',
  needs: [],
};

const BenefitsContext = createContext<BenefitsContextType | undefined>(undefined);

export const BenefitsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTabState] = useState<NavigationTab>('home');
  const [selectedScheme, setSelectedScheme] = useState<Scheme | null>(null);
  const [quickSearchQuery, setQuickSearchQuery] = useState<string>('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');

  // Load User Profile from localStorage
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('divyang_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved profile', e);
      }
    }
    return DEFAULT_PROFILE;
  });

  const [hasRunCheck, setHasRunCheck] = useState<boolean>(() => {
    return localStorage.getItem('divyang_has_run_check') === 'true';
  });

  // Saved Schemes in LocalStorage
  const [savedSchemes, setSavedSchemes] = useState<SavedSchemeItem[]>(() => {
    const saved = localStorage.getItem('divyang_saved_schemes');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved schemes', e);
      }
    }
    return [
      {
        schemeId: 'adip-scheme',
        savedAt: new Date().toISOString(),
        applicationStage: 'checked',
        notes: 'Need to get fresh income certificate from Tehsil.',
        checkedDocuments: ['aadhaar', 'udid'],
      },
    ];
  });

  // Master Document Vault Checklist
  const [checkedDocsVault, setCheckedDocsVault] = useState<string[]>(() => {
    const saved = localStorage.getItem('divyang_doc_vault');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse doc vault', e);
      }
    }
    return ['aadhaar'];
  });

  // Match Results
  const [matchResults, setMatchResults] = useState<SchemeMatchResult[]>(() => {
    return matchSchemes(userProfile, SCHEMES_DATA);
  });

  // Update profile
  const updateProfile = (updates: Partial<UserProfile>) => {
    setUserProfile(prev => {
      const next = { ...prev, ...updates };
      localStorage.setItem('divyang_profile', JSON.stringify(next));
      return next;
    });
  };

  const resetProfile = () => {
    setUserProfile(DEFAULT_PROFILE);
    localStorage.removeItem('divyang_profile');
    localStorage.removeItem('divyang_has_run_check');
    setHasRunCheck(false);
    setMatchResults(matchSchemes(DEFAULT_PROFILE, SCHEMES_DATA));
  };

  const runEligibilityCheck = () => {
    const results = matchSchemes(userProfile, SCHEMES_DATA);
    setMatchResults(results);
    setHasRunCheck(true);
    localStorage.setItem('divyang_has_run_check', 'true');
    setActiveTabState('results');

    // Fire celebratory confetti if user matched likely schemes
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#C86543', '#A78B64', '#5F836E', '#1E293B'],
      });
    } catch (e) {
      // ignore
    }
  };

  const setActiveTab = (tab: NavigationTab) => {
    setActiveTabState(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const saveScheme = (schemeId: string) => {
    setSavedSchemes(prev => {
      if (prev.some(s => s.schemeId === schemeId)) return prev;
      const next: SavedSchemeItem[] = [
        ...prev,
        {
          schemeId,
          savedAt: new Date().toISOString(),
          applicationStage: 'checked',
          notes: '',
          checkedDocuments: [...checkedDocsVault],
        },
      ];
      localStorage.setItem('divyang_saved_schemes', JSON.stringify(next));
      return next;
    });
  };

  const removeSavedScheme = (schemeId: string) => {
    setSavedSchemes(prev => {
      const next = prev.filter(s => s.schemeId !== schemeId);
      localStorage.setItem('divyang_saved_schemes', JSON.stringify(next));
      return next;
    });
  };

  const isSchemeSaved = (schemeId: string) => {
    return savedSchemes.some(s => s.schemeId === schemeId);
  };

  const updateSchemeStage = (schemeId: string, stage: SavedSchemeItem['applicationStage']) => {
    setSavedSchemes(prev => {
      const next = prev.map(s => (s.schemeId === schemeId ? { ...s, applicationStage: stage } : s));
      localStorage.setItem('divyang_saved_schemes', JSON.stringify(next));
      return next;
    });
  };

  const updateSchemeNotes = (schemeId: string, notes: string) => {
    setSavedSchemes(prev => {
      const next = prev.map(s => (s.schemeId === schemeId ? { ...s, notes } : s));
      localStorage.setItem('divyang_saved_schemes', JSON.stringify(next));
      return next;
    });
  };

  const toggleSavedSchemeDoc = (schemeId: string, docId: string) => {
    setSavedSchemes(prev => {
      const next = prev.map(s => {
        if (s.schemeId !== schemeId) return s;
        const exists = s.checkedDocuments.includes(docId);
        const docs = exists
          ? s.checkedDocuments.filter(d => d !== docId)
          : [...s.checkedDocuments, docId];
        return { ...s, checkedDocuments: docs };
      });
      localStorage.setItem('divyang_saved_schemes', JSON.stringify(next));
      return next;
    });
  };

  const toggleVaultDoc = (docId: string) => {
    setCheckedDocsVault(prev => {
      const exists = prev.includes(docId);
      const next = exists ? prev.filter(d => d !== docId) : [...prev, docId];
      localStorage.setItem('divyang_doc_vault', JSON.stringify(next));
      return next;
    });
  };

  const openSchemeModal = (scheme: Scheme) => {
    setSelectedScheme(scheme);
  };

  const closeSchemeModal = () => {
    setSelectedScheme(null);
  };

  return (
    <BenefitsContext.Provider
      value={{
        activeTab,
        setActiveTab,
        userProfile,
        updateProfile,
        resetProfile,
        matchResults,
        runEligibilityCheck,
        hasRunCheck,
        savedSchemes,
        saveScheme,
        removeSavedScheme,
        isSchemeSaved,
        updateSchemeStage,
        updateSchemeNotes,
        toggleSavedSchemeDoc,
        selectedScheme,
        openSchemeModal,
        closeSchemeModal,
        checkedDocsVault,
        toggleVaultDoc,
        quickSearchQuery,
        setQuickSearchQuery,
        selectedCategoryFilter,
        setSelectedCategoryFilter,
      }}
    >
      {children}
    </BenefitsContext.Provider>
  );
};

export const useBenefits = () => {
  const context = useContext(BenefitsContext);
  if (!context) {
    throw new Error('useBenefits must be used within a BenefitsProvider');
  }
  return context;
};
