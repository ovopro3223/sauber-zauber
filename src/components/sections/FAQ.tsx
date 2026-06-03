'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SplitText } from '@/components/ui/SplitText';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { useT } from '@/components/providers/LanguageProvider';

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  const t = useT({
    de: {
      label: 'FAQ',
      title: 'Leise Fragen, offen beantwortet.',
      faqs: [
        { q: 'Wie unterscheidet sich Sauber & Zauber von einer Standardreinigung?', a: 'Wir skalieren nicht über Volumen, sondern über Präzision. Jedes Team wird von einem Conductor geleitet, der Ihren Raum, Ihre Oberflächen und Ihre Vorlieben mit Namen kennt. Service wird choreografiert, nicht disponiert.' },
        { q: 'Sind Ihre Teams geprüft und versichert?', a: 'Ja. Jeder Spezialist durchläuft eine Hintergrundprüfung, eine interne Trainingsresidenz und einen NDA. Alle Einsätze sind bis €10 Mio versichert und in einem privaten, DSGVO-konformen Log dokumentiert.' },
        { q: 'Welche Mittel verwenden Sie auf empfindlichen Oberflächen?', a: 'Unsere Formeln sind eco-luxe und oberflächenabgestimmt: pH-balancierte Reiniger für Marmor und Travertin, restauratorisch hochwertige Konditionierer für Leder und geöltes Holz, HEPA- und UV-Systeme für Archivräume.' },
        { q: 'Können Sie mehrere Wohnsitze betreuen?', a: 'Ja — unser Privé-Programm koordiniert über Wohnsitze, Yachten, Jets und Büros, mit einer einzigen Concierge-Linie und vereinheitlichter Planung.' },
        { q: 'Wie beginne ich?', a: 'Eine 45-minütige private Beratung. Wir gehen durch Ihren Raum, machen Oberflächennotizen, kalibrieren Ihre Vorlieben und liefern innerhalb von 24 Stunden ein komponiertes Programm.' },
        { q: 'Ist Ihr Service außerhalb Deutschlands verfügbar?', a: 'Feste Teams arbeiten in Berlin, Hamburg, München und Zürich. Wir komponieren reisende Programme für Kunden an der Côte d\'Azur, im Engadin, auf Mallorca und den griechischen Inseln.' },
      ],
    },
    en: {
      label: 'FAQ',
      title: 'Quiet curiosities, openly addressed.',
      faqs: [
        { q: 'How is Sauber & Zauber different from a standard service?', a: "We don't scale by volume — we scale by precision. Every crew is led by a conductor who knows your space, your surfaces, and your preferences by name. Service is choreographed, not dispatched." },
        { q: 'Are your crews vetted and insured?', a: 'Yes. Every specialist passes a background screening, an in-house training residency, and an NDA. All sessions are insured to €10M and documented in a private, GDPR-compliant log.' },
        { q: 'What products do you use on delicate surfaces?', a: 'Our formulas are eco-luxe and surface-matched: pH-balanced cleansers for marble & travertine, conservator-grade conditioners for leather and oiled wood, and HEPA + UV systems for archival rooms.' },
        { q: 'Can you serve multiple residences?', a: 'Yes — our Privé program coordinates across residences, yachts, jets, and offices, with a single concierge line and unified scheduling.' },
        { q: 'How do I begin?', a: 'A 45-minute private consultation. We walk through your space, take surface notes, calibrate your preferences, and return a composed program within 24 hours.' },
        { q: 'Is your service available outside Germany?', a: "Permanent crews operate in Berlin, Hamburg, Munich, and Zürich. We compose travelling programs for clients in Côte d'Azur, the Engadin, Mallorca, and the Greek islands." },
      ],
    },
  });

  return (
    <section id="faq" className="relative bg-transparent py-32">
      <div className="mx-auto w-[min(1100px,92vw)]">
        <div>
          <SectionLabel index="05" label={t.label} />
          <SplitText
            key={t.title}
            as="h2"
            text={t.title}
            className="mt-6 max-w-[20ch] font-display text-[clamp(2.2rem,5vw,4.8rem)] font-light leading-[1.02] tracking-[-0.025em] text-cinema"
          />
        </div>

        <div className="mt-16 border-t border-[var(--line-strong)]">
          {t.faqs.map((item, i) => (
            <FAQItem
              key={`${t.label}-${i}`}
              q={item.q}
              a={item.a}
              n={i + 1}
              isOpen={open === i}
              onToggle={() => setOpen(open === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItem({
  q, a, n, isOpen, onToggle,
}: {
  q: string; a: string; n: number; isOpen: boolean; onToggle: () => void;
}) {
  return (
    <div className="group relative overflow-hidden border-b border-[var(--line-strong)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 origin-left transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          background: 'linear-gradient(90deg, rgba(95,227,161,0.10), transparent 70%)',
          transform: `scaleX(${isOpen ? 1 : 0})`,
        }}
      />
      <button onClick={onToggle} className="relative flex w-full items-center justify-between gap-6 py-7 text-left">
        <div className="flex items-baseline gap-6">
          <span className="font-mono text-[11px] tracking-widest text-mint">
            {String(n).padStart(2, '0')}
          </span>
          <span className="font-display text-[clamp(1.15rem,1.7vw,1.6rem)] leading-[1.25] text-[var(--fg)]">
            {q}
          </span>
        </div>
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--line-strong)] transition-transform duration-500"
          style={{ transform: `rotate(${isOpen ? 45 : 0}deg)` }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-[64px_1fr] gap-6 pb-7 pr-12">
              <span />
              <p className="max-w-2xl text-[var(--fg-soft)] leading-[1.7]">{a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
