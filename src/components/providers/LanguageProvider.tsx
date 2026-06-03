'use client';

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

export type Lang = 'de' | 'en';

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
};

const LanguageContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('de');

  useEffect(() => {
    const stored = (typeof window !== 'undefined' &&
      (localStorage.getItem('sz-lang') as Lang | null)) || null;
    if (stored === 'de' || stored === 'en') {
      setLangState(stored);
      document.documentElement.lang = stored;
    }
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    localStorage.setItem('sz-lang', l);
    document.documentElement.lang = l;
  }, []);

  const toggle = useCallback(() => setLang(lang === 'de' ? 'en' : 'de'), [lang, setLang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used within LanguageProvider');
  return ctx;
}

/**
 * Tiny picker. Pass an object keyed by lang, returns the current one.
 *   const t = useT({ de: '...', en: '...' });
 */
export function useT<T>(dict: Record<Lang, T>): T {
  const { lang } = useLang();
  return dict[lang];
}
