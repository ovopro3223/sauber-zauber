'use client';

import { useRef, useState, useEffect, useMemo } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { SplitText } from '@/components/ui/SplitText';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { useCursor } from '@/components/providers/CursorProvider';

/**
 * Deterministic pseudo-random — keeps SSR & client output identical
 * so particle positions don't trigger a hydration mismatch.
 */
function seeded(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 0xffffffff;
  };
}

export function BeforeAfter() {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(50);
  const clipAfter = useTransform(x, (v) => `inset(0 0 0 ${v}%)`);
  const clipBefore = useTransform(x, (v) => `inset(0 ${100 - v}% 0 0)`);
  const handleX = useTransform(x, (v) => `${v}%`);
  const [dragging, setDragging] = useState(false);
  const { setVariant, setLabel } = useCursor();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const move = (clientX: number) => {
      const rect = el.getBoundingClientRect();
      const pct = ((clientX - rect.left) / rect.width) * 100;
      x.set(Math.max(2, Math.min(98, pct)));
    };
    const down = (e: PointerEvent) => {
      setDragging(true);
      move(e.clientX);
      (e.target as Element)?.setPointerCapture?.(e.pointerId);
    };
    const upMove = (e: PointerEvent) => {
      if (!dragging) return;
      move(e.clientX);
    };
    const up = () => setDragging(false);
    el.addEventListener('pointerdown', down);
    window.addEventListener('pointermove', upMove);
    window.addEventListener('pointerup', up);
    return () => {
      el.removeEventListener('pointerdown', down);
      window.removeEventListener('pointermove', upMove);
      window.removeEventListener('pointerup', up);
    };
  }, [dragging, x]);

  return (
    <section id="reveal" className="relative bg-[var(--bg)] py-32">
      <div className="mx-auto w-[min(1400px,94vw)]">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <SectionLabel index="II" label="Before / After" />
            <SplitText
              as="h2"
              text="The reveal is the ritual."
              className="mt-6 font-display text-[clamp(2.4rem,5vw,5rem)] leading-[1.02] tracking-[-0.02em] text-gradient"
            />
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-md text-white/55"
          >
            Drag the divider. Watch surfaces shift from dormant to alive —
            captured in a Berlin atelier, untouched and unretouched.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 overflow-hidden rounded-[32px] border border-white/10"
        >
          <div
            ref={ref}
            className="relative aspect-[16/10] w-full select-none overflow-hidden"
            onMouseEnter={() => {
              setVariant('drag');
              setLabel('Drag');
            }}
            onMouseLeave={() => {
              setVariant('default');
              setLabel(null);
            }}
          >
            {/* BEFORE side — dusty, muted */}
            <motion.div className="absolute inset-0" style={{ clipPath: clipBefore }}>
              <DustyScene />
              <span className="absolute left-6 top-6 rounded-full glass px-4 py-1.5 text-[10px] uppercase tracking-[0.3em] text-white/70">
                Before
              </span>
            </motion.div>

            {/* AFTER side — luminous, polished */}
            <motion.div className="absolute inset-0" style={{ clipPath: clipAfter }}>
              <PolishedScene />
              <span className="absolute right-6 top-6 rounded-full glass px-4 py-1.5 text-[10px] uppercase tracking-[0.3em] text-white/90">
                After
              </span>
            </motion.div>

            {/* Slider handle */}
            <motion.div
              className="absolute inset-y-0 z-10 w-px bg-white/80 shadow-[0_0_30px_8px_rgba(255,255,255,0.18)]"
              style={{ left: handleX, translateX: '-50%' }}
            >
              <motion.div
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-2xl"
                whileHover={{ scale: 1.1 }}
                animate={{ scale: dragging ? 1.15 : 1 }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0c0f17" strokeWidth="1.8">
                  <path d="M9 6l-6 6 6 6M15 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            ['97%', 'avg. surface reflectance gain'],
            ['0', 'micro-scratches recorded'],
            ['42', 'data points per session'],
          ].map(([num, label]) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="glass rounded-2xl p-6"
            >
              <div className="font-display text-4xl text-gradient-gold">{num}</div>
              <div className="mt-2 text-sm text-white/55">{label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Pure-CSS rendered "before" interior — muted, dusty.
 */
function DustyScene() {
  const dust = useMemo(() => {
    const r = seeded(91);
    return Array.from({ length: 30 }, () => ({
      left: r() * 100,
      top: r() * 100,
      opacity: 0.2 + r() * 0.4,
    }));
  }, []);

  return (
    <div className="absolute inset-0 bg-gradient-to-br from-[#1d1a17] via-[#262320] to-[#332e28]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(255,255,255,0.06),transparent_60%)]" />
      <div className="absolute inset-0 bg-noise opacity-[0.18] mix-blend-overlay" />
      {/* Window */}
      <div className="absolute left-[8%] top-[10%] h-[55%] w-[28%] rounded-[6px] border border-white/10 bg-gradient-to-b from-[#3a3833] to-[#2a2724]">
        <div className="absolute inset-2 grid grid-cols-2 gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-sm bg-gradient-to-b from-white/8 to-white/3" />
          ))}
        </div>
      </div>
      {/* Sofa */}
      <div className="absolute bottom-[14%] left-[5%] h-[24%] w-[56%] rounded-2xl bg-gradient-to-b from-[#4a4339] to-[#2a2520] shadow-[inset_0_-10px_30px_rgba(0,0,0,0.5)]" />
      <div className="absolute bottom-[14%] left-[10%] flex h-[14%] w-[50%] gap-3 px-4 pb-4">
        <div className="flex-1 rounded-xl bg-[#5a5246]/70" />
        <div className="flex-1 rounded-xl bg-[#5a5246]/70" />
      </div>
      {/* Lamp */}
      <div className="absolute right-[18%] bottom-[18%] h-[34%] w-[8%]">
        <div className="mx-auto h-[60%] w-[2px] bg-[#5a5246]" />
        <div className="mx-auto h-[40%] w-full rounded-t-[40%] bg-gradient-to-b from-[#665a4a] to-[#3d3528]" />
      </div>
      {/* Dust particles — deterministic positions to avoid hydration drift */}
      {dust.map((p, i) => (
        <div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-white/20"
          style={{
            left: `${p.left.toFixed(4)}%`,
            top: `${p.top.toFixed(4)}%`,
            opacity: Number(p.opacity.toFixed(4)),
          }}
        />
      ))}
      <div className="absolute inset-0 bg-black/20" />
    </div>
  );
}

