import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap, useGSAP } from "../gsap.js";
import { GAMES, cardSrc } from "../data/games.js";
import "./reels.css";

// Shuffle with a fixed seed so every reel has its own, stable order.
function shuffle(arr, seed) {
  const a = arr.slice();
  let s = seed;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const j = Math.floor((s / 233280) * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
const N = GAMES.length;

// Home hero: four slot reels made of game cards. They drift on idle; "Spin the reels" spins them
// with GSAP and the payline lands on one featured game that the visitor can open.
export default function ReelsHero() {
  const root = useRef(null);
  const machine = useRef(null);
  const reels = useRef([]);
  const [count, setCount] = useState(() => (window.innerWidth <= 860 ? 3 : 4));
  const [spinning, setSpinning] = useState(false);
  const [won, setWon] = useState(null); // { reel, game }
  const idle = useRef(true);
  const resume = useRef(null);

  useEffect(() => {
    let t;
    const on = () => { clearTimeout(t); t = setTimeout(() => setCount(window.innerWidth <= 860 ? 3 : 4), 200); };
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, []);

  const orders = Array.from({ length: count }, (_, r) => shuffle(GAMES.map((_, i) => i), r * 7 + 3));

  // geometry is read from CSS so desktop and mobile tile sizes stay in the stylesheet
  const geo = () => {
    const cs = getComputedStyle(root.current);
    const TH = parseFloat(cs.getPropertyValue("--tile-h"));
    const G = parseFloat(cs.getPropertyValue("--gap"));
    return { TH, P: TH + G, H: machine.current.clientHeight };
  };

  const { contextSafe } = useGSAP(() => {
    const { TH, P, H } = geo();
    const NP = N * P;
    reels.current = orders.map((order, r) => {
      const start = (r * 3) % N;
      return { order, off: start * P + TH / 2 - H / 2, speed: 22 + r * 7, landed: order[start], el: root.current.querySelector(`[data-reel="${r}"] .reel__strip`) };
    });
    const render = () => {
      for (const R of reels.current) {
        const m = ((R.off % NP) + NP) % NP;
        R.el.style.transform = `translate3d(0, ${-(m + NP)}px, 0)`;
      }
    };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const tick = (time, delta) => {
      if (idle.current && !reduce) for (const R of reels.current) R.off -= R.speed * Math.min(delta, 50) / 1000;
      render();
    };
    render();
    gsap.ticker.add(tick);

    // entrance
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.timeline({ defaults: { ease: "power4.out" } })
        .from(".hero-reels__line > span", { yPercent: 105, duration: 0.9, stagger: 0.08 })
        .from(".hero-reels__lede, .hero-reels__actions", { y: 24, autoAlpha: 0, duration: 0.7, stagger: 0.08 }, "-=0.55")
        .from(".hero-reels__result", { y: 24, duration: 0.7 }, "<0.16")
        .from(".reel", { y: 80, autoAlpha: 0, duration: 1, stagger: 0.09 }, 0.1);
    });
    return () => gsap.ticker.remove(tick);
  }, { scope: root, dependencies: [count], revertOnUpdate: true });

  const spin = contextSafe(() => {
    if (spinning) return;
    setSpinning(true);
    setWon(null);
    clearTimeout(resume.current);
    idle.current = false;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const { TH, P, H } = geo();
    const NP = N * P;
    const tl = gsap.timeline({
      onComplete: () => {
        const fi = Math.floor(Math.random() * reels.current.length);
        setWon({ reel: fi, game: GAMES[reels.current[fi].landed] });
        setSpinning(false);
        resume.current = setTimeout(() => { idle.current = true; setWon(null); }, 9000);
      },
    });
    reels.current.forEach((R, ri) => {
      const target = Math.floor(Math.random() * N);
      const base = target * P + TH / 2 - H / 2;
      const minTravel = (reduce ? 0 : 2 * NP) + ri * NP * 0.35;
      let to = base;
      while (to > R.off - minTravel) to -= NP;
      R.landed = R.order[target];
      tl.to(R, {
        off: to,
        duration: reduce ? 0.01 : 1.4 + ri * 0.38,
        ease: "power4.out",
        onUpdate() {
          // motion blur only while the reel is fast
          const p = this.progress();
          R.el.style.filter = !reduce && p < 0.55 ? `blur(${(1 - p / 0.55) * 3}px)` : "none";
        },
      }, 0);
    });
  });

  const result = won?.game;
  return (
    <section ref={root} className="hero-reels" aria-label="Slotify games">
      <div className="hero-reels__copy">
        <h1 className="h-hero hero-reels__title">
          <span className="hero-reels__line"><span>Endless</span></span>
          <span className="hero-reels__line"><span>Worlds.</span></span>
          <span className="hero-reels__line accent-o"><span>One Spin</span></span>
          <span className="hero-reels__line accent-o"><span>Away.</span></span>
        </h1>
        <p className="lede hero-reels__lede">Thirteen worlds on the reels. Stop on any of them and play the demo.</p>
        <div className="row hero-reels__actions">
          <button className="btn" type="button" onClick={spin} disabled={spinning}>{spinning ? "Spinning…" : "Spin the reels"}</button>
          <Link className="btn btn--white" to="/games">All games</Link>
        </div>
        <div className="hero-reels__result" data-state={result ? "won" : "idle"} aria-live="polite">
          <div>
            <span className="label muted-w">Payline</span>
            <b>{result ? result.name : spinning ? "Good luck" : "Spin to pick a game"}</b>
            <small className="tnum">{result ? `RTP ${result.rtp} · ${result.vol}` : "Each reel stops on one of 13 Slotify slots"}</small>
          </div>
          {result && <Link to={`/games/${result.slug}`} className="hero-reels__play">Play demo</Link>}
        </div>
      </div>

      <div
        ref={machine}
        className={`hero-reels__machine ${won ? "is-won" : ""}`}
        role="button"
        tabIndex={0}
        aria-label="Slot reels. Press to spin."
        onClick={spin}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); spin(); } }}
      >
        <div className="hero-reels__payline" />
        <div className="hero-reels__reels">
          {orders.map((order, r) => (
            <div className="reel" data-reel={r} key={`${count}-${r}`}>
              <div className="reel__strip">
                {[0, 1, 2].flatMap((c) =>
                  order.map((gi, i) => (
                    <div key={`${c}-${i}`} className="reel__tile" style={{ top: `calc(${c * N + i} * (var(--tile-h) + var(--gap)))`, backgroundImage: `url(${cardSrc(GAMES[gi])})` }} />
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="hero-reels__dim top" />
        <div className="hero-reels__dim bot" />
        <div className="hero-reels__fade" />
        <div className="hero-reels__frames">
          {orders.map((_, r) => (
            <div key={r} className={`frame ${won && won.reel === r ? "featured" : ""}`}><span className="tag tag--orange">Featured</span></div>
          ))}
        </div>
        <div className="hero-reels__marker" aria-hidden="true" />
      </div>
    </section>
  );
}
