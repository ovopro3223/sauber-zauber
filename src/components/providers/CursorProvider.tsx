'use client';

import { createContext, ReactNode, useCallback, useContext, useState } from 'react';

type CursorVariant = 'default' | 'hover' | 'view' | 'drag' | 'text';
type CursorCtx = {
  variant: CursorVariant;
  setVariant: (v: CursorVariant) => void;
  label: string | null;
  setLabel: (s: string | null) => void;
};

const CursorContext = createContext<CursorCtx | null>(null);

export function CursorProvider({ children }: { children: ReactNode }) {
  const [variant, setVariantState] = useState<CursorVariant>('default');
  const [label, setLabelState] = useState<string | null>(null);

  const setVariant = useCallback((v: CursorVariant) => setVariantState(v), []);
  const setLabel = useCallback((s: string | null) => setLabelState(s), []);

  return (
    <CursorContext.Provider value={{ variant, setVariant, label, setLabel }}>
      {children}
    </CursorContext.Provider>
  );
}

export function useCursor() {
  const ctx = useContext(CursorContext);
  if (!ctx) throw new Error('useCursor must be used within CursorProvider');
  return ctx;
}
