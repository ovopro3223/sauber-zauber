'use client';

import { useEffect, useRef } from 'react';

/**
 * Lightweight canvas particle field — the official Sauber & Zauber atmosphere.
 * Auto-pauses on hidden tab, respects prefers-reduced-motion, and scales
 * count to viewport so phones stay smooth.
 */
export function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.width = window.innerWidth * dpr;
      h = canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
    };
    resize();

    const onResize = () => {
      resize();
    };
    window.addEventListener('resize', onResize, { passive: true });

    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    type P = {
      x: number; y: number; r: number;
      vx: number; vy: number;
      life: number; tw: number; phase: number; hue: number;
    };

    const COUNT = Math.min(
      55,
      Math.max(22, Math.floor(window.innerWidth / 26))
    );

    const reset = (p: P, initial: boolean) => {
      p.x = rand(0, w);
      p.y = initial ? rand(0, h) : h + rand(0, h * 0.2);
      p.r = rand(0.6, 2.2) * dpr;
      p.vx = rand(-0.08, 0.08) * dpr;
      p.vy = -rand(0.10, 0.45) * dpr;
      p.life = rand(0.55, 1);
      p.tw = rand(0.005, 0.018);
      p.phase = rand(0, Math.PI * 2);
      p.hue = rand(140, 160);
    };

    const particles: P[] = Array.from({ length: COUNT }, () => {
      const p: P = {
        x: 0, y: 0, r: 0, vx: 0, vy: 0,
        life: 1, tw: 0, phase: 0, hue: 150,
      };
      reset(p, true);
      return p;
    });

    let running = true;
    let raf = 0;

    const onVis = () => {
      running = !document.hidden;
      if (running && !raf) raf = requestAnimationFrame(loop);
    };
    document.addEventListener('visibilitychange', onVis);

    const loop = () => {
      raf = 0;
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter';
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy; p.phase += p.tw;
        if (p.y < -10 || p.x < -20 || p.x > w + 20) reset(p, false);
        const alpha = (0.32 + Math.sin(p.phase) * 0.32) * p.life;
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 6);
        grad.addColorStop(0, `hsla(${p.hue}, 80%, 70%, ${alpha})`);
        grad.addColorStop(0.4, `hsla(${p.hue}, 80%, 60%, ${alpha * 0.4})`);
        grad.addColorStop(1, 'hsla(150, 80%, 60%, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `hsla(${p.hue}, 95%, 85%, ${Math.min(1, alpha + 0.18)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[-1]"
    />
  );
}
