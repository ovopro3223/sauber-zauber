'use client';

import { CSSProperties, useMemo } from 'react';
import { motion, Variants } from 'framer-motion';

type Props = {
  text: string;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  duration?: number;
  stagger?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  by?: 'word' | 'char';
  once?: boolean;
};

export function SplitText({
  text,
  className,
  style,
  delay = 0,
  duration = 0.95,
  stagger = 0.06,
  as = 'h2',
  by = 'word',
  once = true,
}: Props) {
  const items = useMemo(() => {
    if (by === 'char') return text.split('');
    return text.split(/(\s+)/);
  }, [text, by]);

  const container: Variants = {
    hidden: {},
    visible: { transition: { delayChildren: delay, staggerChildren: stagger } },
  };

  const child: Variants = {
    hidden: { y: '110%' },
    visible: { y: '0%', transition: { duration, ease: [0.16, 1, 0.3, 1] } },
  };

  const Comp: any = motion[as as 'h2'];

  return (
    <Comp
      className={className}
      style={style}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-10%' }}
    >
      {items.map((token, i) => {
        if (/^\s+$/.test(token)) return <span key={i}>{token}</span>;
        return (
          <span key={i} className="split-line">
            <motion.span variants={child} className="split-word">
              {token}
            </motion.span>
          </span>
        );
      })}
    </Comp>
  );
}
