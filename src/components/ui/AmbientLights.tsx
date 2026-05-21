'use client';

/**
 * Pure-CSS cinematic backdrop. No JS, no rAF, no pointer tracking.
 * Two static washes + a single low-opacity grain image.
 */
export function AmbientLights() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        background:
          'radial-gradient(ellipse 70% 50% at 20% 10%, rgba(20, 84, 58, 0.22), transparent 60%),' +
          'radial-gradient(ellipse 60% 45% at 90% 100%, rgba(220, 196, 136, 0.05), transparent 65%)',
      }}
    />
  );
}
