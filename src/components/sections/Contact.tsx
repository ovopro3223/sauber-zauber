'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SplitText } from '@/components/ui/SplitText';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Magnetic } from '@/components/ui/Magnetic';
import { useCursor } from '@/components/providers/CursorProvider';

const interests = [
  'Residential Atelier',
  'Private Office',
  'Concierge Stay',
  'Restoration & Deep',
  'Bespoke programme',
];

export function Contact() {
  const [selected, setSelected] = useState<string[]>([interests[0]]);
  const [submitted, setSubmitted] = useState(false);
  const { setVariant } = useCursor();

  const toggle = (i: string) =>
    setSelected((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]
    );

  return (
    <section id="contact" className="relative overflow-hidden bg-[var(--bg)] py-32">
      <div className="absolute inset-0 -z-0">
        <div className="absolute left-1/2 top-1/4 h-[60vmin] w-[60vmin] -translate-x-1/2 rounded-full bg-gold-400/15 blur-[120px]" />
        <div className="absolute right-1/4 bottom-0 h-[40vmin] w-[40vmin] rounded-full bg-aqua-400/15 blur-[120px]" />
      </div>

      <div className="relative mx-auto w-[min(1200px,94vw)]">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionLabel index="VII" label="Begin" />
            <SplitText
              as="h2"
              text="A quiet conversation, first."
              className="mt-6 font-display text-[clamp(2.4rem,5vw,5rem)] leading-[1.02] tracking-[-0.02em] text-gradient"
            />
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 max-w-md text-white/60"
            >
              Tell us about your space, your cadence, and what would make
              your home or studio feel cared for. We respond within 24 hours
              — by a person, not a queue.
            </motion.p>

            <div className="mt-12 space-y-6">
              {[
                ['Munich · Atelier', 'Maximilianstraße 14'],
                ['Berlin · Studio', 'Linienstraße 71'],
                ['Concierge', '+49 (0)89 1090 5500'],
                ['Letters', 'concierge@sauber-zauber.de'],
              ].map(([k, v], i) => (
                <motion.div
                  key={k}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center justify-between border-b border-white/10 pb-4"
                >
                  <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">{k}</span>
                  <span className="font-display text-lg text-white">{v}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.form
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
              window.setTimeout(() => setSubmitted(false), 6000);
            }}
            className="glass-strong relative overflow-hidden rounded-[32px] p-8 md:p-10"
          >
            <div className="space-y-6">
              <Field label="Your name">
                <input
                  required
                  type="text"
                  placeholder="Frau Schmidt"
                  className="contact-input"
                  onFocus={() => setVariant('text')}
                  onBlur={() => setVariant('default')}
                />
              </Field>
              <Field label="Letter address">
                <input
                  required
                  type="email"
                  placeholder="you@residence.de"
                  className="contact-input"
                  onFocus={() => setVariant('text')}
                  onBlur={() => setVariant('default')}
                />
              </Field>
              <Field label="City">
                <input
                  type="text"
                  placeholder="Munich · Hamburg · Zürich"
                  className="contact-input"
                  onFocus={() => setVariant('text')}
                  onBlur={() => setVariant('default')}
                />
              </Field>

              <div>
                <label className="text-[10px] uppercase tracking-[0.3em] text-white/40">
                  Interests
                </label>
                <div className="mt-3 flex flex-wrap gap-2">
                  {interests.map((i) => {
                    const active = selected.includes(i);
                    return (
                      <button
                        type="button"
                        key={i}
                        onClick={() => toggle(i)}
                        onMouseEnter={() => setVariant('hover')}
                        onMouseLeave={() => setVariant('default')}
                        className={`rounded-full border px-4 py-2 text-xs transition-all duration-300 ${
                          active
                            ? 'border-gold-400/50 bg-gold-400/15 text-gold-200'
                            : 'border-white/15 text-white/60 hover:text-white'
                        }`}
                      >
                        {i}
                      </button>
                    );
                  })}
                </div>
              </div>

              <Field label="Tell us about your space">
                <textarea
                  rows={4}
                  placeholder="Square meters, surfaces, cadence, scent preferences…"
                  className="contact-input resize-none"
                  onFocus={() => setVariant('text')}
                  onBlur={() => setVariant('default')}
                />
              </Field>

              <Magnetic strength={0.18} range={80}>
                <button
                  type="submit"
                  className="btn-primary w-full justify-center"
                  onMouseEnter={() => setVariant('hover')}
                  onMouseLeave={() => setVariant('default')}
                >
                  Send to concierge
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </button>
              </Magnetic>
            </div>

            <AnimatePresence>
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-6 rounded-2xl border border-gold-400/30 bg-gold-400/10 px-5 py-4 text-sm text-gold-100"
                >
                  Received. A concierge will write to you within 24 hours.
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>
        </div>
      </div>

      <style jsx>{`
        :global(.contact-input) {
          width: 100%;
          border: none;
          background: transparent;
          border-bottom: 1px solid rgba(255, 255, 255, 0.15);
          padding: 0.85rem 0;
          color: var(--fg);
          outline: none;
          font-size: 1rem;
          letter-spacing: -0.005em;
          transition: border-color 0.4s, color 0.4s;
        }
        :global(.contact-input)::placeholder {
          color: rgba(255, 255, 255, 0.3);
        }
        :global(.contact-input):focus {
          border-color: rgba(213, 168, 71, 0.7);
        }
      `}</style>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">{label}</span>
      <div className="mt-1">{children}</div>
    </label>
  );
}
