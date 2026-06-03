'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { SplitText } from '@/components/ui/SplitText';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { useCursor } from '@/components/providers/CursorProvider';
import { useT } from '@/components/providers/LanguageProvider';

export function BeforeAfter() {
  const ref = useRef<HTMLDivElement>(null);
  const beforeRef = useRef<HTMLDivElement>(null);
  const afterRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const valueRef = useRef(50);
  const targetRef = useRef(50);
  const draggingRef = useRef(false);
  const [dragging, setDragging] = useState(false);
  const { setVariant, setLabel } = useCursor();

  const t = useT({
    de: {
      label: 'Vorher · Nachher',
      title: 'Eine Oberfläche, zurückgegeben.',
      lede: 'Ziehen Sie den Regler. Beobachten Sie, wie ein Berliner Raum vom stillen Schlummer in ein weicheres, wärmeres Licht übergeht.',
      drag: 'Ziehen',
      before: 'Vorher',
      after: 'Nachher',
      stats: [
        ['97%', 'durchschn. Glanzgewinn'],
        ['0', 'erfasste Mikro-Kratzer'],
        ['42', 'Datenpunkte je Einsatz'],
      ],
    },
    en: {
      label: 'Before · After',
      title: 'A surface, restored to itself.',
      lede: 'Drag the divider, slowly. Watch a Berlin space shift from quiet dormancy to a softer, warmer light.',
      drag: 'Drag',
      before: 'Before',
      after: 'After',
      stats: [
        ['97%', 'avg. surface reflectance gain'],
        ['0', 'micro-scratches recorded'],
        ['42', 'data points per session'],
      ],
    },
  });

  const apply = useCallback((v: number) => {
    if (beforeRef.current) beforeRef.current.style.clipPath = `inset(0 ${100 - v}% 0 0)`;
    if (afterRef.current) afterRef.current.style.clipPath = `inset(0 0 0 ${v}%)`;
    if (handleRef.current) handleRef.current.style.left = `${v}%`;
  }, []);

  useEffect(() => {
    apply(50);
    let raf = 0;
    const tick = () => {
      valueRef.current += (targetRef.current - valueRef.current) * 0.18;
      apply(valueRef.current);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [apply]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const move = (clientX: number) => {
      const rect = el.getBoundingClientRect();
      const pct = ((clientX - rect.left) / rect.width) * 100;
      targetRef.current = Math.max(2, Math.min(98, pct));
    };
    const down = (e: PointerEvent) => {
      draggingRef.current = true;
      setDragging(true);
      move(e.clientX);
    };
    const upMove = (e: PointerEvent) => {
      if (!draggingRef.current) return;
      move(e.clientX);
    };
    const up = () => {
      draggingRef.current = false;
      setDragging(false);
    };
    el.addEventListener('pointerdown', down);
    window.addEventListener('pointermove', upMove, { passive: true });
    window.addEventListener('pointerup', up);
    return () => {
      el.removeEventListener('pointerdown', down);
      window.removeEventListener('pointermove', upMove);
      window.removeEventListener('pointerup', up);
    };
  }, []);

  return (
    <section id="reveal" className="relative bg-transparent py-32">
      <div className="mx-auto w-[min(1400px,92vw)]">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-end">
          <div>
            <SectionLabel index="02" label={t.label} />
            <SplitText
              key={t.title}
              as="h2"
              text={t.title}
              className="mt-6 max-w-[16ch] font-display text-[clamp(2.2rem,5vw,4.8rem)] font-light leading-[1.02] tracking-[-0.025em] text-cinema"
            />
          </div>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-[42ch] text-[var(--fg-soft)] leading-[1.7] lg:justify-self-end"
          >
            {t.lede}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 overflow-hidden rounded-[24px] border border-[var(--line)]"
        >
          <div
            ref={ref}
            className="relative aspect-[16/10] w-full select-none overflow-hidden touch-none"
            onMouseEnter={() => { setVariant('drag'); setLabel(t.drag); }}
            onMouseLeave={() => { setVariant('default'); setLabel(null); }}
          >
            <div ref={beforeRef} className="absolute inset-0">
              <BeforeScene />
              <Tag className="left-6 top-6">{t.before}</Tag>
            </div>
            <div ref={afterRef} className="absolute inset-0">
              <AfterScene />
              <Tag className="right-6 top-6 !text-[var(--bg)] !bg-[var(--fg)]/90 !border-transparent">
                {t.after}
              </Tag>
            </div>

            <div
              ref={handleRef}
              className="pointer-events-none absolute inset-y-0 z-10 w-px bg-[var(--fg)]/85"
              style={{ left: '50%', transform: 'translateX(-50%)' }}
            >
              <div
                className={`absolute top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--fg)] transition-transform duration-300 ${
                  dragging ? 'scale-110' : 'scale-100'
                }`}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--bg)" strokeWidth="1.6">
                  <path d="M9 6l-6 6 6 6M15 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {t.stats.map(([num, label], i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.7, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-baseline gap-5 border-t border-[var(--line)] pt-5"
            >
              <span className="font-display text-4xl text-cinema md:text-5xl">{num}</span>
              <span className="text-sm text-[var(--muted)]">{label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Tag({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`absolute rounded-full border border-[var(--line-strong)] bg-[var(--bg)]/40 px-4 py-1.5 text-[10px] uppercase tracking-[0.3em] text-[var(--fg)] ${className ?? ''}`}
    >
      {children}
    </span>
  );
}

function BeforeScene() {
  return (
    <div
      className="absolute inset-0"
      style={{
        background: 'linear-gradient(135deg, #161a18 0%, #1f2421 55%, #262b27 100%)',
      }}
    >
      <div
        className="absolute left-[6%] top-[8%] h-[60%] w-[30%] rounded-[6px]"
        style={{
          background: 'linear-gradient(180deg, rgba(160,180,170,0.18), rgba(80,95,90,0.04))',
          boxShadow: 'inset 0 0 60px rgba(0,0,0,0.4)',
        }}
      >
        <div className="absolute inset-3 grid grid-cols-2 gap-2 opacity-60">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-[2px]"
              style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01))' }}
            />
          ))}
        </div>
      </div>
      <div
        className="absolute bottom-[12%] left-[5%] h-[26%] w-[58%] rounded-2xl"
        style={{
          background: 'linear-gradient(180deg, #353330 0%, #1c1b18 100%)',
          boxShadow: 'inset 0 -10px 30px rgba(0,0,0,0.5)',
        }}
      />
      <div className="absolute bottom-[12%] left-[8%] flex h-[16%] w-[52%] gap-3 px-4 pb-4">
        <div className="flex-1 rounded-xl bg-[#3a3833]/80" />
        <div className="flex-1 rounded-xl bg-[#3a3833]/80" />
      </div>
      <div className="absolute right-[15%] bottom-[16%] h-[40%] w-[10%]">
        <div className="mx-auto h-[55%] w-[1.5px] bg-[#34322c]" />
        <div className="mx-auto h-[45%] w-full rounded-t-[40%]" style={{ background: 'linear-gradient(180deg, #423d31, #20201b)' }} />
      </div>
      <div className="absolute inset-0 bg-black/15" />
    </div>
  );
}

