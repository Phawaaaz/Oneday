import { useEffect, useState, type RefObject } from 'react';

/** True while the element is in view, using an IntersectionObserver. */
export function useInView(ref: RefObject<Element | null>, options: IntersectionObserverInit) {
  const [inView, setInView] = useState(false);
  const { threshold, rootMargin } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold, rootMargin });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, threshold, rootMargin]);

  return inView;
}
