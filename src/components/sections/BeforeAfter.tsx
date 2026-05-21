'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { SplitText } from '@/components/ui/SplitText';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { useCursor } from '@/components/providers/CursorProvider';

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
      <div className="mx-auto w-[min(1400px,92vw)]">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-end">
          <div>
            <SectionLabel index="02" label="The Reveal" />
            <SplitText
              as="h2"
              text="A surface, restored to itself."
              className="mt-6 max-w-[16ch] font-display text-[clamp(2.4rem,5.2vw,5rem)] font-light leading-[1.02] tracking-[-0.025em] text-cinema"
            />
          </div>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-[42ch] text-[var(--fg-soft)] leading-[1.7] lg:justify-self-end"
          >
            Drag the divider, slowly. Watch a Berlin atelier shift from
            quiet dormancy to a softer, warmer light — every frame
            captured on film, untouched, unretouched.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40, clipPath: 'inset(8% 0% 8% 0%)' }}
          whileInView={{ opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)' }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 overflow-hidden rounded-[28px] border border-[var(--line)]"
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
            <motion.div className="absolute inset-0" style={{ clipPath: clipBefore }}>
              <BeforeScene />
              <Tag className="left-6 top-6">Before</Tag>
            </motion.div>

            <motion.div className="absolute inset-0" style={{ clipPath: clipAfter }}>
              <AfterScene />
              <Tag className="right-6 top-6 !text-[var(--bg)] !bg-[var(--fg)]/80 !border-[var(--fg)]/0">
                After
              </Tag>
            </motion.div>

            <motion.div
              className="absolute inset-y-0 z-10 w-px bg-[var(--fg)]/90 shadow-[0_0_24px_4px_rgba(246,241,232,0.15)]"
              style={{ left: handleX, translateX: '-50%' }}
            >
              <motion.div
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--fg)]"
                animate={{ scale: dragging ? 1.08 : 1 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--bg)" strokeWidth="1.6">
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
          ].map(([num, label], i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.9, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
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

function Tag({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`absolute rounded-full glass px-4 py-1.5 text-[10px] uppercase tracking-[0.3em] text-[var(--fg)] ${className ?? ''}`}
    >
      {children}
    </span>
  );
}

/**
 * Editorial "before" interior — muted, cool, slightly dim. No particle spam.
 */
function BeforeScene() {
  return (
    <div className="absolute inset-0 bg-[#1d1f1d]">
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, #1a1c1a 0%, #232622 50%, #2a2d28 100%)',
        }}
      />
      {/* Soft cool window light */}
      <div
        className="absolute left-[6%] top-[8%] h-[60%] w-[30%] rounded-[6px]"
        style={{
          background:
            'linear-gradient(180deg, rgba(160,180,170,0.22), rgba(80,95,90,0.05))',
          boxShadow: 'inset 0 0 60px rgba(0,0,0,0.4)',
        }}
      >
        <div className="absolute inset-3 grid grid-cols-2 gap-2 opacity-60">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="rounded-[2px]"
              style={{
                background:
                  'linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.01))',
              }}
            />
          ))}
        </div>
      </div>

      {/* Sofa */}
      <div
        className="absolute bottom-[12%] left-[5%] h-[26%] w-[58%] rounded-2xl"
        style={{
          background: 'linear-gradient(180deg, #3a3934 0%, #1e1d1a 100%)',
          boxShadow:
            'inset 0 -10px 30px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)',
        }}
      />
      {/* Cushions */}
      <div className="absolute bottom-[12%] left-[8%] flex h-[16%] w-[52%] gap-3 px-4 pb-4">
        <div className="flex-1 rounded-xl bg-[#3f3d37]/80" />
        <div className="flex-1 rounded-xl bg-[#3f3d37]/80" />
      </div>

      {/* Floor */}
      <div className="absolute bottom-0 left-0 right-0 h-[18%] bg-gradient-to-t from-black/30 to-transparent" />

      {/* Lamp silhouette */}
      <div className="absolute right-[15%] bottom-[16%] h-[40%] w-[10%]">
        <div className="mx-auto h-[55%] w-[1.5px] bg-[#3a3833]" />
        <div
          className="mx-auto h-[45%] w-full rounded-t-[40%]"
          style={{
            background: 'linear-gradient(180deg, #4a4639, #25221c)',
          }}
        />
      </div>

      {/* Cool haze overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 100% 70% at 20% 30%, rgba(110,135,125,0.1), transparent 60%)',
        }}
      />
      <div className="absolute inset-0 bg-black/20" />
    </div>
  );
}

/**
 * Editorial "after" — luminous, warm cream, restored sheen.
 */
function AfterScene() {
  return (
    <div className="absolute inset-0">
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, #f4ecdb 0%, #ece1c8 55%, #ddd0b4 100%)',
        }}
      />

      {/* Bright window */}
      <div
        className="absolute left-[6%] top-[8%] h-[60%] w-[30%] overflow-hidden rounded-[6px]"
        style={{
          background:
            'linear-gradient(180deg, #ffffff 0%, #e6efe9 100%)',
        }}
      >
        <div className="absolute inset-3 grid grid-cols-2 gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="rounded-[2px]"
              style={{
                background:
                  'linear-gradient(180deg, #ffffff, #d8e9de)',
              }}
            />
          ))}
        </div>
        {/* Specular glint */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 50%)',
          }}
        />
      </div>

      {/* Sofa */}
      <div
        className="absolute bottom-[12%] left-[5%] h-[26%] w-[58%] rounded-2xl"
        style={{
          background:
            'linear-gradient(180deg, #fffaee 0%, #e6d8b9 100%)',
          boxShadow:
            'inset 0 -10px 30px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.6)',
        }}
      />
      <div className="absolute bottom-[12%] left-[8%] flex h-[16%] w-[52%] gap-3 px-4 pb-4">
        <div className="flex-1 rounded-xl bg-[#fdf6e1]" />
        <div className="flex-1 rounded-xl bg-[#fdf6e1]" />
      </div>

      {/* Floor reflection */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[20%]"
        style={{
          background:
            'linear-gradient(180deg, rgba(255,250,235,0) 0%, rgba(220,207,174,0.4) 100%)',
        }}
      />

      {/* Lamp with warm glow */}
      <div className="absolute right-[15%] bottom-[16%] h-[40%] w-[10%]">
        <div
          className="mx-auto h-[55%] w-[1.5px]"
          style={{ background: '#a39361' }}
        />
        <div
          className="mx-auto h-[45%] w-full rounded-t-[40%]"
          style={{
            background:
              'linear-gradient(180deg, #fff6dc 0%, #dccfae 100%)',
            boxShadow: '0 0 60px rgba(220,207,174,0.5)',
          }}
        />
      </div>

      {/* Soft warm wash */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 90% 70% at 70% 30%, rgba(255,250,235,0.4), transparent 60%)',
        }}
      />
    </div>
  );
}
