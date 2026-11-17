import { useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { gsap, useGSAP } from "../gsap.js";
import { reveal } from "../hooks/reveal.js";
import GameCard from "../components/GameCard.jsx";
import Carousel from "../components/Carousel.jsx";
import { Play, Doc, Expand, Sound, Close } from "../components/Icons.jsx";
import { GAMES, DETAILS, bySlug, cardSrc, wideSrc } from "../data/games.js";
import Placeholder from "./Placeholder.jsx";
import "./game.css";

const CAT_LABEL = { video: "Video slots", book: "Book style", classic: "Classic fruit" };

export default function Game() {
  const { slug } = useParams();
  const game = bySlug(slug);
  const root = useRef(null);
  const [playing, setPlaying] = useState(false);

  useGSAP(() => {
    if (!game) return;
    reveal(root.current);
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.timeline({ defaults: { ease: "power4.out" } })
        .from(".game-title > *", { y: 24, autoAlpha: 0, stagger: 0.06, duration: 0.7 })
        .from(".player", { y: 40, autoAlpha: 0, duration: 0.9 }, 0.15)
        .from(".player__play", { scale: 0.9, autoAlpha: 0, duration: 0.6 }, 0.6);
      gsap.from(".screens__phone", { y: 120, ease: "none", scrollTrigger: { trigger: ".screens", start: "top bottom", end: "bottom center", scrub: true } });
    });
  }, { scope: root, dependencies: [slug], revertOnUpdate: true });

  if (!game) return <Placeholder title="Game not found" text="We couldn't find that game. Browse the full catalogue instead." />;

  const d = DETAILS[game.slug];
  const tags = d?.tags || [game.type, game.grid, ...(game.bonusBuy ? ["Bonus buy"] : [])];
  const rows = d?.rows || [["Grid", game.grid], ["Type", game.type], ["RTP", game.rtp], ["Volatility", game.vol[0].toUpperCase() + game.vol.slice(1)], ["Bonus buy", game.bonusBuy ? "Yes" : "No"]];
  const more = GAMES.filter((g) => g.slug !== game.slug).slice(0, 8);
  const bg = game.wide ? wideSrc(game) : cardSrc(game);

  return (
    <div ref={root} className="game-page">
      <section className="wrap game-title">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link to="/games">Play Demos</Link><span>/</span><Link to="/games">{CAT_LABEL[game.cat]}</Link><span>/</span><span aria-current="page">{game.name}</span>
        </nav>
        <div className="row game-tags">{tags.map((t, i) => <span key={t} className={`tag ${i === 2 ? "tag--orange" : "tag--dark"}`}>{t}</span>)}</div>
        <div className="game-title__row">
          <h1 className="h1">{game.name}</h1>
          <div className="row">
            <button className="btn" type="button" onClick={() => setPlaying(true)}><Play size={10} />Play demo</button>
            <a className="btn btn--white" href="#" onClick={(e) => e.preventDefault()}><Doc />Game sheet</a>
          </div>
        </div>
      </section>

      <section className="wrap">
        <div className="player">
          <img className="player__bg" src={bg} alt="" />
          {playing ? (
            <div className="player__live" role="status">
              <p className="h3">Demo loading</p>
              <p className="body">The game iframe from the game server goes here, 16:9, fun mode only.</p>
              <button className="btn btn--white btn--sm" type="button" onClick={() => setPlaying(false)}><Close size={12} />Close demo</button>
            </div>
          ) : (
            <button className="player__play" type="button" onClick={() => setPlaying(true)} aria-label={`Play ${game.name} demo`}>
              <span className="player__icon"><Play size={28} /></span>
              <span className="label">Click to play demo</span>
              <small>Fun mode only. No real money.</small>
            </button>
          )}
          <div className="player__bar">
            <span className="label"><i className="dot" /> Demo · Desktop view</span>
            <span className="row player__tools"><Expand /><Sound /></span>
          </div>
        </div>
      </section>

      <section className="wrap section game-info">
        <div className="specs" data-reveal>
          <h2 className="h4 accent">Game details</h2>
          <dl>
            {rows.map(([k, v]) => (<div key={k}><dt>{k}</dt><dd className="tnum">{v}</dd></div>))}
          </dl>
        </div>
        <div className="stack game-copy">
          <h2 className="h2" data-reveal>{d?.title || `About ${game.name}`}</h2>
          {d ? d.body.map((p) => <p key={p} className="body" data-reveal>{p}</p>) : (
            <p className="body" data-reveal>{game.lede || `${game.name} is a ${game.type.toLowerCase()} on a ${game.grid} grid with ${game.vol} volatility and an RTP of ${game.rtp}. The full paytable and feature list are in the game sheet.`}</p>
          )}
          {d && (
            <div className="features">
              {d.features.map(([t, x]) => (<div key={t} className="feature" data-reveal><p className="h4 accent-o">{t}</p><p>{x}</p></div>))}
            </div>
          )}
        </div>
      </section>

      <section className="wrap screens" aria-label="Built for every screen">
        <h2 className="h2" data-reveal>Built for every screen</h2>
        <div className="screens__row">
          <img className="screens__wide" data-img src={bg} alt={`${game.name} on desktop`} loading="lazy" />
          <img className="screens__phone" src={cardSrc(game)} alt={`${game.name} on mobile`} loading="lazy" />
        </div>
      </section>

      <section className="more" aria-labelledby="more-games">
        <div className="wrap"><h2 className="h1" id="more-games" data-reveal>More games</h2></div>
        <Carousel label="More games" tone="dark">
          {more.map((g) => <GameCard key={g.slug} game={g} />)}
        </Carousel>
      </section>
    </div>
  );
}
