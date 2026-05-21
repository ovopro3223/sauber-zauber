'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Magnetic } from '@/components/ui/Magnetic';
import { useTheme } from '@/components/providers/ThemeProvider';
import { useCursor } from '@/components/providers/CursorProvider';

const links = [
  { href: '#services', label: 'Services' },
  { href: '#reveal', label: 'Before / After' },
  { href: '#process', label: 'Process' },
  { href: '#testimonials', label: 'Voices' },
  { href: '#pricing', label: 'Membership' },
  { href: '#faq', label: 'FAQ' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const { setVariant, setLabel } = useCursor();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'py-3' : 'py-6'
        }`}
      >
        <div className="mx-auto flex w-[min(1400px,94vw)] items-center justify-between">
          <a
            href="#top"
            className="group flex items-center gap-3"
            onMouseEnter={() => setVariant('hover')}
            onMouseLeave={() => setVariant('default')}
          >
            <div className="relative h-9 w-9 overflow-hidden rounded-full border border-white/15 bg-[var(--glass)] backdrop-blur">
              <motion.div
                className="absolute inset-0"
                style={{
                  background:
                    'conic-gradient(from 0deg, #f6e3a1, #c08e2d, #7dd6ff, #f6e3a1)',
                  filter: 'blur(8px)',
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
              />
              <div className="absolute inset-[3px] flex items-center justify-center rounded-full bg-[var(--bg)] text-[11px] font-display tracking-tight">
                S<span className="text-gold-300">·</span>Z
              </div>
            </div>
            <div className="hidden md:block">
              <div className="font-display text-sm tracking-wide">Sauber &amp; Zauber</div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-white/40">
                Luxury Cleaning Atelier
              </div>
            </div>
          </a>

          <nav className="relative hidden lg:flex">
            <div className="glass flex items-center gap-1 rounded-full px-2 py-1.5">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="group relative rounded-full px-4 py-1.5 text-[12px] uppercase tracking-[0.2em] text-white/70 transition-colors hover:text-white"
                  onMouseEnter={() => setVariant('hover')}
                  onMouseLeave={() => setVariant('default')}
                >
                  <span className="relative z-10">{l.label}</span>
                  <span className="absolute inset-0 rounded-full bg-white/0 transition-all duration-500 group-hover:bg-white/5" />
                </a>
              ))}
            </div>
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              className="glass flex h-10 w-10 items-center justify-center rounded-full"
              onMouseEnter={() => {
                setVariant('hover');
                setLabel(theme === 'dark' ? 'Light' : 'Dark');
              }}
              onMouseLeave={() => {
                setVariant('default');
                setLabel(null);
              }}
            >
              <AnimatePresence mode="wait">
                {theme === 'dark' ? (
                  <motion.svg
                    key="moon"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
                  </motion.svg>
                ) : (
                  <motion.svg
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                  </motion.svg>
                )}
              </AnimatePresence>
            </button>

            <Magnetic strength={0.25} range={80}>
              <a
                href="#contact"
                className="hidden md:inline-flex items-center gap-2 rounded-full bg-white text-[var(--bg)] px-5 py-2.5 text-[12px] font-medium uppercase tracking-[0.2em]"
                onMouseEnter={() => setVariant('hover')}
                onMouseLeave={() => setVariant('default')}
              >
                Book
                <span className="text-gold-600">→</span>
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
                />
                <motion.span
                  className="block h-[1.5px] w-4 bg-current"
                  animate={open ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
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
              className="absolute inset-0 bg-[var(--bg)]/90 backdrop-blur-2xl"
              initial={{ clipPath: 'circle(0% at 100% 0%)' }}
              animate={{ clipPath: 'circle(150% at 100% 0%)' }}
              exit={{ clipPath: 'circle(0% at 100% 0%)' }}
              transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            />
            <div className="relative flex h-full flex-col items-start justify-center gap-4 px-8 pt-24">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.2 + i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display text-4xl text-white"
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
