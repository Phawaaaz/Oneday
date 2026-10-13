import { useState, type CSSProperties } from 'react';
import { ALBUM, CROSSED_OFF, CURRENT_STEP, STEPS, img } from '../data';
import { MemoryImage } from '../gl/MemoryImage';
import { useReveal } from '../hooks/useReveal';
import { Icon } from './Icon';
import { Head } from './Reveal';
import { JoinForm } from './JoinForm';
import { Avatar, AvatarStack, Dot } from './People';

export function Album() {
  return (
    <section className="sec" aria-labelledby="album-h">
      <div className="wrap">
        <Head>
          <h2 id="album-h">
            The list becomes the <em>album.</em>
          </h2>
          <p>Only your people. Nothing public, nothing to like.</p>
        </Head>
        <div className="album">
          {ALBUM.map((m) => (
            <div key={m.photo} className="mem">
              <MemoryImage src={img(m.photo)} alt={m.alt} />
              <q>{m.quote}</q>
              <div className="f">
                <AvatarStack ids={m.people} />
                <b>{m.when}</b>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Learning() {
  return (
    <section className="sec" aria-labelledby="learn-h">
      <div className="wrap">
        <Head>
          <h2 id="learn-h">
            A path for what you want to <em>learn.</em>
          </h2>
          <p>Steps, notes, and always knowing where you are.</p>
        </Head>
        <div className="topic">
          <div className="h">
            <h3>Yoruba</h3>
            <span className="priv">
              <Avatar id="ade" />
              Shared with Ade
            </span>
          </div>
          <div className="pos">
            <b>
              Step {CURRENT_STEP + 1} of {STEPS.length}
            </b>
          </div>
          <div className="path" role="list" aria-label="Steps">
            {STEPS.map((s, i) => (
              <div
                key={s}
                className={i < CURRENT_STEP ? 'stop d' : i === CURRENT_STEP ? 'stop c' : 'stop'}
                role="listitem"
                aria-current={i === CURRENT_STEP ? 'step' : undefined}
              >
                <i />
                <span>{s}</span>
              </div>
            ))}
          </div>
          <div className="resume">
            <div className="t">Numbers: counting in Yoruba</div>
            <p>Past fifteen it counts by subtracting. Practise with prices at the market.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function CrossedOff() {
  const [list, shown] = useReveal<HTMLUListElement>(0.3);
  return (
    <section className="sec" aria-labelledby="wont-h">
      <div className="wrap">
        <Head>
          <h2 id="wont-h">
            Crossed off on <em>purpose.</em>
          </h2>
        </Head>
        <ul className={shown ? 'struck in' : 'struck'} ref={list}>
          {CROSSED_OFF.map((c, i) => (
            <li key={c.thing} style={{ '--i': i } as CSSProperties}>
              <s>{c.thing}</s>
              <span>{c.why}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** The closing signup, shown as the last item on a list. It ticks itself off on success. */
export function FinalCta() {
  const [joined, setJoined] = useState(false);

  return (
    <section className="final" id="join" aria-labelledby="final-h">
      <div className="wrap">
        <div>
          <h2 id="final-h">
            Start the list. Then go <em>do it.</em>
          </h2>
          <p>For iPhone and Android. Be one of the first groups in.</p>
        </div>
        <div className="last">
          <div className="lh">
            <h3>Someday</h3>
            <span>3</span>
          </div>
          <div className="it faded">
            <span className="box" />
            <div className="tx">
              <div className="t">Swim at Wikki Warm Spring</div>
              <div className="m">
                <Dot id="ade" />
                Ade
              </div>
            </div>
          </div>
          <div className="it faded">
            <span className="box" />
            <div className="tx">
              <div className="t">Learn enough Yoruba to haggle at Balogun</div>
              <div className="m">
                <Dot id="sam" />
                Sam
              </div>
            </div>
          </div>
          <div className={joined ? 'it goal done' : 'it goal'}>
            <span className="box">
              <Icon name="check" />
            </span>
            <div className="tx">
              <div className="t">Get Oneday early</div>
              <div className="m">
                {joined ? (
                  <span className="chip">Done today</span>
                ) : (
                  <>
                    <Dot id="you" />
                    You · just now
                  </>
                )}
              </div>
            </div>
          </div>
          <JoinForm id="email-2" className="capture" placeholder="Your email…" button="Get early access" onJoined={() => setJoined(true)} />
        </div>
      </div>
    </section>
  );
}
