import { useRef } from 'react';
import { CREDITS } from '../data';
import { useFitText } from '../hooks/useFitText';
import { useInView } from '../hooks/useInView';

export function Footer({ font }: { font: string }) {
  const giant = useRef<HTMLDivElement>(null);
  useFitText(giant, { fill: 0.985, font });
  const ticked = useInView(giant, { threshold: 0.6 });

  return (
    <footer>
      <div className="wrap">
        <div className="foot-top">
          <p className="foot-line">For the people you’d do anything with.</p>
          <nav className="foot-links" aria-label="Footer">
            <a className="primary" href="#join">
              Get early access
            </a>
            <a href="#top">Back to top</a>
          </nav>
        </div>
        <div ref={giant} className={ticked ? 'giant ticked' : 'giant'} aria-hidden="true">
          <span className="gbox">
            <svg className="i" viewBox="0 0 24 24">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </span>
          Oneday
        </div>
        <div className="foot-base">
          <span>Oneday, 2026</span>
          <details className="credits">
            <summary>Photo credits</summary>
            <ul>
              {CREDITS.map((c) => (
                <li key={c.url}>
                  <a href={c.url} target="_blank" rel="noopener">
                    {c.label}
                  </a>
                  , {c.author}, {c.license}
                </li>
              ))}
            </ul>
          </details>
        </div>
      </div>
    </footer>
  );
}
