// Page content. People, items and memories are illustrative examples.

export type PersonId = 'halima' | 'sam' | 'mum' | 'ade' | 'you';

export const PEOPLE: Record<PersonId, { name: string; initial: string }> = {
  halima: { name: 'Halima', initial: 'H' },
  sam: { name: 'Sam', initial: 'S' },
  mum: { name: 'Mum', initial: 'M' },
  ade: { name: 'Ade', initial: 'A' },
  you: { name: 'You', initial: 'Y' },
};

export const img = (file: string) => `${import.meta.env.BASE_URL}img/${file}`;

export type ListItem = {
  id: string;
  title: string;
  by: PersonId;
  detail?: string;
  chip?: string;
  photo?: string;
};

export const THIS_SUMMER: ListItem[] = [
  { id: 'canopy', title: 'Lekki canopy walk', by: 'ade', detail: 'Lekki, Lagos', photo: 'canopy.jpg' },
  { id: 'tarkwa', title: 'Beach day at Tarkwa Bay', by: 'halima', chip: 'August', photo: 'tarkwa.jpg' },
  { id: 'pottery', title: 'Pottery class, all of us', by: 'mum', detail: '3 notes', photo: 'potter.jpg' },
];

export const SOMEDAY: ListItem[] = [
  { id: 'obudu', title: 'Ride the Obudu cable car', by: 'sam', detail: 'Obudu', photo: 'obudu.jpg' },
  { id: 'wikki', title: 'Swim at Wikki Warm Spring', by: 'ade', detail: 'Yankari', photo: 'wikki.jpg' },
];

// The Someday list holds more items than are shown
export const SOMEDAY_TOTAL = 14;

export type Memory = { photo: string; alt: string; quote: string; people: PersonId[]; when: string };

export const ALBUM: Memory[] = [
  { photo: 'potter.jpg', alt: 'Hands shaping clay on a pottery wheel', quote: 'Mum’s bowl collapsed twice', people: ['halima', 'mum'], when: 'June' },
  { photo: 'nike.jpg', alt: 'Paintings stacked floor to ceiling at Nike Art Gallery, Lekki', quote: 'Mum wanted the biggest painting', people: ['mum', 'halima'], when: 'May' },
  { photo: 'bridge.jpg', alt: 'The Lekki–Ikoyi Link Bridge lit up at night', quote: 'Walked the bridge at midnight', people: ['sam', 'ade'], when: 'April' },
  { photo: 'suya.jpg', alt: 'A suya seller at his grill', quote: 'Three suya spots, one winner', people: ['halima', 'sam'], when: 'March' },
];

export const STEPS = ['Tones', 'Greetings', '100 words', 'Numbers', 'Market talk', 'A folktale', 'A Nollywood film', 'Call Grandma', 'Ibadan trip'];
export const CURRENT_STEP = 3;

export const CROSSED_OFF = [
  { thing: 'Streaks', why: 'Missing a week isn’t failing.' },
  { thing: 'Points', why: 'A pottery class isn’t worth 40 XP.' },
  { thing: 'A public feed', why: 'Only the people you invite.' },
];

