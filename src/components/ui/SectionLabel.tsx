'use client';

import { motion } from 'framer-motion';

type Props = {
  index: string;
  label: string;
};

export function SectionLabel({ index, label }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="flex items-center gap-4 text-[10px] uppercase tracking-[0.4em] text-white/50"
    >
      <span className="font-mono text-gold-300">{index}</span>
      <span className="h-px w-10 bg-white/20" />
      <span>{label}</span>
    </motion.div>
  );
}
