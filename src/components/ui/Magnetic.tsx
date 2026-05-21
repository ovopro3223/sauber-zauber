'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

type Props = {
  children: ReactNode;
  strength?: number;
  range?: number;
  className?: string;
};

/**
 * Magnetic hover — desktop / fine pointer only. Listeners attach to the
 * element itself (not window), so cost stays local to the button.
 */
export function Magnetic({ children, strength = 0.25, range = 100, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { damping: 20, stiffness: 240, mass: 0.35 });
  const sy = useSpring(y, { damping: 20, stiffness: 240, mass: 0.35 });

  useEffect(() => {
    setEnabled(window.matchMedia('(pointer: fine)').matches);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      if (dist < range) {
        x.set(dx * strength);
        y.set(dy * strength);
      } else {
        x.set(0);
        y.set(0);
      }
    };
    const onLeave = () => {
      x.set(0);
      y.set(0);
    };
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, [enabled, range, strength, x, y]);

  if (!enabled) {
    return <span className={className}>{children}</span>;
  }

  return (
    <motion.div ref={ref} className={`magnetic ${className ?? ''}`} style={{ x: sx, y: sy }}>
      {children}
    </motion.div>
  );
}
