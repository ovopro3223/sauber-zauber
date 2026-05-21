'use client';

import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useCursor } from '@/components/providers/CursorProvider';

export function Cursor() {
  const { variant, label } = useCursor();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const springConfig = { damping: 30, stiffness: 350, mass: 0.7 };
  const sx = useSpring(x, springConfig);
  const sy = useSpring(y, springConfig);

  const sxOuter = useSpring(x, { damping: 24, stiffness: 180, mass: 0.5 });
  const syOuter = useSpring(y, { damping: 24, stiffness: 180, mass: 0.5 });

  const scale = useTransform(() => {
    switch (variant) {
      case 'hover': return 2;
      case 'view': return 3.4;
      case 'drag': return 3;
      case 'text': return 1.4;
      default: return 1;
    }
  });

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, [x, y]);

  return (
    <div ref={ref} className="pointer-events-none fixed inset-0 z-[90] hidden md:block">
      <motion.div
        className="pointer-events-none fixed top-0 left-0 -ml-[6px] -mt-[6px] h-3 w-3 rounded-full bg-gold-300 mix-blend-difference"
        style={{ x: sx, y: sy }}
      />
      <motion.div
        className="pointer-events-none fixed top-0 left-0 -ml-5 -mt-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-[10px] uppercase tracking-widest text-white"
        style={{ x: sxOuter, y: syOuter, scale }}
      >
        {label && (variant === 'view' || variant === 'drag') && (
          <span className="select-none whitespace-nowrap">{label}</span>
        )}
      </motion.div>
    </div>
  );
}
