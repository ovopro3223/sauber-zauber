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
      title: 'Leise gesagt. Laut gespürt.',
      lede:
        'Wir bitten nicht um Bewertungen. Diese sind Briefe, die wir erhalten haben — geteilt mit Erlaubnis und nur mit Initialen.',
      voices: [
        { quote: 'Sie haben meine Wohnung in Schöneberg geputzt wie ein Instrument gestimmt. Ich kam in ein Schweigen heim — eine andere Lichtgeometrie.', author: 'Lena V.', role: 'Architektin', city: 'Berlin' },
        { quote: 'Diskret, erschütternd präzise. Sie haben eine Lederbibliothek aus den 1920ern so sorgfältig behandelt wie mein Mann seine Celli.', author: 'Frau K.', role: 'Sammlerin', city: 'Hamburg' },
        { quote: 'Unser Atelier schließt nie. Sie arbeiten zwischen 2 und 6 Uhr, und wir öffnen um neun in einem weicheren Studio.', author: 'Studio Maren', role: 'Gründerin', city: 'Berlin' },
        { quote: 'Die Vorbereitung vor unserer Ankunft ist sehenswert. Wäsche gebügelt, Duft entzündet, Musik bereit. Eine Choreografie.', author: 'Kapitän D.', role: 'Yacht-Steward', city: 'Côte d’Azur' },
        { quote: 'Ich habe um 23:14 angefragt. Um 00:02 hatte der Concierge geantwortet. Leise, behandschuht, perfekt.', author: 'Henrik B.', role: 'Privatbüro', city: 'Zürich' },
      ],
      prev: 'Vorherige',
      next: 'Nächste',
    },
    en: {
      label: 'Voices',
      title: 'Spoken softly. Felt loudly.',
      lede:
        "We don't solicit reviews. These are letters we received, shared with permission and only first initials.",
      voices: [
        { quote: 'They cleaned my flat in Schöneberg as if they were tuning an instrument. I came home to a hush — a different geometry of light.', author: 'Lena V.', role: 'Architect', city: 'Berlin' },
        { quote: 'Discreet, devastatingly precise. They handled a 1920s leather library as carefully as my husband handles his cellos.', author: 'Frau K.', role: 'Collector', city: 'Hamburg' },
        { quote: 'Our atelier never closes. They do their work between 2 and 6 a.m., and we open at nine to a softer studio.', author: 'Studio Maren', role: 'Founder', city: 'Berlin' },
        { quote: 'The pre-arrival turnaround is something to witness. Linens pressed, scent lit, music queued. A choreography.', author: 'Captain D.', role: 'Yacht steward', city: 'Côte d’Azur' },
        { quote: 'I sent a request at 23:14. By 00:02 a concierge had answered. Quiet, gloved, perfect.', author: 'Henrik B.', role: 'Private office', city: 'Zürich' },
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

        <div className="relative mt-16 grid items-center gap-10 md:mt-20 md:gap-12 lg:grid-cols-[auto_1fr_auto]">
          <div className="order-2 lg:order-1">
            <NavBtn dir={-1} aria={t.prev} onClick={() => go(-1)} setVariant={setVariant} />
          </div>

          <div className="order-1 min-h-[280px] lg:order-2">
            <AnimatePresence mode="wait">
              <motion.figure
                key={index}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                <svg width="40" height="40" viewBox="0 0 24 24" className="mb-6 text-mint opacity-70" fill="currentColor">
                  <path d="M7.17 6A5.17 5.17 0 0 0 2 11.17v6.83h6.83V11.17H5.17C5.17 9.42 6.42 8 8.17 8V6h-1zM18.17 6A5.17 5.17 0 0 0 13 11.17v6.83h6.83V11.17h-3.66C16.17 9.42 17.42 8 19.17 8V6h-1z" />
                </svg>
                <blockquote className="max-w-3xl font-display text-[clamp(1.5rem,2.6vw,2.4rem)] font-light leading-[1.22] tracking-[-0.015em] text-cinema">
                  &ldquo;{current.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-10 flex flex-wrap items-baseline gap-x-6 gap-y-2 border-t border-[var(--line)] pt-5">
                  <span className="font-display text-lg text-[var(--fg)]">{current.author}</span>
                  <span className="text-[10px] uppercase tracking-[0.32em] text-[var(--muted)]">
                    {current.role} · {current.city}
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          <div className="order-3">
            <NavBtn dir={1} aria={t.next} onClick={() => go(1)} setVariant={setVariant} />
          </div>
        </div>

        <div className="mt-14 flex items-center justify-center gap-6">
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
}: {
  dir: -1 | 1;
  aria: string;
  onClick: () => void;
  setVariant: (v: 'hover' | 'default') => void;
}) {
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setVariant('hover')}
      onMouseLeave={() => setVariant('default')}
      aria-label={aria}
      className="group flex h-12 w-12 items-center justify-center rounded-full border border-[var(--line-strong)] transition-colors duration-500 hover:border-mint"
    >
      <svg
        width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"
        className={`transition-transform duration-500 ${dir === -1 ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`}
        style={{ transform: dir === -1 ? 'scaleX(-1)' : undefined }}
      >
        <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" />
      </svg>
    </button>
  );
}
