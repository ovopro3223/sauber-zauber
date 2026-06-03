'use client';

import { ReactNode, useEffect } from 'react';

/**
 * Locked to German. The hook still exists so section components can keep
 * their `useT({ de, en })` shape without churn — but the picker always
 * returns the German strings.
 */
export type Lang = 'de';

export function LanguageProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    document.documentElement.lang = 'de';
    try {
      localStorage.removeItem('sz-lang');
    } catch {
      /* no-op */
    }
  }, []);
  return <>{children}</>;
}

export function useLang() {
  return { lang: 'de' as const };
}

export function useT<T>(dict: { de: T } & Partial<Record<string, T>>): T {
  return dict.de;
}
