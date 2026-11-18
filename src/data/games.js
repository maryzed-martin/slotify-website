// Game catalogue. Values come from the Slotify game sheets.
// `img` keys map to /public/img/games/card_<img>.webp and /public/img/wide/wide_<img>.webp
export const GAMES = [
  { slug: "venus-rising", name: "Venus Rising", img: "venus_rising", wide: true, type: "Video slot", cat: "video", grid: "5x3", rtp: "96.4%", vol: "medium-high", bonusBuy: false,
    lede: "The Venus Wild doubles every win it completes. Land 3 Orb scatters for 15 free spins where all wins pay ×3." },
  { slug: "lex-power-up", name: "Lex Power Up", img: "lex_power_up", wide: true, type: "Video slot", cat: "video", grid: "6x5", rtp: "up to 96%", vol: "high", bonusBuy: true,
    lede: "Cluster pays on a 6×5 grid. Multiplier Orbs up to 500× add up across every cascade." },
  { slug: "lex-fortune", name: "Lex Fortune", img: "lex_fortune", type: "Video slot", cat: "video", grid: "3-4-3", rtp: "~96%", vol: "medium-high", bonusBuy: true },
  { slug: "black-pearl", name: "Legends of the Black Pearl", short: "Black Pearl", img: "black_pearl", wide: true, type: "Video slot", cat: "video", grid: "5x3", rtp: "96.4%", vol: "medium-high", bonusBuy: false },
  { slug: "z-rush", name: "Z-Rush", img: "zrush", wide: true, type: "Book style", cat: "book", grid: "5x3", rtp: "95.10%", vol: "high", bonusBuy: false },
  { slug: "scarabs-secret", name: "Scarab's Secret", img: "scarabs_secret", type: "Book style", cat: "book", grid: "5x3", rtp: "95.10%", vol: "high", bonusBuy: false },
  { slug: "book-of-illusions", name: "Book of Illusions", img: "book_of_illusions", type: "Book style", cat: "book", grid: "5x3", rtp: "95.10%", vol: "high", bonusBuy: false },
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
  "venus-rising": {
    tags: ["Video slot", "5x3", "10 lines", "Free spins"],
    rows: [["Grid", "5 × 3"], ["Paylines", "10 fixed"], ["RTP", "96.4%"], ["Volatility", "Medium–high"], ["Theme", "Ancient Greek mythology"], ["Free spins", "15, all wins ×3, retrigger"], ["Wild", "Venus, doubles wins (×2)"], ["Scatter", "Orb, pays 2+ anywhere"]],
    title: "Blessed by the goddess",
    body: [
      "Step into a world of marble columns, glowing skies and celestial symbols as you spin the reels blessed by the goddess of love and beauty. Divine artifacts, mythical creatures and radiant treasures bring both charm and fortune.",
      "Venus is the Wild: she substitutes for every symbol except the Scatter and doubles any win she completes. Land 3 or more Orb Scatters for 15 Free Spins where every win pays ×3, so a Wild win in free spins pays ×6.",
    ],
    features: [["Multiplying Wild", "Venus doubles every win she is part of."], ["15 Free Spins", "3+ Orb Scatters, all wins ×3."], ["×6 in free spins", "The Wild's ×2 stacks with the free spins ×3."], ["Retrigger", "More Orbs during free spins add more spins."]],
  },
  "gemwood": {
    tags: ["Video slot", "5x3", "10 lines", "Free spins"],
    rows: [["Grid", "5 × 3"], ["Paylines", "10 fixed"], ["RTP", "96.4%"], ["Volatility", "Medium–high"], ["Max win", "Up to ~9,000× bet"], ["Free spins", "15, all wins ×3, retrigger"], ["Wild", "Owl, doubles wins (×2)"], ["Scatter", "Portal, pays 2+ anywhere"]],
    title: "Enter the enchanted forest",
    body: [
      "Step into a mystical forest where sparkling gems and legendary creatures wait: radiant crystals, magical owls, fiery dragons and mythical beasts.",
      "The Owl Wild substitutes for every symbol except the Scatter and doubles the wins it completes. Land 3 or more Portal Scatters for 15 Free Spins with every win ×3, and the Wild's ×2 stacks on top for ×6.",
    ],
    features: [["Multiplying Wild", "The Owl doubles every win it is part of."], ["15 Free Spins", "3+ Portal Scatters, all wins ×3."], ["×6 in free spins", "Wild ×2 stacks with the free spins ×3."], ["Retrigger", "More Portals during free spins add more spins."]],
  },
  "black-pearl": {
    tags: ["Video slot", "5x3", "10 lines", "Free spins"],
    rows: [["Grid", "5 × 3"], ["Paylines", "10 fixed"], ["RTP", "96.4%"], ["Volatility", "Medium–high"], ["Theme", "Pirates"], ["Free spins", "15, all wins ×3, retrigger"], ["Wild", "Skull, doubles wins (×2)"], ["Scatter", "Compass, pays 2+ anywhere"]],
    title: "Set sail into legend",
    body: [
      "A swashbuckling adventure across open, sunset-lit seas, where a cursed ship and her fearsome crew wait to reward the bold. The fearless Pirate Captain is the highest-paying symbol.",
      "The Skull from the ship's cursed flag is the Wild: it substitutes for every symbol and doubles any win it is part of. Land 3 or more Compass Scatters for 15 Free Spins where every win sails in at ×3, with the chance to retrigger.",
    ],
    features: [["Multiplying Wild", "The Skull doubles every win it completes."], ["15 Free Spins", "3+ Compass Scatters, all wins ×3."], ["×6 in free spins", "Wild ×2 stacks with the free spins ×3."], ["Retrigger", "Keep the voyage going with more Compasses."]],
  },
  "z-rush": {
    tags: ["Book style", "5x3", "10 lines", "Expanding symbol"],
    rows: [["Grid", "5 × 3"], ["Paylines", "10 fixed"], ["RTP", "~95.10%"], ["Volatility", "High"], ["Max win", "5,000× bet per line"], ["Theme", "Zombies"], ["Free spins", "10, retrigger +10"], ["Wild / Scatter", "Pays 2× to 200× anywhere"]],
    title: "Survive the night",
    body: [
      "Z-Rush is set in an abandoned, infected city where the undead now rule the night. Flickering streetlights cut through a sickly green haze, while a lumbering Zombie and the far more coveted Zombie Nurse wait to take over the reels.",
      "Land 3 or more Scatters for 10 Free Spins. One symbol is picked at random as the Expanding Symbol and fills whole reels when it lands: high symbols expand with 2 on a reel, low symbols with 3. Draw the Zombie Nurse and a single spin can fill the screen.",
    ],
    features: [["Expanding Symbol", "One random symbol grows to fill entire reels."], ["10 Free Spins", "3+ Scatters anywhere on the reels."], ["Retrigger", "3+ Scatters in free spins add 10 more, same symbol."], ["Wild and Scatter in one", "Substitutes and pays anywhere, up to 200×."]],
  },
  "scarabs-secret": {
    tags: ["Book style", "5x3", "10 lines", "Expanding symbol"],
    rows: [["Grid", "5 × 3"], ["Paylines", "10 fixed"], ["RTP", "~95.10%"], ["Volatility", "High"], ["Max win", "5,000× bet per line"], ["Theme", "Ancient Egypt"], ["Free spins", "10, retrigger +10"], ["Wild / Scatter", "Book, pays 2× to 200× anywhere"]],
    title: "Dare to spin. Unlock the secret.",
    body: [
      "Step into the golden sands of ancient Egypt, where hidden treasures and mystical powers wait for those brave enough. Shimmering Scarabs, ancient Eyes and powerful Ankhs reveal their true potential with every spin.",
      "The Book is both Wild and Scatter. Land 3 or more for 10 Free Spins, where one random symbol becomes the Expanding Symbol and fills entire reels for screen-filling wins.",
    ],
    features: [["Expanding Symbol", "One random symbol grows to fill entire reels."], ["10 Free Spins", "3+ Book symbols anywhere."], ["Retrigger", "3+ Books in free spins add 10 more, same symbol."], ["Book symbol", "Wild and Scatter, pays up to 200×."]],
  },
  "book-of-illusions": {
    tags: ["Book style", "5x3", "10 lines", "Expanding symbol"],
    rows: [["Grid", "5 × 3"], ["Paylines", "10 fixed"], ["RTP", "~95.10%"], ["Volatility", "High"], ["Max win", "5,000× bet per line"], ["Theme", "Alchemy"], ["Free spins", "10, retrigger +10"], ["Wild / Scatter", "Book, pays 2× to 200× anywhere"]],
    title: "Step through the arcane archway",
    body: [
      "A forgotten library where magic hides between the pages. Guided by a powerful enchantress and a wise old wizard, every spin is wrapped in candlelight, crystal balls and swirling blue sorcery.",
      "The mystical Book acts as both Wild and Scatter. Land 3 or more to unlock 10 Free Games, where one random symbol is chosen as the Expanding Symbol and grows to cover entire reels. Free Games can be retriggered.",
    ],
    features: [["Expanding Symbol", "One random symbol grows to cover whole reels."], ["10 Free Games", "3+ Book symbols anywhere."], ["Retrigger", "3+ Books in free games add 10 more."], ["Book symbol", "Wild and Scatter, pays up to 200×."]],
  },
  "lex-fortune": {
    tags: ["Video slot", "3-4-3", "Lock & Spin", "Bonus buy"],
    rows: [["Reels", "3-4-3 (middle reel 4 positions)"], ["Paylines", "10 fixed"], ["RTP", "~96.00%, configurable"], ["Volatility", "Medium–high, up to super-high"], ["Hit rate", "Approx. 28%–32%"], ["Max win", "5,000× bet, hard stop"], ["Feature", "Lock & Spin"], ["Bonus buy", "Standard, Super Multiplier, Outer Wilds"]],
    title: "One warrior, one gift",
    body: [
      "Lex Fortune fuses the energy of classic reel slots with a modern Lock & Spin collection engine, wrapped in bold Chinese fortune iconography. Lex, the armored, bubblegum-blowing llama warrior, is the Wild, the highest-paying symbol and the game's host.",
      "Two doors lead into Lock & Spin: a random gift from Lex or three Golden Medallion Scatters. Players pick the symbol they want to chase, Wilds on the middle reel turn sticky, and a full Wild reel adds a random ×10, ×15 or ×20 multiplier.",
    ],
    features: [["Lock & Spin", "Pick your symbol and collect it. Every new hit resets the counter to 3."], ["Sticky middle reel", "Wilds stay locked during the feature."], ["Full Wild Reel", "Random ×10, ×15 or ×20, up to ×50 with the super buy."], ["3 bonus buy tiers", "Standard, Super Multiplier and Outer Wilds."]],
  },
  "jellyland": {
    tags: ["Video slot", "5x4", "100 lines", "Scatter pays"],
    rows: [["Grid", "5 × 4"], ["Paylines", "100 fixed"], ["RTP", "~96.4%"], ["Volatility", "Low"], ["Bet range", "0.10 – 100"], ["Max exposure", "~500× bet"], ["Wild", "Heart Candy"], ["Scatter", "Treasure Chest, up to 500×"]],
    title: "The sweetest slot carnival",
    body: [
      "Colorful gummy bears, candy canes, cupcakes and wrapped sweets fill a 5×4 grid with 100 paylines and plenty of playful energy, while the Heart Candy Wild helps complete more winning combinations.",
      "Keep an eye on the sparkling Treasure Chest Scatter: land 3 or more anywhere on the screen for payouts of up to 500× your bet.",
    ],
    features: [["100 paylines", "Wins left to right on a 5×4 grid."], ["Heart Candy Wild", "Substitutes for every symbol except the Scatter."], ["Treasure Chest", "Pays anywhere, up to 500× bet."], ["Low volatility", "Frequent, steady wins."]],
  },
  "juicy-crown": {
    tags: ["Classic", "5x3", "10 lines", "Stacked Wild"],
    rows: [["Grid", "5 × 3"], ["Paylines", "10 fixed"], ["RTP", "~96.3%"], ["Volatility", "Low–medium"], ["Bet range", "0.10 – 100"], ["Max exposure", "~500× bet"], ["Wild", "Queen, reels 2–4, fills the reel"], ["Scatters", "Red Crown and Blue Crown"]],
    title: "The royal fruit hall",
    body: [
      "Juicy Crown blends tradition and royalty: classic fruits, golden bells and sparkling crowns on a 5×3 grid with 10 fixed paylines, with the Red 7 bringing the highest payouts.",
      "The Queen Wild lands on reels 2, 3 and 4 and fills its whole reel, substituting for any symbol except the Scatters. The Red Crown Scatter pays anywhere on all reels, and the Blue Crown pays anywhere on reels 1, 3 and 5.",
    ],
    features: [["Queen Wild", "Covers all 3 positions on reels 2–4."], ["Red Crown Scatter", "Pays anywhere, up to 100× bet."], ["Blue Crown Scatter", "Reels 1, 3 and 5, up to 20× bet."], ["Red 7", "The top regular symbol, up to 500× bet."]],
  },
  "hot-fruitz": {
    tags: ["Classic", "5x3", "5 lines", "Scatter pays"],
    rows: [["Grid", "5 × 3"], ["Paylines", "5 fixed"], ["RTP", "~95.66%"], ["Volatility", "High"], ["Max win", "1,000× bet"], ["Platform", "Mobile first, desktop"], ["Top symbol", "Flaming 7, 1,000×"], ["Scatter", "Bell, 2× to 50× bet"]],
    title: "Saved by the bell",
    body: [
      "Hot Fruitz turns the classic fruit machine into a colorful explosion of personality: smiling cherries, cheeky lemons, grinning watermelons and a whole crew of cartoon fruits.",
      "Match symbols across 5 paylines, with the flaming 7 as the highest-paying symbol. The Bell Scatter pays anywhere on the reels, and its wins are added to your line wins.",
    ],
    features: [["Flaming 7", "Full line pays 1,000×."], ["Bell Scatter", "3, 4 or 5 anywhere: 2×, 10× or 50× bet."], ["Fast spins", "Short spin cycles, simple rules."], ["Mobile first", "Built for one-handed play."]],
  },
  "juicy-boost": {
    tags: ["Classic", "5x3", "5 lines", "Scatter pays"],
    rows: [["Grid", "5 × 3"], ["Paylines", "5 fixed"], ["RTP", "~95.66%"], ["Volatility", "High"], ["Max win", "1,000× bet"], ["Platform", "Mobile first, desktop"], ["Top symbol", "Red 7, 1,000×"], ["Scatter", "Sun, 2× to 50× bet"]],
    title: "The fruit machine, reimagined",
    body: [
      "Juicy Boost is a modern take on the iconic fruit slot: classic fruit symbols with colorful visuals, smooth animations and a polished slot cabinet design.",
      "It is all about the core excitement of traditional slots: big full-line wins, simple mechanics and satisfying spin feedback. The Sun Scatter pays anywhere on the reels, on top of line wins.",
    ],
    features: [["Red 7", "Full line pays 1,000×."], ["Sun Scatter", "3, 4 or 5 anywhere: 2×, 10× or 50× bet."], ["Fast spins", "Short spin cycles, simple rules."], ["Mobile first", "Built for one-handed play."]],
  },
  "big-money-bonanza": {
    tags: ["Classic", "5x3", "5 lines", "Scatter pays"],
    rows: [["Grid", "5 × 3"], ["Paylines", "5 fixed"], ["RTP", "~95.66%"], ["Volatility", "Medium–high"], ["Max win", "1,000× stake per line"], ["Top symbol", "The Woman, 1,000×"], ["Scatter", "3+ anywhere, up to 50×"], ["Bonus rounds", "None, straight play"]],
    title: "Wealth, glamour and big wins",
    body: [
      "Big Money Bonanza is a classic video slot with a luxurious, high-stakes theme: diamonds, money bags, gold coins and an elegant high-value character.",
      "Land winning combinations on 5 fixed paylines, or collect Scatter payouts anywhere on the reels. No free spins and no bonus rounds, just straightforward play.",
    ],
    features: [["The Woman", "Full line pays 1,000×."], ["Scatter pays", "3+ anywhere, up to 50×."], ["5 fixed paylines", "Left to right, classic layout."], ["Straight play", "No bonus rounds to wait for."]],
  },
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
