import { useCallback, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header.jsx";
import Menu from "./components/Menu.jsx";
import Footer from "./components/Footer.jsx";
import AgeGate from "./components/AgeGate.jsx";
import ScrollManager from "./components/ScrollManager.jsx";
import { useTheme } from "./hooks/useTheme.js";
import Home from "./pages/Home.jsx";
import Games from "./pages/Games.jsx";
import Game from "./pages/Game.jsx";
import About from "./pages/About.jsx";
import Forge from "./pages/Forge.jsx";
import Placeholder from "./pages/Placeholder.jsx";
import BackToTop from "./components/BackToTop.jsx";

// Pages whose first section is not a dark/blue hero get a page-coloured header from the start.
const PAGE_TONE = [/^\/games\/[^/]+/];

export default function App() {
  const { theme, toggle } = useTheme();
  const [menu, setMenu] = useState(false);
  const { pathname } = useLocation();
  const tone = PAGE_TONE.some((r) => r.test(pathname)) ? "page" : "hero";
  const closeMenu = useCallback(() => setMenu(false), []);

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <ScrollManager />
      <Header tone={tone} onMenu={() => setMenu(true)} theme={theme} onTheme={toggle} />
      <Menu open={menu} onClose={closeMenu} theme={theme} onTheme={toggle} />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/games" element={<Games />} />
          <Route path="/games/:slug" element={<Game />} />
          <Route path="/about" element={<About />} />
          <Route path="/forge" element={<Forge />} />
          <Route path="/news" element={<Placeholder title="News" />} />
          <Route path="/partners" element={<Placeholder title="Partners" />} />
          <Route path="/careers" element={<Placeholder title="Careers" />} />
          <Route path="/brand" element={<Placeholder title="Brand resources" />} />
          <Route path="/privacy" element={<Placeholder title="Privacy policy" text="The full privacy policy will be published here. For questions about your data, write to hello@slotify.games." />} />
          <Route path="/terms" element={<Placeholder title="Terms of use" text="The full terms of use will be published here. This website is intended for B2B partners only and no real money gambling is offered." />} />
          <Route path="/sign-in" element={<Placeholder title="Sign in" text="This button opens the Slotify back office login. Add the back office URL in src/config.js." />} />
          <Route path="*" element={<Placeholder title="Page not found" text="This page does not exist. Try the games or go back home." />} />
        </Routes>
      </main>
      <Footer />
      <BackToTop />
      <AgeGate />
    </>
  );
}
