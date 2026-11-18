import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { gsap, useGSAP } from "../gsap.js";
import Logo from "./Logo.jsx";
import Pixels from "./Pixels.jsx";
import { Arrow, Close, Minus, Plus, User, Sun, Moon } from "./Icons.jsx";
import { BACKOFFICE_URL } from "../config.js";
import "./menu.css";

const NAV = [
  { label: "About us", children: [["About Slotify", "/about"], ["Partners", "/partners"], ["Careers", "/careers"], ["Brand resources", "/brand"]] },
  { label: "Games", children: [["Play demos", "/games"], ["Game sheets", "/games?to=grid"]] },
  { label: "Forge", children: [["Forge engine", "/forge"], ["Custom games", "/about?to=products"], ["Book a demo", "/forge?to=book"]] },
  { label: "News", to: "/news" },
  { label: "Partners", to: "/partners" },
  { label: "Careers", to: "/careers" },
  { label: "Contact", to: "/about?to=contact" },
];

// Full-screen accordion menu. Opens with a top-down wipe, items slide in with a 35 ms stagger.
// Only one accordion group is open at a time.
export default function Menu({ open, onClose, theme, onTheme }) {
  const root = useRef(null);
  const tl = useRef(null);
  const [openGroup, setOpenGroup] = useState(1);
  const { pathname } = useLocation();

  useGSAP(() => {
    gsap.set(root.current, { autoAlpha: 0 });
    tl.current = gsap
      .timeline({ paused: true, defaults: { ease: "power3.out" } })
      .set(root.current, { autoAlpha: 1 })
      .fromTo(root.current, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 0.5, ease: "power4.inOut" })
      .from(".menu__item", { y: 24, autoAlpha: 0, duration: 0.45, stagger: 0.035 }, "-=0.18")
      // explicit end values: the button has a CSS transform transition, so a plain .from() could read
      // a half-finished transform as its resting place and leave the button 32px off centre
      .fromTo(".menu__feature > *", { x: 32, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.5, stagger: 0.06 }, "<0.05")
      .from(".menu__char", { y: 60, autoAlpha: 0, duration: 0.7 }, "<");
  }, { scope: root });

  useEffect(() => {
    if (!tl.current) return;
    if (open) {
      tl.current.timeScale(1).play();
      document.documentElement.style.overflow = "hidden";
      setTimeout(() => root.current?.querySelector(".menu__close")?.focus(), 80);
    } else {
      tl.current.timeScale(1.8).reverse();
      document.documentElement.style.overflow = "";
    }
  }, [open]);

  // close when the route changes
  useEffect(() => { if (open) onClose(); }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape" && open) onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div ref={root} className="menu" role="dialog" aria-modal="true" aria-label="Main menu" aria-hidden={!open}>
      <div className="menu__shade" aria-hidden="true" />
      <div className="menu__bar">
        <Link to="/" className="menu__logo" onClick={onClose} aria-label="Slotify home"><Logo height={34} /></Link>
        <div className="menu__actions">
          <button className="theme-btn" type="button" onClick={onTheme} aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}>
            {theme === "dark" ? <Sun /> : <Moon />}
          </button>
          <a className="btn btn--outline btn--sm menu__signin" href={BACKOFFICE_URL}><User /> Sign in</a>
          <button className="btn btn--white btn--sm menu__close" type="button" onClick={onClose} aria-label="Close menu">
            <span className="menu__close-label">Close</span> <Close />
          </button>
        </div>
      </div>

      <nav className="menu__nav" aria-label="Primary">
        <ul>
          {NAV.map((item, i) => {
            const isOpen = openGroup === i;
            return (
              <li className="menu__item" key={item.label}>
                {item.children ? (
                  <>
                    <button
                      type="button"
                      className={`menu__link ${isOpen ? "is-open" : ""}`}
                      aria-expanded={isOpen}
                      aria-controls={`menu-group-${i}`}
                      onClick={() => setOpenGroup(isOpen ? -1 : i)}
                    >
                      <span>{item.label}</span>
                      {isOpen ? <Minus /> : <Plus />}
                    </button>
                    <div id={`menu-group-${i}`} className="menu__sub" data-open={isOpen}>
                      <div>
                        {item.children.map(([label, to]) => (
                          <Link key={label} to={to} onClick={onClose}>{label}</Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link className="menu__link" to={item.to} onClick={onClose}>
                    <span>{item.label}</span>
                    <Arrow />
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* featured game: title, tag and button sit centred over the character */}
      <div className="menu__stage">
        <aside className="menu__feature" aria-label="Featured game">
          <span className="tag tag--orange">Featured game</span>
          <p className="display menu__feature-title">Lex Fortune</p>
          <Link className="btn btn--sm" to="/games/lex-fortune" onClick={onClose}>Play demo</Link>
        </aside>
        <img className="menu__char" src="img/chars/char_lex_fortune.webp" alt="" />
      </div>
      <Pixels right="34%" y="44%" size={14} ratio={1} dir="ur" color="var(--white)" className="menu__px" />
      <Pixels right="6%" y="68%" size={28} color="var(--orange)" className="menu__px" />
    </div>
  );
}
