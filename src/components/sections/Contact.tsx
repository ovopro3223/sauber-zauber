'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SplitText } from '@/components/ui/SplitText';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Magnetic } from '@/components/ui/Magnetic';
import { useCursor } from '@/components/providers/CursorProvider';
import { useT } from '@/components/providers/LanguageProvider';

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const { setVariant } = useCursor();

  const t = useT({
    de: {
      label: 'Anfrage',
      title: 'Ein leises Gespräch zuerst.',
      lede:
        'Erzählen Sie uns von Ihrem Raum, Ihrem Rhythmus und was Ihre Wohnung oder Ihr Studio sich gewünscht fühlen lässt. Wir antworten innerhalb von 24 Stunden — von einem Menschen, nicht aus einer Warteschlange.',
      contacts: [
        ['Telefon', '+49 176 23220656'],
        ['E-Mail', 'info@sauberundzauber.de'],
        ['Adresse', 'Dossestr. 6, 10247 Berlin'],
        ['Antwort', 'Innerhalb von 24 Stunden'],
      ],
      interests: ['Hausreinigung', 'Büroreinigung', 'Glas & Fenster', 'Nach Bauphasen', 'Möbel', 'Sonderwunsch'],
      interestsLabel: 'Interesse',
      name: 'Ihr Name',
      namePlaceholder: 'Frau Schmidt',
      email: 'E-Mail Adresse',
      emailPlaceholder: 'sie@beispiel.de',
      city: 'Stadt',
      cityPlaceholder: 'Berlin · Hamburg · München',
      message: 'Erzählen Sie uns von Ihrem Raum',
      messagePlaceholder: 'Quadratmeter, Oberflächen, Rhythmus, Duftpräferenzen …',
      cta: 'An Concierge senden',
      success: 'Erhalten. Ein Concierge meldet sich innerhalb von 24 Stunden.',
    },
    en: {
      label: 'Begin',
      title: 'A quiet conversation, first.',
      lede:
        'Tell us about your space, your cadence, and what would make your home or studio feel cared for. We respond within 24 hours — by a person, not a queue.',
      contacts: [
        ['Phone', '+49 176 23220656'],
        ['Email', 'info@sauberundzauber.de'],
        ['Address', 'Dossestr. 6, 10247 Berlin'],
        ['Response', 'Within 24 hours'],
      ],
      interests: ['House cleaning', 'Office cleaning', 'Glass & windows', 'Post-construction', 'Furniture', 'Bespoke'],
      interestsLabel: 'Interests',
      name: 'Your name',
      namePlaceholder: 'Frau Schmidt',
      email: 'Letter address',
      emailPlaceholder: 'you@residence.de',
      city: 'City',
      cityPlaceholder: 'Berlin · Hamburg · Munich',
      message: 'Tell us about your space',
      messagePlaceholder: 'Square meters, surfaces, cadence, scent preferences …',
      cta: 'Send to concierge',
      success: 'Received. A concierge will write to you within 24 hours.',
    },
  });

  const [selected, setSelected] = useState<string[]>([t.interests[0]]);
  const toggle = (i: string) =>
    setSelected((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]));

  return (
    <section id="contact" className="relative overflow-hidden bg-transparent py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 30% 30%, rgba(95,227,161,0.12), transparent 60%),' +
            'radial-gradient(ellipse 50% 40% at 80% 80%, rgba(45,191,122,0.08), transparent 60%)',
        }}
      />

      <div className="relative mx-auto w-[min(1200px,92vw)]">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <div>
            <SectionLabel index="06" label={t.label} />
            <SplitText
              key={t.title}
              as="h2"
              text={t.title}
              className="mt-6 max-w-[18ch] font-display text-[clamp(2.2rem,5vw,4.8rem)] font-light leading-[1.02] tracking-[-0.025em] text-cinema"
            />
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 max-w-md text-[var(--fg-soft)] leading-[1.7]"
            >
              {t.lede}
            </motion.p>

            <div className="mt-14 space-y-5">
              {t.contacts.map(([k, v], i) => (
                <motion.div
                  key={k}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-10%' }}
                  transition={{ duration: 0.7, delay: 0.15 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center justify-between border-b border-[var(--line)] pb-4"
                >
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--muted)]">{k}</span>
                  <span className="font-display text-base text-[var(--fg)]">{v}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.form
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
              window.setTimeout(() => setSubmitted(false), 6000);
            }}
            className="relative overflow-hidden rounded-[24px] border border-[var(--line)] bg-[rgba(8,30,22,0.45)] p-8 md:p-10"
          >
            <div className="space-y-6">
              <Field label={t.name}>
                <input
                  required type="text" placeholder={t.namePlaceholder} className="contact-input"
                  onFocus={() => setVariant('text')} onBlur={() => setVariant('default')}
                />
              </Field>
              <Field label={t.email}>
                <input
                  required type="email" placeholder={t.emailPlaceholder} className="contact-input"
                  onFocus={() => setVariant('text')} onBlur={() => setVariant('default')}
                />
              </Field>
              <Field label={t.city}>
                <input
                  type="text" placeholder={t.cityPlaceholder} className="contact-input"
                  onFocus={() => setVariant('text')} onBlur={() => setVariant('default')}
                />
              </Field>

              <div>
                <label className="text-[10px] uppercase tracking-[0.3em] text-[var(--muted)]">{t.interestsLabel}</label>
                <div className="mt-3 flex flex-wrap gap-2">
                  {t.interests.map((i) => {
                    const active = selected.includes(i);
                    return (
                      <button
                        type="button"
                        key={i}
                        onClick={() => toggle(i)}
                        onMouseEnter={() => setVariant('hover')}
                        onMouseLeave={() => setVariant('default')}
                        className={`rounded-full border px-4 py-2 text-xs transition-colors duration-500 ${
                          active
                            ? 'border-mint bg-[rgba(95,227,161,0.12)] text-mint'
                            : 'border-[var(--line)] text-[var(--fg-soft)] hover:text-[var(--fg)]'
                        }`}
                      >
                        {i}
                      </button>
                    );
                  })}
                </div>
              </div>

              <Field label={t.message}>
                <textarea
                  rows={4} placeholder={t.messagePlaceholder}
                  className="contact-input resize-none"
                  onFocus={() => setVariant('text')} onBlur={() => setVariant('default')}
                />
              </Field>

              <Magnetic strength={0.12} range={70}>
                <button
                  type="submit"
                  className="btn-primary w-full justify-center"
                  onMouseEnter={() => setVariant('hover')}
                  onMouseLeave={() => setVariant('default')}
                >
                  {t.cta}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </button>
              </Magnetic>
            </div>

            <AnimatePresence>
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-6 rounded-2xl border border-mint bg-[rgba(95,227,161,0.10)] px-5 py-4 text-sm text-mint"
                >
                  {t.success}
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
          border-bottom: 1px solid var(--line);
          padding: 0.85rem 0;
          color: var(--fg);
          outline: none;
          font-size: 1rem;
          letter-spacing: -0.005em;
          transition: border-color 0.55s var(--ease);
        }
        :global(.contact-input)::placeholder { color: var(--muted); }
        :global(.contact-input):focus { border-color: var(--green-bright); }
      `}</style>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--muted)]">{label}</span>
      <div className="mt-1">{children}</div>
    </label>
  );
}
