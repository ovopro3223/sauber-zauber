'use client';

/**
 * The official Sauber & Zauber atmospheric stack: deep cinematic bg-stage,
 * three drifting aurora blobs, and a film-grain overlay. All pure CSS.
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
      <div aria-hidden className="bg-grain" />
    </>
  );
}
