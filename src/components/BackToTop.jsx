import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { ScrollTrigger } from "../gsap.js";
import "./backtotop.css";

// Appears once the footer comes into view and takes the visitor back to the top of the page.
export default function BackToTop() {
  const [show, setShow] = useState(false);
  const { pathname } = useLocation();
  const st = useRef(null);

  useEffect(() => {
    // re-created for every page, after the page has laid out
    const t = setTimeout(() => {
      st.current?.kill();
      st.current = ScrollTrigger.create({
        trigger: ".footer",
        start: "top 85%",
        onToggle: (self) => setShow(self.isActive),
      });
    }, 300);
    return () => { clearTimeout(t); st.current?.kill(); setShow(false); };
  }, [pathname]);

  const up = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <button type="button" className={`to-top ${show ? "is-on" : ""}`} onClick={up} aria-label="Back to top" tabIndex={show ? 0 : -1}>
      <svg width="18" height="18" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 15V2M3 7l5-5 5 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" /></svg>
    </button>
  );
}
