import { Link } from "react-router-dom";
import { cardSrc } from "../data/games.js";
import { Play, Doc } from "./Icons.jsx";
import { useTilt } from "../hooks/useTilt.js";
import "./gamecard.css";

// Game card: art on top, slanted dark body below with RTP, volatility and two actions.
export default function GameCard({ game, compact = false }) {
  const tilt = useTilt(5);
  return (
    <article ref={tilt} className={`gcard ${compact ? "gcard--compact" : ""}`}>
      <Link to={`/games/${game.slug}`} className="gcard__art" aria-label={`${game.name} demo`}>
        <img src={cardSrc(game)} alt="" loading="lazy" width="560" height="700" />
        <span className="gcard__tags">
          <span className="tag tag--dark">{game.type}</span>
          <span className="tag tag--orange">{game.grid}</span>
        </span>
      </Link>
      <div className="gcard__body">
        <h3 className="gcard__title">{game.name}</h3>
        <p className="gcard__meta tnum">RTP {game.rtp} · Volatility {game.vol}</p>
        <div className="gcard__actions">
          <Link className="btn btn--sm" to={`/games/${game.slug}`}><Play size={10} />Demo</Link>
          <a className="btn btn--white btn--sm" href="#" onClick={(e) => e.preventDefault()}><Doc />{compact ? "Sheet" : "Game sheet"}</a>
        </div>
      </div>
    </article>
  );
}
