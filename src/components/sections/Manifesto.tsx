'use client';

import { motion } from 'framer-motion';
import { useT } from '@/components/providers/LanguageProvider';

export function Manifesto() {
  const t = useT({
    de: {
      eyebrow: 'Ein Manifest in drei Sätzen',
      lines: [
        ['Sauber', 'ist der Anfang.'],
        ['Still', 'ist das Handwerk.'],
        ['Geborgen', 'ist das Ziel.'],
      ],
    },
    en: {
      eyebrow: 'A manifesto, in three measures',
      lines: [
        ['Clean', 'is the beginning.'],
        ['Quiet', 'is the craft.'],
        ['Cared-for', 'is the intention.'],
      ],
    },
  });

  return (
    <section className="relative bg-transparent py-32 md:py-40">
      <div className="mx-auto w-[min(1100px,92vw)]">
        <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-[var(--muted)]">
          {t.eyebrow}
        </div>
        <div className="mt-12 md:mt-16 space-y-1">
          {t.lines.map(([a, b], i) => (
            <div key={i} className="overflow-hidden py-3">
              <motion.div
                initial={{ y: '110%' }}
                whileInView={{ y: '0%' }}
                viewport={{ once: true, margin: '-15%' }}
                transition={{
                  duration: 1.2,
                  delay: i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="font-display text-[clamp(2.4rem,7vw,6.4rem)] font-light leading-[0.95] tracking-[-0.025em] will-change-transform"
              >
                <span className="text-cinema">{a}</span>
                <span className="ml-5 text-[var(--fg-soft)]">{b}</span>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
