'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Minimal editorial intro. Two render frames: the curtain and the wordmark.
 * Uses a CSS keyframe for the progress bar so React doesn't re-render every tick.
 */
export function LoadingScreen() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setDone(true), 1500);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[100] flex items-end bg-[var(--bg)]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] } }}
        >
          <motion.div
            className="absolute inset-0 bg-[var(--bg)]"
            initial={{ y: '0%' }}
            exit={{ y: '-100%', transition: { duration: 0.95, ease: [0.76, 0, 0.24, 1] } }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 80% 50% at 50% 100%, rgba(20,84,58,0.22), transparent 60%)',
            }}
          />

          <div className="relative z-10 mx-auto w-[min(1400px,92vw)] pb-12">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="eyebrow">
                <span className="text-gold-soft">An atelier</span>
              </div>
              <div className="mt-5 font-display text-[clamp(2.4rem,5vw,4.4rem)] font-light leading-[0.95] tracking-[-0.025em] text-cinema">
                Sauber<span className="text-gold-soft">.</span>
                <br />
                Zauber<span className="text-gold-soft">.</span>
              </div>
            </motion.div>

            <div className="relative mt-10 h-px w-full overflow-hidden bg-[var(--line)]">
              <div
                className="absolute inset-y-0 left-0 origin-left"
                style={{
                  width: '100%',
                  background:
                    'linear-gradient(90deg, transparent, rgba(220,196,136,0.85) 30%, rgba(45,122,85,0.85) 70%, transparent)',
                  transform: 'scaleX(0)',
                  animation: 'loader-progress 1.3s cubic-bezier(0.76,0,0.24,1) forwards',
                }}
              />
            </div>
          </div>

          <style jsx>{`
            @keyframes loader-progress {
              from { transform: scaleX(0); }
              to   { transform: scaleX(1); }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
