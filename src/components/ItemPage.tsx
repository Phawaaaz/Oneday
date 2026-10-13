import { img } from '../data';
import { Icon } from './Icon';
import { Dot } from './People';

const TODOS = [
  { text: 'Book the resort for Easter', done: true },
  { text: 'Pack jackets, it gets cold up there', done: false },
  { text: 'Ask Ade about the canopy walk', done: false },
];

export function ItemPage() {
  return (
    <section className="sec" aria-labelledby="page-h">
      <div className="wrap">
        <div className="head">
          <h2 id="page-h">
            Every item is a page to <em>write on.</em>
          </h2>
          <p>Plans, links and lists live on the item, not lost in a group chat.</p>
        </div>
        <article className="doc" aria-label="Example item page">
          <div className="ph">
            <img src={img('obudu.jpg')} alt="Cable cars at Obudu Mountain Resort, Cross River" />
          </div>
          <div className="body">
            <h3>Ride the Obudu cable car</h3>
            <div className="meta">
              <span className="st">Planning</span>
              <span>
                <Icon name="pin" small />
                Obudu, Cross River
              </span>
              <span>
                <Icon name="cal" small />
                Easter 2027
              </span>
            </div>
            <div className="prose">
              <p>Fly into Calabar, then the long drive up. Ride early, before the mist rolls over the ranch.</p>
              {TODOS.map((t) => (
                <div key={t.text} className={t.done ? 'todo done' : 'todo'}>
                  <span className="b">{t.done && <Icon name="check" style={{ width: 12, height: 12, strokeWidth: 3.5 }} />}</span>
                  {t.text}
                </div>
              ))}
            </div>
            <div className="by">
              <Dot id="sam" />
              Sam edited this
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