export const CREDITS = [
  { label: 'Obudu cable car', author: 'Ei’eke', license: 'CC BY-SA 4.0', url: 'https://commons.wikimedia.org/wiki/File:Cable_Car,_Obudu_Cattle_Ranch,_Obudu,_Cross_river_state_01.jpg' },
  { label: 'Potter at the wheel', author: 'VKeem', license: 'CC BY-SA 4.0', url: 'https://commons.wikimedia.org/wiki/File:A_potter_making_pots_on_the_potters_wheel.jpg' },
  { label: 'Wikki Warm Spring', author: 'Kambai Akau', license: 'CC BY-SA 4.0', url: 'https://commons.wikimedia.org/wiki/File:Wikki_Warm_Spring_Spring_in_Yankari_Game_Reserve_01.jpg' },
  { label: 'Suya seller', author: 'FischerFotos', license: 'CC BY-SA 4.0', url: 'https://commons.wikimedia.org/wiki/File:Suya_Seller.jpg' },
  { label: 'Tarkwa Bay', author: 'Liesel81', license: 'CC BY-SA 4.0', url: 'https://commons.wikimedia.org/wiki/File:Tarkwa_Bay_Beach_Front.jpg' },
  { label: 'Lekki canopy walk', author: 'Turizimpressions', license: 'CC BY-SA 4.0', url: 'https://commons.wikimedia.org/wiki/File:Lekki_Conservation_Center,_Canopy_walk.jpg' },
  { label: 'Nike Art Gallery', author: 'FrankvEck', license: 'CC BY-SA 4.0', url: 'https://commons.wikimedia.org/wiki/File:Lagos_Lekki_Nike_Art_Gallery_Aug_2026_IMG_6978b.jpg' },
  { label: 'Lekki–Ikoyi Link Bridge', author: 'Olasunkanmiariyo', license: 'CC BY-SA 4.0', url: 'https://commons.wikimedia.org/wiki/File:Lekki_link_bridge_at_night.jpg' },
];

// Remix options. Grounds and accents come from the Bear, Day One and Bucket palettes.
// text = readable accent on every ground (at least 4.5:1); on = text colour on the accent fill.
export const GROUNDS = {
  paper: { name: 'Paper', paper: '#FAF9F7', surface: '#FFFFFF', ink: '#1F2024', ink2: '#5E6066', ink3: '#A3A5AB', line: '#E8E6E2' },
  sand: { name: 'Sand', paper: '#F4EFE7', surface: '#FFFDF9', ink: '#2A2622', ink2: '#655D53', ink3: '#A89F93', line: '#E4DCD0' },
  mist: { name: 'Mist', paper: '#F4F8FB', surface: '#FFFFFF', ink: '#14212E', ink2: '#56626E', ink3: '#9AA5B0', line: '#E1E8EE' },
  lilac: { name: 'Lilac', paper: '#F6F5FA', surface: '#FFFFFF', ink: '#21163A', ink2: '#5E5670', ink3: '#A29DB0', line: '#E6E3EE' },
};

export const ACCENTS = {
  red: { name: 'Bear red', accent: '#C9372C', text: '#B3301F', on: '#FFFFFF' },
  rust: { name: 'Rust', accent: '#C2410C', text: '#A8380A', on: '#FFFFFF' },
  sky: { name: 'Day One sky', accent: '#2BB3EA', text: '#0A6E9E', on: '#14212E' },
  blue: { name: 'Bucket blue', accent: '#2F6FE0', text: '#2560C8', on: '#FFFFFF' },
  yellow: { name: 'Bucket yellow', accent: '#F2D543', text: '#7A5F00', on: '#21163A' },
  magenta: { name: 'Magenta', accent: '#B42AA0', text: '#A1258F', on: '#FFFFFF' },
  green: { name: 'Green', accent: '#17785A', text: '#156B51', on: '#FFFFFF' },
};

export const FONTS: Record<string, { name: string; family: string; features?: string }> = {
  geist: { name: 'Geist', family: '"Geist", system-ui, sans-serif' },
  inter: { name: 'Inter', family: '"Inter", system-ui, sans-serif', features: '"cv11", "ss01"' },
  tight: { name: 'Inter Tight', family: '"Inter Tight", system-ui, sans-serif', features: '"cv11", "ss01"' },
  manrope: { name: 'Manrope', family: '"Manrope", system-ui, sans-serif' },
  jakarta: { name: 'Plus Jakarta Sans', family: '"Plus Jakarta Sans", system-ui, sans-serif' },
  schibsted: { name: 'Schibsted Grotesk', family: '"Schibsted Grotesk", system-ui, sans-serif' },
};

export type GroundId = keyof typeof GROUNDS;
export type AccentId = keyof typeof ACCENTS;
