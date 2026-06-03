'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SplitText } from '@/components/ui/SplitText';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { useCursor } from '@/components/providers/CursorProvider';
import { useT } from '@/components/providers/LanguageProvider';

type Service = {
  no: string;
  title: string;
  sub: string;
  body: string;
  metrics: [string, string][];
};

export function Services() {
  const [isDesktop, setIsDesktop] = useState(false);

  const t = useT({
    de: {
      label: 'Leistungen',
      title: 'Fünf Disziplinen. Ein Standard.',
      lede:
        'Jede Leistung ist auf den Rhythmus Ihres Raums abgestimmt — niemals von der Stange, immer komponiert.',
      services: [
        {
          no: '01',
          title: 'Hausreinigung',
          sub: 'Wohnungen & Einfamilienhäuser',
          body: 'Gründlich und schonend — auf Ihren Rhythmus abgestimmt. Wir polieren Oberflächen, pflegen Stoffe und feinste Holzarbeiten.',
          metrics: [['Team', '3 Spezialisten'], ['Dauer', '≈ 4,5 h'], ['Rhythmus', 'Wöchentlich · 14-tägig']],
        },
        {
          no: '02',
          title: 'Büroreinigung',
          sub: 'Studios & Boutique-HQs',
          body: 'Diskrete Choreografie außerhalb der Geschäftszeiten. Materialfreundliche Formeln, NDA-Crew, biometrischer Zugang.',
          metrics: [['Team', '4 Spezialisten'], ['Zeit', 'Nacht · vor Sonnenaufgang'], ['Zugang', 'Biometrisch · Schlüsselsafe']],
        },
        {
          no: '03',
          title: 'Glas & Fenster',
          sub: 'Streifenfreier Glanz',
          body: 'Streifenfreier Glanz an Fenstern, Rahmen und Glasflächen — auch in höheren Etagen, umweltbewusst gearbeitet.',
          metrics: [['Team', '2 Spezialisten'], ['Werkzeug', 'Reines Wasser · Mikrofaser'], ['Höhe', 'Bis 4 Etagen']],
        },
        {
          no: '04',
          title: 'Nach Bauphasen',
          sub: 'Umzug · Übergabe · Archiv',
          body: 'Bauschutt, Staub und Rückstände verschwinden — übergabefertige Räume nach Renovierung oder Neubau.',
          metrics: [['Team', 'Bis zu 6'], ['Dokumentation', 'Foto-Log'], ['Technik', 'HEPA · ULV · UV']],
        },
        {
          no: '05',
          title: 'Möbelreinigung',
          sub: 'Sofas · Sessel · Polster',
          body: 'Tief, schonend und mit hygienischer Sorgfalt aufgefrischt. Auch wertvolle Lederbibliotheken und Vintage-Polster.',
          metrics: [['Team', '2 Spezialisten'], ['Werkzeug', 'Dampf · Konservierungspflege'], ['Trocknung', '2–4 h']],
        },
      ] as Service[],
      bespoke: {
        eye: 'Maßgeschneidert',
        title: 'Etwas Besonderes geplant?',
        body: 'Erzählen Sie es uns — wir komponieren leise und innerhalb einer Woche ein passendes Programm.',
        cta: 'Mit uns gestalten',
      },
    },
    en: {
      label: 'Services',
      title: 'Five disciplines. One standard.',
      lede:
        'Each offering is calibrated to the rhythm of your space — never standardised, always composed.',
      services: [
        {
          no: '01',
          title: 'House Cleaning',
          sub: 'Apartments & private homes',
          body: 'Thorough and gentle — tuned to your rhythm. We polish surfaces, tend fabrics and finest woodwork.',
          metrics: [['Crew', '3 specialists'], ['Session', '~4.5 h'], ['Cadence', 'Weekly · Bi-weekly']],
        },
        {
          no: '02',
          title: 'Office Cleaning',
          sub: 'Studios & boutique HQs',
          body: 'After-hours choreography. Surface-safe formulas, NDA-signed crews, biometric entry.',
          metrics: [['Crew', '4 specialists'], ['Schedule', 'Night · pre-dawn'], ['Access', 'Biometric · key-safe']],
        },
        {
          no: '03',
          title: 'Glass & Window',
          sub: 'Streak-free clarity',
          body: 'Streak-free clarity for windows, frames and glass surfaces — including upper floors, eco-conscious.',
          metrics: [['Crew', '2 specialists'], ['Tools', 'Pure water · microfibre'], ['Reach', 'Up to 4 floors']],
        },
        {
          no: '04',
          title: 'Post-construction',
          sub: 'Move-in · handover · archive',
          body: 'Forensic care. Dust extraction, residue removal, handover-ready rooms after renovation or new build.',
          metrics: [['Crew', 'Up to 6'], ['Record', 'Photo log'], ['Tools', 'HEPA · ULV · UV']],
        },
        {
          no: '05',
          title: 'Furniture',
          sub: 'Sofas · armchairs · upholstery',
          body: 'Deep, gentle, hygienic refresh — also for fine leather libraries and vintage upholstery.',
          metrics: [['Crew', '2 specialists'], ['Tools', 'Steam · conservation care'], ['Dry time', '2–4 h']],
        },
      ] as Service[],
      bespoke: {
        eye: 'Bespoke',
        title: "Don't see your need?",
        body: "Tell us about your space. We'll compose a tailored program — quietly, within a week.",
        cta: 'Compose with us',
      },
    },
  });

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 900px) and (pointer: fine)');
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <section id="services" className="relative bg-transparent py-32">
      <div className="mx-auto w-[min(1400px,92vw)]">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <SectionLabel index="01" label={t.label} />
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
      </div>

      {isDesktop ? (
        <DesktopTrack services={t.services} bespoke={t.bespoke} />
      ) : (
        <MobileStack services={t.services} bespoke={t.bespoke} />
      )}
    </section>
  );
}

