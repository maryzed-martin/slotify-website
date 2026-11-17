import { useRef } from "react";
import { Arrow, ArrowLeft } from "./Icons.jsx";
import "./carousel.css";

// Native horizontal scroller with snap points and arrow buttons. Works with touch, trackpad and keyboard.
export default function Carousel({ children, label, footer, tone = "light" }) {
  const track = useRef(null);
  const go = (dir) => {
    const el = track.current;
    const card = el.querySelector(":scope > *");
    const step = card ? card.getBoundingClientRect().width + 16 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };
  return (
    <div className={`carousel carousel--${tone}`}>
      <div className="carousel__track" ref={track} role="region" aria-label={label} tabIndex={0}>
        {children}
      </div>
      <div className="carousel__bar">
        <div className="carousel__arrows">
          <button type="button" onClick={() => go(-1)} aria-label="Previous"><ArrowLeft /></button>
          <button type="button" onClick={() => go(1)} aria-label="Next"><Arrow /></button>
        </div>
        {footer}
      </div>
    </div>
  );
}
