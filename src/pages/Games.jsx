import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap, ScrollTrigger, useGSAP } from "../gsap.js";
import { reveal } from "../hooks/reveal.js";
import GameCard from "../components/GameCard.jsx";
import { Play, Doc, Search, Plus, Minus } from "../components/Icons.jsx";
import { GAMES, FILTERS, filterGames } from "../data/games.js";
import "./games.css";

const FAQ = [
  ["Slotify games: original slots for every screen", [
    "Slotify builds original slot games with bold art, clear math and features players actually talk about. The catalogue spans feature-rich video slots like Venus Rising and Lex Power Up, book style hits such as Scarab's Secret and Z-Rush, and classic fruit machines rebuilt for mobile.",
    "Every title runs in HTML5, is designed mobile first and comes with a full game sheet covering paytable, RTP, volatility and features, so operators can decide fast and go live faster.",
  ]],
  ["Book style slots with expanding symbols", ["Z-Rush, Scarab's Secret and Book of Illusions are book style slots on a 5×3 grid, each at 95.10% RTP with high volatility."]],
  ["Free spins and multiplying wilds", ["Venus Rising doubles every win its wild completes, and 3 Orb scatters start 15 free spins where all wins pay ×3. Lex Power Up builds a persistent multiplier in free spins that never resets."]],
  ["Classic fruit slots, rebuilt for mobile", ["Juicy Crown, Hot Fruitz, Juicy Boost and Big Money Bonanza are classic fruit slots on a 5×3 grid, designed mobile first."]],
  ["One integration for the full catalogue", ["Every title runs in HTML5 and comes with a full game sheet. Get in touch for integration details and the release calendar."]],
];

export default function Games() {
  const root = useRef(null);
  const [filter, setFilter] = useState("all");
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(0);
  const list = filterGames(GAMES, filter, q);

  useGSAP(() => {
    reveal(root.current);
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.timeline({ defaults: { ease: "power4.out" } })
        .from(".games-hero__bg", { scale: 1.1, duration: 1.6, ease: "power2.out" })
        .from(".games-hero__copy > *", { y: 30, autoAlpha: 0, stagger: 0.08, duration: 0.8 }, 0.1)
        .from(".games-hero__char", { y: 80, autoAlpha: 0, duration: 1 }, 0.2);
      gsap.to(".games-hero__char", { yPercent: -10, ease: "none", scrollTrigger: { trigger: ".games-hero", start: "top top", end: "bottom top", scrub: true } });
    });
  }, { scope: root });

  // re-flow animation when the filter changes, so the grid doesn't just snap
  useGSAP(() => {
    const cards = gsap.utils.toArray(".games-grid .gcard", root.current);
    gsap.fromTo(cards, { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.4, stagger: 0.03, ease: "power3.out", overwrite: true });
    ScrollTrigger.refresh();
  }, { scope: root, dependencies: [filter, q] });

  return (
    <div ref={root}>
      <section className="games-hero">
        <img className="games-hero__bg" src="img/wide/wide_big_money_bonanza.webp" alt="" />
        <div className="wrap games-hero__copy">
          <h1 className="h-hero">Play Demos</h1>
          <p><span className="accent-o">Featured game:</span> Big Money Bonanza</p>
          <div className="row">
            <Link className="btn" to="/games/big-money-bonanza"><Play size={10} />Play demo</Link>
            <a className="btn btn--white" href="#" onClick={(e) => e.preventDefault()}><Doc />Game sheet</a>
          </div>
        </div>
        <img className="games-hero__char" src="img/chars/char_bonanza.webp" alt="" />
      </section>

      <section className="wrap games-tools" aria-label="Filter games">
        <div className="row chips-left" role="group" aria-label="Category">
          {FILTERS.map((x) => (
            <button key={x.id} type="button" className="chip" aria-pressed={filter === x.id} onClick={() => setFilter(x.id)}>{x.label}</button>
          ))}
        </div>
        <form className="search" role="search" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="game-search" className="sr-only">Search games</label>
          <Search />
          <input id="game-search" type="search" placeholder="Search games" value={q} onChange={(e) => setQ(e.target.value)} autoComplete="off" />
          <button className="btn btn--sm" type="submit">Search</button>
        </form>
      </section>

      <section className="wrap games-list" id="grid" aria-live="polite">
        <p className="label muted tnum">{list.length} {list.length === 1 ? "game" : "games"}</p>
        <div className="games-grid">
          {list.map((g) => <GameCard key={g.slug} game={g} />)}
          {list.length === 0 && (
            <div className="games-empty">
              <p className="h3">No games match</p>
              <p className="body muted">Try another category or clear the search.</p>
              <button className="btn btn--outline" type="button" onClick={() => { setFilter("all"); setQ(""); }}>Show all games</button>
            </div>
          )}
          <aside className="games-promo">
            <div className="stack" style={{ gap: 18 }}>
              <h2 className="h2">New worlds<br />are loading</h2>
              <p className="body">Fresh releases land every month. Get the release calendar and game sheets before they go live.</p>
              <div><Link className="btn btn--blue" to="/about?to=contact">Get release updates</Link></div>
            </div>
            <span className="games-promo__tri" aria-hidden="true" />
          </aside>
        </div>
      </section>

      <section className="wrap section faq" aria-label="About our games">
        {FAQ.map(([title, paras], i) => {
          const isOpen = open === i;
          return (
            <div className="faq__item" key={title}>
              <h2 className="faq__h">
                <button type="button" aria-expanded={isOpen} aria-controls={`faq-${i}`} onClick={() => setOpen(isOpen ? -1 : i)}>
                  <span className={isOpen ? "accent" : ""}>{title}</span>{isOpen ? <Minus /> : <Plus />}
                </button>
              </h2>
              <div id={`faq-${i}`} className="faq__panel" data-open={isOpen}>
                <div>{paras.map((p) => <p key={p} className="body">{p}</p>)}</div>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
