import { useEffect, useRef, type RefObject } from 'react';
import { img } from '../data';

const PHOTOS = ['canopy.jpg', 'tarkwa.jpg', 'bridge.jpg', 'nike.jpg', 'suya.jpg', 'potter.jpg', 'obudu.jpg', 'wikki.jpg'].map(img);
const SPACING = 120; // px of pointer travel between photos

/** Moving the mouse across the hero leaves a short-lived trail of memory photos behind the headline. */
export function HeroTrail({ zone }: { zone: RefObject<HTMLElement | null> }) {
  const layer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const area = zone.current;
    const box = layer.current;
    if (!area || !box) return;
    if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Warm the cache so the first photos appear instantly
    PHOTOS.forEach((src) => (new Image().src = src));

    let last: [number, number] | null = null;
    let next = 0;
    const onMove = (e: PointerEvent) => {
      const r = area.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      if (last && Math.hypot(x - last[0], y - last[1]) < SPACING) return;
      last = [x, y];
      const photo = document.createElement('img');
      photo.src = PHOTOS[next++ % PHOTOS.length];
      photo.alt = '';
      photo.className = 'trail';
      photo.style.left = `${x}px`;
      photo.style.top = `${y}px`;
      photo.style.setProperty('--r', `${(Math.random() * 14 - 7).toFixed(1)}deg`);
      box.appendChild(photo);
      photo.addEventListener('animationend', () => photo.remove());
    };
    const onLeave = () => (last = null);
    area.addEventListener('pointermove', onMove);
    area.addEventListener('pointerleave', onLeave);
    return () => {
      area.removeEventListener('pointermove', onMove);
      area.removeEventListener('pointerleave', onLeave);
      box.replaceChildren();
    };
  }, [zone]);

  return <div ref={layer} className="trail-layer" aria-hidden="true" />;
}
