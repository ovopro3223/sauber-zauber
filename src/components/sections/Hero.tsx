'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SplitText } from '@/components/ui/SplitText';
import { Magnetic } from '@/components/ui/Magnetic';
import { useCursor } from '@/components/providers/CursorProvider';

/**
 * CSS-driven cinematic hero on emerald base.
 * One useScroll. The rest of the motion is GPU-only CSS keyframes.
 */
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
      className="relative isolate min-h-[100svh] overflow-hidden bg-[var(--bg)]"
    >
      {/* Cinematic emerald wash — uses brand greens, slow drifts */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div
          className="absolute inset-[-8%] anim-drift-x"
          style={{
            background:
              'radial-gradient(ellipse 90% 60% at 50% -10%, rgba(45, 122, 85, 0.40), transparent 60%),' +
              'radial-gradient(ellipse 70% 50% at 90% 110%, rgba(20, 84, 58, 0.55), transparent 65%),' +
              'radial-gradient(ellipse 50% 40% at 5% 100%, rgba(220, 196, 136, 0.06), transparent 60%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.05] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
      </div>

      {/* Botanical ornament — draws in, then quietly breathes */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-6%] top-1/2 -z-[1] hidden -translate-y-1/2 anim-breathe lg:block"
        style={{ width: 'min(56vh, 720px)' }}
      >
        <svg viewBox="0 0 400 400" className="h-full w-full" fill="none">
          <defs>
            <linearGradient id="ornament-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#dcc488" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#2d7a55" stopOpacity="0.5" />
            </linearGradient>
          </defs>
          <path
            className="draw-ornament"
            d="M200 30 C 200 130, 200 230, 200 370"
            stroke="url(#ornament-grad)"
            strokeWidth="1"
            strokeLinecap="round"
          />
          <path
            className="draw-ornament"
            style={{ animationDelay: '1.5s' }}
            d="M200 90 C 260 100, 290 140, 300 200"
            stroke="rgba(220, 196, 136, 0.55)"
            strokeWidth="0.8"
            strokeLinecap="round"
          />
          <path
            className="draw-ornament"
            style={{ animationDelay: '1.7s' }}
            d="M200 90 C 140 100, 110 140, 100 200"
            stroke="rgba(220, 196, 136, 0.55)"
            strokeWidth="0.8"
            strokeLinecap="round"
          />
          <path
            className="draw-ornament"
            style={{ animationDelay: '1.9s' }}
            d="M200 200 C 270 210, 310 250, 320 320"
            stroke="rgba(45, 122, 85, 0.45)"
            strokeWidth="0.8"
            strokeLinecap="round"
          />
          <path
            className="draw-ornament"
            style={{ animationDelay: '2.1s' }}
            d="M200 200 C 130 210, 90 250, 80 320"
            stroke="rgba(45, 122, 85, 0.45)"
            strokeWidth="0.8"
            strokeLinecap="round"
          />
          <circle cx="200" cy="30" r="1.5" fill="rgba(220, 196, 136, 0.9)" />
        </svg>
      </div>

      {/* Quietly floating accent dot, left-side composition balance */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-[6%] top-[36%] -z-[1] hidden lg:block"
      >
        <div
          className="h-2 w-2 rounded-full anim-float anim-pulse"
          style={{ background: 'var(--gold)' }}
        />
      </div>

      {/* Type column */}
      <motion.div
        className="relative z-10 mx-auto flex min-h-[100svh] w-[min(1400px,92vw)] flex-col items-start justify-center pt-28 pb-24"
        style={{ y: titleY, opacity: titleOpacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="eyebrow"
        >
          <span className="text-gold-soft">Sauber &amp; Zauber</span>
          <span>· Atelier · Munich · Est. 2014</span>
        </motion.div>

        <SplitText
          as="h1"
          text="Cleaning, as a quiet art."
          className="mt-10 max-w-[14ch] font-display text-[clamp(3rem,9vw,9rem)] font-light leading-[0.95] tracking-[-0.035em] text-cinema"
          delay={1.35}
          stagger={0.07}
          duration={1}
        />

        {/* Gold animated accent line — draws in after the title resolves */}
        <span aria-hidden className="gold-accent mt-7 w-[180px]" />

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 max-w-[44ch] text-[0.98rem] leading-[1.7] text-[var(--fg-soft)]"
        >
          A private atelier composing white-glove, choreographed cleaning
          rituals for refined homes, studios, and discreet offices —
          with German precision and a single, devoted crew.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.45, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
        >
          <Magnetic strength={0.22} range={100}>
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
          <Magnetic strength={0.18} range={90}>
            <a
              href="#services"
              className="btn-ghost"
              onMouseEnter={() => setVariant('hover')}
              onMouseLeave={() => setVariant('default')}
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full border border-[var(--line-strong)]">
                <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              Watch our craft
            </a>
          </Magnetic>
        </motion.div>
      </motion.div>

      {/* Bottom editorial rail with quiet shimmer line above it */}
      <div className="absolute inset-x-0 bottom-0 z-[5] mx-auto w-[min(1400px,92vw)]">
        <div aria-hidden className="shimmer-line w-full" />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.7, duration: 0.9 }}
          className="py-5"
        >
          <div className="flex flex-wrap items-center justify-between gap-x-10 gap-y-3 text-[10px] uppercase tracking-[0.32em] text-[var(--muted)]">
            <span>Discretion guaranteed</span>
            <span className="hidden md:inline">Eco-luxe formulas</span>
            <span>Insured · Bonded</span>
            <span className="hidden md:inline">24h concierge</span>
            <span>Munich · Hamburg · Zürich</span>
          </div>
        </motion.div>
      </div>

      {/* Quiet scroll cue (right side) */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-8 top-1/2 z-[5] hidden -translate-y-1/2 flex-col items-center gap-3 text-[9px] uppercase tracking-[0.5em] text-[var(--muted)] md:flex"
      >
        <span className="rotate-90">Scroll</span>
        <span className="scroll-cue" />
      </div>
    </section>
  );
}
