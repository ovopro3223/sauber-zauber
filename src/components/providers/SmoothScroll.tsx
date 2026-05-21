'use client';

import { ReactNode, useEffect, useRef } from 'react';
import Lenis from 'lenis';

export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      lerp: 0.085,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
      infinite: false,
    });
    lenisRef.current = lenis;

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    const onScroll = ({ scroll, velocity }: { scroll: number; velocity: number }) => {
      document.documentElement.style.setProperty('--scroll-y', `${scroll}`);
      document.documentElement.style.setProperty('--scroll-v', `${velocity.toFixed(3)}`);
      window.dispatchEvent(new CustomEvent('lenis-scroll', { detail: { scroll, velocity } }));
    };
    lenis.on('scroll', onScroll);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
