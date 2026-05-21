'use client';

import { useEffect, useRef } from 'react';

/**
 * Two slow, cinematic ambient washes. No animated bouncing blobs.
 * The pointer follows a single soft emerald glow, very subtly.
 */
export function AmbientLights() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const target = { x: 50, y: 30 };
    const current = { x: 50, y: 30 };

    const onMove = (e: PointerEvent) => {
      target.x = (e.clientX / window.innerWidth) * 100;
      target.y = (e.clientY / window.innerHeight) * 100;
    };

    const tick = () => {
      current.x += (target.x - current.x) * 0.06;
      current.y += (target.y - current.y) * 0.06;
      el.style.setProperty('--mx', `${current.x.toFixed(2)}%`);
      el.style.setProperty('--my', `${current.y.toFixed(2)}%`);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      style={{
        ['--mx' as string]: '50%',
        ['--my' as string]: '30%',
      }}
    >
      {/* Soft emerald wash that subtly follows the pointer */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(520px 520px at var(--mx) var(--my), rgba(31,132,84,0.10), transparent 70%)',
        }}
      />
      {/* Static cinematic anchor — warm bottom-right */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(700px 500px at 90% 100%, rgba(195,180,133,0.05), transparent 65%)',
        }}
      />
      {/* Film grain */}
      <div className="absolute inset-0 bg-noise opacity-[0.035] mix-blend-overlay" />
    </div>
  );
}
