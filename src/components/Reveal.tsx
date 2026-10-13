import type { CSSProperties, ReactNode } from 'react';
import { useReveal } from '../hooks/useReveal';

/** A section heading block that eases in when it scrolls into view. */
export function Head({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  const [ref, shown] = useReveal<HTMLDivElement>(0.4);
  return (
    <div ref={ref} className={shown ? 'head reveal in' : 'head reveal'} style={style}>
      {children}
    </div>
  );
}
