'use client';

import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

/**
 * Premium scroll progress — a hairline gradient at the very top
 * that fills with a spring as you scroll, with a soft glow at the tip.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    mass: 0.35,
  });
  const opacity = useTransform(scrollYProgress, [0, 0.005, 0.98, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 right-0 z-[200] h-[2px] origin-left"
      style={{
        scaleX,
        opacity,
        background:
          'linear-gradient(90deg, transparent 0%, rgba(95,227,161,0.7) 30%, rgba(47,191,122,0.95) 60%, rgba(95,227,161,0.7) 100%)',
        boxShadow: '0 0 12px rgba(95,227,161,0.45)',
      }}
    />
  );
}
