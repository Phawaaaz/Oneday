import { useRef } from 'react';
import { useFitText } from '../hooks/useFitText';
import { Icon } from './Icon';
import { JoinForm } from './JoinForm';

export function Nav() {
  return (
    <header className="top">
      <a className="mark" href="#top">
        <span className="ck">
          <Icon name="check" style={{ width: 12, height: 12, strokeWidth: 3.4 }} />
        </span>
        Oneday
      </a>
      <a className="cta" href="#join">
        Get early access
      </a>
    </header>
  );
}

export function Hero({ font }: { font: string }) {
  const h1 = useRef<HTMLHeadingElement>(null);
  useFitText(h1, { lines: true, max: 150, font });

  return (
    <section className="hero" aria-labelledby="hero-h">
      <h1 id="hero-h" ref={h1}>
        <span className="ln">The things we keep</span>{' '}
        <span className="ln">
          saying we’ll <em>do.</em>
        </span>
      </h1>
      <p className="lede">A shared list for your people that turns into the story of what you did together.</p>
      <JoinForm id="email-1" className="join" placeholder="you@example.com" button="Get early access" />
    </section>
  );
}
