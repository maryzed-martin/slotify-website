import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap, ScrollTrigger, useGSAP } from "../gsap.js";
import { reveal } from "../hooks/reveal.js";
import Pixels from "../components/Pixels.jsx";
import { Arrow, ArrowDown, Check } from "../components/Icons.jsx";
import { CONTACT_EMAIL } from "../config.js";
import "./about.css";

const DRIVES = [
  { t: "Maths first", d: "Every title runs on a growing library of certified, in-house maths models. Themes win the click. Mechanics win the player.", img: "x50", tone: "blue" },
  { t: "Forged, not found", d: "Forge handles the maths, the code and the logic, so our designers and animators spend their time on the game itself.", img: "flask", tone: "orange" },
  { t: "Built for every screen", d: "Mobile-first by default. Clean UI, fast spins and features players understand at a glance, on a phone or on a stream.", img: "goggles", tone: "dark" },
];
const STATS_A = [["15", "Slot titles in production"], ["8+", "Certified maths models"], ["4", "New maths in production"]];
const STATS_B = [["100%", "Built in-house"], ["Days", "From idea to playable game"], ["0", "Lines of extra code"]];
const PRODUCTS = [
  { t: "Slotify Games", k: "Ready to play. Ready to scale.", d: "Original slots on a growing library of certified, in-house maths models.", cta: "Browse games", to: "/games", img: "img/games/card_venus_rising.webp", tone: "blue" },
  { t: "Forge", k: "The tool behind every slot.", d: "The engine Slotify uses for every title, also offered B2B to smaller studios. No code, idea to live slot in days.", cta: "Discover Forge", to: "/forge", img: "img/games/card_lex_power_up.webp", tone: "orange" },
  { t: "Custom Games", k: "Your game. Your brand.", d: "Exclusive branded titles, built by the Slotify team or by your own designers in Forge.", cta: "Start a project", to: "/about?to=contact", img: "img/games/card_juicy_crown.webp", tone: "white" },
];
const INTEREST = ["Slotify Games", "Forge", "Custom games", "Partnership"];

