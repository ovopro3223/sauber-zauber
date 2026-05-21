'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SplitText } from '@/components/ui/SplitText';
import { SectionLabel } from '@/components/ui/SectionLabel';

const steps = [
  {
    no: '01',
    title: 'Composition',
    sub: 'Consultation',
    body:
      'A private walkthrough of your space — architectural notes, surface mapping, scent and acoustic preferences logged.',
    time: '45 min',
  },
  {
    no: '02',
    title: 'Choreography',
    sub: 'Plan',
    body:
      'Your atelier program is composed: crew size, cadence, products, entry protocols — versioned and signed.',
    time: '24 h',
  },
  {
    no: '03',
    title: 'Performance',
    sub: 'Service',
    body:
      'A trained crew arrives in soft-soled discretion. Each pass is acoustic-aware, surface-safe, and documented in a private log.',
    time: 'Recurring',
  },
  {
    no: '04',
    title: 'Refinement',
    sub: 'Quality ritual',
    body:
      'We audit ourselves quarterly: photo logs, surface metrics, your feedback. The program evolves with your space.',
    time: 'Ongoing',
  },
];

export function Process() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 60%', 'end 30%'] });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="process" ref={ref} className="relative bg-[var(--bg)] py-32">
      <div className="mx-auto w-[min(1400px,94vw)]">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <SectionLabel index="III" label="Process" />
            <SplitText
              as="h2"
              text="Four movements, one performance."
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
            Cleaning isn&apos;t a transaction — it&apos;s a sequence of intentional acts.
            Every step is composed, scored, and quietly executed.
          </motion.p>
        </div>

        <div className="relative mt-24">
          {/* Vertical guideline */}
          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/5" />
          <motion.div
            className="absolute left-1/2 top-0 w-px -translate-x-1/2 bg-gradient-to-b from-gold-300 via-gold-400 to-aqua-400 origin-top"
            style={{ scaleY: lineScale, height: '100%' }}
          />

          <ol className="relative space-y-24">
            {steps.map((s, i) => (
              <li key={s.no} className="relative grid items-center gap-8 md:grid-cols-2">
                <motion.div
                  initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40, filter: 'blur(8px)' }}
                  whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className={`glass-strong rounded-3xl p-8 md:p-10 ${
                    i % 2 === 0 ? 'md:col-start-1 md:text-right' : 'md:col-start-2'
                  }`}
                >
                  <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-white/40">
                    <span className="font-mono text-gold-300">{s.no}</span>
                    <span>{s.sub}</span>
                    <span className="ml-auto rounded-full border border-white/10 px-2 py-0.5">
                      {s.time}
                    </span>
                  </div>
                  <h3 className="mt-6 font-display text-3xl md:text-4xl">{s.title}</h3>
                  <p className="mt-4 text-white/60">{s.body}</p>
                </motion.div>

                {/* Center dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute left-1/2 top-1/2 z-10 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--bg)] ring-1 ring-white/20"
                >
                  <div className="h-2 w-2 rounded-full bg-gold-300 shadow-[0_0_20px_4px_rgba(213,168,71,0.5)]" />
                </motion.div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
