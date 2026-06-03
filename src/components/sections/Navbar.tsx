'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Magnetic } from '@/components/ui/Magnetic';
import { Logo } from '@/components/ui/Logo';
import { useTheme } from '@/components/providers/ThemeProvider';
import { useCursor } from '@/components/providers/CursorProvider';

const links = [
  { href: '#services', label: 'Leistungen' },
  { href: '#reveal', label: 'Vorher · Nachher' },
  { href: '#process', label: 'Prozess' },
  { href: '#testimonials', label: 'Stimmen' },
  { href: '#faq', label: 'FAQ' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const { setVariant } = useCursor();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -28, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.15, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-[padding] duration-500 ${
          scrolled ? 'glass-nav py-3' : 'py-5'
        }`}
      >
        <div className="mx-auto flex w-[min(1400px,92vw)] items-center justify-between">
          <a
            href="#top"
            className="group flex items-center gap-3"
            onMouseEnter={() => setVariant('hover')}
            onMouseLeave={() => setVariant('default')}
          >
            <Logo size={44} />
            <div className="hidden md:block leading-none">
              <div className="font-display text-[20px] tracking-[0.01em]">
                Sauber<span className="px-0.5 italic text-mint">&amp;</span>Zauber
              </div>
              <div className="mt-1.5 text-[9px] uppercase tracking-[0.35em] text-[var(--muted)]">
                Berlin · Reinigung
              </div>
            </div>
          </a>

          <nav className="relative hidden lg:flex">
            <ul className="flex items-center gap-7 text-[11px] uppercase tracking-[0.28em] text-[var(--fg-soft)]">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="group relative inline-block py-2 transition-colors duration-500 hover:text-[var(--fg)]"
                    onMouseEnter={() => setVariant('hover')}
                    onMouseLeave={() => setVariant('default')}
                  >
                    <span className="relative inline-block overflow-hidden">
                      <span className="block transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">
                        {l.label}
                      </span>
                      <span className="absolute inset-0 block translate-y-full text-mint transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0">
                        {l.label}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            {/* Phone icon — links to tel: */}
            <a
              href="tel:+4917623220656"
              aria-label="Anrufen"
              title="+49 176 23220656"
              className="group flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] transition-colors duration-500 hover:border-mint hover:text-mint"
              onMouseEnter={() => setVariant('hover')}
              onMouseLeave={() => setVariant('default')}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-500 group-hover:rotate-[-12deg]"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.79a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.89.34 1.83.57 2.79.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </a>

            <button
              onClick={toggle}
              aria-label="Theme wechseln"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] transition-colors duration-500 hover:border-mint hover:text-mint"
              onMouseEnter={() => setVariant('hover')}
              onMouseLeave={() => setVariant('default')}
            >
              <AnimatePresence mode="wait" initial={false}>
                {theme === 'dark' ? (
                  <motion.svg
                    key="moon"
                    initial={{ rotate: -40, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 40, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"
                  >
                    <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
                  </motion.svg>
                ) : (
                  <motion.svg
                    key="sun"
                    initial={{ rotate: -40, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 40, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"
                  >
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                  </motion.svg>
                )}
              </AnimatePresence>
            </button>

            <Magnetic strength={0.18} range={70}>
              <a
                href="#contact"
                className="hidden md:inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-[#6fefac] to-[#2fbf7a] px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#042014] shadow-[0_10px_30px_-10px_var(--green-glow)] transition-transform hover:-translate-y-0.5"
                onMouseEnter={() => setVariant('hover')}
                onMouseLeave={() => setVariant('default')}
              >
                Anfragen
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </a>
            </Magnetic>

            <button
              onClick={() => setOpen((s) => !s)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] lg:hidden"
              aria-label="Menü"
            >
              <div className="flex flex-col gap-1.5">
                <motion.span
                  className="block h-[1.5px] w-4 bg-current"
                  animate={open ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.35 }}
                />
                <motion.span
                  className="block h-[1.5px] w-4 bg-current"
                  animate={open ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.35 }}
                />
              </div>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <motion.div
              className="absolute inset-0 bg-[var(--bg)]"
              initial={{ clipPath: 'circle(0% at 100% 0%)' }}
              animate={{ clipPath: 'circle(150% at 100% 0%)' }}
              exit={{ clipPath: 'circle(0% at 100% 0%)' }}
              transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            />
            <div className="relative flex h-full flex-col items-start justify-center gap-3 px-8 pt-24">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ delay: 0.18 + i * 0.05, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display text-4xl text-[var(--fg)]"
                >
                  {l.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
