// Game catalogue. Values come from the Slotify game sheets.
// `img` keys map to /public/img/games/card_<img>.webp and /public/img/wide/wide_<img>.webp
export const GAMES = [
  { slug: "venus-rising", name: "Venus Rising", img: "venus_rising", wide: true, type: "Video slot", cat: "video", grid: "5x3", rtp: "96.4%", vol: "medium-high", bonusBuy: false,
    lede: "The Venus Wild doubles every win it completes. Land 3 Orb scatters for 15 free spins where all wins pay ×3." },
  { slug: "lex-power-up", name: "Lex Power Up", img: "lex_power_up", wide: true, type: "Video slot", cat: "video", grid: "6x5", rtp: "up to 96%", vol: "high", bonusBuy: true,
    lede: "Cluster pays on a 6×5 grid. Multiplier Orbs up to 500× add up across every cascade." },
  { slug: "lex-fortune", name: "Lex Fortune", img: "lex_fortune", type: "Video slot", cat: "video", grid: "3-4-3", rtp: "~96%", vol: "medium-high", bonusBuy: false },
  { slug: "black-pearl", name: "Legends of the Black Pearl", short: "Black Pearl", img: "black_pearl", wide: true, type: "Video slot", cat: "video", grid: "5x3", rtp: "96.4%", vol: "medium-high", bonusBuy: false },
  { slug: "z-rush", name: "Z-Rush", img: "zrush", wide: true, type: "Book style", cat: "book", grid: "5x3", rtp: "95.10%", vol: "high", bonusBuy: true },
  { slug: "scarabs-secret", name: "Scarab's Secret", img: "scarabs_secret", type: "Book style", cat: "book", grid: "5x3", rtp: "95.10%", vol: "high", bonusBuy: true },
  { slug: "book-of-illusions", name: "Book of Illusions", img: "book_of_illusions", type: "Book style", cat: "book", grid: "5x3", rtp: "95.10%", vol: "high", bonusBuy: true },
  { slug: "gemwood", name: "Gemwood", img: "gemwood", wide: true, type: "Video slot", cat: "video", grid: "5x3", rtp: "96.4%", vol: "medium-high", bonusBuy: false },
  { slug: "jellyland", name: "Jellyland", img: "jellyland", wide: true, type: "Video slot", cat: "video", grid: "5x4", rtp: "96.4%", vol: "low", bonusBuy: false },
  { slug: "juicy-crown", name: "Juicy Crown", img: "juicy_crown", wide: true, type: "Classic", cat: "classic", grid: "5x3", rtp: "96.3%", vol: "low-medium", bonusBuy: false },
  { slug: "hot-fruitz", name: "Hot Fruitz", img: "hot_fruitz", type: "Classic", cat: "classic", grid: "5x3", rtp: "95.66%", vol: "high", bonusBuy: false },
  { slug: "juicy-boost", name: "Juicy Boost", img: "juicy_boost", type: "Classic", cat: "classic", grid: "5x3", rtp: "95.66%", vol: "high", bonusBuy: false },
  { slug: "big-money-bonanza", name: "Big Money Bonanza", img: "big_money_bonanza", wide: true, type: "Classic", cat: "classic", grid: "5x3", rtp: "95.66%", vol: "medium-high", bonusBuy: false },
];

export const FILTERS = [
  { id: "all", label: "All games" },
  { id: "video", label: "Video slots" },
  { id: "classic", label: "Classic fruit" },
  { id: "book", label: "Book style" },
  { id: "bonus", label: "Bonus buy" },
];

export function filterGames(list, filter, query = "") {
  const q = query.trim().toLowerCase();
  return list.filter((g) => {
    const okFilter = filter === "all" || (filter === "bonus" ? g.bonusBuy : g.cat === filter);
    const okQuery = !q || g.name.toLowerCase().includes(q) || g.type.toLowerCase().includes(q);
    return okFilter && okQuery;
  });
}

export const cardSrc = (g) => `img/games/card_${g.img}.webp`;
export const wideSrc = (g) => `img/wide/wide_${g.img}.webp`;
export const bySlug = (slug) => GAMES.find((g) => g.slug === slug);

// Full game sheet detail. Only Lex Power Up has the long version on the site today.
export const DETAILS = {
  "lex-power-up": {
    tags: ["Video slot", "Cluster pays", "6x5", "Bonus buy"],
    rows: [
      ["Grid", "6 × 5 (30 positions)"],
      ["Win mechanic", "Cluster pays, 8+ anywhere"],
      ["Cascades", "Tumble in base game and free spins"],
      ["RTP", "94.00% · 95.00% · 96.00%"],
      ["Volatility", "High"],
      ["Max win", "50,000× total bet"],
      ["Free spins", "15, retrigger +5"],
      ["Bonus buy", "Free spins 100× · Power Up 500×"],
      ["Bet booster", "1.25× per spin"],
    ],
    title: "Step into Lex's lab",
    body: [
      "Lex Power Up is a high-volatility 6×5 cluster pays slot set in the laboratory of Lex, an eccentric mad scientist. Land 8 or more identical symbols anywhere on the grid to win, then watch them tumble away as new symbols fall in, with no limit to how many cascades a single spin can chain.",
      "Multiplier Orbs from 2× up to 500× add together across the whole cascade chain, and in free spins they build a persistent multiplier that never resets. In the base game, Lex's Overcharge Meter can fire at any moment and double the next orb.",
    ],
    features: [
      ["Tumble cascades", "Winning symbols vanish and new ones drop in until no wins remain."],
      ["Multiplier Orbs", "2× to 500×, summed across the cascade chain."],
      ["Overcharge Meter", "Base game only. Doubles the next Multiplier Orb."],
      ["Power Up Ladder", "The Super Scatter pays an instant ladder win and joins the free spins trigger."],
    ],
  },
};
