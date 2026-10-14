import { useRef, type CSSProperties } from 'react';
import { useFitText } from '../hooks/useFitText';
import { HeroTrail } from './HeroTrail';
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

export function Hero() {
  const h1 = useRef<HTMLHeadingElement>(null);
  const section = useRef<HTMLElement>(null);
  useFitText(h1, { lines: true, max: 150 });

  let n = 0;
  const words = (text: string) =>
    text.split(' ').map((w, i) => (
      <span key={i}>
        {i > 0 && ' '}
        <span className="w" style={{ '--i': n++ } as CSSProperties}>
          {w}
        </span>
      </span>
    ));

  return (
    <section className="hero" aria-labelledby="hero-h" ref={section}>
      <HeroTrail zone={section} />
      <h1 id="hero-h" ref={h1} aria-label="The things we keep saying we’ll do.">
        <span className="ln" aria-hidden="true">{words('The things we keep')}</span>{' '}
        <span className="ln" aria-hidden="true">
          {words('saying we’ll')}{' '}
          <em className="w" style={{ '--i': n++ } as CSSProperties}>
            do.
          </em>
        </span>
      </h1>
      <p className="lede">A shared list for your people that turns into the story of what you did together.</p>
      <JoinForm id="email-1" className="join" placeholder="you@example.com" button="Get early access" />
    </section>
  );
}
