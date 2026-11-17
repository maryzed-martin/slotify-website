import { Link } from "react-router-dom";
import { CONTACT_EMAIL, SOCIAL } from "../config.js";
import "./footer.css";

const COLS = [
  ["About us", [["About Slotify", "/about"], ["Partners", "/partners"], ["Careers", "/careers"], ["Brand resources", "/brand"]]],
  ["Games", [["Play demos", "/games"], ["Game sheets", "/games?to=grid"], ["All games", "/games"]]],
  ["Forge", [["Forge engine", "/forge"], ["Custom games", "/about?to=products"], ["Book a demo", "/forge?to=book"]]],
  ["News", [["Latest releases", "/news"], ["Events", "/news"], ["Press", "/news"]]],
  ["Contact", [["Contact us", "/about?to=contact"], [CONTACT_EMAIL, `mailto:${CONTACT_EMAIL}`]]],
];

// Dark in both themes. Slanted top edge and the play-triangle notch on the left.
export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__notch" aria-hidden="true"><span /></div>
      <div className="wrap footer__main">
        <div className="footer__brand">
          <Link to="/" className="footer__logo" aria-label="Slotify home"><img src="img/logo_stack_white.png" alt="Slotify" width="96" height="75" /></Link>
          <p className="label footer__tag">Endless worlds. One spin away.</p>
          <ul className="footer__social" aria-label="Social">
            {SOCIAL.map(([s, n, url]) => (
              <li key={s}><a href={url} target="_blank" rel="noreferrer" aria-label={`Slotify on ${n}`}>{s}</a></li>
            ))}
          </ul>
        </div>
        <nav className="footer__cols" aria-label="Footer">
          {COLS.map(([title, links]) => (
            <div key={title}>
              <p className="footer__title">{title}</p>
              <ul>
                {links.map(([l, to]) =>
                  <li key={l}>{to.startsWith("mailto:") ? <a href={to}>{l}</a> : <Link to={to}>{l}</Link>}</li>
                )}
              </ul>
            </div>
          ))}
        </nav>
      </div>
      <div className="wrap footer__legal">
        <span className="footer__age" aria-label="18 plus">18+</span>
        <p>This website is intended for B2B partners only. Games shown are for demonstration and no real money gambling is offered. Play responsibly.</p>
        <ul>
          <li><Link to="/privacy">Privacy policy</Link></li>
          <li><Link to="/terms">Terms of use</Link></li>
          <li>© 2026 Slotify</li>
        </ul>
      </div>
    </footer>
  );
}
