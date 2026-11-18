import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap, ScrollTrigger, useGSAP } from "../gsap.js";
import { reveal } from "../hooks/reveal.js";
import ReelsHero from "../components/ReelsHero.jsx";
import GameCard from "../components/GameCard.jsx";
import Carousel from "../components/Carousel.jsx";
import Pixels from "../components/Pixels.jsx";
import { Arrow, ArrowLeft, Play, Doc } from "../components/Icons.jsx";
import { GAMES, FILTERS, filterGames, bySlug, wideSrc } from "../data/games.js";
import { CONTACT_EMAIL } from "../config.js";
import { useTilt } from "../hooks/useTilt.js";
import "./home.css";

function OfferCard({ o }) {
  const tilt = useTilt(4);
  return (
    <Link ref={tilt} to={o.to} className={`offer-card offer-card--${o.tone}`}>
      <span className="offer-card__n" aria-hidden="true">{o.n}</span>
      <span className="offer-card__body">
        <span className="h4">{o.t}</span>
        <span className="offer-card__d">{o.d}</span>
        <span className="offer-card__go"><Arrow /></span>
      </span>
    </Link>
  );
}

const FEATURED = ["venus-rising", "lex-power-up", "big-money-bonanza"].map(bySlug);
const OFFER = [
  { n: "01", t: "Slotify Games", d: "Original slots on a growing library of certified, in-house maths models. Ready to play, ready to scale.", to: "/games", tone: "blue" },
  { n: "02", t: "Forge engine", d: "The engine behind every Slotify slot. Drag and drop, no code, from idea to live game in days. Offered B2B to studios.", to: "/forge", tone: "orange" },
  { n: "03", t: "Custom games", d: "Exclusive branded titles, built by the Slotify team or by your own designers in Forge.", to: "/about?to=contact", tone: "white" },
];

