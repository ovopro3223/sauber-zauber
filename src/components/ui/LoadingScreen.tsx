'use client';

import { useEffect, useState } from 'react';
import { Logo } from '@/components/ui/Logo';

/**
 * CSS-driven curtain reveal centered on the brand wordmark + logo.
 * One state flip, two CSS keyframes. No Framer Motion in here.
 */
export function LoadingScreen() {
  const [hidden, setHidden] = useState(false);
  const [unmount, setUnmount] = useState(false);

  useEffect(() => {
    const t1 = window.setTimeout(() => setHidden(true), 1700);
    const t2 = window.setTimeout(() => setUnmount(true), 2800);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  if (unmount) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[100]"
      style={{
        transform: hidden ? 'translateY(-100%)' : 'translateY(0)',
        transition: 'transform 1s cubic-bezier(0.76,0,0.24,1)',
        background: 'var(--bg)',
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(900px 700px at 50% 50%, rgba(47,191,122,0.22), transparent 60%),' +
            'radial-gradient(700px 500px at 50% 100%, rgba(95,227,161,0.18), transparent 60%)',
        }}
      />

      <div className="relative mx-auto flex h-full w-[min(1400px,92vw)] flex-col items-center justify-center text-center">
        <div style={{ opacity: 0, transform: 'translateY(8px)', animation: 'loader-logo 0.9s var(--ease) 0.1s forwards' }}>
          <Logo size={88} />
        </div>

        <div
          className="mt-8 eyebrow"
          style={{ opacity: 0, animation: 'loader-eyebrow 0.8s var(--ease) 0.35s forwards' }}
        >
          Premium-Reinigung · Berlin
        </div>

        <div
          className="mt-5 font-display text-[clamp(2.4rem,5vw,4.4rem)] font-light leading-[0.98] tracking-[-0.02em] text-cinema"
          style={{ opacity: 0, transform: 'translateY(14px)', animation: 'loader-title 1s var(--ease) 0.5s forwards' }}
        >
          Sauber<span className="text-mint">.</span>
          <br />
          Zauber<span className="text-mint">.</span>
        </div>

        <div className="relative mt-10 h-px w-[min(420px,80%)] overflow-hidden bg-[var(--line)]">
          <div
            className="absolute inset-y-0 left-0 origin-left"
            style={{
              width: '100%',
              background:
                'linear-gradient(90deg, transparent, rgba(95,227,161,0.9) 50%, transparent)',
              transform: 'scaleX(0)',
              animation: 'loader-progress 1.4s cubic-bezier(0.76,0,0.24,1) 0.4s forwards',
            }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes loader-logo     { to { opacity: 1; transform: translateY(0); } }
        @keyframes loader-eyebrow  { to { opacity: 1; } }
        @keyframes loader-title    { to { opacity: 1; transform: translateY(0); } }
        @keyframes loader-progress { to { transform: scaleX(1); } }
      `}</style>
    </div>
  );
}
