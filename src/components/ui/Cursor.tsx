'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useCursor } from '@/components/providers/CursorProvider';

/**
 * Highly visible custom cursor — pip + ring, one spring per axis.
 * Bails out completely on coarse pointers; zero JS cost on mobile.
 */
export function Cursor() {
  const { variant, label } = useCursor();
  const [enabled, setEnabled] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  // Pip — snappy, near-instant
  const px = useSpring(x, { damping: 36, stiffness: 700, mass: 0.4 });
  const py = useSpring(y, { damping: 36, stiffness: 700, mass: 0.4 });

  // Ring — softer trail
  const rx = useSpring(x, { damping: 28, stiffness: 240, mass: 0.5 });
  const ry = useSpring(y, { damping: 28, stiffness: 240, mass: 0.5 });

  const ringScale = useTransform(() => {
    switch (variant) {
      case 'hover': return 1.8;
      case 'view':  return 3;
      case 'drag':  return 2.6;
      case 'text':  return 1.4;
      default:      return 1;
    }
  });

  const pipScale = useTransform(() =>
    variant === 'view' || variant === 'drag' ? 0 : 1
  );

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
    <>
      {/* Pip — clearly visible warm ivory dot */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[91] -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full"
        style={{
          x: px,
          y: py,
          scale: pipScale,
          background: 'var(--fg)',
          boxShadow: '0 0 8px rgba(245, 240, 227, 0.45)',
        }}
      />
      {/* Ring */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[90] -ml-5 -mt-5 flex h-10 w-10 items-center justify-center rounded-full text-[10px] uppercase tracking-[0.3em] text-[var(--fg)]"
        style={{
          x: rx,
          y: ry,
          scale: ringScale,
          border: '1.4px solid rgba(245, 240, 227, 0.55)',
        }}
      >
        {label && (variant === 'view' || variant === 'drag') && (
          <span className="select-none whitespace-nowrap">{label}</span>
        )}
      </motion.div>
    </>
  );
}