export default function Home() {
  const root = useRef(null);
  const [slide, setSlide] = useState(0);
  const [filter, setFilter] = useState("all");
  const games = filterGames(GAMES, filter);

  useGSAP(() => {
    reveal(root.current);
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // statement: words light up one by one as the line scrolls through the viewport
      gsap.fromTo(".statement__word", { opacity: 0.16 }, {
        opacity: 1, stagger: 0.12, ease: "none",
        scrollTrigger: { trigger: ".statement", start: "top 75%", end: "center 45%", scrub: true },
      });
      // parallax on character art
      gsap.utils.toArray("[data-depth]").forEach((el) => {
        const d = parseFloat(el.dataset.depth);
        gsap.fromTo(el, { y: 80 * d }, { y: -80 * d, ease: "none", scrollTrigger: { trigger: el.closest("section"), start: "top bottom", end: "bottom top", scrub: true } });
      });
      // offer cards rise in with their numbers landing a beat later
      gsap.from(".offer-card", { y: 80, autoAlpha: 0, stagger: 0.12, duration: 0.9, scrollTrigger: { trigger: ".offer-cards", start: "top 85%" } });
      gsap.from(".offer-card__n", { y: 30, autoAlpha: 0, stagger: 0.12, duration: 0.7, delay: 0.25, scrollTrigger: { trigger: ".offer-cards", start: "top 85%" } });
    });
  }, { scope: root });

  // featured slide change: wipe the image in from the right and lift the copy
  const { contextSafe } = useGSAP({ scope: root });
  const goSlide = contextSafe((dir) => {
    const next = (slide + dir + FEATURED.length) % FEATURED.length;
    setSlide(next);
    requestAnimationFrame(() => {
      gsap.fromTo(".feat__img img", { clipPath: dir > 0 ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)", scale: 1.06 }, { clipPath: "inset(0 0% 0 0%)", scale: 1, duration: 0.8, ease: "power4.inOut" });
      gsap.fromTo(".feat__copy > *", { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.05, duration: 0.5, delay: 0.25 });
    });
  });
  const f = FEATURED[slide];

  // swipe left/right on the featured game (touch and pen), same as the arrows.
  // A quick flick counts even if it is short; vertical scrolling is left alone.
  const swipe = useRef(null);
  const onDown = (e) => {
    if (e.pointerType === "mouse") return;
    swipe.current = { x: e.clientX, y: e.clientY, t: performance.now() };
  };
  const onUp = (e) => {
    const s = swipe.current;
    swipe.current = null;
    if (!s) return;
    const dx = e.clientX - s.x;
    const dy = e.clientY - s.y;
    const v = Math.abs(dx) / (performance.now() - s.t);
    if (Math.abs(dx) > Math.abs(dy) * 1.2 && (Math.abs(dx) > 50 || v > 0.4)) goSlide(dx < 0 ? 1 : -1);
  };

  return (
    <div ref={root}>
      <ReelsHero />

      {/* Featured games */}
      <section className="section feat" aria-label="Featured games">
        <div className="wrap feat__grid" onPointerDown={onDown} onPointerUp={onUp} onPointerCancel={() => (swipe.current = null)}>
          <div className="feat__panel" data-reveal>
            <div className="feat__copy">
              <span className="tag tag--orange">Featured game</span>
              <h2 className="h1">{f.name}</h2>
              <p className="body feat__lede">{f.lede || `${f.type} on a ${f.grid} grid. RTP ${f.rtp}, ${f.vol} volatility.`}</p>
              <div className="row">
                <Link className="btn" to={`/games/${f.slug}`}><Play size={10} />Play demo</Link>
                <a className="btn btn--white" href="#" onClick={(e) => e.preventDefault()}><Doc />Game sheet</a>
              </div>
            </div>
            <div className="feat__nav">
              <span className="label tnum">0{slide + 1} / 0{FEATURED.length}</span>
              <div className="feat__dots" aria-hidden="true">{FEATURED.map((_, i) => <i key={i} className={i === slide ? "on" : ""} />)}</div>
              <div className="row">
                <button className="sq-btn" type="button" onClick={() => goSlide(-1)} aria-label="Previous featured game"><ArrowLeft /></button>
                <button className="sq-btn" type="button" onClick={() => goSlide(1)} aria-label="Next featured game"><Arrow /></button>
              </div>
            </div>
          </div>
          <div className="feat__img" data-img>
            <img src={wideSrc(f)} alt={`${f.name} game screen`} />
            <span className="feat__tri" aria-hidden="true" />
          </div>
          <span className="feat__marks" aria-hidden="true"><i /><i /></span>
        </div>
      </section>

      {/* About intro */}
      <section className="section intro">
        <div className="wrap split intro__grid">
          <div className="stack intro__copy">
            <h2 className="h1" data-reveal>Made for<br /><span className="accent">the Spin.</span></h2>
            <p className="intro__kicker" data-reveal>Great slots aren't found. They're forged.</p>
            <p className="body" data-reveal>Slotify is a slot studio with its own engine. Original games, custom titles and the technology that builds them, with maths, art and engine all made in-house.</p>
            <div data-reveal><Link className="btn" to="/about">About us</Link></div>
          </div>
          <div className="intro__art">
            <div className="intro__frame" data-img><img src="img/chars/char_bonanza.webp" alt="Character from Big Money Bonanza" loading="lazy" /></div>
            <Pixels x="-24px" bottom="-24px" size={32} />
          </div>
        </div>
      </section>

      {/* Our games */}
      <section className="band-orange" id="games" aria-labelledby="our-games">
        <div className="wrap band-orange__head">
          <h2 className="h1" id="our-games" data-reveal>Our Games</h2>
          <p className="body" data-reveal>Thirteen worlds and counting. Try any of them in demo, or grab the game sheet.</p>
          <div className="row chips" role="group" aria-label="Filter games" data-reveal>
            {FILTERS.map((x) => (
              <button key={x.id} type="button" className="chip" aria-pressed={filter === x.id} onClick={() => { setFilter(x.id); requestAnimationFrame(() => ScrollTrigger.refresh()); }}>{x.label}</button>
            ))}
          </div>
        </div>
        <Carousel label="Slotify games" footer={<Link className="btn btn--blue" to="/games">View all games</Link>}>
          {games.map((g) => <GameCard key={g.slug} game={g} />)}
        </Carousel>
      </section>

      {/* Statement */}
      <section className="section statement">
        <div className="wrap split">
          <h2 className="h1 statement__line" aria-label="Themes win the click.">
            {"Themes win".split(" ").map((w, i) => <span key={i} className="statement__word">{w} </span>)}
            <br />
            {"the click.".split(" ").map((w, i) => <span key={`b${i}`} className="statement__word accent">{w} </span>)}
          </h2>
          <p className="body" data-reveal><strong className="accent">Mechanics win the player.</strong> Every Slotify title runs on a growing library of certified, in-house maths models, each with its own rules, features and rhythm.</p>
        </div>
      </section>

      {/* What we offer */}
      <section className="section offer" aria-labelledby="offer-title">
        <div className="wrap split offer__top">
          <div className="offer__art">
            <div className="offer__block" />
            <img src="img/chars/char_lex_fortune.webp" alt="Lex, the Slotify llama" loading="lazy" data-depth="0.6" />
            <Pixels x="-24px" bottom="-24px" size={28} />
            <Pixels right="-14px" y="-14px" size={14} ratio={1} dir="ur" color="var(--fg)" />
          </div>
          <div className="stack offer__copy">
            <h2 className="h1" id="offer-title" data-reveal>What we<br />offer</h2>
            <p className="offer__kicker" data-reveal>Play it. Build it. Make it yours.</p>
            <p className="body" data-reveal>Three products from one studio: original slot games, the Forge engine that builds them, and custom titles made for your brand.</p>
          </div>
        </div>
        <div className="wrap offer-cards">
          {OFFER.map((o) => <OfferCard key={o.n} o={o} />)}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="section cta">
        <div className="wrap">
          <h2 className="cta__title" data-reveal>Play the games.<br /><span className="accent">Or build your own.</span></h2>
          <div className="cta__row" data-reveal>
            <p className="body">Operator, aggregator or partner? Tell us what you need and we'll come back within one business day.</p>
            <a className="cta__mail" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            <Link className="btn" to="/about?to=contact">Contact us</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
