'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const lines = [
  ['Clean', 'is the beginning.'],
  ['Quiet', 'is the craft.'],
  ['Cared-for', 'is the intention.'],
];

export function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0.4]);

  return (
    <section ref={ref} className="relative bg-[var(--bg)] py-40">
      <motion.div className="mx-auto w-[min(1100px,92vw)]" style={{ opacity }}>
        <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-[var(--muted)]">
          A manifesto, in three measures
        </div>
        <div className="mt-16 space-y-1">
          {lines.map(([a, b], i) => (
            <ManifestoLine key={i} a={a} b={b} index={i} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function ManifestoLine({ a, b, index }: { a: string; b: string; index: number }) {
  return (
    <div className="relative overflow-hidden py-3">
      <motion.div
        initial={{ y: '110%' }}
        whileInView={{ y: '0%' }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{
          duration: 1.4,
          delay: index * 0.12,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="font-display text-[clamp(2.6rem,7.5vw,7rem)] font-light leading-[0.95] tracking-[-0.025em] will-change-transform"
      >
        <span className="text-cinema">{a}</span>
        <span className="ml-5 text-[var(--fg-soft)]">{b}</span>
      </motion.div>
    </div>
  );
}