function Marquee({ items, tone, reverse }) {
  const row = [...items, ...items, ...items, ...items];
  return (
    <div className={`marquee marquee--${tone}`} data-reverse={reverse ? "1" : "0"}>
      <div className="marquee__track">
        {[0, 1].map((half) => (
          <div className="marquee__half" key={half} aria-hidden={half === 1}>
            {row.map(([n, l], i) => (
              <span className="marquee__item" key={i}><b>{n}</b><span>{l}</span><i className="marquee__tri" /></span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function About() {
  const root = useRef(null);
  const [interest, setInterest] = useState(["Slotify Games"]);
  const [sent, setSent] = useState(false);

  useGSAP(() => {
    reveal(root.current);
    const mm = gsap.matchMedia();
    mm.add({ motion: "(prefers-reduced-motion: no-preference)", desk: "(min-width: 861px)" }, (ctx) => {
      const { motion, desk } = ctx.conditions;
      if (!motion) return;

      // hero: title rises, scientist lands, then every layer drifts at its own depth while the hero scrolls away
      gsap.timeline({ defaults: { ease: "power4.out" } })
        .from(".about-hero__title > *", { yPercent: 60, autoAlpha: 0, stagger: 0.08, duration: 0.9 })
        .from(".about-hero__sci", { yPercent: 18, autoAlpha: 0, duration: 1.1 }, 0.1)
        .from(".about-hero__tri", { x: -60, autoAlpha: 0, duration: 0.8 }, 0.3);
      gsap.utils.toArray(".about-hero [data-depth]").forEach((el) => {
        gsap.to(el, { y: () => -window.innerHeight * 0.35 * parseFloat(el.dataset.depth), ease: "none", scrollTrigger: { trigger: ".about-hero", start: "top top", end: "bottom top", scrub: true } });
      });

      // mission / vision: each ghost word slides in and lands when its card is centred
      gsap.fromTo(".mv__word--m", { x: desk ? -240 : -80 }, { x: 0, ease: "none", scrollTrigger: { trigger: ".mv__card--m", start: "top bottom", end: "center center", scrub: true } });
      gsap.fromTo(".mv__word--v", { x: desk ? 240 : 80 }, { x: 0, ease: "none", scrollTrigger: { trigger: ".mv__card--v", start: "top bottom", end: "center center", scrub: true } });
      gsap.utils.toArray(".mv [data-depth]").forEach((el) => {
        const d = parseFloat(el.dataset.depth);
        gsap.fromTo(el, { y: 60 * d }, { y: -60 * d, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
      });

      // what drives us: cards are CSS-sticky. A card only shrinks (to 0.95) and dims once the next card
      // actually starts covering it, and it is finished exactly when the next card has pinned on top.
      const cards = gsap.utils.toArray(".drive");
      const stickTop = (el) => parseFloat(getComputedStyle(el).top) || 0;
      cards.forEach((card, i) => {
        const next = cards[i + 1];
        if (!next) return;
        gsap.fromTo(card, { scale: 1, "--dim": 0 }, {
          scale: 0.95, "--dim": 0.3, ease: "none",
          scrollTrigger: {
            trigger: next,
            start: () => `top ${stickTop(card) + card.offsetHeight}px`,
            end: () => `top ${stickTop(next)}px`,
            scrub: 0.4,
            invalidateOnRefresh: true,
          },
        });
      });
      ScrollTrigger.create({
        trigger: ".drives__cards", start: "top 60%", end: "bottom 60%",
        onUpdate: (self) => {
          const i = Math.min(cards.length - 1, Math.floor(self.progress * cards.length));
          root.current.querySelector(".drives__count").textContent = `0${i + 1} / 0${cards.length}`;
          root.current.querySelectorAll(".drives__bar i").forEach((b, j) => b.classList.toggle("on", j === i));
        },
      });
      gsap.to(".drive__img", { y: -14, rotation: 4, duration: 2.4, ease: "sine.inOut", yoyo: true, repeat: -1, stagger: 0.4 });

      // marquees: endless loops in opposite directions
      gsap.utils.toArray(".marquee").forEach((m) => {
        const rev = m.dataset.reverse === "1";
        gsap.fromTo(m.querySelector(".marquee__track"), { xPercent: rev ? -50 : 0 }, { xPercent: rev ? 0 : -50, duration: 40, ease: "none", repeat: -1 });
      });
    });
  }, { scope: root });

  const toggle = (x) => setInterest((s) => (s.includes(x) ? s.filter((y) => y !== x) : [...s, x]));

  return (
    <div ref={root}>
      {/* Hero: image and title only */}
      <section className="about-hero">
        <div className="about-hero__block" data-depth="0.2" />
        <div className="about-hero__tri" data-depth="0.35" aria-hidden="true" />
        <img className="about-hero__sci" data-depth="0.6" src="img/chars/lex_scientist.webp" alt="Lex the mad scientist, from Lex Power Up" />
        <Pixels right="20px" y="70px" size={18} ratio={1} dir="ur" color="var(--white)" />
        <Pixels x="42%" bottom="90px" size={32} />
        <div className="wrap about-hero__title">
          <nav className="crumbs crumbs--light" aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><span aria-current="page">About us</span></nav>
          <p className="display about-hero__about">About</p>
          <h1 className="display about-hero__h1">Slotify</h1>
          <a className="about-hero__cue" href="#intro" aria-label="Scroll to content"><ArrowDown /></a>
        </div>
      </section>

      <section className="wrap section split" id="intro">
        <h2 className="h2" data-reveal>Great slots<br />aren't found.<br /><span className="accent">They're forged.</span></h2>
        <div className="stack" style={{ gap: 18 }}>
          <p className="lede" data-reveal>Slotify is a slot studio with its own engine. We make original games, custom titles and the technology that builds them, with maths, art and engine all made in-house.</p>
          <p className="body muted" data-reveal>Every title runs on a growing library of certified maths models and is built in Forge, our own game engine. That lets a small, focused team ship more games, faster, without cutting corners on quality.</p>
        </div>
      </section>

      {/* Mission and vision */}
      <section className="mv" aria-label="Mission and vision">
        <div className="wrap"><span className="eyebrow">Why we build</span></div>
        <p className="mv__word mv__word--m" aria-hidden="true">Mission</p>
        <div className="wrap mv__row">
          <article className="mv__card mv__card--m" data-depth="0.8">
            <span className="tag tag--orange">Mission</span>
            <p className="mv__text">Build slot games players come back to, on certified maths and an engine fast enough to keep good ideas coming.</p>
          </article>
          <Pixels x="calc(var(--gutter) + 24px)" bottom="-56px" size={28} />
        </div>
        <p className="mv__word mv__word--v" aria-hidden="true">Vision</p>
        <div className="wrap mv__row mv__row--v">
          <article className="mv__card mv__card--v" data-depth="1.1">
            <span className="tag tag--dark">Vision</span>
            <p className="mv__text">Any studio, any brand. From idea to a live, certified slot in days, not months.</p>
          </article>
        </div>
      </section>

      {/* What drives us */}
      <section className="wrap section drives">
        <div className="drives__side">
          <h2 className="h2">What<br />drives us</h2>
          <p className="body">Three ideas behind every Slotify game.</p>
          <div className="drives__progress"><span className="drives__bar">{DRIVES.map((_, i) => <i key={i} className={i === 0 ? "on" : ""} />)}</span><span className="label muted drives__count tnum">01 / 03</span></div>
        </div>
        <div className="drives__cards">
          {DRIVES.map((c, i) => (
            <article key={c.t} className={`drive drive--${c.tone}`} style={{ "--i": i }}>
              <span className="drive__n">0{i + 1}</span>
              <h3 className="h3">{c.t}</h3>
              <p>{c.d}</p>
              <img className="drive__img" src={`img/sym/${c.img}.webp`} alt="" loading="lazy" />
            </article>
          ))}
        </div>
      </section>

      {/* Stats marquee */}
      <section className="stats" aria-label="Slotify in numbers">
        <ul className="sr-only">{[...STATS_A, ...STATS_B].map(([n, l]) => <li key={l}>{n} {l}</li>)}</ul>
        <Marquee items={STATS_A} tone="blue" />
        <Marquee items={STATS_B} tone="orange" reverse />
      </section>

      {/* Three products */}
      <section className="wrap section" id="products">
        <div className="split" style={{ marginBottom: 48 }}>
          <h2 className="h2" data-reveal>One studio.<br />Three products.</h2>
          <p className="body" data-reveal>Play the games, build your own in Forge, or let us build one for your brand.</p>
        </div>
        <div className="products">
          {PRODUCTS.map((p) => (
            <article key={p.t} className={`product product--${p.tone}`} data-reveal>
              <div className="product__img" data-img><img src={p.img} alt="" loading="lazy" /></div>
              <div className="product__body">
                <h3 className="h3">{p.t}</h3>
                <p className="label product__k">{p.k}</p>
                <p className="product__d">{p.d}</p>
                <Link className="product__cta" to={p.to}>{p.cta} <Arrow /></Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Responsible and fair */}
      <section className="wrap fair" data-reveal>
        <span className="fair__badge">18+</span>
        <div className="stack" style={{ gap: 10 }}>
          <h2 className="h3">Responsible and fair</h2>
          <p className="fair__k">Integrity is built into the maths.</p>
          <p className="body">Every Slotify title runs on certified maths models with transparent, published mechanics. We build for regulated markets, support responsible gambling tools on every platform we launch on, and keep our games for players aged 18 and over.</p>
        </div>
      </section>

      {/* Contact */}
      <section className="wrap section contact" id="contact">
        <div className="contact__panel">
          <div className="contact__lead">
            <h2 className="h1">Let's talk</h2>
            <p className="contact__k">Great games start with good partnerships.</p>
            <p className="body">Operator, aggregator or studio? Tell us what you're looking for and we'll come back within one business day.</p>
            <p className="label">Or write to us</p>
            <a className="contact__mail" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </div>
          {sent ? (
            <div className="contact__done" role="status">
              <span className="contact__check"><Check /></span>
              <p className="h3">Message sent</p>
              <p className="body">Thanks. We'll reply within one business day.</p>
              <button className="btn btn--outline btn--sm" type="button" onClick={() => setSent(false)}>Send another</button>
            </div>
          ) : (
            <form className="form" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
              <div className="form__2">
                <label className="field"><span>Full name</span><input id="c-name" name="name" required placeholder="Jane Doe" autoComplete="name" /></label>
                <label className="field"><span>Company</span><input id="c-company" name="company" placeholder="Your company" autoComplete="organization" /></label>
                <label className="field"><span>Work email</span><input id="c-email" name="email" type="email" required placeholder="name@company.com" autoComplete="email" /></label>
                <label className="field"><span>I am a</span>
                  <select id="c-role" name="role" defaultValue="Operator"><option>Operator</option><option>Aggregator</option><option>Studio</option><option>Partner</option><option>Other</option></select>
                </label>
              </div>
              <fieldset className="field">
                <legend>Interested in</legend>
                <div className="row" style={{ gap: 8 }}>
                  {INTEREST.map((x) => <button key={x} type="button" className="chip" aria-pressed={interest.includes(x)} onClick={() => toggle(x)}>{x}</button>)}
                </div>
              </fieldset>
              <label className="field"><span>Message</span><textarea id="c-msg" name="message" rows="4" placeholder="Tell us about your project" /></label>
              <div className="form__foot">
                <p>By sending this form you agree to our <a href="#" onClick={(e) => e.preventDefault()}>Privacy policy</a>.</p>
                <button className="btn" type="submit">Send message</button>
              </div>
            </form>
          )}
          <span className="contact__tri" aria-hidden="true" />
        </div>
      </section>
    </div>
  );
}
