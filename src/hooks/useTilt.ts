import { useEffect, type RefObject } from 'react';

/** Tilts an element a few degrees toward the cursor, eased, on mouse devices only. */
export function useTilt(ref: RefObject<HTMLElement | null>, maxDeg = 3) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let tx = 0, ty = 0, x = 0, y = 0, raf = 0;
    const loop = () => {
      x += (tx - x) * 0.08;
      y += (ty - y) * 0.08;
      el.style.transform = `perspective(1400px) rotateX(${y.toFixed(3)}deg) rotateY(${x.toFixed(3)}deg)`;
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.01 ? requestAnimationFrame(loop) : 0;
    };
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const nx = (e.clientX - (r.left + r.width / 2)) / (innerWidth / 2);
      const ny = (e.clientY - (r.top + r.height / 2)) / (innerHeight / 2);
      tx = Math.max(-1, Math.min(1, nx)) * maxDeg;
      ty = Math.max(-1, Math.min(1, -ny)) * maxDeg * 0.7;
      if (!raf) raf = requestAnimationFrame(loop);
    };
    addEventListener('pointermove', onMove);
    return () => {
      removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
      el.style.transform = '';
    };
  }, [ref, maxDeg]);
}
