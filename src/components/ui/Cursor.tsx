'use client';

import { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useCursor } from '@/components/providers/CursorProvider';

export function Cursor() {
  const { variant, label } = useCursor();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const sx = useSpring(x, { damping: 32, stiffness: 380, mass: 0.6 });
  const sy = useSpring(y, { damping: 32, stiffness: 380, mass: 0.6 });

  const sxOuter = useSpring(x, { damping: 26, stiffness: 200, mass: 0.5 });
  const syOuter = useSpring(y, { damping: 26, stiffness: 200, mass: 0.5 });

  const scale = useTransform(() => {
    switch (variant) {
      case 'hover':
        return 1.9;
      case 'view':
        return 3.2;
      case 'drag':
        return 3;
      case 'text':
        return 1.3;
      default:
        return 1;
    }
  });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, [x, y]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[90] hidden md:block">
      {/* Inner pip */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full"
        style={{
          x: sx,
          y: sy,
          background: 'rgba(195,180,133,0.95)',
        }}
      />
      {/* Outer ring */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 -ml-5 -mt-5 flex h-10 w-10 items-center justify-center rounded-full border text-[10px] uppercase tracking-[0.3em] text-[var(--fg)]"
        style={{
          x: sxOuter,
          y: syOuter,
          scale,
          borderColor: 'rgba(246,241,232,0.22)',
          backdropFilter: 'blur(2px)',
        }}
      >
        {label && (variant === 'view' || variant === 'drag') && (
          <span className="select-none whitespace-nowrap">{label}</span>
        )}
      </motion.div>
    </div>
  );
}