function DesktopTrack({
  services,
  bespoke,
}: {
  services: Service[];
  bespoke: { eye: string; title: string; body: string; cta: string };
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const trackX = useTransform(scrollYProgress, [0.05, 0.95], ['2%', '-72%']);
  const { setVariant } = useCursor();

  return (
    <div ref={ref} className="relative mt-20 h-[170vh]">
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
          <BespokeCard
            bespoke={bespoke}
            onEnter={() => setVariant('view')}
            onLeave={() => setVariant('default')}
          />
        </motion.div>
      </div>
    </div>
  );
}

function MobileStack({
  services,
  bespoke,
}: {
  services: Service[];
  bespoke: { eye: string; title: string; body: string; cta: string };
}) {
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
            <span className="font-mono text-xs text-mint">{s.no}</span>
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
      <BespokeCard bespoke={bespoke} onEnter={() => {}} onLeave={() => {}} />
    </div>
  );
}

function ServiceCard({
  service,
  onEnter,
  onLeave,
}: {
  service: Service;
  onEnter: () => void;
  onLeave: () => void;
}) {
  return (
    <article
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="group relative h-[58vh] w-[78vw] max-w-[460px] shrink-0 overflow-hidden rounded-[24px] border border-[var(--line)] bg-[rgba(8,30,22,0.45)] p-10 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:border-[var(--line-strong)] hover:shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6),0_0_60px_-20px_var(--green-glow)]"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 80% -10%, rgba(95,227,161,0.18), transparent 60%)',
        }}
      />
      <div className="relative flex h-full flex-col justify-between">
        <div className="flex items-start justify-between">
          <span className="font-mono text-xs text-mint">{service.no}</span>
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

function BespokeCard({
  bespoke,
  onEnter,
  onLeave,
}: {
  bespoke: { eye: string; title: string; body: string; cta: string };
  onEnter: () => void;
  onLeave: () => void;
}) {
  return (
    <a
      href="#contact"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="group relative flex h-auto md:h-[58vh] w-full md:w-[70vw] md:max-w-[420px] shrink-0 flex-col items-start justify-between gap-8 rounded-[20px] border border-[var(--line)] bg-[var(--glass)] p-8 md:p-10"
    >
      <div className="eyebrow">{bespoke.eye}</div>
      <div>
        <div className="font-display text-[clamp(1.6rem,2.2vw,2.2rem)] leading-[1.05] tracking-[-0.02em] text-cinema">
          {bespoke.title}
        </div>
        <p className="mt-3 text-[var(--fg-soft)]">{bespoke.body}</p>
      </div>
      <div className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-mint">
        {bespoke.cta}
        <span className="transition-transform duration-500 group-hover:translate-x-2">→</span>
      </div>
    </a>
  );
}
