'use client';

import { useRef, useState, useEffect } from 'react';
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

/**
 * Two layouts:
 *  - Desktop: scroll-pinned horizontal track (one cinematic moment, one useScroll).
 *  - Mobile: a simple stacked column. Cheap, fast, native scrolling.
 */
export function Services() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 900px) and (pointer: fine)');
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <section id="services" className="relative bg-[var(--bg)] py-32">
      <div className="mx-auto w-[min(1400px,92vw)]">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <SectionLabel index="01" label="Services" />
            <SplitText
              as="h2"
              text="Four disciplines. One standard."
              className="mt-6 max-w-[18ch] font-display text-[clamp(2.2rem,5vw,4.8rem)] font-light leading-[1.02] tracking-[-0.025em] text-cinema"
            />
          </div>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-md text-[var(--fg-soft)] leading-[1.7]"
          >
            Each offering is calibrated to the rhythm of your space —
            never standardised, always composed.
          </motion.p>
        </div>
      </div>

      {isDesktop ? <DesktopTrack /> : <MobileStack />}
    </section>
  );
}

function DesktopTrack() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const trackX = useTransform(scrollYProgress, [0.05, 0.95], ['2%', '-70%']);
  const { setVariant } = useCursor();

  return (
    <div ref={ref} className="relative mt-20 h-[160vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div className="flex gap-6 px-[4vw] will-change-transform" style={{ x: trackX }}>
          {services.map((s) => (
            <ServiceCard
              key={s.no}
              service={s}
              onEnter={() => setVariant('hover')}
              onLeave={() => setVariant('default')}
            />
          ))}
          <BespokeCard onEnter={() => setVariant('view')} onLeave={() => setVariant('default')} />
        </motion.div>
      </div>
    </div>
  );
}

function MobileStack() {
  return (
    <div className="mx-auto mt-16 grid w-[min(1400px,92vw)] gap-4">
      {services.map((s, i) => (
        <motion.article
          key={s.no}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.75, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-[20px] border border-[var(--line)] p-7"
        >
          <div className="flex items-start justify-between">
            <span className="font-mono text-xs text-gold-soft">{s.no}</span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--muted)]">{s.sub}</span>
          </div>
          <h3 className="mt-8 font-display text-[1.8rem] leading-[1.05] tracking-[-0.02em] text-cinema">
            {s.title}
          </h3>
          <p className="mt-4 text-[15px] leading-[1.65] text-[var(--fg-soft)]">{s.body}</p>
          <div className="divider-gradient my-5" />
          <ul className="grid grid-cols-3 gap-3">
            {s.metrics.map(([k, v]) => (
              <li key={k}>
                <div className="text-[9px] uppercase tracking-[0.3em] text-[var(--muted)]">{k}</div>
                <div className="mt-1 font-display text-[13px] text-[var(--fg)]">{v}</div>
              </li>
            ))}
          </ul>
        </motion.article>
      ))}
      <BespokeCard onEnter={() => {}} onLeave={() => {}} />
    </div>
  );
}

function ServiceCard({
  service,
  onEnter,
  onLeave,
}: {
  service: (typeof services)[number];
  onEnter: () => void;
  onLeave: () => void;
}) {
  return (
    <article
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="group relative h-[58vh] w-[78vw] max-w-[460px] shrink-0 overflow-hidden rounded-[24px] border border-[var(--line)] p-10 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 80% -10%, rgba(20,84,58,0.18), transparent 60%)',
        }}
      />
      <div className="relative flex h-full flex-col justify-between">
        <div className="flex items-start justify-between">
          <span className="font-mono text-xs text-gold-soft">{service.no}</span>
          <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--muted)]">{service.sub}</span>
        </div>
        <div>
          <h3 className="font-display text-[clamp(1.9rem,2.6vw,2.5rem)] leading-[1.02] tracking-[-0.02em] text-cinema">
            {service.title}
          </h3>
          <p className="mt-4 max-w-md text-[15px] leading-[1.65] text-[var(--fg-soft)]">{service.body}</p>
        </div>
        <div>
          <div className="divider-gradient mb-4" />
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
    </article>
  );
}

function BespokeCard({ onEnter, onLeave }: { onEnter: () => void; onLeave: () => void }) {
  return (
    <a
      href="#contact"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="group relative flex h-auto md:h-[58vh] w-full md:w-[70vw] md:max-w-[420px] shrink-0 flex-col items-start justify-between gap-8 rounded-[20px] border border-[var(--line)] bg-[var(--glass)] p-8 md:p-10"
    >
      <div className="eyebrow"><span className="text-gold-soft">Bespoke</span></div>
      <div>
        <div className="font-display text-[clamp(1.6rem,2.2vw,2.2rem)] leading-[1.05] tracking-[-0.02em] text-cinema">
          Don&apos;t see your need?
        </div>
        <p className="mt-3 text-[var(--fg-soft)]">
          Tell us about your space. We&apos;ll compose a tailored program — quietly, within a week.
        </p>
      </div>
      <div className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-gold-soft">
        Compose with us
        <span className="transition-transform duration-500 group-hover:translate-x-2">→</span>
      </div>
    </a>
  );
}
