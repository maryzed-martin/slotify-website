import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "../gsap.js";
import Logo from "./Logo.jsx";
import "./agegate.css";

const KEY = "slotify-age-ok";

// Shown once per browser. The page behind is blurred until the visitor confirms.
export default function AgeGate() {
  const [show, setShow] = useState(() => {
    try { return localStorage.getItem(KEY) !== "1"; } catch { return true; }
  });
  const [under, setUnder] = useState(false);
  const root = useRef(null);
  const okBtn = useRef(null);

  useEffect(() => {
    document.documentElement.classList.toggle("gate-open", show);
    if (show) setTimeout(() => okBtn.current?.focus(), 400);
  }, [show]);

  const { contextSafe } = useGSAP(() => {
    if (!show) return;
    gsap.from(".gate__panel", { y: 40, scale: 0.96, autoAlpha: 0, duration: 0.6, delay: 0.15, ease: "power4.out" });
    gsap.from(".gate__scrim", { autoAlpha: 0, duration: 0.4 });
  }, { scope: root, dependencies: [show] });

  const accept = contextSafe(() => {
    try { localStorage.setItem(KEY, "1"); } catch {}
    gsap.to(root.current, { autoAlpha: 0, duration: 0.25, ease: "power2.out", onComplete: () => setShow(false) });
  });

  if (!show) return null;
  return (
    <div ref={root} className="gate" role="dialog" aria-modal="true" aria-labelledby="gate-title">
      <div className="gate__scrim" />
      <div className="gate__panel">
        <span className="gate__play" aria-hidden="true" />
        <Logo height={30} className="gate__logo" />
        <h2 id="gate-title" className="gate__title">
          We are committed to <span className="accent-o">responsible</span> gambling
        </h2>
        {under ? (
          <p className="gate__text" role="status">Sorry, this website is only for visitors aged 18 or over. Please come back when you are 18.</p>
        ) : (
          <p className="gate__text">This website is for business partners and players aged 18 or over. Please confirm your age to continue.</p>
        )}
        <div className="row gate__actions">
          <button ref={okBtn} className="btn" type="button" onClick={accept}>I am 18 or older</button>
          <button className="btn btn--outline" type="button" onClick={() => setUnder(true)}>I am under 18</button>
        </div>
        <p className="gate__fine">Play responsibly. By entering you accept our <a href="#" onClick={(e) => e.preventDefault()}>Terms of use</a> and <a href="#" onClick={(e) => e.preventDefault()}>Privacy policy</a>.</p>
      </div>
    </div>
  );
}
