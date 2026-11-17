const s = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "square" };

export const Arrow = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" aria-hidden="true"><path d="M1 8h13M9 3l5 5-5 5" {...s} /></svg>
);
export const ArrowLeft = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" aria-hidden="true"><path d="M15 8H2M7 3 2 8l5 5" {...s} /></svg>
);
export const ArrowDown = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" aria-hidden="true"><path d="M8 1v13M3 9l5 5 5-5" {...s} /></svg>
);
export const Burger = () => (
  <svg width="20" height="14" viewBox="0 0 20 14" aria-hidden="true"><rect width="20" height="2.5" fill="currentColor" /><rect y="5.75" width="14" height="2.5" fill="currentColor" /><rect y="11.5" width="20" height="2.5" fill="currentColor" /></svg>
);
export const Close = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" aria-hidden="true"><path d="M1 1l12 12M13 1 1 13" {...s} strokeWidth="2.2" /></svg>
);
export const User = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="4.6" r="3.2" {...s} strokeWidth="1.6" /><path d="M2 15c0-3.4 2.7-5.2 6-5.2s6 1.8 6 5.2" {...s} strokeWidth="1.6" strokeLinecap="round" /></svg>
);
export const Plus = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 1v14M1 8h14" {...s} strokeWidth="1.8" /></svg>
);
export const Minus = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M1 8h14" {...s} strokeWidth="1.8" /></svg>
);
export const Play = ({ size = 12 }) => (
  <svg width={size} height={size} viewBox="0 0 12 12" aria-hidden="true"><path d="M2 1l9 5-9 5z" fill="currentColor" /></svg>
);
export const Doc = () => (
  <svg width="14" height="16" viewBox="0 0 14 16" aria-hidden="true"><path d="M1 1h8l4 4v10H1z M9 1v4h4 M4 9h6M4 12h6" {...s} strokeWidth="1.6" /></svg>
);
export const Search = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><circle cx="7" cy="7" r="5.2" {...s} strokeWidth="1.8" /><path d="M11 11l4 4" {...s} strokeWidth="1.8" /></svg>
);
export const Sun = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><circle cx="9" cy="9" r="3.6" {...s} strokeWidth="1.7" /><path d="M9 1v2M9 15v2M1 9h2M15 9h2M3.3 3.3l1.4 1.4M13.3 13.3l1.4 1.4M3.3 14.7l1.4-1.4M13.3 4.7l1.4-1.4" {...s} strokeWidth="1.7" /></svg>
);
export const Moon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><path d="M15.5 11.2A7 7 0 0 1 6.8 2.5a7 7 0 1 0 8.7 8.7z" {...s} strokeWidth="1.7" strokeLinejoin="round" /></svg>
);
export const Expand = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M1 6V1h5M10 1h5v5M15 10v5h-5M6 15H1v-5" {...s} strokeWidth="1.6" /></svg>
);
export const Sound = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M1 6h3l4-3v10l-4-3H1z" fill="currentColor" /><path d="M11 5c1.3 1.6 1.3 4.4 0 6M13 3c2.4 2.8 2.4 7.2 0 10" {...s} strokeWidth="1.5" /></svg>
);
export const Check = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M2 8.5l4 4 8-9" {...s} strokeWidth="2" /></svg>
);
