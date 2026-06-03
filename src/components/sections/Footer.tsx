'use client';

import { motion } from 'framer-motion';
import { Logo } from '@/components/ui/Logo';
import { useCursor } from '@/components/providers/CursorProvider';

const columns = [
  {
    title: 'Leistungen',
    items: [
      { label: 'Hausreinigung', href: '#services' },
      { label: 'Büroreinigung', href: '#services' },
      { label: 'Glas- & Fensterreinigung', href: '#services' },
      { label: 'Reinigung nach Bauphasen', href: '#services' },
      { label: 'Möbelreinigung', href: '#services' },
    ],
  },
  {
    title: 'Kontakt',
    items: [
      { label: '+49 176 23220656', href: 'tel:+4917623220656' },
      { label: 'info@sauberundzauber.de', href: 'mailto:info@sauberundzauber.de' },
      { label: 'Dossestr. 6, 10247 Berlin', href: '#' },
    ],
  },
];

export function Footer() {
  const { setVariant } = useCursor();

  return (
    <footer className="relative isolate overflow-hidden">
      <div className="relative mx-auto w-[min(1400px,92vw)] pt-32">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 eyebrow"
        >
          Andere schrubben · Wir zaubern
        </motion.div>

        <h2 className="overflow-hidden font-display text-[clamp(3.6rem,16vw,17rem)] font-light leading-[0.85] tracking-[-0.045em] text-cinema anim-wordmark-drift">
          Sauber<span className="text-mint">.</span>
          <br />
          Zauber<span className="text-mint">.</span>
        </h2>

        <div className="mt-20 grid gap-12 md:grid-cols-[2fr_3fr]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            <a href="#top" className="flex items-center gap-3">
              <Logo size={48} />
              <span className="font-display text-[18px] leading-none tracking-tight">
                Sauber<span className="px-0.5 italic text-mint">&amp;</span>Zauber
              </span>
            </a>
            <p className="mt-6 max-w-md text-[var(--fg-soft)] leading-[1.7]">
              Premium-Reinigungsdienste in Berlin — diskret, gründlich,
              magisch sauber. Auf Wunsch mit umweltfreundlichen Mitteln und
              festem Stammteam.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-10 flex max-w-md items-center gap-2 rounded-full border border-[var(--line-strong)] px-2 py-2"
            >
              <input
                type="email"
                placeholder="Ihre E-Mail Adresse"
                className="flex-1 bg-transparent px-4 py-2 text-sm text-[var(--fg)] outline-none placeholder:text-[var(--muted)]"
                onFocus={() => setVariant('text')}
                onBlur={() => setVariant('default')}
              />
              <button
                type="submit"
                className="rounded-full bg-gradient-to-b from-[#6fefac] to-[#2fbf7a] px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#042014] transition-transform hover:-translate-y-0.5"
                onMouseEnter={() => setVariant('hover')}
                onMouseLeave={() => setVariant('default')}
              >
                Abonnieren
              </button>
            </form>
          </motion.div>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            {columns.map((col, i) => (
              <motion.div
                key={col.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 0.75, delay: 0.08 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              >
                <h4 className="text-[10px] uppercase tracking-[0.32em] text-[var(--muted)]">{col.title}</h4>
                <ul className="mt-5 space-y-3">
                  {col.items.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        className="group relative inline-block text-[14px] text-[var(--fg-soft)] transition-colors hover:text-[var(--fg)]"
                        onMouseEnter={() => setVariant('hover')}
                        onMouseLeave={() => setVariant('default')}
                      >
                        <span className="relative">
                          {item.label}
                          <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-mint transition-all duration-500 group-hover:w-full" />
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-6 border-t border-[var(--line-strong)] py-8 text-[10px] uppercase tracking-[0.28em] text-[var(--muted)] md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-4">
            <span>© {new Date().getFullYear()} Sauber &amp; Zauber</span>
            <span className="hidden md:inline">·</span>
            <a href="https://sauberundzauber.de/impressum/" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[var(--fg)]">Impressum</a>
            <a href="https://sauberundzauber.de/datenschutz/" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[var(--fg)]">Datenschutz</a>
          </div>
          <div className="flex items-center gap-5">
            {['Instagram', 'Pinterest', 'LinkedIn'].map((s) => (
              <a key={s} href="#" className="transition-colors hover:text-[var(--fg)]">{s}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
