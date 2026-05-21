'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

export function AmbientLights() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      const nx = e.clientX / window.innerWidth;
      const ny = e.clientY / window.innerHeight;
      el.style.setProperty('--mx', `${nx * 100}%`);
      el.style.setProperty('--my', `${ny * 100}%`);
    };
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      style={{
        ['--mx' as string]: '50%',
        ['--my' as string]: '30%',
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(600px 600px at var(--mx) var(--my), rgba(213,168,71,0.10), transparent 60%)',
        }}
      />
      <motion.div
        className="absolute -top-40 -left-40 h-[60vmin] w-[60vmin] rounded-full bg-gold-400/20 blur-[120px]"
        animate={{ x: [0, 80, -40, 0], y: [0, 40, 80, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-1/2 right-[-10rem] h-[60vmin] w-[60vmin] rounded-full bg-aqua-400/20 blur-[120px]"
        animate={{ x: [0, -60, 40, 0], y: [0, -50, 60, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-[-20rem] left-1/3 h-[80vmin] w-[80vmin] rounded-full bg-ink-700/20 blur-[120px]"
        animate={{ x: [0, 30, -60, 0], y: [0, -40, 20, 0] }}
        transition={{ duration: 32, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="absolute inset-0 bg-noise opacity-[0.05] mix-blend-overlay" />
    </div>
  );
}
