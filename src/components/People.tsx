import type { CSSProperties } from 'react';
import { PEOPLE, type PersonId } from '../data';

const colour = (id: PersonId) => `var(--${id})`;

export function Avatar({ id, style }: { id: PersonId; style?: CSSProperties }) {
  return (
    <span className="av" style={{ background: colour(id), ...style }}>
      {PEOPLE[id].initial}
    </span>
  );
}

export function AvatarStack({ ids }: { ids: PersonId[] }) {
  return (
    <span className="stack">
      {ids.map((id) => (
        <Avatar key={id} id={id} />
      ))}
    </span>
  );
}

export function Dot({ id }: { id: PersonId }) {
  return <span className="dot" style={{ background: colour(id) }} />;
}
