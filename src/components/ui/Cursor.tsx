'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useCursor } from '@/components/providers/CursorProvider';

/**
 * Custom cursor — desktop only, single motion value pair, one spring each.
 * Mobile is bailed out at mount so no listeners are attached.
 */
export function Cursor() {
  const { variant, label } = useCursor();
  const [enabled, setEnabled] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { damping: 32, stiffness: 380, mass: 0.5 });
  const sy = useSpring(y, { damping: 32, stiffness: 380, mass: 0.5 });

  const scale = useTransform(() => {
    switch (variant) {
      case 'hover': return 1.8;
      case 'view':  return 3;
      case 'drag':  return 2.6;
      case 'text':  return 1.3;
      default:      return 1;
    }
  });

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    setEnabled(true);
    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[90] -ml-5 -mt-5 flex h-10 w-10 items-center justify-center rounded-full border text-[10px] uppercase tracking-[0.3em] text-[var(--fg)]"
      style={{
        x: sx,
        y: sy,
        scale,
        borderColor: 'rgba(245,240,227,0.22)',
      }}
    >
      {label && (variant === 'view' || variant === 'drag') && (
        <span className="select-none whitespace-nowrap">{label}</span>
      )}
    </motion.div>
  );
}
