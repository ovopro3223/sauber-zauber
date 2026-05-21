'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SplitText } from '@/components/ui/SplitText';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { useCursor } from '@/components/providers/CursorProvider';

const services = [
  {
    no: '01',
    title: 'Residential Atelier',
    sub: 'For private homes & penthouses',
    body:
      'Crew-of-three discretion. Hand-polished surfaces, micro-detailed millwork, scent-curated atmospheres tuned to your home.',
    metrics: [
      ['Crew size', '3 specialists'],
      ['Avg. session', '4.5 h'],
      ['Frequency', 'Weekly · Bi-weekly'],
    ],
    accent: 'from-gold-200 via-gold-400 to-gold-600',
  },
  {
    no: '02',
    title: 'Private Office',
    sub: 'For studios & boutique HQs',
    body:
      'After-hours choreography. Surface-safe formulas for stone, oiled wood, fine textiles. NDA-signed crews, biometric entry.',
    metrics: [
      ['Crew size', '4 specialists'],
      ['Schedule', 'Night · pre-dawn'],
      ['Access', 'Biometric · key-safe'],
    ],
    accent: 'from-aqua-200 via-aqua-400 to-aqua-600',
  },
  {
    no: '03',
    title: 'Concierge Stay',
    sub: 'For yachts, jets, residences',
    body:
      'On-call turnaround for arrivals & departures. Linen pressing, glassware crystal-care, and ambient preparation rituals.',
    metrics: [
      ['Response', '90 min on-call'],
      ['Includes', 'Linen · scent · light'],
      ['Coverage', '24/7'],
    ],
    accent: 'from-ink-200 via-gold-300 to-gold-500',
  },
  {
    no: '04',
    title: 'Restoration & Deep',
    sub: 'For move-ins, listings, archives',
    body:
      'Forensic-level restoration: grout reset, stone-honing, leather conditioning, archive-grade dust extraction.',
    metrics: [
      ['Specialists', 'Up to 6'],
      ['Documentation', 'Photo log'],
      ['Equipment', 'HEPA · ULV · UV'],
    ],
    accent: 'from-gold-100 via-aqua-300 to-aqua-500',
  },
];

export function Services() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const trackX = useTransform(scrollYProgress, [0.05, 0.95], ['2%', '-72%']);
  const { setVariant } = useCursor();
  const [active, setActive] = useState(0);

  return (
    <section id="services" ref={ref} className="relative bg-[var(--bg)] py-32">
      <div className="mx-auto w-[min(1400px,94vw)]">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <SectionLabel index="I" label="Services" />
            <SplitText
              as="h2"
              text="Four disciplines. One standard."
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
            Each offering is calibrated to the rhythm of your space —
            never one-size-fits-all. Drag to browse, click to focus.
          </motion.p>
        </div>
      </div>

      {/* Horizontal scrolling stage */}
      <div className="relative mt-20 h-[140vh]">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <motion.div
            className="flex gap-8 px-[5vw] will-change-transform"
            style={{ x: trackX }}
          >
            {services.map((s, i) => (
              <ServiceCard
                key={s.no}
                service={s}
                active={active === i}
                onEnter={() => {
                  setVariant('hover');
                  setActive(i);
                }}
                onLeave={() => setVariant('default')}
              />
            ))}
            <div className="flex w-[60vw] items-center justify-center">
              <a
                href="#contact"
                className="glass relative flex h-[60vh] w-[40vw] max-w-[520px] flex-col items-center justify-center gap-4 rounded-[28px] text-center"
                onMouseEnter={() => setVariant('view')}
                onMouseLeave={() => setVariant('default')}
              >
                <span className="text-[10px] uppercase tracking-[0.4em] text-white/40">
                  Bespoke
                </span>
                <span className="font-display text-3xl text-white">
                  Don&apos;t see your need?
                </span>
                <span className="text-sm text-white/60">
                  Tell us about your space. We compose a tailored program.
                </span>
                <span className="mt-6 inline-flex items-center gap-2 text-gold-300">
                  Compose with us
                  <span>→</span>
                </span>
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
  active,
  onEnter,
  onLeave,
}: {
  service: (typeof services)[number];
  active: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  return (
    <motion.article
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative h-[60vh] w-[80vw] max-w-[520px] shrink-0 overflow-hidden rounded-[28px] glass-strong p-8 md:p-10"
    >
      <div
        className={`pointer-events-none absolute -top-1/2 left-1/2 h-[80%] w-[120%] -translate-x-1/2 rounded-full bg-gradient-to-br ${service.accent} opacity-30 blur-3xl transition-opacity duration-700`}
        style={{ opacity: active ? 0.55 : 0.22 }}
      />
      <div className="relative flex h-full flex-col justify-between">
        <div>
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-gold-300">{service.no}</span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">
              {service.sub}
            </span>
          </div>
          <h3 className="mt-10 font-display text-4xl leading-tight text-white md:text-5xl">
            {service.title}
          </h3>
          <p className="mt-5 max-w-md text-sm text-white/65 md:text-base">{service.body}</p>
        </div>
        <div>
          <div className="divider-gradient mb-5" />
          <ul className="grid grid-cols-3 gap-4">
            {service.metrics.map(([k, v]) => (
              <li key={k}>
                <div className="text-[10px] uppercase tracking-[0.25em] text-white/40">{k}</div>
                <div className="mt-1 font-display text-sm text-white">{v}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.article>
  );
}
