'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Magnetic } from '@/components/ui/Magnetic';
import { useTheme } from '@/components/providers/ThemeProvider';
import { useCursor } from '@/components/providers/CursorProvider';

const links = [
  { href: '#services', label: 'Services' },
  { href: '#reveal', label: 'Reveal' },
  { href: '#process', label: 'Process' },
  { href: '#testimonials', label: 'Voices' },
  { href: '#pricing', label: 'Membership' },
  { href: '#faq', label: 'Index' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const { setVariant } = useCursor();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled ? 'py-3' : 'py-6'
        }`}
      >
        {/* Hairline under nav when scrolled */}
        <motion.div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-px"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(246,241,232,0.12), transparent)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: scrolled ? 1 : 0 }}
          transition={{ duration: 0.6 }}
        />

        <div className="mx-auto flex w-[min(1400px,92vw)] items-center justify-between">
          <a
            href="#top"
            className="group flex items-center gap-3"
            onMouseEnter={() => setVariant('hover')}
            onMouseLeave={() => setVariant('default')}
          >
            <div className="relative flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line-strong)] bg-[var(--glass)] backdrop-blur">
              <span className="font-display text-[14px] leading-none tracking-tight">
                S<span className="text-champagne">·</span>Z
              </span>
            </div>
            <div className="hidden md:block">
              <div className="font-display text-[15px] tracking-tight leading-none">
                Sauber &amp; Zauber
              </div>
              <div className="mt-1 text-[9px] uppercase tracking-[0.35em] text-[var(--muted)]">
                Cleaning Atelier · Munich
              </div>
            </div>
          </a>

          <nav className="relative hidden lg:flex">
            <ul className="flex items-center gap-7 text-[11px] uppercase tracking-[0.32em] text-[var(--fg-soft)]">
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
                      <span className="absolute inset-0 block translate-y-full text-champagne transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0">
                        {l.label}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              className="glass flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:border-[rgba(195,180,133,0.4)]"
              onMouseEnter={() => setVariant('hover')}
              onMouseLeave={() => setVariant('default')}
            >
              <AnimatePresence mode="wait">
                {theme === 'dark' ? (
                  <motion.svg
                    key="moon"
                    initial={{ rotate: -60, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 60, opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                  >
                    <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
                  </motion.svg>
                ) : (
                  <motion.svg
                    key="sun"
                    initial={{ rotate: -60, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 60, opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                  >
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                  </motion.svg>
                )}
              </AnimatePresence>
            </button>

            <Magnetic strength={0.2} range={70}>
              <a
                href="#contact"
                className="hidden md:inline-flex items-center gap-2 rounded-full bg-[var(--fg)] px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--bg)] transition-colors hover:bg-[var(--cream)]"
                onMouseEnter={() => setVariant('hover')}
                onMouseLeave={() => setVariant('default')}
              >
                Book
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </a>
            </Magnetic>

            <button
              onClick={() => setOpen((s) => !s)}
              className="glass flex h-10 w-10 items-center justify-center rounded-full lg:hidden"
              aria-label="Menu"
            >
              <div className="flex flex-col gap-1.5">
                <motion.span
                  className="block h-[1.5px] w-4 bg-current"
                  animate={open ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.4 }}
                />
                <motion.span
                  className="block h-[1.5px] w-4 bg-current"
                  animate={open ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.4 }}
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
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <motion.div
              className="absolute inset-0 bg-[var(--bg)]/95 backdrop-blur-2xl"
              initial={{ clipPath: 'circle(0% at 100% 0%)' }}
              animate={{ clipPath: 'circle(150% at 100% 0%)' }}
              exit={{ clipPath: 'circle(0% at 100% 0%)' }}
              transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            />
            <div className="relative flex h-full flex-col items-start justify-center gap-3 px-8 pt-24">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 16 }}
                  transition={{ delay: 0.2 + i * 0.06, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
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
