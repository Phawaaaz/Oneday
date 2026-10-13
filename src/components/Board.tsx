import { useRef, useState, type FormEvent } from 'react';
import { SOMEDAY, SOMEDAY_TOTAL, THIS_SUMMER, type ListItem } from '../data';
import { useTilt } from '../hooks/useTilt';
import { Icon } from './Icon';
import { ListRow } from './ListRow';
import { AvatarStack } from './People';

/** The shared "Together" list. Visitors can tick items and add their own. */
export function Board() {
  const [someday, setSomeday] = useState<ListItem[]>(SOMEDAY);
  const [added, setAdded] = useState<Set<string>>(new Set());
  const [done, setDone] = useState<Set<string>>(new Set());
  const [draft, setDraft] = useState('');
  const board = useRef<HTMLDivElement>(null);
  useTilt(board);

  const toggle = (id: string) =>
    setDone((cur) => {
      const next = new Set(cur);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const add = (e: FormEvent) => {
    e.preventDefault();
    const title = draft.trim();
    if (!title) return;
    const id = `you-${Date.now()}`;
    setSomeday((cur) => [{ id, title, by: 'you', detail: 'just now' }, ...cur]);
    setAdded((cur) => new Set(cur).add(id));
    setDraft('');
  };

  const row = (item: ListItem) => (
    <ListRow key={item.id} item={item} done={done.has(item.id)} isNew={added.has(item.id)} onToggle={() => toggle(item.id)} />
  );

  return (
    <div className="board" ref={board}>
      <header>
        <h2>Together</h2>
        <div className="grp">
          <AvatarStack ids={['halima', 'sam', 'mum', 'ade']} />
          Family &amp; friends
        </div>
      </header>
      <div className="cols">
        <div>
          <div className="lh">
            <h3>This summer</h3>
            <span>{THIS_SUMMER.length}</span>
          </div>
          {THIS_SUMMER.map(row)}
        </div>
        <div>
          <div className="lh">
            <h3>Someday</h3>
            <span>{SOMEDAY_TOTAL + added.size}</span>
          </div>
          {someday.map(row)}
        </div>
      </div>
      <form className="capture" onSubmit={add}>
        <label className="vh" htmlFor="cap">
          Add something to the list
        </label>
        <input id="cap" placeholder="Add something we want to do…" autoComplete="off" maxLength={80} value={draft} onChange={(e) => setDraft(e.target.value)} />
        <button className="add" type="submit" aria-label="Add to list">
          <Icon name="plus" />
        </button>
      </form>
    </div>
  );
}
