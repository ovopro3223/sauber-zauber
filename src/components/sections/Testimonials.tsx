'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SplitText } from '@/components/ui/SplitText';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { AccentLine } from '@/components/ui/AccentLine';
import { useCursor } from '@/components/providers/CursorProvider';
import { useT } from '@/components/providers/LanguageProvider';

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const { setVariant } = useCursor();

  const t = useT({
    de: {
      label: 'Stimmen',
      title: 'Was unsere Kunden sagen.',
      lede:
        'Echte Rückmeldungen aus Berlin — von Familien, Büros und Geschäften, die uns regelmäßig vertrauen.',
      voices: [
        {
          quote:
            'Pünktlich, freundlich und am Ende glänzt wirklich alles. Seit drei Monaten kommen sie alle zwei Wochen — ich denke gar nicht mehr darüber nach.',
          author: 'Anna M.',
          role: 'Familie',
          city: 'Prenzlauer Berg',
        },
        {
          quote:
            'Wir buchen sie für unser Büro in Mitte. Diskret, sorgfältig, und unser Team kommt jeden Morgen in saubere Räume. Genau so soll es sein.',
          author: 'Tobias W.',
          role: 'Geschäftsführer',
          city: 'Berlin-Mitte',
        },
        {
          quote:
            'Nach der Renovierung war alles voller Bauschutt und Staub. In einem Tag haben sie die ganze Wohnung übergabefertig gemacht — wir konnten direkt einziehen.',
          author: 'Familie H.',
          role: 'Privatkunden',
          city: 'Charlottenburg',
        },
        {
          quote:
            'Streifenfrei — wirklich streifenfrei. Unser Café in Friedrichshain wirkt jetzt heller, und unsere Gäste merken den Unterschied sofort.',
          author: 'Sarah L.',
          role: 'Café-Inhaberin',
          city: 'Friedrichshain',
        },
        {
          quote:
            'Wir haben drei Reinigungsfirmen ausprobiert. Nur Sauber & Zauber liefert konstant gute Qualität — und das Team ist seit über einem Jahr dasselbe.',
          author: 'Architekturbüro K.',
          role: 'Geschäftskunde',
          city: 'Kreuzberg',
        },
      ],
      prev: 'Vorherige',
      next: 'Nächste',
    },
    en: {
      label: 'Voices',
      title: 'What our clients say.',
      lede:
        'Real feedback from Berlin — from families, offices and small businesses who trust us on a regular basis.',
      voices: [
        {
          quote:
            "Punctual, friendly, and at the end everything really shines. They've come every two weeks for three months — I don't even think about it anymore.",
          author: 'Anna M.',
          role: 'Family',
          city: 'Prenzlauer Berg',
        },
        {
          quote:
            'We book them for our office in Mitte. Discreet, thorough, and our team arrives every morning to clean rooms. Exactly as it should be.',
          author: 'Tobias W.',
          role: 'Managing Director',
          city: 'Berlin-Mitte',
        },
        {
          quote:
            'After the renovation everything was full of dust and debris. In one day they made the whole apartment handover-ready — we could move straight in.',
          author: 'Family H.',
          role: 'Private clients',
          city: 'Charlottenburg',
        },
        {
          quote:
            'Streak-free — truly streak-free. Our café in Friedrichshain looks brighter now, and our guests notice the difference immediately.',
          author: 'Sarah L.',
          role: 'Café owner',
          city: 'Friedrichshain',
        },
        {
          quote:
            'We tried three cleaning companies. Only Sauber & Zauber delivers consistently good quality — and the team has been the same for over a year.',
          author: 'Architecture studio K.',
          role: 'Business client',
          city: 'Kreuzberg',
        },
      ],
      prev: 'Previous',
      next: 'Next',
    },
  });

  const current = t.voices[index];
  const go = (dir: 1 | -1) => setIndex((i) => (i + dir + t.voices.length) % t.voices.length);

  return (
    <section id="testimonials" className="relative overflow-hidden bg-transparent py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 30%, rgba(95,227,161,0.10), transparent 60%)',
        }}
      />

      <div className="relative mx-auto w-[min(1200px,92vw)]">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <SectionLabel index="04" label={t.label} />
            <SplitText
              key={t.title}
              as="h2"
              text={t.title}
              className="mt-6 max-w-[18ch] font-display text-[clamp(2.2rem,5vw,4.8rem)] font-light leading-[1.02] tracking-[-0.025em] text-cinema"
            />
            <AccentLine />
          </div>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-md text-[var(--fg-soft)] leading-[1.7]"
          >
            {t.lede}
          </motion.p>
        </div>

        {/* Desktop: arrows flank the quote · Mobile: quote on top, single control row below */}
        <div className="relative mt-14 lg:mt-20 lg:grid lg:grid-cols-[auto_1fr_auto] lg:items-center lg:gap-12">
          <div className="hidden lg:block">
            <NavBtn dir={-1} aria={t.prev} onClick={() => go(-1)} setVariant={setVariant} />
          </div>

          <div className="min-h-[260px] md:min-h-[280px]">
            <AnimatePresence mode="wait">
              <motion.figure
                key={index}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                <svg width="36" height="36" viewBox="0 0 24 24" className="mb-5 text-mint opacity-70 md:mb-6 md:h-10 md:w-10" fill="currentColor">
                  <path d="M7.17 6A5.17 5.17 0 0 0 2 11.17v6.83h6.83V11.17H5.17C5.17 9.42 6.42 8 8.17 8V6h-1zM18.17 6A5.17 5.17 0 0 0 13 11.17v6.83h6.83V11.17h-3.66C16.17 9.42 17.42 8 19.17 8V6h-1z" />
                </svg>
                <blockquote className="max-w-3xl font-display text-[clamp(1.35rem,2.6vw,2.4rem)] font-light leading-[1.25] tracking-[-0.015em] text-cinema">
                  &ldquo;{current.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-8 flex flex-wrap items-baseline gap-x-5 gap-y-1.5 border-t border-[var(--line)] pt-4 md:mt-10 md:pt-5">
                  <span className="font-display text-base text-[var(--fg)] md:text-lg">{current.author}</span>
                  <span className="text-[10px] uppercase tracking-[0.32em] text-[var(--muted)]">
                    {current.role} · {current.city}
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          <div className="hidden lg:block">
            <NavBtn dir={1} aria={t.next} onClick={() => go(1)} setVariant={setVariant} />
          </div>
        </div>

        {/* Mobile control bar: prev — dots — next, all on one row */}
        <div className="mt-10 flex items-center justify-between gap-4 lg:hidden">
          <NavBtn dir={-1} aria={t.prev} onClick={() => go(-1)} setVariant={setVariant} compact />
          <div className="flex items-center gap-3">
            {t.voices.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`${t.next} ${i + 1}`}
                className="group relative h-5 w-7"
              >
                <span className="absolute left-0 right-0 top-1/2 h-px bg-[var(--line-strong)]" />
                <span
                  className="absolute left-0 top-1/2 h-px origin-left bg-[var(--fg)] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{ width: '100%', transform: `scaleX(${i === index ? 1 : 0})` }}
                />
              </button>
            ))}
          </div>
          <NavBtn dir={1} aria={t.next} onClick={() => go(1)} setVariant={setVariant} compact />
        </div>

        {/* Desktop dots row */}
        <div className="mt-14 hidden items-center justify-center gap-6 lg:flex">
          {t.voices.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              onMouseEnter={() => setVariant('hover')}
              onMouseLeave={() => setVariant('default')}
              aria-label={`${t.next} ${i + 1}`}
              className="group relative h-6 w-10"
            >
              <span className="absolute left-0 right-0 top-1/2 h-px bg-[var(--line-strong)]" />
              <span
                className="absolute left-0 top-1/2 h-px origin-left bg-[var(--fg)] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{ width: '100%', transform: `scaleX(${i === index ? 1 : 0})` }}
              />
              <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 font-mono text-[9px] tracking-widest text-[var(--muted)]">
                {String(i + 1).padStart(2, '0')}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function NavBtn({
  dir,
  aria,
  onClick,
  setVariant,
  compact = false,
}: {
  dir: -1 | 1;
  aria: string;
  onClick: () => void;
  setVariant: (v: 'hover' | 'default') => void;
  compact?: boolean;
}) {
  const size = compact ? 'h-10 w-10' : 'h-12 w-12';
  const iconSize = compact ? 12 : 14;
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setVariant('hover')}
      onMouseLeave={() => setVariant('default')}
      aria-label={aria}
      className={`group flex shrink-0 ${size} items-center justify-center rounded-full border border-[var(--line-strong)] transition-colors duration-500 hover:border-mint active:scale-95`}
    >
      <svg
        width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"
        className={`transition-transform duration-500 ${dir === -1 ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`}
        style={{ transform: dir === -1 ? 'scaleX(-1)' : undefined }}
      >
        <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" />
      </svg>
    </button>
  );
}
