'use client';

import { useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { SplitText } from '@/components/ui/SplitText';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Magnetic } from '@/components/ui/Magnetic';
import { useCursor } from '@/components/providers/CursorProvider';

type Cadence = 'weekly' | 'biweekly' | 'monthly';

const tiers = [
  {
    name: 'Maison',
    sub: 'For a single residence',
    weekly: { num: 980, unit: '€ / session' },
    biweekly: { num: 1180, unit: '€ / session' },
    monthly: { num: 1480, unit: '€ / session' },
    features: [
      'Crew of 3 specialists',
      'Surface-mapped cleaning plan',
      'Eco-luxe formulas',
      'Concierge messaging',
      'Private session log',
    ],
    cta: 'Begin a Maison program',
    accent: 'gold',
    badge: null,
  },
  {
    name: 'Atelier',
    sub: 'For multi-floor homes & studios',
    weekly: { num: 1640, unit: '€ / session' },
    biweekly: { num: 1980, unit: '€ / session' },
    monthly: { num: 2390, unit: '€ / session' },
    features: [
      'Crew of 4 + lead conductor',
      'Bi-annual restoration ritual',
      'NDA-signed, biometric entry',
      'Quarterly performance audit',
      '90-min concierge response',
      'Curated scent program',
    ],
    cta: 'Compose an Atelier program',
    accent: 'gold-bright',
    badge: 'Most chosen',
  },
  {
    name: 'Privé',
    sub: 'For estates & private offices',
    weekly: { num: 'POA' as const, unit: 'bespoke' },
    biweekly: { num: 'POA' as const, unit: 'bespoke' },
    monthly: { num: 'POA' as const, unit: 'bespoke' },
    features: [
      'Dedicated permanent crew',
      'Senior conductor on-site',
      '24/7 on-call turnaround',
      'Multi-residence coordination',
      'Travel-included for retreats',
      'Annual concierge retreat',
    ],
    cta: 'Speak with a director',
    accent: 'aqua',
    badge: 'By invitation',
  },
];

const cadenceOptions: { id: Cadence; label: string; note: string }[] = [
  { id: 'weekly', label: 'Weekly', note: 'Premium frequency' },
  { id: 'biweekly', label: 'Bi-weekly', note: 'Most chosen' },
  { id: 'monthly', label: 'Monthly', note: 'Light cadence' },
];

export function Pricing() {
  const [cadence, setCadence] = useState<Cadence>('biweekly');
  const { setVariant } = useCursor();

  return (
    <section id="pricing" className="relative bg-[var(--bg)] py-32">
      <div className="mx-auto w-[min(1400px,94vw)]">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <SectionLabel index="V" label="Membership" />
            <SplitText
              as="h2"
              text="Quietly composed memberships."
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
            Three programs. Tuned to your cadence, your space, your privacy.
            Every plan is composed — never templated.
          </motion.p>
        </div>

        <LayoutGroup>
          <div className="mt-12 flex justify-center">
            <div className="glass relative inline-flex items-center gap-1 rounded-full p-1.5">
              {cadenceOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setCadence(opt.id)}
                  onMouseEnter={() => setVariant('hover')}
                  onMouseLeave={() => setVariant('default')}
                  className="relative rounded-full px-5 py-2.5 text-[12px] uppercase tracking-[0.2em]"
                >
                  {cadence === opt.id && (
                    <motion.span
                      layoutId="cadence-pill"
                      className="absolute inset-0 rounded-full bg-white text-[var(--bg)]"
                      transition={{ type: 'spring', damping: 22, stiffness: 240 }}
                    />
                  )}
                  <span
                    className={`relative z-10 ${
                      cadence === opt.id ? 'text-[var(--bg)]' : 'text-white/70'
                    }`}
                  >
                    {opt.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </LayoutGroup>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {tiers.map((t, i) => (
            <PricingCard key={t.name} tier={t} cadence={cadence} index={i} />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mt-12 text-center text-[10px] uppercase tracking-[0.35em] text-white/40"
        >
          All programs include insurance · vetted crews · GDPR-compliant logs
        </motion.p>
      </div>
    </section>
  );
}

function PricingCard({
  tier,
  cadence,
  index,
}: {
  tier: (typeof tiers)[number];
  cadence: Cadence;
  index: number;
}) {
  const price = tier[cadence];
  const { setVariant } = useCursor();
  const isHighlight = tier.accent === 'gold-bright';

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      whileHover={{ y: -8 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={`relative overflow-hidden rounded-[28px] p-8 md:p-10 ${
        isHighlight
          ? 'glass-strong border-gold-400/30 ring-1 ring-gold-400/30'
          : 'glass'
      }`}
    >
      {isHighlight && (
        <div className="pointer-events-none absolute inset-0 opacity-30">
          <div className="absolute -top-1/2 left-1/2 h-[120%] w-[150%] -translate-x-1/2 rounded-full bg-gradient-to-br from-gold-200 via-gold-400 to-gold-600 blur-3xl" />
        </div>
      )}
      <div className="relative">
        <div className="flex items-center justify-between">
          <span className="font-display text-2xl text-white">{tier.name}</span>
          {tier.badge && (
            <span className="rounded-full bg-gold-400/15 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-gold-200">
              {tier.badge}
            </span>
          )}
        </div>
        <div className="mt-1 text-[11px] uppercase tracking-[0.25em] text-white/40">{tier.sub}</div>

        <div className="mt-8 flex items-end gap-2">
          <AnimatePresence mode="wait">
            <motion.span
              key={`${tier.name}-${cadence}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-5xl text-gradient-gold"
            >
              {typeof price.num === 'number' ? price.num.toLocaleString('de-DE') : price.num}
            </motion.span>
          </AnimatePresence>
          <span className="mb-2 text-xs uppercase tracking-[0.25em] text-white/40">{price.unit}</span>
        </div>

        <ul className="mt-8 space-y-3">
          {tier.features.map((f) => (
            <li key={f} className="flex items-start gap-3 text-sm text-white/70">
              <span className="mt-1 inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border border-gold-400/40">
                <span className="h-1 w-1 rounded-full bg-gold-300" />
              </span>
              {f}
            </li>
          ))}
        </ul>

        <Magnetic strength={0.18} range={80}>
          <a
            href="#contact"
            onMouseEnter={() => setVariant('hover')}
            onMouseLeave={() => setVariant('default')}
            className={`mt-10 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium uppercase tracking-[0.2em] transition ${
              isHighlight
                ? 'bg-gradient-to-b from-gold-200 to-gold-500 text-[var(--bg)] shadow-[0_20px_40px_-20px_rgba(213,168,71,0.7)]'
                : 'border border-white/15 text-white hover:bg-white/5'
            }`}
          >
            {tier.cta}
            <span>→</span>
          </a>
        </Magnetic>
      </div>
    </motion.div>
  );
}
