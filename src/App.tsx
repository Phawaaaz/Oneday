import { Board } from './components/Board';
import { Footer } from './components/Footer';
import { Hero, Nav } from './components/Hero';
import { ItemPage } from './components/ItemPage';
import { RemixBar } from './components/RemixBar';
import { Album, CrossedOff, FinalCta, Learning } from './components/Sections';
import { Story } from './components/Story';
import { FONTS } from './data';
import { useRemix } from './hooks/useRemix';

export default function App() {
  const { mix, setMix, shuffle, coolorsUrl } = useRemix();
  const font = FONTS[mix.font].family;

  return (
    <>
      <div className="wrap" id="top">
        <Nav />
        <Hero font={font} />
        <Board />
      </div>
      <ItemPage />
      <Story />
      <Album />
      <Learning />
      <CrossedOff />
      <FinalCta />
      <Footer font={font} />
      <RemixBar mix={mix} setMix={setMix} shuffle={shuffle} coolorsUrl={coolorsUrl} />
    </>
  );
}
