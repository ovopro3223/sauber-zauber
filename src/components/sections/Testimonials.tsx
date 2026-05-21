'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SplitText } from '@/components/ui/SplitText';
import { SectionLabel } from '@/components/ui/SectionLabel';

const voices = [
  {
    quote:
      'They cleaned my flat in Schwabing as if they were tuning an instrument. I came home to a hush — a different geometry of light.',
    author: 'Lena V.',
    role: 'Architect · Munich',
    rotate: -3,
  },
  {
    quote:
      'Discreet, devastatingly precise. They handled a 1920s leather library as carefully as my husband handles his cellos.',
    author: 'Frau K.',
    role: 'Collector · Hamburg',
    rotate: 2,
  },
  {
    quote:
      'Our atelier never closes. They do their work between 2 and 6 a.m., and we open at nine to a softer studio.',
    author: 'Studio Maren',
    role: 'Founder · Berlin',
    rotate: -1.5,
  },
  {
    quote:
      'The pre-arrival turnaround is something to witness. Linens pressed, scent lit, music queued. A choreography.',
    author: 'Captain D.',
    role: 'Yacht steward · Côte d’Azur',
    rotate: 2.5,
  },
  {
    quote:
      'I sent a request at 23:14. By 00:02 a concierge had answered, by 09:00 a crew was at the door. Quiet, gloved, perfect.',
    author: 'Henrik B.',
    role: 'Private office · Zürich',
    rotate: -2,
  },
];

export function Testimonials() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  return (
    <section
      id="testimonials"
      ref={ref}
      className="relative overflow-hidden bg-[var(--bg)] py-32"
    >
      <motion.div
        className="absolute inset-x-0 top-1/2 -z-0 mx-auto h-[80vmin] w-[80vmin] -translate-y-1/2 rounded-full bg-aurora opacity-40 mix-blend-screen"
        style={{ y }}
      />
      <div className="mx-auto w-[min(1400px,94vw)]">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <SectionLabel index="IV" label="Voices" />
            <SplitText
              as="h2"
              text="Spoken softly. Felt loudly."
              className="mt-6 font-display text-[clamp(2.4rem,5vw,5rem)] leading-[1.02] tracking-[-0.02em] text-gradient"
            />
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-md text-white/55"
          >
            We don&apos;t solicit reviews. These are letters we received,
            shared with permission and only first initials.
          </motion.p>
        </div>

        <div className="relative mt-24 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {voices.map((v, i) => (
            <FloatingCard key={i} voice={v} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FloatingCard({
  voice,
  index,
}: {
  voice: (typeof voices)[number];
  index: number;
}) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 40, rotate: 0 }}
      whileInView={{ opacity: 1, y: 0, rotate: voice.rotate }}
      whileHover={{ y: -10, rotate: 0, scale: 1.02 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className={`relative glass-strong overflow-hidden rounded-[28px] p-8 ${
        index % 2 === 0 ? 'md:translate-y-6' : 'md:-translate-y-6'
      }`}
    >
      <div className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full bg-gold-400/20 blur-3xl" />
      <svg width="28" height="28" viewBox="0 0 24 24" className="text-gold-300/80">
        <path
          d="M7.17 6A5.17 5.17 0 0 0 2 11.17v6.83h6.83V11.17H5.17C5.17 9.42 6.42 8 8.17 8V6h-1zM18.17 6A5.17 5.17 0 0 0 13 11.17v6.83h6.83V11.17h-3.66C16.17 9.42 17.42 8 19.17 8V6h-1z"
          fill="currentColor"
        />
      </svg>
      <blockquote className="mt-6 font-display text-xl leading-snug text-white/90 md:text-2xl">
        {voice.quote}
      </blockquote>
      <figcaption className="mt-8 flex items-center justify-between border-t border-white/10 pt-5">
        <div>
          <div className="text-sm font-medium text-white">{voice.author}</div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-white/40">{voice.role}</div>
        </div>
        <div className="font-mono text-xs text-gold-300">{String(index + 1).padStart(2, '0')}/05</div>
      </figcaption>
    </motion.figure>
  );
}
