// A pair of square "pixels" that touch at a corner, like on the landing page.
// dir: "dr" puts the small one down-right of the big one, "ur" up-right.
export default function Pixels({ x, y, right, bottom, size = 32, ratio = 0.5, dir = "dr", color, className = "", style }) {
  const s2 = Math.round(size * ratio);
  const pos = { left: x, top: y, right, bottom, width: size + s2, height: size + s2, ...style };
  const big = dir === "dr" ? { left: 0, top: 0 } : { left: 0, top: s2 };
  const small = dir === "dr" ? { left: size, top: size } : { left: size, top: 0 };
  return (
    <span className={`px ${className}`} style={{ ...pos, "--px": color }} aria-hidden="true">
      <i style={{ ...big, width: size, height: size }} />
      <i style={{ ...small, width: s2, height: s2 }} />
    </span>
  );
}
