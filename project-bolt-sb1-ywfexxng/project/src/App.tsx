import { useEffect, useMemo, useState, type MouseEvent, type ReactNode } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  CirclePlay,
  Heart,
  Image as ImageIcon,
  Music2,
  Pause,
  Play,
  RotateCcw,
  Sparkles,
  Volume2,
  X,
} from 'lucide-react';

type Page = 1 | 2 | 3 | 4 | 5 | 6 | 7;

type Memory = {
  src: string;
  title: string;
  note: string;
  rotation: string;
};

const letter = `My dearest Yavi ❤️,

Happy Birthday to the girl who holds such a special place in my heart.

Sometimes I wonder how a single person can bring so much happiness into another person's life. Then I think of you, and suddenly, I understand. It's in your smile, your little habits, your laughter, the way you make ordinary moments feel extraordinary, and all the tiny things that make you who you are.

Yavi, I may not always find the perfect words to explain my feelings, but I hope you can feel the love behind every little thing I do. You deserve happiness that never fades, a smile that never loses its light, and dreams that find their way into reality.

On your birthday, I wish I could wrap all the happiness in the world into a little gift and place it in your hands. I wish I could collect every beautiful sunset, every shining star, and every golden moment just to remind you how precious you are.

Thank you for being the beautiful person you are. Thank you for the smiles, the memories, and the feelings that words sometimes cannot explain. No matter how busy life becomes or how quickly the years pass, I hope we always find reasons to smile, laugh, care, and create beautiful memories together.

My wish for you is simple: may your heart always find peace, may your eyes always have reasons to sparkle, and may life surprise you with more happiness than you ever imagined.

Today, the candles may shine for your birthday, but you are the light that makes this moment beautiful.

And if there is one thing I want you to remember after reading this letter, it is this: you are special, you are appreciated, and you deserve all the love and happiness that life can give you.

Happy Birthday once again, my beautiful Yavi. May this new chapter of your life be filled with laughter, adventures, wonderful dreams, and unforgettable moments.

With every heartbeat, every little wish, and every piece of love I have to give,

Forever yours,
NAVEEN ♾️ ❤️`;

const memories: Memory[] = [
  { src: '/assets/Y1.jpeg', title: 'A moment I will always treasure', note: 'The smile that makes every room warmer.', rotation: '-2deg' },
  { src: '/assets/y2.jpeg', title: 'My favorite kind of happiness', note: 'Just you, just me, and a little piece of our world.', rotation: '2deg' },
  { src: '/assets/y3.jpeg', title: 'Memories that stay forever', note: 'Every ordinary day becomes extraordinary with you.', rotation: '-1deg' },
  { src: '/assets/y4.jpeg', title: 'You make ordinary days magical', note: 'The kind of memory my heart keeps replaying.', rotation: '3deg' },
  { src: '/assets/y5.jpeg', title: 'A thousand memories, one special girl', note: 'Our story is my favorite place to be.', rotation: '-3deg' },
];

const pageLabels = ['Cake', 'Letter', 'Memories', 'Our song', 'Video', 'My heart', 'Forever'];

