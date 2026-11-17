import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import "@fontsource/bungee/latin-400.css";
import "@fontsource/figtree/latin-400.css";
import "@fontsource/figtree/latin-500.css";
import "@fontsource/figtree/latin-600.css";
import "@fontsource/figtree/latin-700.css";
import "@fontsource/figtree/latin-800.css";
import "./styles/tokens.css";
import "./styles/global.css";
import App from "./App.jsx";

// Viewport width without the scrollbar, so full-bleed rows line up exactly with the header and .wrap.
const setVw = () => document.documentElement.style.setProperty("--vw", `${document.documentElement.clientWidth}px`);
setVw();
window.addEventListener("resize", setVw);

// HashRouter keeps routes working on any static host and from a local file.
// Switch to BrowserRouter when the site has a server that rewrites to index.html.
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);
