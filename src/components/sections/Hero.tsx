'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { SplitText } from '@/components/ui/SplitText';
import { Magnetic } from '@/components/ui/Magnetic';
import { useCursor } from '@/components/providers/CursorProvider';

const HeroScene = dynamic(() => import('@/components/three/HeroScene').then((m) => m.HeroScene), {
  ssr: false,
  loading: () => null,
});

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const sceneY = useTransform(scrollYProgress, [0, 1], ['0%', '32%']);
  const titleY = useTransform(scrollYProgress, [0, 1], ['0%', '-22%']);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.55, 0.95]);
  const { setVariant } = useCursor();

  // Only mount the 3D canvas on capable, large viewports.
  const [enableScene, setEnableScene] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 900px) and (pointer: fine)');
    setEnableScene(mq.matches);
    const handler = (e: MediaQueryListEvent) => setEnableScene(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <section
      id="top"
      ref={ref}
      className="relative h-[112vh] overflow-hidden bg-[var(--bg)]"
    >
      {/* Editorial backdrop — cinematic gradient + a single elegant glow */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 100% 60% at 50% 0%, rgba(31,132,84,0.18), transparent 60%), radial-gradient(ellipse 80% 50% at 50% 100%, rgba(195,180,133,0.06), transparent 60%)',
          }}
        />
      </div>

      {enableScene && (
        <motion.div className="absolute inset-0 z-[1]" style={{ y: sceneY }}>
          <HeroScene />
        </motion.div>
      )}

      <motion.div
        className="absolute inset-0 z-[2] bg-gradient-to-b from-transparent via-[var(--bg)]/20 to-[var(--bg)]"
        style={{ opacity: overlayOpacity }}
      />
      <div className="absolute inset-0 z-[2] noise-overlay" />

      <motion.div
        className="relative z-10 mx-auto flex h-screen w-[min(1400px,92vw)] flex-col items-start justify-center pt-24"
        style={{ y: titleY, opacity: titleOpacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="eyebrow"
        >
          <span className="text-champagne">Sauber &amp; Zauber</span>
          <span className="text-[var(--muted)]">— Atelier · Munich · Est. 2014</span>
        </motion.div>

        <SplitText
          as="h1"
          text="Cleaning, as a quiet art."
          className="mt-10 max-w-[14ch] font-display text-[clamp(3.2rem,9vw,9.5rem)] font-light leading-[0.95] tracking-[-0.035em] text-cinema"
          delay={1.55}
          stagger={0.08}
          duration={1.2}
        />

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.55, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 max-w-[44ch] text-[0.98rem] leading-[1.7] text-[var(--fg-soft)]"
        >
          A private atelier composing white-glove, choreographed cleaning
          rituals for refined homes, studios, and discreet offices —
          with German precision and a single, devoted crew.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.8, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-4"
        >
          <Magnetic strength={0.25} range={110}>
            <a
              href="#contact"
              className="btn-primary"
              onMouseEnter={() => setVariant('hover')}
              onMouseLeave={() => setVariant('default')}
            >
              Reserve a consultation
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
          </Magnetic>
          <Magnetic strength={0.2} range={100}>
            <a
              href="#services"
              className="btn-ghost"
              onMouseEnter={() => setVariant('hover')}
              onMouseLeave={() => setVariant('default')}
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[var(--line-strong)]">
                <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              Watch our craft
            </a>
          </Magnetic>
        </motion.div>
      </motion.div>

      {/* Editorial bottom rail */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-x-0 bottom-0 z-[5] mx-auto w-[min(1400px,92vw)] border-t border-[var(--line)] py-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-x-12 gap-y-4 text-[10px] uppercase tracking-[0.32em] text-[var(--muted)]">
          <span>Discretion guaranteed</span>
          <span className="hidden md:inline">Eco-luxe formulas</span>
          <span>Insured · Bonded</span>
          <span className="hidden md:inline">24h concierge</span>
          <span>Munich · Hamburg · Zürich</span>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.4, duration: 1.4 }}
        className="absolute right-8 top-1/2 z-[5] hidden -translate-y-1/2 flex-col items-center gap-3 text-[9px] uppercase tracking-[0.5em] text-[var(--muted)] md:flex"
      >
        <span className="rotate-90">Scroll</span>
        <motion.div
          className="h-16 w-px origin-top bg-gradient-to-b from-[var(--champagne)] to-transparent"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
          transition={{ delay: 3.6, duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
}
