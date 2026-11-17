import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo.jsx";
import { Burger, User, Sun, Moon } from "./Icons.jsx";
import { BACKOFFICE_URL } from "../config.js";
import "./header.css";

// Fixed header. Over a hero it stays transparent with white content;
// once the page scrolls it gets a solid, theme-coloured backdrop.
export default function Header({ tone = "hero", onMenu, theme, onTheme }) {
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const on = () => {
      const y = window.scrollY;
      setSolid(y > 40);
      // hide while reading down the page, show again as soon as the visitor scrolls up
      if (Math.abs(y - last) > 6) { setHidden(y > last && y > 400); last = y; }
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const onHero = tone === "hero" && !solid;

  return (
    <header className={`site-header ${solid ? "is-solid" : ""} ${hidden ? "is-hidden" : ""} ${onHero ? "on-hero" : "on-page"}`}>
      <div className="site-header__inner">
        <Link to="/" className="site-header__logo" aria-label="Slotify home">
          <Logo height={34} />
        </Link>
        <div className="site-header__actions">
          <button className="theme-btn hide-sm" type="button" onClick={onTheme} aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}>
            {theme === "dark" ? <Sun /> : <Moon />}
          </button>
          <a className="btn btn--outline btn--sm signin" href={BACKOFFICE_URL}>
            <span className="hide-sm"><User /></span>Sign in
          </a>
          <button className="btn btn--sm menu-btn" type="button" onClick={onMenu} aria-haspopup="dialog" aria-label="Open menu">
            <span className="hide-sm">Menu</span>
            <Burger />
          </button>
        </div>
      </div>
    </header>
  );
}
