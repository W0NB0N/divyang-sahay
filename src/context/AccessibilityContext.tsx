import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { TextSize, ContrastMode, Language } from '../types/scheme';

interface AccessibilityContextType {
  textSize: TextSize;
  setTextSize: (size: TextSize) => void;
  contrastMode: ContrastMode;
  setContrastMode: (mode: ContrastMode) => void;
  dyslexiaFont: boolean;
  setDyslexiaFont: (val: boolean) => void;
  toggleDyslexiaFont: () => void;
  speechRate: number;
  setSpeechRate: (rate: number) => void;
  isSpeaking: boolean;
  currentSpeakingId: string | null;
  speakText: (text: string, id?: string, lang?: Language) => void;
  stopSpeaking: () => void;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
  toggleDrawer: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [textSize, setTextSizeState] = useState<TextSize>(() => {
    return (localStorage.getItem('divyang_text_size') as TextSize) || 'normal';
  });

  const [contrastMode, setContrastModeState] = useState<ContrastMode>(() => {
    return (localStorage.getItem('divyang_contrast') as ContrastMode) || 'editorial';
  });

  const [dyslexiaFont, setDyslexiaFontState] = useState<boolean>(() => {
    return localStorage.getItem('divyang_dyslexia') === 'true';
  });

  const [speechRate, setSpeechRateState] = useState<number>(() => {
    const saved = localStorage.getItem('divyang_speech_rate');
    return saved ? parseFloat(saved) : 1.0;
  });

  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [currentSpeakingId, setCurrentSpeakingId] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const setTextSize = (size: TextSize) => {
    setTextSizeState(size);
    localStorage.setItem('divyang_text_size', size);
  };

  const setContrastMode = (mode: ContrastMode) => {
    setContrastModeState(mode);
    localStorage.setItem('divyang_contrast', mode);
  };

  const setDyslexiaFont = (val: boolean) => {
    setDyslexiaFontState(val);
    localStorage.setItem('divyang_dyslexia', String(val));
  };

  const toggleDyslexiaFont = () => {
    setDyslexiaFont(!dyslexiaFont);
  };

  const setSpeechRate = (rate: number) => {
    setSpeechRateState(rate);
    localStorage.setItem('divyang_speech_rate', String(rate));
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(prev => !prev);
  };

  // Apply root document classes when settings change
  useEffect(() => {
    const root = document.documentElement;
    
    // Text Size
    root.classList.remove('text-size-normal', 'text-size-large', 'text-size-xlarge');
    root.classList.add(`text-size-${textSize}`);

    // Contrast Mode
    root.classList.remove('theme-editorial', 'theme-high-dark', 'theme-high-light', 'theme-sepia');
    root.classList.add(`theme-${contrastMode}`);
    root.setAttribute('data-theme', contrastMode);

    // Dyslexia Font
    if (dyslexiaFont) {
      root.classList.add('font-dyslexia-active');
    } else {
      root.classList.remove('font-dyslexia-active');
    }
  }, [textSize, contrastMode, dyslexiaFont]);

  // TTS Read Aloud implementation
  const stopSpeaking = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setCurrentSpeakingId(null);
    }
  }, []);

  const speakText = useCallback((text: string, id: string = 'general', lang: Language = 'en') => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported in this browser.');
      return;
    }

    // If currently speaking this same element, stop it (toggle behavior)
    if (isSpeaking && currentSpeakingId === id) {
      stopSpeaking();
      return;
    }

    window.speechSynthesis.cancel();

    // Clean markdown/symbols from text
    const cleanText = text.replace(/[*#_`>]/g, '').trim();
    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = speechRate;
    utterance.pitch = 1.0;

    // Detect language code
    if (lang === 'hi' || /[\u0900-\u097F]/.test(cleanText)) {
      utterance.lang = 'hi-IN';
    } else {
      utterance.lang = 'en-IN';
    }

    // Try finding an appropriate voice
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => 
      (lang === 'hi' ? v.lang.includes('hi') : (v.lang.includes('en-IN') || v.lang.includes('en-GB') || v.lang.includes('en')))
    );
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onstart = () => {
      setIsSpeaking(true);
      setCurrentSpeakingId(id);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setCurrentSpeakingId(null);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      setCurrentSpeakingId(null);
    };

    window.speechSynthesis.speak(utterance);
  }, [isSpeaking, currentSpeakingId, speechRate, stopSpeaking]);

  // Clean up speech on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <AccessibilityContext.Provider
      value={{
        textSize,
        setTextSize,
        contrastMode,
        setContrastMode,
        dyslexiaFont,
        setDyslexiaFont,
        toggleDyslexiaFont,
        speechRate,
        setSpeechRate,
        isSpeaking,
        currentSpeakingId,
        speakText,
        stopSpeaking,
        isDrawerOpen,
        setIsDrawerOpen,
        toggleDrawer,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};
