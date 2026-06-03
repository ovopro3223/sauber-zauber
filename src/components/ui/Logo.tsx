'use client';

import { useEffect, useState } from 'react';

/**
 * Brand logo. Processes the white PNG background to transparent on first
 * mount (canvas trick, one-off, cached per session via state). Falls back
 * to the raw PNG if the browser blocks getImageData.
 */
type Props = {
  size?: number;
  className?: string;
  alt?: string;
  glow?: boolean;
};

let cachedDataURL: string | null = null;

export function Logo({ size = 48, className, alt = 'Sauber & Zauber', glow = true }: Props) {
  const [src, setSrc] = useState<string>(cachedDataURL ?? '/logo.png');

  useEffect(() => {
    if (cachedDataURL) {
      setSrc(cachedDataURL);
      return;
    }
    const img = new Image();
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.drawImage(img, 0, 0);
        const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const px = data.data;
        for (let i = 0; i < px.length; i += 4) {
          const r = px[i], g = px[i + 1], b = px[i + 2];
          const maxC = Math.max(r, g, b);
          const minC = Math.min(r, g, b);
          const sat = maxC === 0 ? 0 : (maxC - minC) / maxC;
          if (maxC > 245 && sat < 0.08) {
            px[i + 3] = 0;
          } else if (maxC > 215 && sat < 0.15) {
            const t = (maxC - 215) / 30;
            px[i + 3] = Math.round(px[i + 3] * (1 - t));
          }
        }
        ctx.putImageData(data, 0, 0);
        const url = canvas.toDataURL('image/png');
        cachedDataURL = url;
        setSrc(url);
      } catch {
        /* CORS or memory issue — fall back to the raw PNG */
      }
    };
    img.src = '/logo.png';
  }, []);

  return (
    <span
      className={`relative inline-flex items-center justify-center rounded-full ${
        glow ? 'anim-logo-pulse' : ''
      } ${className ?? ''}`}
      style={{ width: size, height: size }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        width={size}
        height={size}
        style={{
          width: size,
          height: size,
          objectFit: 'contain',
          filter: 'brightness(1.25) saturate(1.18) drop-shadow(0 0 8px rgba(95,227,161,0.55))',
        }}
      />
    </span>
  );
}
