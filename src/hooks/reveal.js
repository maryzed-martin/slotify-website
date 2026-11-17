import { gsap, ScrollTrigger } from "../gsap.js";

// Fade-and-rise for every [data-reveal] element inside `scope`, batched so items that
// enter together stagger together. Elements stay visible if JavaScript never runs.
// Call this inside useGSAP so it is cleaned up with the page.
export function reveal(scope) {
  const mm = gsap.matchMedia();
  mm.add("(prefers-reduced-motion: no-preference)", () => {
    const items = gsap.utils.toArray("[data-reveal]", scope);
    if (!items.length) return;
    gsap.set(items, { autoAlpha: 0, y: 36 });
    ScrollTrigger.batch(items, {
      start: "top 90%",
      once: true,
      onEnter: (els) => gsap.to(els, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.07, ease: "power3.out", overwrite: true }),
    });
  });
  return mm;
}
