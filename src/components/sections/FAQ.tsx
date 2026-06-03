'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SplitText } from '@/components/ui/SplitText';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { AccentLine } from '@/components/ui/AccentLine';
import { useT } from '@/components/providers/LanguageProvider';

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  const t = useT({
    de: {
      label: 'FAQ',
      title: 'Häufige Fragen, klar beantwortet.',
      faqs: [
        {
          q: 'Wann erhalte ich ein Angebot?',
          a: 'Wir antworten innerhalb von 24 Stunden auf jede Anfrage — meist schon am selben Werktag. Das erste Angebot ist immer unverbindlich und kostenlos.',
        },
        {
          q: 'Sind Ihre Teams versichert?',
          a: 'Ja. Alle Mitarbeiter sind angemeldet, geschult und vollständig haftpflichtversichert. Sollte einmal etwas passieren, wird es schnell und unkompliziert geregelt.',
        },
        {
          q: 'Welche Reinigungsmittel verwenden Sie?',
          a: 'Standardmäßig nutzen wir hochwertige Profi-Mittel, die Oberflächen schonen. Auf Wunsch arbeiten wir mit umweltfreundlichen, bio-zertifizierten Produkten — besonders sinnvoll bei Allergikern, Haustieren oder Kindern.',
        },
        {
          q: 'Buche ich einmalig oder regelmäßig?',
          a: 'Beides ist möglich. Viele Kunden starten mit einer einmaligen Reinigung und steigen dann auf einen wöchentlichen oder zweiwöchentlichen Rhythmus um. Sie binden sich nicht an einen Vertrag — Sie können jederzeit pausieren oder kündigen.',
        },
        {
          q: 'Wer kommt zu mir nach Hause?',
          a: 'Wir arbeiten mit einem festen Stammteam. Sie lernen Ihre Reinigungskräfte persönlich kennen, und so weit möglich kommen immer dieselben Personen — das schafft Vertrauen und konstante Qualität.',
        },
        {
          q: 'Reinigen Sie auch außerhalb Berlins?',
          a: 'Nein, wir sind ausschließlich in Berlin tätig und kennen jede Ecke der Stadt. So bleiben unsere Wege kurz und wir können auch kurzfristige Termine zuverlässig wahrnehmen.',
        },
      ],
    },
    en: {
      label: 'FAQ',
      title: 'Frequent questions, clearly answered.',
      faqs: [
        {
          q: 'When will I receive a quote?',
          a: 'We reply to every inquiry within 24 hours — usually the same business day. The first quote is always non-binding and free of charge.',
        },
        {
          q: 'Are your teams insured?',
          a: 'Yes. All staff are properly employed, trained, and fully liability-insured. If anything ever goes wrong, it is resolved quickly and without hassle.',
        },
        {
          q: 'What cleaning products do you use?',
          a: 'By default we use high-quality professional products that protect surfaces. On request we work with eco-friendly, certified-organic products — especially useful for allergy sufferers, pets, or children.',
        },
        {
          q: 'Do I book once or regularly?',
          a: 'Both are possible. Many clients start with a one-off cleaning and then move to a weekly or bi-weekly rhythm. No contract — you can pause or cancel anytime.',
        },
        {
          q: 'Who comes to my home?',
          a: 'We work with a fixed regular team. You get to know your cleaners personally, and as much as possible the same people come each time — that builds trust and consistent quality.',
        },
        {
          q: 'Do you also clean outside Berlin?',
          a: 'No, we operate exclusively in Berlin and know every corner of the city. That keeps our routes short and lets us reliably handle even last-minute appointments.',
        },
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
          <AccentLine />
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
