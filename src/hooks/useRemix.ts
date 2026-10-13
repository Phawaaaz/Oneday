import { useEffect, useState } from 'react';
import { ACCENTS, FONTS, GROUNDS, type AccentId, type GroundId } from '../data';

export type Mix = { ground: GroundId; accent: AccentId; font: string };

const STORAGE_KEY = 'oneday-mix';
const DEFAULT_MIX: Mix = { ground: 'paper', accent: 'red', font: 'geist' };

const isGround = (v: unknown): v is GroundId => typeof v === 'string' && v in GROUNDS;
const isAccent = (v: unknown): v is AccentId => typeof v === 'string' && v in ACCENTS;

function initialMix(): Mix {
  let mix = DEFAULT_MIX;
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}');
    if (isGround(saved.ground) && isAccent(saved.accent)) {
      mix = { ground: saved.ground, accent: saved.accent, font: saved.font in FONTS ? saved.font : DEFAULT_MIX.font };
    }
  } catch {
    // Ignore unreadable storage
  }
  // A shared link (#ground-accent-font) wins over what was saved
  const [g, a, f] = location.hash.slice(1).split('-');
  if (isGround(g) && isAccent(a)) mix = { ground: g, accent: a, font: f in FONTS ? f : mix.font };
  return mix;
}

/** Ground, accent and font chosen in the remix bar, applied as CSS variables. */
export function useRemix() {
  const [mix, setMix] = useState<Mix>(initialMix);

  useEffect(() => {
    const g = GROUNDS[mix.ground];
    const a = ACCENTS[mix.accent];
    const f = FONTS[mix.font];
    const vars: Record<string, string> = {
      '--font': f.family,
      '--features': f.features ?? 'normal',
      '--paper': g.paper,
      '--surface': g.surface,
      '--ink': g.ink,
      '--ink-2': g.ink2,
      '--ink-3': g.ink3,
      '--line': g.line,
      '--accent': a.accent,
      '--accent-text': a.text,
      '--on-accent': a.on,
    };
    const root = document.documentElement.style;
    Object.entries(vars).forEach(([k, v]) => root.setProperty(k, v));
    history.replaceState(null, '', `#${mix.ground}-${mix.accent}-${mix.font}`);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mix));
    } catch {
      // Storage can be unavailable in private browsing
    }
  }, [mix]);

  const shuffle = () => {
    const pick = <T extends string>(keys: T[]) => keys[Math.floor(Math.random() * keys.length)];
    setMix((cur) => {
      let next: Mix;
      do {
        next = {
          ground: pick(Object.keys(GROUNDS) as GroundId[]),
          accent: pick(Object.keys(ACCENTS) as AccentId[]),
          font: cur.font,
        };
      } while (next.ground === cur.ground && next.accent === cur.accent);
      return next;
    });
  };

  const coolorsUrl = (() => {
    const g = GROUNDS[mix.ground];
    const a = ACCENTS[mix.accent];
    return 'https://coolors.co/' + [g.paper, g.surface, g.ink, g.ink2, a.accent, a.text].map((h) => h.slice(1).toLowerCase()).join('-');
  })();

  return { mix, setMix, shuffle, coolorsUrl };
}
