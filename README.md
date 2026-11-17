# Slotify website

React + Vite build of the Slotify Figma design (dark and light mode), with GSAP motion.

## Run it

```bash
npm install
npm run dev      # local dev server
npm run build    # production build in /dist
npm run preview  # serve the build locally
```

## What is where

| Path | What |
| --- | --- |
| `src/styles/tokens.css` | Colours, type and motion tokens. Dark is the default, light follows the Figma light screens. |
| `src/styles/global.css` | Base styles, slanted buttons, chips, tags, layout helpers |
| `src/data/games.js` | Game catalogue (RTP, volatility, grid) and the Lex Power Up game sheet |
| `src/config.js` | Back office URL (Sign in), Calendly link (Forge demo), contact email |
| `src/components/` | Header, full-screen accordion menu, footer, age gate, game card, carousel, reels hero |
| `src/pages/` | Home, Games, Game detail, About, Forge, placeholder pages |
| `public/img/` | Game art, characters and symbols (WebP) |

## Motion (GSAP)

All animation uses `useGSAP` from `@gsap/react` with a scoped ref, so animations and ScrollTriggers are cleaned up when a page unmounts. Every scroll effect sits inside `gsap.matchMedia()` and is skipped when the visitor has *reduce motion* turned on.

- **Home reels hero**: reels drift on `gsap.ticker`; "Spin the reels" tweens each reel with `power4.out` and a short motion blur, then highlights the featured game on the payline.
- **Featured games**: image wipes in with `clip-path`, copy lifts in.
- **Statement**: words light up one by one, scrubbed to scroll.
- **About hero**: block, triangle and Lex move at depths 0.2 / 0.35 / 0.6 (parallax, scrub).
- **Mission and vision**: MISSION slides in from the left, VISION from the right; each lands when its card is centred.
- **What drives us**: CSS sticky cards; the card underneath scales to 0.95 and dims as the next one slides over. Progress bar follows the active card.
- **Stats**: two endless marquees in opposite directions.
- **Forge "How it works"**: one pinned, scrubbed timeline with four labelled phases (model, art, animate, release). Tapping a step scrolls to its phase.
- **Menu**: top-down wipe, items stagger in at 35 ms.

## To do before launch

- Add the real back office URL, Calendly link and social links in `src/config.js` and `Footer.jsx`.
- Connect the contact form to a backend (it shows a success state only).
- Replace the demo player placeholder with the game server iframe.
- Game sheet buttons need their PDF links.
- Routing uses `HashRouter` so it works on any static host. Switch to `BrowserRouter` if the server rewrites all routes to `index.html`.
- News, Partners, Careers and Brand resources are placeholder pages.
