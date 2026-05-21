'use client';

import { motion } from 'framer-motion';

type Props = { index: string; label: string };

export function SectionLabel({ index, label }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.4em] text-[var(--muted)]"
    >
      <span className="text-gold-soft">{index}</span>
      <span className="h-px w-10 bg-[var(--line-strong)]" />
      <span>{label}</span>
    </motion.div>
  );
}
