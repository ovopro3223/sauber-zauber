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
    badge: null as string | null,
    highlight: false,
  },
  {
    name: 'Atelier',
    sub: 'Multi-floor homes & studios',
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
    badge: 'Most chosen' as string | null,
    highlight: true,
  },
  {
    name: 'Privé',
    sub: 'Estates & private offices',
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
    badge: 'By invitation' as string | null,
    highlight: false,
  },
];

const cadenceOptions: { id: Cadence; label: string }[] = [
  { id: 'weekly', label: 'Weekly' },
  { id: 'biweekly', label: 'Bi-weekly' },
  { id: 'monthly', label: 'Monthly' },
];

export function Pricing() {
  const [cadence, setCadence] = useState<Cadence>('biweekly');
  const { setVariant } = useCursor();

  return (
    <section id="pricing" className="relative bg-[var(--bg)] py-32">
      <div className="mx-auto w-[min(1300px,92vw)]">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <SectionLabel index="05" label="Membership" />
            <SplitText
              as="h2"
              text="Quietly composed memberships."
              className="mt-6 max-w-[20ch] font-display text-[clamp(2.2rem,5vw,4.8rem)] font-light leading-[1.02] tracking-[-0.025em] text-cinema"
            />
          </div>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-md text-[var(--fg-soft)] leading-[1.7]"
          >
            Three programs. Tuned to your cadence, your space, your privacy.
            Every plan is composed — never templated.
          </motion.p>
        </div>

        <LayoutGroup>
          <div className="mt-12 flex justify-center">
            <div className="relative inline-flex items-center gap-1 rounded-full border border-[var(--line)] p-1.5">
              {cadenceOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setCadence(opt.id)}
                  onMouseEnter={() => setVariant('hover')}
                  onMouseLeave={() => setVariant('default')}
                  className="relative rounded-full px-5 py-2.5 text-[11px] uppercase tracking-[0.25em]"
                >
                  {cadence === opt.id && (
                    <motion.span
                      layoutId="cadence-pill"
                      className="absolute inset-0 rounded-full bg-[var(--fg)]"
                      transition={{ type: 'spring', damping: 24, stiffness: 260 }}
                    />
                  )}
                  <span
                    className={`relative z-10 transition-colors duration-500 ${
                      cadence === opt.id ? 'text-[var(--bg)]' : 'text-[var(--fg-soft)]'
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
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.8 }}
          className="mt-12 text-center text-[10px] uppercase tracking-[0.35em] text-[var(--muted)]"
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.8, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative overflow-hidden rounded-[24px] p-8 md:p-10 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 ${
        tier.highlight
          ? 'border border-[rgba(45,122,85,0.35)] bg-[rgba(20,84,58,0.08)]'
          : 'border border-[var(--line)] bg-[var(--glass)]'
      }`}
    >
      {tier.highlight && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(45,122,85,0.20), transparent 60%)',
          }}
        />
      )}
      <div className="relative">
        <div className="flex items-center justify-between">
          <span className="font-display text-2xl text-[var(--fg)]">{tier.name}</span>
          {tier.badge && (
            <span
              className={`rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.3em] ${
                tier.highlight
                  ? 'bg-[rgba(45,122,85,0.2)] text-emerald-200'
                  : 'border border-[var(--line)] text-[var(--muted)]'
              }`}
            >
              {tier.badge}
            </span>
          )}
        </div>
        <div className="mt-1 text-[11px] uppercase tracking-[0.25em] text-[var(--muted)]">{tier.sub}</div>

        <div className="mt-10 flex items-end gap-2">
          <AnimatePresence mode="wait">
            <motion.span
              key={`${tier.name}-${cadence}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-[3.4rem] leading-none tracking-[-0.03em] text-cinema"
            >
              {typeof price.num === 'number' ? price.num.toLocaleString('de-DE') : price.num}
            </motion.span>
          </AnimatePresence>
          <span className="mb-2 text-[10px] uppercase tracking-[0.3em] text-[var(--muted)]">{price.unit}</span>
        </div>

        <ul className="mt-10 space-y-3">
          {tier.features.map((f) => (
            <li key={f} className="flex items-start gap-3 text-[14px] leading-[1.55] text-[var(--fg-soft)]">
              <span className="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full" style={{ background: 'rgba(220,196,136,0.85)' }} />
              {f}
            </li>
          ))}
        </ul>

        <Magnetic strength={0.12} range={70}>
          <a
            href="#contact"
            onMouseEnter={() => setVariant('hover')}
            onMouseLeave={() => setVariant('default')}
            className={`mt-10 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[11px] font-medium uppercase tracking-[0.25em] transition-colors duration-500 ${
              tier.highlight
                ? 'bg-[var(--fg)] text-[var(--bg)] hover:bg-[var(--cream)]'
                : 'border border-[var(--line-strong)] text-[var(--fg)] hover:border-[rgba(220,196,136,0.5)]'
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
