'use client';

import { motion } from 'framer-motion';
import { useCursor } from '@/components/providers/CursorProvider';

const columns = [
  {
    title: 'Programs',
    items: ['Maison', 'Atelier', 'Privé', 'Restoration', 'Concierge stay'],
  },
  {
    title: 'Atelier',
    items: ['Our story', 'Crew & training', 'Press', 'Letters', 'Careers'],
  },
  {
    title: 'Cities',
    items: ['Munich', 'Hamburg', 'Berlin', 'Zürich', 'On retreat'],
  },
];

export function Footer() {
  const { setVariant } = useCursor();

  return (
    <footer className="relative isolate overflow-hidden bg-[var(--bg)]">
      <div
        aria-hidden
        className="absolute inset-0 -z-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% 100%, rgba(20,84,58,0.16), transparent 60%),' +
            'radial-gradient(ellipse 60% 40% at 20% 0%, rgba(220,196,136,0.05), transparent 60%)',
        }}
      />

      <div className="relative mx-auto w-[min(1400px,92vw)] pt-32">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 eyebrow"
        >
          <span>Sauber &amp; Zauber · Est. Munich</span>
        </motion.div>

        {/* Mega wordmark — static now, no parallax loop. CSS gradient only. */}
        <h2 className="overflow-hidden font-display text-[clamp(3.8rem,17vw,18rem)] font-light leading-[0.85] tracking-[-0.045em] text-cinema">
          Sauber<span className="text-gold-soft">.</span>
          <br />
          Zauber<span className="text-gold-soft">.</span>
        </h2>

        <div className="mt-20 grid gap-12 md:grid-cols-[2fr_3fr]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="max-w-md text-[var(--fg-soft)] leading-[1.7]">
              A private cleaning atelier for those who treat home,
              studio, and stillness as art forms. Reach us by letter,
              by call, or by quiet introduction.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-10 flex max-w-md items-center gap-2 rounded-full border border-[var(--line-strong)] px-2 py-2"
            >
              <input
                type="email"
                placeholder="Your letter address"
                className="flex-1 bg-transparent px-4 py-2 text-sm text-[var(--fg)] outline-none placeholder:text-[var(--muted)]"
                onFocus={() => setVariant('text')}
                onBlur={() => setVariant('default')}
              />
              <button
                type="submit"
                className="rounded-full bg-[var(--fg)] px-5 py-2.5 text-[10px] font-medium uppercase tracking-[0.25em] text-[var(--bg)] transition-colors hover:bg-[var(--cream)]"
                onMouseEnter={() => setVariant('hover')}
                onMouseLeave={() => setVariant('default')}
              >
                Subscribe
              </button>
            </form>
          </motion.div>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
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
                    <li key={item}>
                      <a
                        href="#"
                        className="group relative inline-block text-[14px] text-[var(--fg-soft)] transition-colors hover:text-[var(--fg)]"
                        onMouseEnter={() => setVariant('hover')}
                        onMouseLeave={() => setVariant('default')}
                      >
                        <span className="relative">
                          {item}
                          <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gold-soft transition-all duration-500 group-hover:w-full" />
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-6 border-t border-[var(--line-strong)] py-8 text-[10px] uppercase tracking-[0.32em] text-[var(--muted)] md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-4">
            <span>© {new Date().getFullYear()} Sauber &amp; Zauber GmbH</span>
            <span className="hidden md:inline">·</span>
            <a href="#" className="transition-colors hover:text-[var(--fg)]">Imprint</a>
            <a href="#" className="transition-colors hover:text-[var(--fg)]">Datenschutz</a>
          </div>
          <div className="flex items-center gap-5">
            {['Instagram', 'Pinterest', 'LinkedIn'].map((s) => (
              <a key={s} href="#" className="transition-colors hover:text-[var(--fg)]">{s}</a>
            ))}
          </div>
        </div>

        <div className="pointer-events-none flex items-center justify-between py-10 text-[10px] uppercase tracking-[0.32em] text-[var(--muted)]">
          <span>Munich · Hamburg · Berlin · Zürich</span>
          <span>Composed with care</span>
        </div>
      </div>
    </footer>
  );
}
