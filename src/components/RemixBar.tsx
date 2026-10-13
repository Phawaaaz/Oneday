import type { Dispatch, SetStateAction } from 'react';
import { ACCENTS, FONTS, GROUNDS, type AccentId, type GroundId } from '../data';
import type { Mix } from '../hooks/useRemix';
import { Icon } from './Icon';

type Props = {
  mix: Mix;
  setMix: Dispatch<SetStateAction<Mix>>;
  shuffle: () => void;
  coolorsUrl: string;
};

/** Floating bar for trying fonts and colours on the live page. */
export function RemixBar({ mix, setMix, shuffle, coolorsUrl }: Props) {
  return (
    <div className="remix" role="group" aria-label="Remix fonts and colours">
      <div className="set">
        {Object.entries(FONTS).map(([id, f]) => (
          <button
            key={id}
            type="button"
            className="ff"
            style={{ fontFamily: f.family }}
            title={f.name}
            aria-label={`Font: ${f.name}`}
            aria-pressed={mix.font === id}
            onClick={() => setMix((m) => ({ ...m, font: id }))}
          >
            Aa
          </button>
        ))}
      </div>
      <span className="sep" />
      <div className="set">
        {(Object.keys(GROUNDS) as GroundId[]).map((id) => (
          <button
            key={id}
            type="button"
            className="sw"
            style={{ background: GROUNDS[id].paper }}
            title={GROUNDS[id].name}
            aria-label={GROUNDS[id].name}
            aria-pressed={mix.ground === id}
            onClick={() => setMix((m) => ({ ...m, ground: id }))}
          />
        ))}
      </div>
      <span className="sep" />
      <div className="set">
        {(Object.keys(ACCENTS) as AccentId[]).map((id) => (
          <button
            key={id}
            type="button"
            className="sw"
            style={{ background: ACCENTS[id].accent }}
            title={ACCENTS[id].name}
            aria-label={ACCENTS[id].name}
            aria-pressed={mix.accent === id}
            onClick={() => setMix((m) => ({ ...m, accent: id }))}
          />
        ))}
      </div>
      <span className="sep" />
      <button className="icon" type="button" aria-label="Shuffle colours" title="Shuffle" onClick={shuffle}>
        <Icon name="shuffle" small />
      </button>
      <a href={coolorsUrl} target="_blank" rel="noopener" aria-label="Open this mix in Coolors" title="Open in Coolors">
        <Icon name="out" small />
      </a>
    </div>
  );
}
