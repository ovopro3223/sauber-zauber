'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SplitText } from '@/components/ui/SplitText';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { useT } from '@/components/providers/LanguageProvider';

export function Process() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 60%', 'end 30%'] });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const t = useT({
    de: {
      label: 'Prozess',
      title: 'Vier Bewegungen, eine Performance.',
      lede:
        'Reinigung ist keine Transaktion — sie ist eine Abfolge bewusster Handlungen. Jede ist komponiert, partituriert und leise ausgeführt.',
      steps: [
        { no: '01', title: 'Komposition', sub: 'Beratung', body: 'Ein privater Rundgang — architektonische Notizen, Oberflächenkartierung, Duft- und Akustikpräferenzen werden leise erfasst.', time: '45 Min' },
        { no: '02', title: 'Choreografie', sub: 'Plan', body: 'Ihr Atelier-Programm wird komponiert: Teamgröße, Rhythmus, Mittel, Zugangsprotokolle — versioniert und unterzeichnet.', time: '24 Std' },
        { no: '03', title: 'Performance', sub: 'Einsatz', body: 'Ein engagiertes Team arbeitet diskret und leise. Akustikbewusst, materialschonend, Archiv-Log-konform.', time: 'Wiederkehrend' },
        { no: '04', title: 'Verfeinerung', sub: 'Qualitätsritual', body: 'Wir prüfen uns vierteljährlich selbst: Foto-Logs, Oberflächenkennzahlen, Ihr Feedback. Das Programm wächst mit Ihrem Raum.', time: 'Fortlaufend' },
      ],
    },
    en: {
      label: 'Process',
      title: 'Four movements, one performance.',
      lede:
        "Cleaning isn't a transaction — it's a sequence of intentional acts. Each is composed, scored, and quietly executed.",
      steps: [
        { no: '01', title: 'Composition', sub: 'Consultation', body: 'A private walkthrough — architectural notes, surface mapping, scent and acoustic preferences quietly logged.', time: '45 min' },
        { no: '02', title: 'Choreography', sub: 'Plan', body: 'Your atelier program is composed: crew size, cadence, products, entry protocols — versioned and signed.', time: '24 h' },
        { no: '03', title: 'Performance', sub: 'Service', body: 'A devoted crew arrives in soft-soled discretion. Acoustic-aware, surface-safe, archive-logged.', time: 'Recurring' },
        { no: '04', title: 'Refinement', sub: 'Quality ritual', body: 'We audit ourselves quarterly: photo logs, surface metrics, your feedback. The program evolves with your space.', time: 'Ongoing' },
      ],
    },
  });

  return (
    <section id="process" ref={ref} className="relative bg-transparent py-32">
      <div className="mx-auto w-[min(1300px,92vw)]">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <SectionLabel index="03" label={t.label} />
            <SplitText
              key={t.title}
              as="h2"
              text={t.title}
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
            {t.lede}
          </motion.p>
        </div>

        <div className="relative mt-24">
          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[var(--line)]" />
          <motion.div
            aria-hidden
            className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 origin-top will-change-transform"
            style={{
              scaleY: lineScale,
              background:
                'linear-gradient(180deg, rgba(95,227,161,0.85), rgba(45,191,122,0.65) 60%, transparent)',
            }}
          />

          <ol className="relative space-y-20">
            {t.steps.map((s, i) => (
              <li key={s.no} className="relative grid items-center gap-8 md:grid-cols-2">
                <motion.div
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-10%' }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className={`rounded-[20px] border border-[var(--line)] bg-[rgba(8,30,22,0.4)] p-8 md:p-10 ${
                    i % 2 === 0 ? 'md:col-start-1 md:text-right' : 'md:col-start-2'
                  }`}
                >
                  <div
                    className={`flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-[var(--muted)] ${
                      i % 2 === 0 ? 'md:flex-row-reverse' : ''
                    }`}
                  >
                    <span className="font-mono text-mint">{s.no}</span>
                    <span>{s.sub}</span>
                    <span
                      className={`rounded-full border border-[var(--line)] px-2.5 py-0.5 ${
                        i % 2 === 0 ? 'md:mr-auto' : 'ml-auto'
                      }`}
                    >
                      {s.time}
                    </span>
                  </div>
                  <h3 className="mt-6 font-display text-[clamp(1.7rem,2.4vw,2.4rem)] leading-[1.05] tracking-[-0.02em] text-cinema">
                    {s.title}
                  </h3>
                  <p className="mt-4 text-[var(--fg-soft)] leading-[1.65]">{s.body}</p>
                </motion.div>

                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: '-10%' }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute left-1/2 top-1/2 z-10 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--bg)] ring-1 ring-[var(--line-strong)]"
                >
                  <div className="h-1.5 w-1.5 rounded-full anim-pulse" style={{ background: '#5fe3a1' }} />
                </motion.div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
