import { useRef } from "react";
import { Link } from "react-router-dom";
import { gsap, useGSAP } from "../gsap.js";
import Pixels from "../components/Pixels.jsx";
import "./placeholder.css";

// Simple branded page for sections that are not designed yet (News, Partners, Careers, Brand).
export default function Placeholder({ title, text = "This page is on its way. In the meantime, play the demos or get in touch." }) {
  const root = useRef(null);
  useGSAP(() => {
    gsap.from(".ph__in > *", { y: 30, autoAlpha: 0, stagger: 0.08, duration: 0.7 });
  }, { scope: root, dependencies: [title] });
  return (
    <section ref={root} className="ph">
      <div className="ph__block" aria-hidden="true" />
      <div className="wrap ph__in">
        <span className="eyebrow">Slotify</span>
        <h1 className="h1">{title}</h1>
        <p className="lede">{text}</p>
        <div className="row">
          <Link className="btn" to="/games">Play demos</Link>
          <Link className="btn btn--white" to="/about?to=contact">Contact us</Link>
        </div>
      </div>
      <Pixels right="8%" bottom="18%" size={32} />
    </section>
  );
}
