import { useLayoutEffect, type RefObject } from 'react';

type Options = {
  /** Measure the widest `.ln` child instead of the element itself */
  lines?: boolean;
  /** Largest font size in px */
  max?: number;
  /** Fraction of the available width to fill */
  fill?: number;
  /** Refit when this changes, e.g. the active font family */
  font?: string;
};

/** Scales an element's font size so its text spans the width of its parent. */
export function useFitText(ref: RefObject<HTMLElement | null>, { lines = false, max = Infinity, fill = 1, font }: Options = {}) {
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fit = () => {
      const parent = el.parentElement;
      if (!parent) return;
      el.style.fontSize = '';
      const cs = getComputedStyle(parent);
      const avail = parent.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      const measured = lines
        ? Math.max(...Array.from(el.querySelectorAll<HTMLElement>('.ln'), (l) => l.scrollWidth))
        : el.getBoundingClientRect().width;
      if (!measured) return;
      const size = parseFloat(getComputedStyle(el).fontSize);
      el.style.fontSize = `${Math.min((size * avail * fill) / measured, max)}px`;
    };

    fit();
    let alive = true;
    const refit = () => alive && fit();
    document.fonts.ready.then(refit);
    if (font) document.fonts.load(`800 100px ${font}`).then(refit);
    addEventListener('resize', fit);
    return () => {
      alive = false;
      removeEventListener('resize', fit);
    };
  }, [ref, lines, max, fill, font]);
}
