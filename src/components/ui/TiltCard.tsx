'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';

type Props = {
  children: ReactNode;
  intensity?: number;
  className?: string;
};

/**
 * 3D parallax tilt — follows the cursor with perspective + rotateX/Y,
 * and exposes --mx/--my CSS vars so children can draw a cursor-tracked
 * light (see .tilt-card-light). Bails out completely on coarse pointers.
 */
export function TiltCard({ children, intensity = 8, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(window.matchMedia('(pointer: fine)').matches);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;

    const target = { rx: 0, ry: 0 };
    const current = { rx: 0, ry: 0 };
    let raf = 0;
    let active = false;

    const tick = () => {
      current.rx += (target.rx - current.rx) * 0.12;
      current.ry += (target.ry - current.ry) * 0.12;
      el.style.transform = `perspective(1100px) rotateX(${current.rx.toFixed(3)}deg) rotateY(${current.ry.toFixed(3)}deg)`;
      if (active || Math.abs(target.rx - current.rx) > 0.01 || Math.abs(target.ry - current.ry) > 0.01) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = 0;
      }
    };

    const onMove = (e: PointerEvent) => {
      active = true;
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      target.rx = (py - 0.5) * -intensity;
      target.ry = (px - 0.5) * intensity;
      el.style.setProperty('--mx', `${(px * 100).toFixed(2)}%`);
      el.style.setProperty('--my', `${(py * 100).toFixed(2)}%`);
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onLeave = () => {
      active = false;
      target.rx = 0;
      target.ry = 0;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [enabled, intensity]);

  return (
    <div ref={ref} className={`tilt-card ${className ?? ''}`}>
      {children}
    </div>
  );
}
