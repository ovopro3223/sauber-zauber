'use client';

import { motion } from 'framer-motion';

type Props = {
  width?: string;
  delay?: number;
  className?: string;
};

/**
 * A thin gradient line — mint → emerald → transparent — that scales
 * in from the left when entering the viewport. Use under section H2s.
 */
export function AccentLine({ width = '120px', delay = 0.15, className }: Props) {
  return (
    <motion.span
      aria-hidden
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: '-12%' }}
      transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`mt-5 block h-px origin-left ${className ?? ''}`}
      style={{
        width,
        background:
          'linear-gradient(90deg, rgba(95,227,161,0.95) 0%, rgba(45,191,122,0.6) 60%, transparent 100%)',
        boxShadow: '0 0 10px rgba(95,227,161,0.35)',
      }}
    />
  );
}
