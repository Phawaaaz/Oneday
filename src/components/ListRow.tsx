import { PEOPLE, img, type ListItem } from '../data';
import { Icon } from './Icon';
import { Dot } from './People';

type Props = {
  item: ListItem;
  done?: boolean;
  isNew?: boolean;
  onToggle?: () => void;
};

/** One item on a list: checkbox, title, who added it, optional photo. */
export function ListRow({ item, done = false, isNew = false, onToggle }: Props) {
  const className = ['it', done && 'done', isNew && 'new'].filter(Boolean).join(' ');
  return (
    <div className={className}>
      <button className="box" aria-label={`Mark ${item.title} as lived`} aria-pressed={done} onClick={onToggle}>
        <Icon name="check" />
      </button>
      <div className="tx">
        <div className="t">{item.title}</div>
        <div className="m">
          {done ? (
            <span className="chip">Lived today</span>
          ) : (
            <>
              <Dot id={item.by} />
              {PEOPLE[item.by].name}
              {item.detail && ` · ${item.detail}`}
              {item.chip && (
                <>
                  {' · '}
                  <span className="chip">{item.chip}</span>
                </>
              )}
            </>
          )}
        </div>
      </div>
      {item.photo && <img className="thumb" src={img(item.photo)} alt="" />}
    </div>
  );
}
