'use client';

import { useEffect, useState } from 'react';

/**
 * Pure-CSS curtain reveal. Framer Motion not used at all.
 * One state flip, one CSS transition. Minimum possible cost.
 */
export function LoadingScreen() {
  const [hidden, setHidden] = useState(false);
  const [unmount, setUnmount] = useState(false);

  useEffect(() => {
    const t1 = window.setTimeout(() => setHidden(true), 1500);
    const t2 = window.setTimeout(() => setUnmount(true), 2700);
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
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% 100%, rgba(45,122,85,0.32), transparent 60%)',
        }}
      />

      <div className="relative mx-auto flex h-full w-[min(1400px,92vw)] items-end pb-12">
        <div className="w-full">
          <div className="eyebrow" style={{ opacity: 0, animation: 'loader-eyebrow 0.8s var(--ease) 0.1s forwards' }}>
            <span className="text-gold-soft">An atelier</span>
          </div>
          <div
            className="mt-5 font-display text-[clamp(2.4rem,5vw,4.4rem)] font-light leading-[0.95] tracking-[-0.025em] text-cinema"
            style={{ opacity: 0, transform: 'translateY(14px)', animation: 'loader-title 1s var(--ease) 0.25s forwards' }}
          >
            Sauber<span className="text-gold-soft">.</span>
            <br />
            Zauber<span className="text-gold-soft">.</span>
          </div>

          <div className="relative mt-10 h-px w-full overflow-hidden bg-[var(--line)]">
            <div
              className="absolute inset-y-0 left-0 origin-left"
              style={{
                width: '100%',
                background:
                  'linear-gradient(90deg, transparent, rgba(220,196,136,0.85) 30%, rgba(45,122,85,0.85) 70%, transparent)',
                transform: 'scaleX(0)',
                animation: 'loader-progress 1.2s cubic-bezier(0.76,0,0.24,1) 0.2s forwards',
              }}
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes loader-eyebrow {
          to { opacity: 1; }
        }
        @keyframes loader-title {
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes loader-progress {
          to { transform: scaleX(1); }
        }
      `}</style>
    </div>
  );
}
