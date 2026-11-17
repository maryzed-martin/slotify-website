import { gsap, ScrollTrigger, SplitText } from "../gsap.js";

// Scroll entrances for a page. Call inside useGSAP so everything is reverted with the page.
//  - h1/h2 with [data-reveal]: lines rise out of a mask, word by word
//  - other [data-reveal]: fade and rise, batched so neighbours stagger together
//  - [data-img]: image is unveiled with a clip-path wipe while it settles from a small zoom
//  - [data-count]: number counts up from 0 the first time it is seen (keeps suffixes like "+" or "%")
// Nothing is hidden when the visitor prefers reduced motion.
export function reveal(scope) {
  const mm = gsap.matchMedia();
  mm.add("(prefers-reduced-motion: no-preference)", () => {
    const all = gsap.utils.toArray("[data-reveal]", scope);
    const heads = all.filter((el) => /^H[12]$/.test(el.tagName) || el.classList.contains("cta__title"));
    const rest = all.filter((el) => !heads.includes(el));

    heads.forEach((el) => {
      SplitText.create(el, {
        type: "lines,words",
        mask: "lines",
        autoSplit: true,
        onSplit(self) {
          return gsap.from(self.words, {
            yPercent: 110,
            duration: 0.9,
            ease: "power4.out",
            stagger: 0.035,
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          });
        },
      });
    });

    if (rest.length) {
      gsap.set(rest, { autoAlpha: 0, y: 36 });
      ScrollTrigger.batch(rest, {
        start: "top 90%",
        once: true,
        onEnter: (els) => gsap.to(els, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.07, ease: "power3.out", overwrite: true }),
      });
    }

    // card groups: the cards come in one after another, each rising from a slight tilt
    gsap.utils.toArray("[data-stagger]", scope).forEach((group) => {
      gsap.from(group.children, {
        y: 70,
        rotation: 1.5,
        autoAlpha: 0,
        duration: 0.9,
        ease: "power4.out",
        stagger: 0.16,
        scrollTrigger: { trigger: group, start: "top 85%", once: true },
      });
    });

    // scroll-into-view groups: cards are tied to the scrollbar, each one travels further than the one before,
    // so they arrive one after another and settle together as the section reaches the upper part of the screen
    gsap.utils.toArray("[data-scrub-stagger]", scope).forEach((group) => {
      [...group.children].forEach((card, i) => {
        gsap.fromTo(card, { y: 120 + i * 90, rotation: 2 + i, autoAlpha: 0.15 }, {
          y: 0, rotation: 0, autoAlpha: 1, ease: "power2.out",
          scrollTrigger: { trigger: group, start: "top bottom", end: "top 45%", scrub: 0.6 },
        });
      });
    });
    // single elements that slide in from a side, tied to scroll
    gsap.utils.toArray("[data-scrub-in]", scope).forEach((el) => {
      const dir = el.dataset.scrubIn === "left" ? -1 : 1;
      gsap.fromTo(el, { x: dir * 140, rotation: dir * 2, autoAlpha: 0.2 }, {
        x: 0, rotation: 0, autoAlpha: 1, ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top bottom", end: "top 55%", scrub: 0.6 },
      });
    });

    gsap.utils.toArray("[data-img]", scope).forEach((el) => {
      const img = el.tagName === "IMG" ? el : el.querySelector("img");
      gsap.timeline({ scrollTrigger: { trigger: el, start: "top 85%", once: true } })
        .fromTo(el, { clipPath: "inset(18% 0% 18% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: "power4.inOut" })
        .fromTo(img, { scale: 1.18 }, { scale: 1, duration: 1.4, ease: "power3.out" }, 0);
    });

    gsap.utils.toArray("[data-count]", scope).forEach((el) => {
      const raw = el.textContent.trim();
      const m = raw.match(/^(\d+)(.*)$/);
      if (!m) return;
      const end = parseInt(m[1], 10);
      const suffix = m[2];
      const o = { v: 0 };
      gsap.to(o, {
        v: end,
        duration: 1.4,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
        onUpdate: () => { el.textContent = Math.round(o.v) + suffix; },
        onComplete: () => { el.textContent = raw; },
      });
    });
  });
  return mm;
}
