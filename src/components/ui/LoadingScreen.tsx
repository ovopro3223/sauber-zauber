'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let mounted = true;
    let p = 0;
    const tick = () => {
      if (!mounted) return;
      const delta = Math.max(0.7, (100 - p) * 0.07);
      p = Math.min(100, p + delta);
      setProgress(p);
      if (p < 100) {
        window.setTimeout(tick, 30);
      } else {
        window.setTimeout(() => setDone(true), 480);
      }
    };
    tick();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[100] flex items-end bg-[var(--bg)]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] } }}
        >
          {/* Curtain reveal */}
          <motion.div
            className="absolute inset-0 bg-[var(--bg)]"
            initial={{ y: '0%' }}
            exit={{ y: '-100%', transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } }}
          />

          {/* Subtle radial wash */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 90% 60% at 50% 100%, rgba(31,132,84,0.10), transparent 60%)',
            }}
          />

          <div className="relative z-10 mx-auto w-[min(1400px,92vw)] pb-12">
            <div className="flex items-end justify-between gap-10">
              {/* Wordmark */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="eyebrow">
                  <span className="text-champagne">An atelier</span>
                </div>
                <div className="mt-5 font-display text-[clamp(2.4rem,5vw,4.4rem)] font-light leading-[0.95] tracking-[-0.025em] text-cinema">
                  Sauber<span className="text-champagne">.</span>
                  <br />
                  Zauber<span className="text-champagne">.</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="hidden min-w-[260px] text-right md:block"
              >
                <div className="text-[10px] uppercase tracking-[0.4em] text-[var(--muted)]">
                  Preparing your experience
                </div>
                <div className="mt-2 font-mono text-xs text-[var(--fg-soft)]">
                  {Math.floor(progress).toString().padStart(3, '0')} / 100
                </div>
              </motion.div>
            </div>

            <div className="mt-10 h-px w-full overflow-hidden bg-[var(--line)]">
              <motion.div
                className="h-full origin-left"
                style={{
                  background:
                    'linear-gradient(90deg, transparent, rgba(195,180,133,0.9) 30%, rgba(111,193,138,0.9) 70%, transparent)',
                  scaleX: progress / 100,
                }}
                transition={{ ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
