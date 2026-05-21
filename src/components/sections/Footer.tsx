'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] });
  const titleY = useTransform(scrollYProgress, [0, 1], ['20%', '-20%']);
  const titleScale = useTransform(scrollYProgress, [0, 1], [0.95, 1.05]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);
  const { setVariant } = useCursor();

  return (
    <footer ref={ref} className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg)] via-[#0b0d15] to-[#04060a]" />
        <div className="absolute inset-0 bg-aurora opacity-30 mix-blend-screen" />
        <div className="absolute inset-0 bg-grid opacity-15" />
        <div className="absolute inset-0 noise-overlay" />
      </div>

      <div className="relative mx-auto w-[min(1400px,94vw)] pt-32">
        <motion.div className="mb-16" style={{ opacity }}>
          <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-white/40">
            <span className="h-px w-10 bg-white/30" />
            Sauber &amp; Zauber · Est. Munich
          </div>
        </motion.div>

        <motion.h2
          style={{ y: titleY, scale: titleScale }}
          className="font-display text-[clamp(4rem,16vw,18rem)] font-light leading-[0.85] tracking-[-0.04em] text-gradient-gold"
        >
          Sauber.
          <br />
          Zauber.
        </motion.h2>

        <div className="mt-20 grid gap-12 md:grid-cols-[2fr_3fr]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="max-w-md text-white/55">
              A private cleaning atelier for those who treat home,
              studio, and stillness as art forms. Reach us by letter,
              by call, or by quiet introduction.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-10 flex max-w-md items-center gap-2 rounded-full border border-white/15 px-2 py-2"
            >
              <input
                type="email"
                placeholder="Your letter address"
                className="flex-1 bg-transparent px-4 py-2 text-sm text-white outline-none placeholder:text-white/30"
                onFocus={() => setVariant('text')}
                onBlur={() => setVariant('default')}
              />
              <button
                type="submit"
                className="rounded-full bg-white px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--bg)] transition hover:bg-gold-200"
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
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              >
                <h4 className="text-[10px] uppercase tracking-[0.3em] text-white/40">{col.title}</h4>
                <ul className="mt-5 space-y-3">
                  {col.items.map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="group relative inline-block text-sm text-white/70 transition-colors hover:text-white"
                        onMouseEnter={() => setVariant('hover')}
                        onMouseLeave={() => setVariant('default')}
                      >
                        <span className="relative">
                          {item}
                          <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gold-300 transition-all duration-500 group-hover:w-full" />
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-6 border-t border-white/10 py-8 text-[11px] uppercase tracking-[0.3em] text-white/40 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <span>© {new Date().getFullYear()} Sauber &amp; Zauber GmbH</span>
            <span className="hidden md:inline">·</span>
            <a href="#" className="hover:text-white/70">Imprint</a>
            <a href="#" className="hover:text-white/70">Datenschutz</a>
          </div>
          <div className="flex items-center gap-4">
            {['Instagram', 'Pinterest', 'LinkedIn'].map((s) => (
              <a key={s} href="#" className="hover:text-white/80">
                {s}
              </a>
            ))}
          </div>
        </div>

        <div className="pointer-events-none flex items-center justify-between py-10 text-[10px] uppercase tracking-[0.3em] text-white/30">
          <span>Munich · Hamburg · Berlin · Zürich</span>
          <span>Composed with care</span>
        </div>
      </div>
    </footer>
  );
}
