'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const lines = [
  ['Clean', 'is the start.'],
  ['Quiet', 'is the craft.'],
  ['Cared-for', 'is the goal.'],
];

export function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const blur = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [16, 0, 0, 16]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.7, 1], [0.3, 1, 1, 0.3]);

  return (
    <section ref={ref} className="relative bg-[var(--bg)] py-32">
      <motion.div
        className="mx-auto w-[min(1200px,94vw)] text-center"
        style={{ filter, opacity }}
      >
        <div className="text-[10px] uppercase tracking-[0.5em] text-gold-300">A manifesto</div>
        <div className="mt-12 space-y-6">
          {lines.map(([a, b], i) => (
            <div
              key={i}
              className="font-display text-[clamp(2.6rem,7vw,7rem)] leading-[0.95] tracking-[-0.02em]"
            >
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 1.2, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="block"
              >
                <span className="text-gradient-gold">{a}</span>
                <span className="ml-4 text-white/80">{b}</span>
              </motion.span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
