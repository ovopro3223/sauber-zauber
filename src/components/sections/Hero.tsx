'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useRef } from 'react';
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
  const sceneY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const titleY = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);
  const titleScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.4, 0.95]);
  const { setVariant } = useCursor();

  return (
    <section
      id="top"
      ref={ref}
      className="relative h-[120vh] overflow-hidden bg-[var(--bg)]"
    >
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: sceneY }}
      >
        <HeroScene />
      </motion.div>

      <motion.div
        className="absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-[var(--bg)]/30 to-[var(--bg)]"
        style={{ opacity: overlayOpacity }}
      />
      <div className="absolute inset-0 z-[1] bg-grid opacity-20 mix-blend-overlay" />
      <div className="absolute inset-0 z-[1] noise-overlay" />

      <motion.div
        className="relative z-10 mx-auto flex h-screen w-[min(1400px,94vw)] flex-col items-center justify-center pt-24 text-center"
        style={{ y: titleY, scale: titleScale, opacity: titleOpacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 inline-flex items-center gap-3 rounded-full glass px-4 py-2 text-[11px] uppercase tracking-[0.3em] text-white/70"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-300 opacity-70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-gold-300" />
          </span>
          Taking new clients · Munich · Hamburg · Zürich
        </motion.div>

        <SplitText
          as="h1"
          text="Cleaning, choreographed."
          className="font-display text-[clamp(3.4rem,9vw,9rem)] font-light leading-[0.95] tracking-[-0.03em] text-gradient"
          delay={1.6}
          stagger={0.07}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 max-w-xl text-balance text-base md:text-lg text-white/65"
        >
          A private cleaning atelier crafting whisper-quiet, white-glove
          experiences for refined homes, ateliers, and discreet offices —
          choreographed with German precision.
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.9, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 flex flex-col sm:flex-row items-center gap-3 sm:gap-5"
        >
          <Magnetic strength={0.3} range={120}>
            <a
              href="#contact"
              className="btn-primary"
              onMouseEnter={() => setVariant('hover')}
              onMouseLeave={() => setVariant('default')}
            >
              Reserve a consultation
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
          </Magnetic>
          <Magnetic strength={0.25} range={100}>
            <a
              href="#services"
              className="btn-ghost"
              onMouseEnter={() => setVariant('hover')}
              onMouseLeave={() => setVariant('default')}
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/20">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              Watch our craft
            </a>
          </Magnetic>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.4, duration: 1.4 }}
          className="absolute inset-x-0 bottom-12 mx-auto flex w-fit flex-col items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-white/40"
        >
          <span>Scroll to enter</span>
          <motion.div
            className="h-10 w-px bg-gradient-to-b from-white/40 to-transparent"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 3.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: 'top' }}
          />
        </motion.div>
      </motion.div>

      {/* Floating decorative marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.2, duration: 1 }}
        className="absolute bottom-0 left-0 right-0 z-[5] overflow-hidden border-y border-white/5 bg-[var(--bg)]/60 py-3 backdrop-blur-xl"
      >
        <motion.div
          className="flex shrink-0 gap-12 whitespace-nowrap text-[11px] uppercase tracking-[0.35em] text-white/40"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        >
          {Array.from({ length: 2 }).map((_, idx) => (
            <div key={idx} className="flex gap-12">
              <span>Discretion guaranteed</span>
              <span className="text-gold-300/60">◆</span>
              <span>Eco-luxe formulas</span>
              <span className="text-gold-300/60">◆</span>
              <span>Insured · Bonded · Trained</span>
              <span className="text-gold-300/60">◆</span>
              <span>Hand-selected ateliers</span>
              <span className="text-gold-300/60">◆</span>
              <span>Acoustic-conscious crews</span>
              <span className="text-gold-300/60">◆</span>
              <span>24h concierge response</span>
              <span className="text-gold-300/60">◆</span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
