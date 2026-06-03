'use client';

/**
 * Pure-CSS cinematic backdrop on the new emerald base.
 * Two static washes that drift very slowly — one CSS transform animation,
 * essentially free on the compositor.
 */
export function AmbientLights() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div
        className="absolute inset-[-10%] anim-drift-x"
        style={{
          background:
            'radial-gradient(ellipse 60% 45% at 20% 10%, rgba(45, 122, 85, 0.35), transparent 65%),' +
            'radial-gradient(ellipse 55% 40% at 90% 95%, rgba(20, 84, 58, 0.45), transparent 65%)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 80% 0%, rgba(220, 196, 136, 0.04), transparent 60%)',
        }}
      />
    </div>
  );
}
