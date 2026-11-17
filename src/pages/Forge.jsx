import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap, ScrollTrigger, useGSAP } from "../gsap.js";
import { reveal } from "../hooks/reveal.js";
import Pixels from "../components/Pixels.jsx";
import { Play } from "../components/Icons.jsx";
import { CALENDLY_URL, CONTACT_EMAIL } from "../config.js";
import "./forge.css";

// 5 columns x 3 rows. The middle row pays three blue gems on line 2.
const REELS = [
  ["gem_red", "gem_blue", "flask"],
  ["x10", "gem_blue", "gem_purple"],
  ["gem_green", "gem_blue", "battery"],
  ["goggles", "x20", "gem_red"],
  ["gem_purple", "powerup", "gem_green"],
];
const WEIGHTS = [[12, 4, 18], [6, 4, 22], [15, 4, 9], [3, 11, 12], [20, 2, 15]];
const STEPS = [
  { t: "Choose the model", d: "Start from certified maths: classic lines, cascades and more. Every asset you add is wired to it.", tag: ["Maths model", "Classic lines · 5×3 · certified"] },
  { t: "Add the art", d: "Drag and drop symbols, backgrounds and UI. In place in seconds.", tag: ["Art", "Symbols · background · UI"] },
  { t: "Animate", d: "Wins, transitions and features, animated without code.", tag: ["Animate", "Win line · ×50 · count-up"] },
  { t: "Release", d: "A new title, ready to play in days, not months.", tag: ["Release", "Live in the lobby"] },
];
const COMPARE = [
  ["Maths", "Built and tested for every game", "A growing library of certified maths"],
  ["Team", "Developers, mathematicians, designers, animators", "Designers and animators"],
  ["Time to release", "Months", "Days"],
  ["Changes", "New code every time", "Drag and drop"],
  ["Reuse", "Every title starts from scratch", "Every module is reusable"],
  ["Animation", "Coded by hand", "Built in, no code"],
];
const TEAMS = [
  ["Architecture and assets", "Backend and frontend in one. Assets layer straight onto certified maths."],
  ["Quick editing", "Edit a game and launch the change. No developer needed."],
  ["Team roles and access", "User management built into Forge, so everyone sees what they need."],
];
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const TIMES = ["10:00", "11:30", "14:00", "16:30"];

// grid geometry in the SVG's own units: 5 tiles of 18 with gaps of 2.5 = 100 wide, 3 rows = 59 high
const T = 18, G = 2.5;
const cx = (c) => c * (T + G) + T / 2;
const cy = (r) => r * (T + G) + T / 2;
const LINES = [
  `M -2 ${cy(0)} L 102 ${cy(0)}`,
  `M -2 ${cy(1)} L 102 ${cy(1)}`,
  `M -2 ${cy(2)} L 102 ${cy(2)}`,
  `M -2 ${cy(0)} L ${cx(1)} ${cy(0)} L ${cx(2)} ${cy(2)} L ${cx(3)} ${cy(0)} L 102 ${cy(0)}`,
  `M -2 ${cy(2)} L ${cx(1)} ${cy(2)} L ${cx(2)} ${cy(0)} L ${cx(3)} ${cy(2)} L 102 ${cy(2)}`,
];

// Small state icons used instead of step numbers: dashed grid, filled grid, grid with win line, card with play.
function StepIcon({ i }) {
  const cells = (attrs) => [0, 1, 2].flatMap((r) => [0, 1, 2].map((c) => <rect key={`${r}${c}`} x={c * 11} y={r * 11} width="8" height="8" {...attrs} />));
  return (
    <svg className="step-icon" viewBox="-3 -3 36 36" aria-hidden="true">
      {i === 0 && cells({ fill: "none", stroke: "currentColor", strokeDasharray: "2 2" })}
      {i === 1 && cells({ fill: "currentColor" })}
      {i === 2 && <><g className="step-icon__cells">{cells({ fill: "currentColor" })}</g><rect className="step-icon__line" x="-3" y="13.75" width="36" height="2.5" /></>}
      {i === 3 && <path fill="currentColor" fillRule="evenodd" d="M4 0H26V30H4Z M11 8L21 15L11 22Z" />}
    </svg>
  );
}

