import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ScrollTrigger } from "../gsap.js";

// On every route change: jump to ?to=<id> if given, otherwise to the top. Then let ScrollTrigger re-measure.
export default function ScrollManager() {
  const { pathname, search } = useLocation();
  useEffect(() => {
    const id = new URLSearchParams(search).get("to");
    window.scrollTo(0, 0);
    const t = setTimeout(() => {
      ScrollTrigger.refresh();
      if (id) {
        const el = document.getElementById(id);
        if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: "smooth" });
      }
    }, 120);
    return () => clearTimeout(t);
  }, [pathname, search]);

  // fonts and images change layout after first paint
  useEffect(() => {
    const r = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(r);
    window.addEventListener("load", r);
    return () => window.removeEventListener("load", r);
  }, []);
  return null;
}
