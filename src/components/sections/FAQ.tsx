'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SplitText } from '@/components/ui/SplitText';
import { SectionLabel } from '@/components/ui/SectionLabel';

const faqs = [
  {
    q: 'How is Sauber & Zauber different from a standard service?',
    a: 'We don\'t scale by volume — we scale by precision. Every crew is led by a conductor who knows your space, your surfaces, and your preferences by name. Service is choreographed, not dispatched.',
  },
  {
    q: 'Are your crews vetted and insured?',
    a: 'Yes. Every specialist passes a background screening, an in-house training residency, and an NDA. All sessions are insured to €10M and documented in a private, GDPR-compliant log accessible only to you.',
  },
  {
    q: 'What products do you use on delicate surfaces?',
    a: 'Our formulas are eco-luxe and surface-matched: pH-balanced cleansers for marble & travertine, conservator-grade conditioners for leather and oiled wood, and HEPA + UV systems for archival rooms.',
  },
  {
    q: 'Can you serve multiple residences?',
    a: 'Yes — our Privé program coordinates across residences, yachts, jets, and offices, with a single concierge line and unified scheduling. Travel is included for retreats over four nights.',
  },
  {
    q: 'How do I begin?',
    a: 'A 45-minute private consultation. We walk through your space, take surface notes, calibrate your scent and acoustic preferences, and return a composed program within 24 hours.',
  },
  {
    q: 'Is your service available outside Germany?',
    a: 'Permanent crews operate in Munich, Hamburg, Berlin, and Zürich. We compose travelling programs for clients in Côte d\'Azur, the Engadin, Mallorca, and the Greek islands.',
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative bg-[var(--bg)] py-32">
      <div className="mx-auto w-[min(1100px,92vw)]">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <SectionLabel index="06" label="Index" />
            <SplitText
              as="h2"
              text="Quiet curiosities, openly addressed."
              className="mt-6 max-w-[20ch] font-display text-[clamp(2.4rem,5.2vw,5rem)] font-light leading-[1.02] tracking-[-0.025em] text-cinema"
            />
          </div>
        </div>

        <div className="mt-16 border-t border-[var(--line-strong)]">
          {faqs.map((item, i) => (
            <FAQItem
              key={i}
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
  q,
  a,
  n,
  isOpen,
  onToggle,
}: {
  q: string;
  a: string;
  n: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="group relative overflow-hidden border-b border-[var(--line-strong)]">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 origin-left"
        style={{
          background:
            'linear-gradient(90deg, rgba(31,132,84,0.08), transparent 70%)',
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isOpen ? 1 : 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      />
      <button
        onClick={onToggle}
        className="relative flex w-full items-center justify-between gap-6 py-7 text-left"
      >
        <div className="flex items-baseline gap-6">
          <span className="font-mono text-[11px] tracking-widest text-champagne">
            {String(n).padStart(2, '0')}
          </span>
          <span className="font-display text-[clamp(1.2rem,1.8vw,1.7rem)] leading-[1.25] text-[var(--fg)]">
            {q}
          </span>
        </div>
        <motion.span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--line-strong)]"
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-[64px_1fr] gap-6 pb-8 pr-12">
              <span />
              <p className="max-w-2xl text-[var(--fg-soft)] leading-[1.7]">{a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
