'use client';

import { Particles } from '@/components/ui/Particles';

/**
 * The official Sauber & Zauber atmospheric stack:
 *   bg-stage   — multi-radial cinematic backdrop (CSS)
 *   bg-aurora  — three drifting green blobs (CSS keyframes)
 *   particles  — canvas mint particles, rAF, auto-paused on hidden
 *   bg-grain   — SVG noise overlay (CSS)
 */
export function AmbientLights() {
  return (
    <>
      <div aria-hidden className="bg-stage" />
      <div aria-hidden className="bg-aurora">
        <span className="a1" />
        <span className="a2" />
        <span className="a3" />
      </div>
      <Particles />
      <div aria-hidden className="bg-grain" />
    </>
  );
}
