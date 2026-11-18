import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { translations, type Language, type Translation } from './translations';

const STORAGE_KEY = 'astra-key:language';

interface LanguageContextValue {
  language: Language;
  t: Translation;
  setLanguage: (language: Language) => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function readStoredLanguage(): Language {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);

    if (stored === 'it' || stored === 'en') {
      return stored;
    }
  } catch {
    // Storage can be unavailable in strict privacy modes. Italian remains the default.
  }

  return 'it';
}

function updateMetaTag(selector: string, content: string): void {
  const element = document.querySelector<HTMLMetaElement>(selector);

  if (element) {
    element.content = content;
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(readStoredLanguage);

  const setLanguage = useCallback((nextLanguage: Language) => {
    setLanguageState(nextLanguage);

    try {
      window.localStorage.setItem(STORAGE_KEY, nextLanguage);
    } catch {
      // The interface still switches even when persistence is unavailable.
    }
  }, []);

  useEffect(() => {
    const copy = translations[language];

    document.documentElement.lang = language === 'it' ? 'it-IT' : 'en';
    document.title = copy.meta.title;

    updateMetaTag('meta[name="description"]', copy.meta.description);
    updateMetaTag('meta[property="og:title"]', copy.meta.title);
    updateMetaTag('meta[property="og:description"]', copy.meta.description);
    updateMetaTag('meta[property="og:locale"]', copy.meta.ogLocale);
    updateMetaTag('meta[name="twitter:title"]', copy.meta.title);
    updateMetaTag('meta[name="twitter:description"]', copy.meta.description);
  }, [language]);

  const value = useMemo(
    () => ({ language, t: translations[language], setLanguage }),
    [language, setLanguage],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error('useLanguage must be used inside a LanguageProvider.');
  }

  return context;
}
