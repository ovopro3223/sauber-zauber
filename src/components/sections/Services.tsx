'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SplitText } from '@/components/ui/SplitText';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { useCursor } from '@/components/providers/CursorProvider';

const services = [
  {
    no: '01',
    title: 'Residential Atelier',
    sub: 'Private homes & penthouses',
    body:
      'A devoted crew, hand-selected for your home. Surface-mapped, scent-curated, choreographed in three movements per visit.',
    metrics: [
      ['Crew', '3 specialists'],
      ['Session', '~4.5 h'],
      ['Cadence', 'Weekly · Bi-weekly'],
    ],
  },
  {
    no: '02',
    title: 'Private Office',
    sub: 'Studios & boutique HQs',
    body:
      'After-hours choreography. Surface-safe formulas, NDA-signed crews, biometric entry, archival documentation.',
    metrics: [
      ['Crew', '4 specialists'],
      ['Schedule', 'Night · pre-dawn'],
      ['Access', 'Biometric · key-safe'],
    ],
  },
  {
    no: '03',
    title: 'Concierge Stay',
    sub: 'Residences · yachts · jets',
    body:
      'On-call turnaround for arrivals & departures — linen pressed, scent lit, room composed before you arrive.',
    metrics: [
      ['Response', '90 min on-call'],
      ['Includes', 'Linen · scent · light'],
      ['Coverage', '24 / 7'],
    ],
  },
  {
    no: '04',
    title: 'Restoration',
    sub: 'Move-ins · listings · archives',
    body:
      'Forensic-level care. Grout reset, stone-honing, leather conditioning, archive-grade dust extraction.',
    metrics: [
      ['Crew', 'Up to 6'],
      ['Record', 'Photo log'],
      ['Tools', 'HEPA · ULV · UV'],
    ],
  },
];

export function Services() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const trackX = useTransform(scrollYProgress, [0.05, 0.95], ['2%', '-72%']);
  const { setVariant } = useCursor();

  return (
    <section id="services" ref={ref} className="relative bg-[var(--bg)] py-32">
      <div className="mx-auto w-[min(1400px,92vw)]">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <SectionLabel index="01" label="Services" />
            <SplitText
              as="h2"
              text="Four disciplines. One standard."
              className="mt-6 max-w-[18ch] font-display text-[clamp(2.4rem,5.2vw,5rem)] font-light leading-[1.02] tracking-[-0.025em] text-cinema"
            />
          </div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-md text-[var(--fg-soft)] leading-[1.7]"
          >
            Each offering is calibrated to the rhythm of your space —
            never standardised, always composed.
          </motion.p>
        </div>
      </div>

      <div className="relative mt-20 h-[160vh]">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <motion.div
            className="flex gap-6 px-[4vw] will-change-transform"
            style={{ x: trackX }}
          >
            {services.map((s, i) => (
              <ServiceCard
                key={s.no}
                service={s}
                index={i}
                onEnter={() => setVariant('hover')}
                onLeave={() => setVariant('default')}
              />
            ))}
            <div className="flex items-center px-2">
              <a
                href="#contact"
                className="group relative flex h-[60vh] w-[70vw] max-w-[420px] shrink-0 flex-col items-start justify-between rounded-[24px] border border-[var(--line)] bg-[var(--glass)] p-10"
                onMouseEnter={() => setVariant('view')}
                onMouseLeave={() => setVariant('default')}
              >
                <div className="eyebrow">
                  <span className="text-champagne">Bespoke</span>
                </div>
                <div>
                  <div className="font-display text-[clamp(1.8rem,2.4vw,2.4rem)] leading-[1.05] tracking-[-0.02em] text-cinema">
                    Don&apos;t see your need?
                  </div>
                  <p className="mt-4 text-[var(--fg-soft)]">
                    Tell us about your space. We&apos;ll compose a tailored
                    program — quietly, within a week.
                  </p>
                </div>
                <div className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-champagne">
                  Compose with us
                  <span className="transition-transform duration-500 group-hover:translate-x-2">
                    →
                  </span>
                </div>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  service,
  index,
  onEnter,
  onLeave,
}: {
  service: (typeof services)[number];
  index: number;
  onEnter: () => void;
  onLeave: () => void;
}) {
  return (
    <motion.article
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="group relative h-[60vh] w-[78vw] max-w-[460px] shrink-0 overflow-hidden rounded-[24px] border border-[var(--line)] bg-[var(--glass)] p-10"
    >
      {/* Cinematic vignette */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 80% -10%, rgba(31,132,84,0.18), transparent 60%)',
        }}
      />

      <div className="relative flex h-full flex-col justify-between">
        <div className="flex items-start justify-between">
          <span className="font-mono text-xs text-champagne">{service.no}</span>
          <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--muted)]">
            {service.sub}
          </span>
        </div>

        <div>
          <h3 className="font-display text-[clamp(2rem,2.8vw,2.6rem)] leading-[1.02] tracking-[-0.02em] text-cinema">
            {service.title}
          </h3>
          <p className="mt-5 max-w-md text-[15px] leading-[1.65] text-[var(--fg-soft)]">
            {service.body}
          </p>
        </div>

        <div>
          <div className="divider-gradient mb-5" />
          <ul className="grid grid-cols-3 gap-4">
            {service.metrics.map(([k, v]) => (
              <li key={k}>
                <div className="text-[9px] uppercase tracking-[0.3em] text-[var(--muted)]">{k}</div>
                <div className="mt-1.5 font-display text-sm text-[var(--fg)]">{v}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.article>
  );
}