function App() {
  const [page, setPage] = useState<Page>(1);
  const [candlesLit, setCandlesLit] = useState(true);
  const [cakeCelebrated, setCakeCelebrated] = useState(false);
  const [typedMessage, setTypedMessage] = useState('');
  const [letterOpen, setLetterOpen] = useState(false);
  const [typedLetter, setTypedLetter] = useState('');
  const [selectedMemory, setSelectedMemory] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [burst, setBurst] = useState<{ id: number; x: number; y: number }[]>([]);

  const birthdayMessage = 'Happy Birthday, my beautiful Yavi ❤️\n\nYou are not just a person in my life; you are one of the most beautiful reasons behind my happiness. Your smile makes ordinary moments special, and your presence makes my world brighter.\n\nOn your special day, I wish you endless happiness, beautiful memories, and every little thing your heart dreams of.\n\nToday is your day, my girl. Keep smiling, keep shining, and never forget how much you mean to me.\n\nWith all my love,\nNaveen ♾️ ❤️';

  useEffect(() => {
    if (page !== 2) return;
    setTypedMessage('');
    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setTypedMessage(birthdayMessage.slice(0, index));
      if (index >= birthdayMessage.length) window.clearInterval(timer);
    }, 17);
    return () => window.clearInterval(timer);
  }, [page]);

  useEffect(() => {
    if (!letterOpen) return;
    setTypedLetter('');
    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setTypedLetter(letter.slice(0, index));
      if (index >= letter.length) window.clearInterval(timer);
    }, 10);
    return () => window.clearInterval(timer);
  }, [letterOpen]);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedMemory(null);
      if (event.key === 'ArrowRight' && page < 7) setPage((page + 1) as Page);
      if (event.key === 'ArrowLeft' && page > 1) setPage((page - 1) as Page);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [page]);

  const rainHearts = useMemo(() => Array.from({ length: 22 }, (_, index) => ({
    left: `${(index * 37) % 100}%`,
    delay: `${(index % 9) * 0.8}s`,
    duration: `${7 + (index % 6)}s`,
    size: `${12 + (index % 4) * 5}px`,
    color: index % 3 === 0 ? 'heart-gold' : index % 3 === 1 ? 'heart-red' : 'heart-rose',
  })), []);

  const showBurst = (event: MouseEvent<HTMLElement>) => {
    const id = Date.now();
    setBurst((items) => [...items, { id, x: event.clientX, y: event.clientY }]);
    window.setTimeout(() => setBurst((items) => items.filter((item) => item.id !== id)), 900);
  };

  const goTo = (nextPage: Page) => {
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const next = () => page < 7 && goTo((page + 1) as Page);
  const previous = () => page > 1 && goTo((page - 1) as Page);
  const replay = () => {
    setPage(1);
    setCandlesLit(true);
    setCakeCelebrated(false);
    setLetterOpen(false);
    setIsPlaying(false);
  };

  return (
    <main className={`app-shell page-${page}`} onClick={showBurst}>
      <div className="ambient-glow ambient-glow-one" />
      <div className="ambient-glow ambient-glow-two" />
      <div className="heart-rain" aria-hidden="true">
        {rainHearts.map((heart, index) => (
          <Heart key={index} className={`rain-heart ${heart.color}`} style={{ left: heart.left, animationDelay: heart.delay, animationDuration: heart.duration, width: heart.size, height: heart.size }} fill="currentColor" />
        ))}
      </div>
      {burst.map((item) => <span key={item.id} className="click-burst" style={{ left: item.x, top: item.y }} aria-hidden="true">♥</span>)}

      <header className="topbar">
        <button className="brand-mark" onClick={(event) => { event.stopPropagation(); goTo(1); }} aria-label="Return to the first chapter">
          <span className="brand-heart"><Heart size={17} fill="currentColor" /></span>
          <span>N & Y</span>
        </button>
        <div className="chapter-count">CHAPTER {String(page).padStart(2, '0')} <span>/ 07</span></div>
      </header>

      <div className="progress-nav" aria-label="Birthday story progress">
        {pageLabels.map((label, index) => {
          const chapter = (index + 1) as Page;
          return <button key={label} className={page === chapter ? 'progress-step active' : page > chapter ? 'progress-step visited' : 'progress-step'} onClick={(event) => { event.stopPropagation(); goTo(chapter); }} aria-label={`Go to chapter ${chapter}: ${label}`}><span className="progress-heart"><Heart size={13} fill="currentColor" /></span><span>{label}</span></button>;
        })}
      </div>

      <div className="page-content">
        {page === 1 && <OpeningPage candlesLit={candlesLit} cakeCelebrated={cakeCelebrated} setCandlesLit={setCandlesLit} setCakeCelebrated={setCakeCelebrated} onNext={next} />}
        {page === 2 && <LoveNotePage image={memories[0].src} message={typedMessage} onNext={next} />}
        {page === 3 && <MemoriesPage selectedMemory={selectedMemory} setSelectedMemory={setSelectedMemory} onNext={next} />}
        {page === 4 && <SongPage isPlaying={isPlaying} setIsPlaying={setIsPlaying} image={memories[1].src} onNext={next} />}
        {page === 5 && <VideoPage onNext={next} />}
        {page === 6 && <HeartLetterPage letterOpen={letterOpen} setLetterOpen={setLetterOpen} typedLetter={typedLetter} onNext={next} />}
        {page === 7 && <FinalPage onReplay={replay} />}
      </div>

      <footer className="site-footer"><Sparkles size={13} /> Made with love by Naveen <span>♾️</span></footer>
      {page > 1 && <button className="side-nav previous" onClick={(event) => { event.stopPropagation(); previous(); }} aria-label="Previous chapter"><ArrowLeft size={17} /> <span>PREVIOUS</span></button>}
      {page < 7 && <button className="side-nav next" onClick={(event) => { event.stopPropagation(); next(); }} aria-label="Next chapter"><span>NEXT PAGE</span> <ArrowRight size={17} /></button>}

      {selectedMemory !== null && <Lightbox selectedMemory={selectedMemory} setSelectedMemory={setSelectedMemory} />}
    </main>
  );
}