function ForgeGrid({ mode }) {
  // mode "hero": blueprint / placing / live columns. mode "scene": every tile has weight + symbol, animated by the scene timeline.
  return (
    <div className={`fgrid fgrid--${mode}`}>
      {REELS.map((col, c) => col.map((sym, r) => {
        const state = mode === "hero" ? (c < 2 ? "blueprint" : c === 2 ? "placing" : "live") : "scene";
        const win = r === 1 && c < 3;
        return (
          <div key={`${c}${r}`} className={`ftile ftile--${state} ${win ? "is-win" : ""}`} style={{ left: `${c * (T + G)}%`, top: `${(r * (T + G) / 59) * 100}%` }} data-col={c}>
            <span className="ftile__bg" />
            {(state === "blueprint" || state === "scene") && <span className="ftile__w">{state === "scene" ? WEIGHTS[c][r] : "+"}</span>}
            {state !== "blueprint" && <img className="ftile__img" src={`img/sym/${sym}.webp`} alt="" />}
          </div>
        );
      }))}
    </div>
  );
}

export default function Forge() {
  const root = useRef(null);
  const st = useRef(null);
  const [step, setStep] = useState(0);
  const [day, setDay] = useState(1);
  const [time, setTime] = useState(1);

  useGSAP(() => {
    reveal(root.current);
    const mm = gsap.matchMedia();
    mm.add({ motion: "(prefers-reduced-motion: no-preference)", reduce: "(prefers-reduced-motion: reduce)" }, (ctx) => {
      const { motion } = ctx.conditions;
      if (!motion) {
        // reduced motion: show the "animate" state without pinning
        gsap.set(".scene .ftile__img", { autoAlpha: 1 });
        gsap.set(".scene .ftile__bg, .scene .scene__art", { autoAlpha: 1 });
        gsap.set(".scene .ftile__w", { autoAlpha: 0 });
        gsap.set(".scene__badge, .scene__meter", { autoAlpha: 1, scale: 1 });
        root.current.querySelector(".scene").classList.add("is-static");
        setStep(2);
        return;
      }

      // hero entrance: columns build left to right
      gsap.timeline({ defaults: { ease: "power4.out" } })
        .from(".forge-hero__title > *", { y: 30, autoAlpha: 0, stagger: 0.07, duration: 0.8 })
        .from(".fgrid--hero .ftile", { y: -40, autoAlpha: 0, duration: 0.6, stagger: { each: 0.05, grid: [3, 5], axis: "x", from: "start" } }, 0.2)
        .from(".forge-hero__tri", { x: -50, autoAlpha: 0, duration: 0.7 }, 0.5);
      gsap.to(".fgrid--hero .ftile--placing .ftile__img", { y: 0, opacity: 0.9, duration: 1.2, repeat: -1, yoyo: true, repeatDelay: 0.6, ease: "power2.inOut" });

      // How it works: one pinned, scrubbed timeline, four labelled phases
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: ".scene",
          start: "top top",
          end: () => "+=" + window.innerHeight * 4,
          pin: true,
          scrub: 0.6,
          onUpdate: (self) => setStep(Math.min(3, Math.floor(self.progress * 4.0001))),
        },
      });
      st.current = tl.scrollTrigger;
      const lines = gsap.utils.toArray(".scene__line");
      gsap.set(lines, { strokeDasharray: 1, strokeDashoffset: 1 });
      gsap.set(".scene .ftile__img", { yPercent: -140, autoAlpha: 0 });
      gsap.set(".scene .ftile__bg, .scene__art, .scene__chrome, .scene__meter", { autoAlpha: 0 });
      gsap.set(".scene__badge", { autoAlpha: 0, scale: 0.6, rotation: -12 });
      gsap.set(".scene__lobby > *", { autoAlpha: 0, x: 60 });

      tl.addLabel("model", 0)
        .to(lines, { strokeDashoffset: 0, duration: 0.6, stagger: 0.08 }, 0)
        .from(".scene .ftile__w", { autoAlpha: 0, duration: 0.4, stagger: 0.02 }, 0.1)
        .addLabel("art", 1)
        .to(".scene__art", { autoAlpha: 1, duration: 0.5 }, 1)
        .to(".scene__frame", { "--frame": 0, duration: 0.4 }, 1)
        .to(".scene .ftile__w", { autoAlpha: 0, duration: 0.3 }, 1)
        .to(lines.filter((_, i) => i !== 1), { autoAlpha: 0, duration: 0.3 }, 1)
        .to(lines[1], { opacity: 0.3, duration: 0.3 }, 1);
      // symbols drop column by column
      for (let c = 0; c < 5; c++) {
        tl.to(`.scene .ftile[data-col="${c}"] .ftile__img`, { yPercent: 0, autoAlpha: 1, duration: 0.35, ease: "power2.out", stagger: 0.04 }, 1.05 + c * 0.12)
          .to(`.scene .ftile[data-col="${c}"] .ftile__bg`, { autoAlpha: 1, duration: 0.25 }, 1.05 + c * 0.12);
      }
      const meter = { v: 0 };
      tl.addLabel("animate", 2)
        .to(lines[1], { opacity: 1, stroke: "#EE811D", strokeWidth: 6, duration: 0.3 }, 2.05)
        .to(".scene .ftile.is-win", { "--win": 1, duration: 0.3 }, 2.05)
        .to(".scene .ftile.is-win .ftile__img", { scale: 1.12, duration: 0.2, yoyo: true, repeat: 1, ease: "power2.out" }, 2.15)
        .to(".scene__badge", { autoAlpha: 1, scale: 1, rotation: 0, duration: 0.35, ease: "back.out(1.6)" }, 2.3)
        .to(".scene__meter", { autoAlpha: 1, duration: 0.2 }, 2.3)
        .to(meter, { v: 5000, duration: 0.5, onUpdate: () => { const el = root.current?.querySelector(".scene__win"); if (el) el.textContent = Math.round(meter.v).toLocaleString("en-US"); } }, 2.35)
        .addLabel("release", 3)
        .to(".scene__meter", { autoAlpha: 0, duration: 0.15 }, 3)
        .to(".scene__machine", { scale: 0.5, xPercent: -14, duration: 0.5, ease: "power2.inOut" }, 3.05)
        .to(".scene__chrome", { autoAlpha: 1, duration: 0.3 }, 3.3)
        .to(".scene__lobby > *", { autoAlpha: 1, x: 0, duration: 0.35, stagger: 0.12, ease: "power2.out" }, 3.35)
        .to(".scene__tri", { xPercent: -45, duration: 0.6 }, 3.05)
        .to({}, { duration: 0.25 }); // hold the final frame a little

      // comparison: the Forge column rises in, rows follow
      gsap.from(".cmp__forge", { yPercent: 18, autoAlpha: 0, duration: 1, scrollTrigger: { trigger: ".cmp", start: "top 70%" } });
      gsap.from(".cmp__row", { x: -20, autoAlpha: 0, stagger: 0.06, duration: 0.6, scrollTrigger: { trigger: ".cmp", start: "top 70%" } });
    });
  }, { scope: root });

  const jump = (i) => {
    const s = st.current;
    if (!s) return;
    window.scrollTo({ top: s.start + (s.end - s.start) * ((i + 0.8) / 4), behavior: "smooth" });
  };

  return (
    <div ref={root}>
      {/* Hero */}
      <section className="forge-hero">
        <div className="forge-hero__block" aria-hidden="true" />
        <div className="wrap forge-hero__in">
          <div className="forge-hero__title">
            <nav className="crumbs crumbs--light" aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><span aria-current="page">Forge</span></nav>
            <p className="display forge-hero__eyebrow">Slotify</p>
            <h1 className="display forge-hero__h1">Forge</h1>
            <p className="lede">The engine behind every Slotify slot. Pick a certified maths model, drop in your art and release a new game in days. No code.</p>
            <div className="row">
              <a className="btn" href="#book" onClick={(e) => { e.preventDefault(); document.getElementById("book")?.scrollIntoView({ behavior: "smooth" }); }}>Book a demo</a>
              <a className="btn btn--white" href="#how" onClick={(e) => { e.preventDefault(); document.getElementById("how")?.scrollIntoView({ behavior: "smooth" }); }}>How it works</a>
            </div>
          </div>
          <div className="forge-hero__visual">
            <ForgeGrid mode="hero" />
            <div className="fgrid-labels label" aria-hidden="true"><span>Maths model</span><span className="accent-o">Art</span><span>Live game</span></div>
          </div>
        </div>
        <span className="forge-hero__tri" aria-hidden="true" />
        <Pixels right="20px" y="60px" size={18} ratio={1} dir="ur" color="var(--white)" />
      </section>

      {/* Statement */}
      <section className="forge-band">
        <div className="wrap split">
          <h2 className="h2" data-reveal>Slots don't take months because of the art.</h2>
          <p className="body" data-reveal>They take months because of everything else. Forge handles the maths, the code and the logic, so your team can focus on the game.</p>
        </div>
      </section>

      {/* How it works: pinned scroll scene */}
      <section className="scene" id="how" aria-label="How Forge works">
        <div className="wrap scene__in">
          <div className="scene__copy">
            <span className="eyebrow">How it works</span>
            <h2 className="h2">Scroll to<br />forge a game.</h2>
            <p className="body muted scene__sub">Made for designers and animators. Same certified maths underneath, a brand new game on top.</p>
            <ol className="steps">
              {STEPS.map((s, i) => (
                <li key={s.t}>
                  <button type="button" className={`step ${i === step ? "on" : ""}`} onClick={() => jump(i)} aria-current={i === step ? "step" : undefined}>
                    <StepIcon i={i} />
                    <span className="step__t">{s.t}</span>
                    <span className="step__d">{s.d}</span>
                  </button>
                </li>
              ))}
            </ol>
            <div className="scene__bar"><i style={{ width: `${((step + 0.75) / 4) * 100}%` }} /></div>
          </div>

          <div className="scene__stage" aria-hidden="true">
            <div className="scene__block" />
            <div className="scene__art" />
            <div className="scene__tag"><span className="tag tag--orange">{STEPS[step].tag[0]}</span><em className="label">{STEPS[step].tag[1]}</em></div>
            <div className="scene__machine">
              <div className="scene__frame">
                <ForgeGrid mode="scene" />
                <svg className="scene__lines" viewBox="0 0 100 59" preserveAspectRatio="none">
                  {LINES.map((d, i) => <path key={i} className="scene__line" d={d} pathLength="1" />)}
                </svg>
                <img className="scene__badge" src="img/sym/x50.webp" alt="" />
              </div>
              <div className="scene__meter"><span className="label">Win · line 2</span><b className="scene__win tnum">0</b></div>
              <div className="scene__chrome">
                <b className="display">Your game</b>
                <small>Built in Forge · 5×3 · Classic lines</small>
                <span className="btn btn--sm"><Play size={10} />Play demo</span>
              </div>
            </div>
            <div className="scene__lobby">
              <div><img src="img/games/card_lex_power_up.webp" alt="" /><b className="display">Lex Power Up</b><small>6×5 cluster pays</small></div>
              <div><img src="img/games/card_gemwood.webp" alt="" /><b className="display">Gemwood</b><small>5×3 · medium-high</small></div>
            </div>
            <span className="scene__tri" />
            <Pixels right="0" y="-6px" size={14} ratio={1} dir="ur" color="var(--white)" />
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="wrap section cmp" aria-labelledby="cmp-title">
        <div className="cmp__head">
          <div className="stack" style={{ gap: 16 }}>
            <span className="eyebrow" data-reveal>Why Forge wins</span>
            <h2 className="h2" id="cmp-title" data-reveal>Months of code,<br />or days in Forge.</h2>
          </div>
          <div className="cmp__proof" data-reveal>
            <div><b data-count>8+</b><span>Certified maths models, ready to use</span></div>
            <div><b data-count>15</b><span>Slotify titles built in Forge</span></div>
          </div>
        </div>
        <div className="cmp__table" role="table" aria-label="Building from scratch compared with Forge">
          <div className="cmp__forge" aria-hidden="true" />
          <div className="cmp__row cmp__row--head" role="row">
            <span role="columnheader" className="sr-only">Feature</span>
            <span role="columnheader" className="label muted">Building from scratch</span>
            <span role="columnheader" className="label cmp__fh">With Forge</span>
          </div>
          {COMPARE.map(([k, a, b]) => (
            <div className="cmp__row" role="row" key={k}>
              <span role="rowheader" className="display cmp__k">{k}</span>
              <span role="cell" className="muted">{a}</span>
              <span role="cell" className="cmp__f">{b}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Built for teams */}
      <section className="wrap section teams">
        <div className="split" style={{ marginBottom: 48 }}>
          <div className="stack" style={{ gap: 16 }}>
            <span className="eyebrow" data-reveal>Under the hood</span>
            <h2 className="h2" data-reveal>Built for teams.<br />Ready for scale.</h2>
          </div>
          <p className="body" data-reveal>Clean UI, fast spins and features players get at a glance. Everything your team needs to build, edit and run games sits in one place.</p>
        </div>
        <div className="teams__cards" data-scrub-stagger>
          {TEAMS.map(([t, d], i) => (
            <article className="team" key={t}>
              <span className="team__n">0{i + 1}</span>
              <h3 className="h4">{t}</h3>
              <p className="muted">{d}</p>
            </article>
          ))}
        </div>
        <div className="bo" data-scrub-in="right">
          <p className="display bo__h">One back office.<br />Total control.</p>
          <ul className="bo__chips" data-stagger>
            {["Promotions and features", "In-depth reporting", "Game logs", "Player overview", "Roles and access", "Multi-operator setup"].map((c) => <li key={c}>{c}</li>)}
          </ul>
        </div>
      </section>

      {/* Book a demo */}
      <section className="wrap section book" id="book">
        <div className="stack book__copy" data-scrub-in="left">
          <span className="eyebrow">Ready when you are</span>
          <h2 className="h1">Build your<br />first game<br />in Forge.</h2>
          <p className="body">Bring an idea, a theme or just questions. In 30 minutes we show you how far your team can take it, with our maths and your art.</p>
        </div>
        <div className="booking" data-scrub-in="right">
          <span className="booking__tri" aria-hidden="true" />
          <h3 className="h3">Book a demo</h3>
          <p className="booking__p">Pick a day and a time. The calendar invite lands in your inbox right away.</p>
          <p className="label">Pick a day</p>
          <div className="booking__days" role="radiogroup" aria-label="Day">
            {DAYS.map((d, i) => <button key={d} type="button" role="radio" aria-checked={day === i} className={day === i ? "on" : ""} onClick={() => setDay(i)}>{d}</button>)}
          </div>
          <p className="label">Pick a time (CET)</p>
          <div className="booking__times" role="radiogroup" aria-label="Time">
            {TIMES.map((t, i) => <button key={t} type="button" role="radio" aria-checked={time === i} className={time === i ? "on" : ""} onClick={() => setTime(i)}>{t}</button>)}
          </div>
          <a className="btn" href={CALENDLY_URL} target="_blank" rel="noreferrer">Book {DAYS[day]} {TIMES[time]}</a>
          <p className="booking__mail">Prefer email? <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></p>
        </div>
      </section>
    </div>
  );
}
