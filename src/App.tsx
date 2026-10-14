import { Board } from './components/Board';
import { Footer } from './components/Footer';
import { Hero, Nav } from './components/Hero';
import { ItemPage } from './components/ItemPage';
import { Album, CrossedOff, FinalCta, Learning } from './components/Sections';
import { Story } from './components/Story';

export default function App() {
  return (
    <>
      <div className="wrap" id="top">
        <Nav />
        <Hero />
        <Board />
      </div>
      <ItemPage />
      <Story />
      <Album />
      <Learning />
      <CrossedOff />
      <FinalCta />
      <Footer />
    </>
  );
}