function PageIntro({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return <div className="page-intro"><p className="eyebrow"><span /> {eyebrow} <span /></p><h1>{title}</h1>{children}</div>;
}

function OpeningPage({ candlesLit, cakeCelebrated, setCandlesLit, setCakeCelebrated, onNext }: { candlesLit: boolean; cakeCelebrated: boolean; setCandlesLit: (value: boolean) => void; setCakeCelebrated: (value: boolean) => void; onNext: () => void }) {
  return <section className="chapter opening-chapter">
    <div className="opening-copy"><p className="eyebrow"><span /> A little love story begins <span /></p><h1>HAPPY BIRTHDAY<br /><em>YAVI</em> <Heart className="title-heart" size={42} fill="currentColor" /></h1><p className="intro-line">Today, the world became more beautiful because you were born, Yavi.</p></div>
    <div className="cake-stage" onClick={(event) => { event.stopPropagation(); setCakeCelebrated(true); }}>
      <div className="balloons"><span className="balloon balloon-red" /><span className="balloon balloon-gold" /><span className="balloon balloon-cream" /></div>
      <div className={`cake ${cakeCelebrated ? 'cake-celebrated' : ''}`}><div className="cake-top"><span className={`candle ${candlesLit ? 'lit' : 'out'}`}><i /></span><span className={`candle candle-two ${candlesLit ? 'lit' : 'out'}`}><i /></span><span className={`candle candle-three ${candlesLit ? 'lit' : 'out'}`}><i /></span></div><div className="cake-layer layer-top"><Heart size={18} fill="currentColor" /></div><div className="cake-layer layer-middle"><span /><span /><span /></div><div className="cake-layer layer-bottom"><Heart size={20} fill="currentColor" /><Heart size={20} fill="currentColor" /></div><div className="cake-plate" /></div>
      {cakeCelebrated && <div className="celebration">♥ &nbsp; ♥ &nbsp; ♥</div>}
      <button className="candle-button" onClick={(event) => { event.stopPropagation(); setCandlesLit(!candlesLit); }}><Sparkles size={14} /> {candlesLit ? 'BLOW OUT THE CANDLES' : 'RELIGHT THE CANDLES'}</button>
    </div>
    <button className="primary-button opening-button" onClick={(event) => { event.stopPropagation(); onNext(); }}>START YOUR SURPRISE <Heart size={18} fill="currentColor" /></button>
  </section>;
}

function LoveNotePage({ image, message, onNext }: { image: string; message: string; onNext: () => void }) {
  return <section className="chapter note-chapter"><PageIntro eyebrow="Chapter two · a note from me" title="For the girl who makes my world brighter" /><div className="note-layout"><div className="portrait-wrap"><div className="portrait-halo" /><img src={image} alt="Yavi smiling at the camera" /><div className="portrait-caption"><span>Y</span><div><strong>my beautiful yavi</strong><small>the brightest part of my every day</small></div></div></div><div className="typed-note"><div className="note-heading"><span className="tiny-label">A LETTER, IN REAL TIME</span><Heart size={20} fill="currentColor" /></div><p className="typing-copy">{message}<span className="typing-cursor" /></p><button className="primary-button" onClick={(event) => { event.stopPropagation(); onNext(); }}>NEXT SURPRISE <Heart size={17} fill="currentColor" /></button></div></div></section>;
}

function MemoriesPage({ selectedMemory, setSelectedMemory, onNext }: { selectedMemory: number | null; setSelectedMemory: (value: number | null) => void; onNext: () => void }) {
  return <section className="chapter memories-chapter"><PageIntro eyebrow="Chapter three · pieces of us" title="Our beautiful memories"><p className="intro-copy">Five little windows into the moments I want to hold forever.</p></PageIntro><div className="memory-grid">{memories.map((memory, index) => <button key={memory.src} className={`memory-card memory-${index + 1}`} style={{ ['--rotation' as string]: memory.rotation }} onClick={(event) => { event.stopPropagation(); setSelectedMemory(index); }}><div className="memory-image"><img src={memory.src} alt={memory.title} /><span className="zoom-icon"><ImageIcon size={17} /></span></div><strong>{memory.title} <Heart size={14} fill="currentColor" /></strong><small>{memory.note}</small></button>)}</div><button className="primary-button centered-button" onClick={(event) => { event.stopPropagation(); onNext(); }}>MORE OF US <Heart size={17} fill="currentColor" /></button>{selectedMemory !== null && <span className="sr-only">Memory selected</span>}</section>;
}

function SongPage({ isPlaying, setIsPlaying, image, onNext }: { isPlaying: boolean; setIsPlaying: (value: boolean) => void; image: string; onNext: () => void }) {
  return <section className="chapter song-chapter"><PageIntro eyebrow="Chapter four · our soundtrack" title="Every love story has a song" /><div className="song-layout"><div className="song-photo"><img src={image} alt="Yavi and Naveen together" /><div className="photo-stamp">N <span>♥</span> Y</div></div><div className="song-panel"><div className="vinyl"><div className="vinyl-label">N <Heart size={15} fill="currentColor" /> Y</div></div><div className="song-details"><span className="tiny-label">A PLACE IN MY HEART</span><h2>Our little melody</h2><p>Naveen · for Yavi</p></div><div className="visualizer" aria-hidden="true">{Array.from({ length: 18 }, (_, index) => <i key={index} className={isPlaying ? 'playing' : ''} style={{ animationDelay: `${index * 0.06}s` }} />)}</div><div className="fake-progress"><span style={{ width: isPlaying ? '36%' : '8%' }} /></div><div className="player-row"><button className="play-button" onClick={(event) => { event.stopPropagation(); setIsPlaying(!isPlaying); }} aria-label={isPlaying ? 'Pause our song' : 'Play our song'}>{isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}</button><span>{isPlaying ? 'Playing a song for you' : 'Press play to begin'}</span><Volume2 size={18} /></div><p className="song-quote">Every love story has a song, but ours has a place in my heart that no other melody can replace. Whenever you hear this song, remember that somewhere, someone is smiling because you exist. <Heart size={15} fill="currentColor" /></p><div className="missing-media"><Music2 size={16} /> Your song can live here · add <strong>assets/our-song.mp3</strong> when you are ready.</div></div></div><button className="primary-button centered-button" onClick={(event) => { event.stopPropagation(); onNext(); }}>NEXT SURPRISE <Heart size={17} fill="currentColor" /></button></section>;
}

function VideoPage({ onNext }: { onNext: () => void }) {
  return <section className="chapter video-chapter"><PageIntro eyebrow="Chapter five · made with all my love" title="A little surprise, just for you" /><div className="video-frame"><div className="video-placeholder"><div className="video-icon"><CirclePlay size={37} /></div><span className="tiny-label">YOUR SPECIAL VIDEO</span><h2>A message waiting to be shared</h2><p>Add your own video to <strong>assets/special-video.mp4</strong> and this frame is ready for it.</p><div className="film-strip" /></div></div><p className="video-copy">Some feelings are too beautiful for words. So, I made this little surprise just for you, Yavi. Watch it with a smile, because every second of it comes with love from me. <span>♥</span></p><button className="primary-button centered-button" onClick={(event) => { event.stopPropagation(); onNext(); }}>ONE MORE THING, MY LOVE <Heart size={17} fill="currentColor" /></button></section>;
}

function HeartLetterPage({ letterOpen, setLetterOpen, typedLetter, onNext }: { letterOpen: boolean; setLetterOpen: (value: boolean) => void; typedLetter: string; onNext: () => void }) {
  return <section className="chapter heart-letter-chapter"><PageIntro eyebrow="Chapter six · the one I keep closest" title="Open my heart" /><div className={`heart-envelope ${letterOpen ? 'is-open' : ''}`}><div className="envelope-heart"><Heart size={112} fill="currentColor" /><span>YAVI</span></div><div className="letter-paper"><div className="paper-top"><span>17 / 10 / 2026</span><Heart size={16} fill="currentColor" /></div><div className="letter-content">{typedLetter.split('\n').map((line, index) => <p key={`${line}-${index}`} className={line.startsWith('Forever yours') ? 'signature-line' : ''}>{line || '\u00a0'}</p>)}{letterOpen && typedLetter.length < letter.length && <span className="typing-cursor" />}</div></div></div>{!letterOpen ? <button className="primary-button heart-open-button" onClick={(event) => { event.stopPropagation(); setLetterOpen(true); }}>CLICK TO OPEN MY HEART <Heart size={18} fill="currentColor" /></button> : <button className="primary-button centered-button" onClick={(event) => { event.stopPropagation(); onNext(); }}>ONE LAST SURPRISE <Heart size={17} fill="currentColor" /></button>}</section>;
}

function FinalPage({ onReplay }: { onReplay: () => void }) {
  return <section className="chapter final-chapter"><div className="final-ripples"><span /><span /><span /></div><div className="final-heart"><Heart size={180} fill="currentColor" /><Sparkles className="final-sparkle" size={28} /></div><p className="eyebrow"><span /> Chapter seven · forever yours <span /></p><h1>HAPPY BIRTHDAY,<br /><em>YAVI</em> <Heart className="title-heart" size={40} fill="currentColor" /></h1><p className="final-message">Out of all the beautiful moments in this world, I'm grateful for every moment that brings a smile to your face.<br /><br />Today is your birthday, but the happiness you bring is a gift that stays with me every day.<br /><br />May your life be filled with love, laughter, courage, beautiful surprises, and dreams that come true.<br /><br />If this little website could hold a thousand hearts, every single one would carry the same wish: may you always be happy, my Yavi.</p><div className="final-signature">Forever yours,<strong>NAVEEN <span>♾️</span></strong></div><button className="primary-button centered-button" onClick={(event) => { event.stopPropagation(); onReplay(); }}><RotateCcw size={16} /> REPLAY OUR LOVE STORY <Heart size={17} fill="currentColor" /></button></section>;
}

function Lightbox({ selectedMemory, setSelectedMemory }: { selectedMemory: number; setSelectedMemory: (value: number | null) => void }) {
  const memory = memories[selectedMemory];
  return <div className="lightbox" role="dialog" aria-modal="true" aria-label="Enlarged memory" onClick={(event) => { event.stopPropagation(); setSelectedMemory(null); }}><button className="lightbox-close" onClick={() => setSelectedMemory(null)} aria-label="Close memory"><X /></button><button className="lightbox-arrow left" onClick={(event) => { event.stopPropagation(); setSelectedMemory((selectedMemory + memories.length - 1) % memories.length); }} aria-label="Previous memory"><ChevronLeft /></button><div className="lightbox-content" onClick={(event) => event.stopPropagation()}><img src={memory.src} alt={memory.title} /><p>{memory.title} <Heart size={15} fill="currentColor" /></p><small>{memory.note}</small></div><button className="lightbox-arrow right" onClick={(event) => { event.stopPropagation(); setSelectedMemory((selectedMemory + 1) % memories.length); }} aria-label="Next memory"><ChevronRight /></button></div>;
}

export default App;
