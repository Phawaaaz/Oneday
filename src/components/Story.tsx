import { useEffect, useRef, useState } from 'react';
import { img } from '../data';
import { Icon } from './Icon';
import { AvatarStack, Dot } from './People';

const BEATS = [
  { title: 'Tick it off.', text: 'No points, no streaks, no confetti.' },
  { title: 'Say how it was.', text: 'A photo, who came, and one line.' },
  { title: 'Keep it.', text: 'It comes back a year later, on the day.' },
];

const LINE = 'Mum’s bowl collapsed twice and she still took it home';

/** Scroll story: an item is ticked, gets a "How was it?" sheet, and becomes a memory. */
export function Story() {
  const [step, setStep] = useState(1);
  const [typed, setTyped] = useState(LINE);
  const beats = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) setStep(Number((en.target as HTMLElement).dataset.step));
        });
      },
      { rootMargin: '-45% 0px -45% 0px' },
    );
    beats.current.forEach((b) => b && io.observe(b));
    return () => io.disconnect();
  }, []);

  // Type the one line out when the sheet appears
  useEffect(() => {
    if (step !== 2) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTyped(LINE);
      return;
    }
    let i = 0;
    let timer: number | undefined;
    const start = window.setTimeout(() => {
      setTyped('');
      timer = window.setInterval(() => {
        i += 1;
        setTyped(LINE.slice(0, i));
        if (i >= LINE.length) window.clearInterval(timer);
      }, 38);
    }, 300);
    return () => {
      window.clearTimeout(start);
      window.clearInterval(timer);
    };
  }, [step]);

  return (
    <section className="sec" aria-labelledby="lived-h">
      <div className="wrap">
        <div className="head" style={{ marginBottom: 0 }}>
          <h2 id="lived-h">
            Done isn’t a score. It’s a <em>memory.</em>
          </h2>
        </div>
        <div className="story">
          <div className="beats">
            {BEATS.map((b, i) => (
              <div
                key={b.title}
                ref={(el) => {
                  beats.current[i] = el;
                }}
                className={step === i + 1 ? 'beat on' : 'beat'}
                data-step={i + 1}
              >
                <h3>{b.title}</h3>
                <p>{b.text}</p>
              </div>
            ))}
          </div>
          <div className="stage" data-step={step} aria-hidden="true">
            <div className="scene">
              <div className="layer l1">
                <div className="card">
                  <div className="lh">
                    <h3>This summer</h3>
                    <span>3</span>
                  </div>
                  <div className="it faded">
                    <span className="box" />
                    <div className="tx">
                      <div className="t">Ride the Obudu cable car</div>
                    </div>
                  </div>
                  <div className="it">
                    <span className="box tick">
                      <Icon name="check" />
                    </span>
                    <div className="tx">
                      <div className="t tick-t">Pottery class, all of us</div>
                      <div className="m">
                        <Dot id="mum" />
                        Mum
                      </div>
                    </div>
                    <img className="thumb" src={img('potter.jpg')} alt="" />
                  </div>
                  <div className="it faded">
                    <span className="box" />
                    <div className="tx">
                      <div className="t">Beach day at Tarkwa Bay</div>
                    </div>
                  </div>
                  <div className="pill">
                    <Icon name="check" />
                    Mark as lived
                  </div>
                </div>
              </div>
              <div className="layer l2">
                <div className="card">
                  <div className="grab" />
                  <h4>How was it?</h4>
                  <div className="sub">Pottery class, all of us</div>
                  <div className="photos">
                    <div className="p sel">
                      <img src={img('potter.jpg')} alt="" />
                    </div>
                    <div className="p">
                      <img src={img('suya.jpg')} alt="" />
                    </div>
                    <div className="p">
                      <img src={img('tarkwa.jpg')} alt="" />
                    </div>
                    <div className="more">
                      <Icon name="plus" />
                    </div>
                  </div>
                  <div className="who">
                    <AvatarStack ids={['halima', 'mum', 'ade']} />
                    Halima, Mum, Ade
                  </div>
                  <div className="line">
                    <span>{typed}</span>
                    <span className="caret" />
                  </div>
                  <div className="pill">Save memory</div>
                </div>
              </div>
              <div className="layer l3">
                <div className="mem">
                  <img src={img('potter.jpg')} alt="" />
                  <q>{LINE}</q>
                  <div className="f">
                    <AvatarStack ids={['halima', 'mum', 'ade']} />
                    <b>Pottery class</b>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
