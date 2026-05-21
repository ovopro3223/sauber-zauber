'use client';

import { ReactNode, useEffect } from 'react';

/**
 * Lenis is enabled only for capable desktops with a fine pointer.
 * On mobile we let the OS do native scrolling — it is silkier and saves the GPU.
 * Loaded with dynamic import so it never ships in the mobile path.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 900px) and (pointer: fine)');
    if (!mq.matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let lenis: { destroy: () => void; raf: (t: number) => void } | null = null;
    let raf = 0;

    (async () => {
      const Lenis = (await import('lenis')).default;
      lenis = new Lenis({
        duration: 1.15,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        lerp: 0.09,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.3,
      });
      const tick = (time: number) => {
        lenis?.raf(time);
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    })();

    return () => {
      cancelAnimationFrame(raf);
      lenis?.destroy();
    };
  }, []);

  return <>{children}</>;
}
