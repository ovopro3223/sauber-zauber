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
      const delta = Math.max(0.6, (100 - p) * 0.06);
      p = Math.min(100, p + delta);
      setProgress(p);
      if (p < 100) {
        window.setTimeout(tick, 32);
      } else {
        window.setTimeout(() => setDone(true), 520);
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
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--bg)]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } }}
        >
          <motion.div
            className="absolute inset-0"
            initial={{ scaleY: 1 }}
            exit={{ scaleY: 0, transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }}
            style={{ transformOrigin: 'top' }}
          >
            <div className="absolute inset-0 bg-aurora opacity-40 mix-blend-screen" />
            <div className="absolute inset-0 bg-grid opacity-30" />
          </motion.div>

          <div className="relative flex w-[min(720px,90vw)] flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mb-8 flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-white/60"
            >
              <span className="h-px w-10 bg-white/40" />
              Est. 2014 · Munich
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20, letterSpacing: '0.4em' }}
              animate={{ opacity: 1, y: 0, letterSpacing: '0.02em' }}
              transition={{ delay: 0.15, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-5xl md:text-7xl font-light text-gradient-gold text-center"
            >
              Sauber &amp; Zauber
            </motion.h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-10 w-full"
            >
              <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.4em] text-white/40">
                <span>Preparing experience</span>
                <span className="font-mono">{Math.floor(progress).toString().padStart(3, '0')}</span>
              </div>
              <div className="mt-3 h-px w-full overflow-hidden bg-white/10">
                <motion.div
                  className="h-full origin-left bg-gradient-to-r from-gold-300 via-gold-400 to-gold-200"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: progress / 100 }}
                  transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.4 }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
