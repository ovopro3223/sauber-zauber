'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SplitText } from '@/components/ui/SplitText';
import { Magnetic } from '@/components/ui/Magnetic';
import { Logo } from '@/components/ui/Logo';
import { AccentLine } from '@/components/ui/AccentLine';
import { useCursor } from '@/components/providers/CursorProvider';

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const titleY = useTransform(scrollYProgress, [0, 1], ['0%', '-16%']);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const { setVariant } = useCursor();

  return (
    <section
      id="top"
      ref={ref}
      className="relative isolate min-h-[100svh] overflow-hidden"
    >
      <motion.div
        className="relative z-10 mx-auto flex min-h-[100svh] w-[min(1200px,92vw)] flex-col items-center justify-center pt-28 pb-24 text-center"
        style={{ y: titleY, opacity: titleOpacity }}
      >
        {/* Logo with orbiting sparkles */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.15, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="logo-orbit-wrap anim-float"
        >
          <Logo size={120} />
          <span aria-hidden className="orbit-sparkle s1" />
          <span aria-hidden className="orbit-sparkle s2" />
          <span aria-hidden className="orbit-sparkle s3" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 inline-flex items-center gap-3 rounded-full border border-[var(--line-strong)] bg-[var(--green-soft)] px-5 py-2 text-[10.5px] font-medium uppercase tracking-[0.4em] text-mint shadow-[0_0_30px_rgba(95,227,161,0.08),inset_0_0_18px_rgba(95,227,161,0.05)]"
        >
          <span className="h-px w-4 bg-gradient-to-r from-transparent to-mint" />
          Premium-Reinigung · Berlin
          <span className="h-px w-4 bg-gradient-to-l from-transparent to-mint" />
        </motion.div>

        <SplitText
          as="h1"
          text="Andere schrubben."
          className="mt-8 font-display text-[clamp(2.8rem,8vw,8rem)] font-light leading-[1.0] tracking-[-0.025em] text-cinema"
          delay={1.5}
          stagger={0.08}
          duration={1}
        />
        <SplitText
          as="h1"
          text="Wir zaubern."
          className="font-display text-[clamp(2.8rem,8vw,8rem)] font-extralight italic leading-[1.0] tracking-[-0.025em]"
          style={
            {
              background: 'linear-gradient(180deg, #5fe3a1, #2fbf7a)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            } as React.CSSProperties
          }
          delay={1.85}
          stagger={0.08}
          duration={1}
        />

        <AccentLine width="200px" delay={2.55} className="!mt-8" />

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 max-w-[44ch] text-[0.98rem] leading-[1.75] text-[var(--fg-soft)]"
        >
          Diskrete, gründliche und zuverlässige Reinigungsdienste für
          Berliner Zuhause und Büros — auf Wunsch mit umweltfreundlichen
          Mitteln und festem Stammteam.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.55, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
        >
          <Magnetic strength={0.28} range={120}>
            <a
              href="#contact"
              className="btn-primary"
              onMouseEnter={() => setVariant('hover')}
              onMouseLeave={() => setVariant('default')}
            >
              Jetzt anfragen
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
          </Magnetic>
          <Magnetic strength={0.22} range={110}>
            <a
              href="#services"
              className="btn-ghost"
              onMouseEnter={() => setVariant('hover')}
              onMouseLeave={() => setVariant('default')}
            >
              Leistungen ansehen
            </a>
          </Magnetic>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.9, duration: 1 }}
          className="mt-16 flex flex-col items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-[var(--muted)]"
        >
          <span>Scrollen</span>
          <span className="scroll-cue" />
        </motion.div>
      </motion.div>
    </section>
  );
}