function AfterScene() {
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #f4ecdb 0%, #ece1c8 55%, #ddd0b4 100%)' }} />
      <div
        className="absolute left-[6%] top-[8%] h-[60%] w-[30%] overflow-hidden rounded-[6px]"
        style={{ background: 'linear-gradient(180deg, #ffffff 0%, #e6efe9 100%)' }}
      >
        <div className="absolute inset-3 grid grid-cols-2 gap-2">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="rounded-[2px]" style={{ background: 'linear-gradient(180deg, #ffffff, #d8e9de)' }} />
          ))}
        </div>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 50%)' }} />
      </div>
      <div
        className="absolute bottom-[12%] left-[5%] h-[26%] w-[58%] rounded-2xl"
        style={{
          background: 'linear-gradient(180deg, #fffaee 0%, #e6d8b9 100%)',
          boxShadow: 'inset 0 -10px 30px rgba(0,0,0,0.05)',
        }}
      />
      <div className="absolute bottom-[12%] left-[8%] flex h-[16%] w-[52%] gap-3 px-4 pb-4">
        <div className="flex-1 rounded-xl bg-[#fdf6e1]" />
        <div className="flex-1 rounded-xl bg-[#fdf6e1]" />
      </div>
      <div className="absolute right-[15%] bottom-[16%] h-[40%] w-[10%]">
        <div className="mx-auto h-[55%] w-[1.5px]" style={{ background: '#9c8a55' }} />
        <div
          className="mx-auto h-[45%] w-full rounded-t-[40%]"
          style={{
            background: 'linear-gradient(180deg, #fff6dc 0%, #dccfae 100%)',
            boxShadow: '0 0 50px rgba(220,196,136,0.4)',
          }}
        />
      </div>
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 70% 30%, rgba(255,250,235,0.35), transparent 60%)' }} />
    </div>
  );
}