/**
 * Pure-CSS rendered "after" interior — luminous, polished.
 */
function PolishedScene() {
  const sparkles = useMemo(() => {
    const r = seeded(173);
    return Array.from({ length: 12 }, () => ({
      left: r() * 100,
      top: r() * 100,
    }));
  }, []);

  return (
    <div className="absolute inset-0 bg-gradient-to-br from-[#f7efe2] via-[#f1e7d4] to-[#e9dcc1]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(255,255,255,0.7),transparent_60%)]" />
      {/* Window (bright) */}
      <div className="absolute left-[8%] top-[10%] h-[55%] w-[28%] overflow-hidden rounded-[6px] border border-white/40 bg-gradient-to-b from-[#fffef5] to-[#e9f4ff]">
        <div className="absolute inset-2 grid grid-cols-2 gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-sm bg-gradient-to-b from-white to-[#dbe9fb]" />
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-white/0" />
      </div>
      {/* Sofa — bright */}
      <div className="absolute bottom-[14%] left-[5%] h-[24%] w-[56%] rounded-2xl bg-gradient-to-b from-[#fffdf7] to-[#e8dec8] shadow-[inset_0_-10px_30px_rgba(0,0,0,0.08)]" />
      <div className="absolute bottom-[14%] left-[10%] flex h-[14%] w-[50%] gap-3 px-4 pb-4">
        <div className="flex-1 rounded-xl bg-[#fff8e8]" />
        <div className="flex-1 rounded-xl bg-[#fff8e8]" />
      </div>
      {/* Lamp */}
      <div className="absolute right-[18%] bottom-[18%] h-[34%] w-[8%]">
        <div className="mx-auto h-[60%] w-[2px] bg-[#c08e2d]" />
        <div className="mx-auto h-[40%] w-full rounded-t-[40%] bg-gradient-to-b from-[#fff3c8] to-[#d5a847] shadow-[0_0_40px_rgba(213,168,71,0.5)]" />
      </div>
      {/* Sparkles — deterministic positions to avoid hydration drift */}
      {sparkles.map((p, i) => (
        <div
          key={i}
          className="absolute h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.9)]"
          style={{
            left: `${p.left.toFixed(4)}%`,
            top: `${p.top.toFixed(4)}%`,
          }}
        />
      ))}
    </div>
  );
}
